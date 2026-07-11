// =====================================================================
// engine/capture.mjs — MOTOR DE CAPTURA do Protocolo 5R (radar diário).
//
// Consulta a taxonomia 5R (tópicos: microbiota, SII/IBS, low-FODMAP,
// probióticos, prebióticos, SIBO, eixo cérebro-intestino, fibras...),
// busca metadados na CrossRef + PubMed E-utilities, deduplica por DOI
// (local e contra o banco), pontua por hierarquia de evidência e insere
// os estudos novos + cria a pauta na fila (publication_queue, 'capturada').
//
// USO (CLI):
//   node engine/capture.mjs                 -> roda as consultas padrão
//   node engine/capture.mjs "low FODMAP"    -> roda uma consulta específica
//
// COMO ENDPOINT/CRON:
//   importe runCapture() e proteja com CRON_SECRET (ver guardCron()).
//
// DEPENDÊNCIA:
//   O modo BANCO usa o pacote `pg` (Pool via DATABASE_URL). `pg` NÃO é
//   ainda dependência do projeto — instale com `npm i pg` para o modo
//   banco. A importação é DINÂMICA e só acontece quando há DATABASE_URL;
//   assim o modo seco (dry) roda sem `pg` instalado e sem crashar.
//
// TERMOS DE USO: enviamos User-Agent com e-mail de contato (ver lib/http),
// e coletamos APENAS metadados + abstract + link. Nunca full-text pago.
// =====================================================================
import { getJSON } from "./lib/http.mjs";
import { resolveOA } from "./fulltext.mjs";
import { normalizeDoi, findDuplicatesInBatch } from "./dedup.mjs";

// ---------------------------------------------------------------------
// CONSULTAS PADRÃO — o radar do 5R. Cada string vira uma busca nas APIs.
// Idealmente estas vêm de topics.search_terms no banco; aqui ficam como
// fallback/seed para o modo seco e o primeiro boot.
// ---------------------------------------------------------------------
export const DEFAULT_QUERIES = [
  // núcleo microbiota / intestino
  "gut microbiota human health",
  "gut microbiome dysbiosis",
  "fecal microbiota transplantation",
  "short chain fatty acids butyrate gut",
  // SII / SII (IBS) e sintomas
  "irritable bowel syndrome randomized trial",
  "irritable bowel syndrome dietary intervention",
  "functional dyspepsia treatment",
  "chronic constipation fiber",
  // Remover — dieta / gatilhos
  "low FODMAP diet irritable bowel syndrome",
  "gluten sensitivity gut symptoms",
  "food intolerance elimination diet",
  // Recolocar — fibra / função digestiva
  "soluble fiber supplementation gut",
  "prebiotic inulin clinical trial",
  "digestive enzymes supplementation",
  // Reparar — barreira / mucosa
  "intestinal barrier permeability",
  "glutamine gut mucosa",
  "polyphenols gut inflammation",
  // Reinocular — micro-organismos
  "probiotic strain irritable bowel syndrome",
  "synbiotic supplementation trial",
  "postbiotic clinical trial",
  "Akkermansia muciniphila human",
  "SIBO small intestinal bacterial overgrowth",
  // Reequilibrar — eixo intestino-cérebro / estilo de vida
  "gut-brain axis microbiota",
  "gut directed hypnotherapy irritable bowel",
  "sleep stress gut microbiome",
];

// ---------------------------------------------------------------------
// HIERARQUIA DE EVIDÊNCIA — peso do desenho (espelha study_types.weight).
// ---------------------------------------------------------------------
export function studyWeight(rawType) {
  const t = String(rawType || "").toLowerCase();
  if (t.includes("meta-analysis") || t.includes("systematic")) return 100;
  if (t.includes("guideline") || t.includes("practice-guideline")) return 95;
  if (t.includes("randomized") || t.includes("rct") || t.includes("clinical trial") || t.includes("trial")) return 80;
  if (t.includes("cohort")) return 50;
  if (t.includes("observational") || t.includes("case")) return 30;
  if (t.includes("in vitro") || t.includes("animal") || t.includes("preclinical")) return 15;
  return 20; // artigo genérico
}

// peso → slug de study_types (para gravar study_type_id).
export function studyTypeSlug(weight) {
  if (weight >= 100) return "meta-analise";
  if (weight >= 95) return "guideline";
  if (weight >= 80) return "ensaio-clinico";
  if (weight >= 50) return "coorte";
  if (weight >= 30) return "observacional";
  if (weight >= 15) return "pre-clinico";
  return "artigo";
}

// ---------------------------------------------------------------------
// SCORE DE PRIORIDADE — desenho + recência + citações.
// ---------------------------------------------------------------------
export function scoreOf(item) {
  const w = studyWeight(item.raw_type);
  const year = item.year || 0;
  const recency = year ? Math.max(0, 10 - (new Date().getFullYear() - year) * 2) : 0;
  const cites = Math.min(15, (item.citations || 0) / 10);
  return Math.round(w + recency + cites);
}

// ---------------------------------------------------------------------
// 1. CrossRef — metadados por consulta.
//    windowYears: janela de recência (1 = radar diário; maior = backfill).
// ---------------------------------------------------------------------
export async function fromCrossRef(query, rows = 8, windowYears = 1) {
  const since = new Date(Date.now() - 365 * windowYears * 864e5).toISOString().slice(0, 10);
  const url =
    `https://api.crossref.org/works?query=${encodeURIComponent(query)}` +
    `&rows=${rows}&filter=from-pub-date:${since}` +
    `&select=DOI,title,issued,container-title,type,author,is-referenced-by-count,abstract`;
  const j = await getJSON(url, { timeoutMs: 9000 });
  const items = (j && j.message && j.message.items) || [];
  return items
    .map((it) => {
      const dp = it.issued && it.issued["date-parts"] && it.issued["date-parts"][0];
      const year = dp && dp[0] ? dp[0] : null;
      const pubDate = dp && dp[0] ? `${dp[0]}-${String(dp[1] || 1).padStart(2, "0")}-${String(dp[2] || 1).padStart(2, "0")}` : null;
      return {
        doi: normalizeDoi(it.DOI),
        pmid: null,
        title: (it.title && it.title[0]) || "(sem título)",
        year,
        pub_date: pubDate,
        journal: (it["container-title"] && it["container-title"][0]) || null,
        authors: Array.isArray(it.author) ? it.author.map((a) => ({ family: a.family || "", given: a.given || "" })) : [],
        raw_type: it.type || "",
        citations: it["is-referenced-by-count"] || 0,
        abstract: it.abstract ? String(it.abstract).replace(/<[^>]+>/g, "").slice(0, 2000) : null,
        source: "crossref",
      };
    })
    .filter((x) => x.doi);
}

// ---------------------------------------------------------------------
// 2. PubMed E-utilities — ESearch -> ESummary.
// ---------------------------------------------------------------------
export async function fromPubMed(query, retmax = 8) {
  const key = process.env.NCBI_API_KEY ? `&api_key=${process.env.NCBI_API_KEY}` : "";
  const es = await getJSON(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(
      query
    )}&retmax=${retmax}&retmode=json&sort=date${key}`,
    { timeoutMs: 9000 }
  );
  const ids = (es && es.esearchresult && es.esearchresult.idlist) || [];
  if (!ids.length) return [];
  const sm = await getJSON(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json${key}`,
    { timeoutMs: 9000 }
  );
  const result = (sm && sm.result) || {};
  return ids
    .map((id) => {
      const r = result[id];
      if (!r) return null;
      const doiId = (r.articleids || []).find((a) => a.idtype === "doi");
      return {
        doi: doiId ? normalizeDoi(doiId.value) : null,
        pmid: id,
        title: r.title || "(sem título)",
        year: r.pubdate ? parseInt(r.pubdate.slice(0, 4)) : null,
        pub_date: (() => {
          if (!r.pubdate) return null;
          const d = new Date(r.pubdate);
          return isNaN(d) ? null : d.toISOString().slice(0, 10);
        })(),
        journal: r.fulljournalname || r.source || null,
        authors: Array.isArray(r.authors) ? r.authors.map((a) => ({ family: a.name || "", given: "" })) : [],
        raw_type: (r.pubtype || []).join(" "),
        citations: 0,
        abstract: null,
        source: "pubmed",
      };
    })
    .filter((x) => x && x.doi);
}

// Busca ambas as fontes para uma consulta e devolve itens já com DOI.
export async function fetchForQuery(query, windowYears = 1) {
  let items = [];
  try {
    items = items.concat(await fromCrossRef(query, 8, windowYears));
  } catch (e) {
    console.error(`CrossRef falhou (${query}):`, e.message);
  }
  try {
    items = items.concat(await fromPubMed(query));
  } catch (e) {
    console.error(`PubMed falhou (${query}):`, e.message);
  }
  return items;
}

// ---------------------------------------------------------------------
// PERSISTÊNCIA — só quando há DATABASE_URL. `pg` é importado dinamicamente.
// ---------------------------------------------------------------------
async function getPool() {
  // Import dinâmico: evita exigir `pg` no modo seco.
  let pg;
  try {
    pg = await import("pg");
  } catch {
    throw new Error(
      "O pacote 'pg' não está instalado. Rode `npm i pg` para usar o modo banco, ou remova DATABASE_URL para o modo seco."
    );
  }
  const { Pool } = pg.default || pg;
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Supabase exige SSL
    max: 2,
  });
}

// Insere um estudo (dedup por DOI no banco via ON CONFLICT) e cria a pauta.
// Enriquece com Europe PMC (open access / abstract) SÓ para estudos novos.
async function upsertStudy(client, item) {
  // dedup rápido: se o DOI já existe, sai antes de gastar Europe PMC.
  if (item.doi) {
    const ja = await client.query("SELECT 1 FROM scientific_studies WHERE doi=$1 LIMIT 1", [item.doi]);
    if (ja.rows.length) return { inserted: false };
  }

  const w = studyWeight(item.raw_type);
  const slug = studyTypeSlug(w);
  const typeRes = await client.query("SELECT id FROM study_types WHERE slug=$1", [slug]);
  const studyTypeId = typeRes.rows[0] ? typeRes.rows[0].id : null;

  // enriquece open access + abstract (só p/ os novos).
  let access = "pago";
  let isOA = false;
  let license = null;
  let pmcid = null;
  let abstract = item.abstract;
  try {
    const meta = await resolveOA(item.doi);
    if (meta) {
      if (meta.isOpenAccess) {
        access = "gratuito";
        isOA = true;
      }
      license = meta.license || null;
      pmcid = meta.pmcid || null;
      if ((!abstract || abstract.length < 40) && meta.abstract) abstract = meta.abstract.slice(0, 2000);
    }
  } catch {
    /* segue com o que tiver */
  }

  const res = await client.query(
    `INSERT INTO scientific_studies
       (doi, pmid, pmcid, title, abstract, journal, year, pub_date, authors,
        study_type_id, citations, access, is_open_access, license, source_url,
        ingestion_source, raw_type)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     ON CONFLICT (doi) DO NOTHING
     RETURNING id`,
    [
      item.doi,
      item.pmid || null,
      pmcid,
      item.title,
      abstract,
      item.journal,
      item.year,
      item.pub_date || null,
      JSON.stringify(item.authors || []),
      studyTypeId,
      item.citations || 0,
      access,
      isOA,
      license,
      item.doi ? `https://doi.org/${item.doi}` : null,
      item.source,
      item.raw_type || null,
    ]
  );
  if (!res.rows.length) return { inserted: false }; // corrida: já existia

  const studyId = res.rows[0].id;
  await client.query(
    `INSERT INTO publication_queue (study_id, state, score) VALUES ($1,'capturada',$2)`,
    [studyId, scoreOf(item)]
  );
  return { inserted: true, studyId };
}

// ---------------------------------------------------------------------
// runCapture(queries, { windowYears, maxNew }) — orquestração.
//   Modo BANCO: persiste. Modo SECO (sem DATABASE_URL): só reporta.
// ---------------------------------------------------------------------
export async function runCapture(queries, { windowYears = 1, maxNew = 40 } = {}) {
  const qs = Array.isArray(queries) && queries.length ? queries : DEFAULT_QUERIES;

  // ---- MODO SECO: sem DATABASE_URL, não persiste — apenas coleta e reporta. ----
  if (!process.env.DATABASE_URL) {
    console.log("[dry] DATABASE_URL ausente — modo seco (não grava no banco).");
    let evaluated = 0;
    const seen = new Set();
    const all = [];
    for (const q of qs) {
      const items = await fetchForQuery(q, windowYears);
      for (const it of items) {
        if (!it.doi || seen.has(it.doi)) continue;
        seen.add(it.doi);
        evaluated++;
        all.push(it);
      }
      console.log(`[dry] "${q}": ${items.length} resultados`);
    }
    const dupes = findDuplicatesInBatch(all);
    console.log(`\n[dry] ${evaluated} estudos únicos coletados; ${dupes.length} candidatos a duplicata detectados.`);
    console.log("[dry] Nenhuma gravação realizada. Configure DATABASE_URL para o modo banco.");
    return { mode: "dry", evaluated, unique: all.length, duplicateCandidates: dupes.length, inserted: 0, queued: 0 };
  }

  // ---- MODO BANCO ----
  const pool = await getPool();
  const client = await pool.connect();
  let runId = null;
  let evaluated = 0;
  let inserted = 0;
  try {
    const run = await client.query(
      `INSERT INTO automation_runs (kind, status, triggered_by) VALUES ('capture','running',$1) RETURNING id`,
      [process.env.CRON_SECRET ? "cron" : "manual"]
    );
    runId = run.rows[0].id;

    for (const q of qs) {
      if (inserted >= maxNew) break;
      const items = await fetchForQuery(q, windowYears);

      // dedup local por DOI antes de gravar.
      const seen = new Set();
      const batch = [];
      for (const it of items) {
        if (!it.doi || seen.has(it.doi)) continue;
        seen.add(it.doi);
        batch.push(it);
      }

      // registra candidatos a duplicata do lote (para revisão humana).
      const dupes = findDuplicatesInBatch(batch);
      for (const c of dupes) {
        // gravamos só o método/similaridade; o vínculo por ID exige que ambos
        // estejam no banco — aqui logamos como aviso e deixamos o par para a UI.
        await client
          .query(
            `INSERT INTO error_logs (run_id, scope, severity, message, context)
             VALUES ($1,'dedup','info',$2,$3)`,
            [
              runId,
              `Candidato a duplicata (${c.match_method}, sim=${c.similarity})`,
              JSON.stringify({ doi: c.study.doi, duplicate_of: c.duplicateOf.doi }),
            ]
          )
          .catch(() => {});
      }

      for (const it of batch) {
        if (inserted >= maxNew) break;
        evaluated++;
        try {
          const r = await upsertStudy(client, it);
          if (r.inserted) inserted++;
        } catch (e) {
          await client
            .query(
              `INSERT INTO error_logs (run_id, scope, severity, message, context)
               VALUES ($1,'capture','error',$2,$3)`,
              [runId, e.message, JSON.stringify({ doi: it.doi })]
            )
            .catch(() => {});
        }
      }
      console.log(`Query "${q}": ${items.length} resultados`);
    }

    await client.query(
      `UPDATE automation_runs SET status='success', finished_at=now(), stats=$2 WHERE id=$1`,
      [runId, JSON.stringify({ evaluated, inserted })]
    );
    console.log(`\n=== Captura concluída: ${evaluated} avaliados, ${inserted} novos na fila (state='capturada') ===`);
    return { mode: "db", evaluated, inserted, queued: inserted, runId };
  } catch (e) {
    if (runId) {
      await client
        .query(`UPDATE automation_runs SET status='failed', finished_at=now(), message=$2 WHERE id=$1`, [runId, e.message])
        .catch(() => {});
    }
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

// ---------------------------------------------------------------------
// guardCron(req) — proteção quando runCapture roda como endpoint HTTP.
//   Exige header 'authorization: Bearer <CRON_SECRET>' OU '?secret=...'.
//   Devolve { ok, status, error }.
// ---------------------------------------------------------------------
export function guardCron(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return { ok: false, status: 500, error: "CRON_SECRET não configurado" };
  const auth = (req && req.headers && (req.headers.authorization || req.headers.Authorization)) || "";
  const bearer = auth.replace(/^Bearer\s+/i, "");
  const qsSecret = req && req.query && req.query.secret;
  if (bearer === secret || qsSecret === secret) return { ok: true };
  return { ok: false, status: 401, error: "não autorizado" };
}

// ---------------------------------------------------------------------
// ENTRADA CLI
// ---------------------------------------------------------------------
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const arg = process.argv[2];
  const queries = arg ? [arg] : DEFAULT_QUERIES;
  runCapture(queries)
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
