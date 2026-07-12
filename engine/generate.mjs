// =====================================================================
// engine/generate.mjs — GERAÇÃO DE RASCUNHO (motor propõe, humano aprova).
//
// Dada uma pauta da fila (publication_queue), produz um rascunho de NOTÍCIA
// no formato NewsArticle de content/news.ts e o deixa em revisão humana.
//
// REGRA EDITORIAL INEGOCIÁVEL (Fase 1): NADA é publicado automaticamente.
//   A saída entra na fila como 'em_revisao' e o artigo nasce como versão
//   com status 'em_revisao'. Só um revisor humano promove para 'publicado'.
//
// IA PROVEDOR-AGNÓSTICA: a chamada à IA passa por uma ABSTRAÇÃO (callAI).
//   - Lê ANTHROPIC_API_KEY e o modelo de AI_MODEL (default 'claude-sonnet-5').
//   - Se NÃO houver chave, usa um FALLBACK determinístico que monta um
//     rascunho estruturado a partir dos metadados — assim o pipeline roda
//     de ponta a ponta sem chave (útil em dev/CI).
//   - Registra uso (tokens/custo) em ai_usage (best-effort).
//
// USO (CLI):
//   node engine/generate.mjs                 -> pega a próxima pauta da fila
//   node engine/generate.mjs <queue_id>      -> gera para uma pauta específica
//   (sem DATABASE_URL: roda em modo seco com um estudo de exemplo e imprime)
//
// DEPENDÊNCIA: `pg` só no modo banco (import dinâmico; ver capture.mjs).
// =====================================================================
import { buildAssessment } from "./evidence.mjs";
import { fetchAbstract } from "./fulltext.mjs";

const AI_MODEL = process.env.AI_MODEL || "claude-sonnet-5";

// Mapa slug de study_type -> EvidenceGrade sugerido (teto do desenho).
// (o rascunho pode rebaixar, nunca subir acima do teto do desenho.)
const TYPE_TO_GRADE = {
  "revisao-sistematica": "A",
  "meta-analise": "A",
  guideline: "A",
  consenso: "B",
  "ensaio-clinico": "B",
  coorte: "C",
  observacional: "C",
  associacao: "C",
  "pre-clinico": "D",
  mecanismo: "D",
  hipotese: "D",
  artigo: "C",
};

// ---------------------------------------------------------------------
// slugify — igual espírito ao do front (sem acento, hífens, curto).
// ---------------------------------------------------------------------
export function slugify(s) {
  return String(s || "artigo")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "") || "artigo";
}

// ---------------------------------------------------------------------
// ABSTRAÇÃO DE IA — provedor-agnóstica.
//   Retorna { draft, usage } onde draft tem os campos brutos que depois
//   viram o NewsArticle; usage = { model, input_tokens, output_tokens, cost_usd }.
// ---------------------------------------------------------------------
export async function callAI(study) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ---- FALLBACK determinístico (sem chave): monta rascunho dos metadados. ----
  if (!apiKey) {
    return { draft: fallbackDraft(study), usage: { model: "fallback", input_tokens: 0, output_tokens: 0, cost_usd: 0 } };
  }

  // ---------------------------------------------------------------------
  // TODO(IA REAL): esta é a integração com o provedor. Hoje usa a Messages
  // API da Anthropic via HTTP. Para trocar de provedor, reimplemente APENAS
  // este trecho mantendo o mesmo retorno { draft, usage }.
  //
  // Modelo vem de AI_MODEL (default 'claude-sonnet-5'). NÃO enviamos
  // temperature/top_p (removidos nos modelos atuais). Pedimos JSON puro.
  // ---------------------------------------------------------------------
  const system = SYSTEM_PROMPT;
  const userMsg = buildUserMessage(study);
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        max_tokens: 4000,
        system,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
    const data = await resp.json();
    if (data.error) throw new Error(data.error.message || "erro do provedor de IA");
    let text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    text = text.replace(/```json|```/g, "").trim();
    const parsed = safeParseJSON(text);
    const usage = {
      model: AI_MODEL,
      input_tokens: (data.usage && data.usage.input_tokens) || 0,
      output_tokens: (data.usage && data.usage.output_tokens) || 0,
      cost_usd: estimateCost(AI_MODEL, data.usage),
    };
    // se o JSON veio incompleto, cai para o fallback (degradação graciosa).
    return { draft: parsed ? { ...fallbackDraft(study), ...parsed } : fallbackDraft(study), usage };
  } catch (e) {
    console.error("IA falhou, usando fallback determinístico:", e.message);
    return { draft: fallbackDraft(study), usage: { model: "fallback", input_tokens: 0, output_tokens: 0, cost_usd: 0 } };
  }
}

// Prompt do redator do Protocolo 5R.
// MISSÃO: TRADUZIR ciência para a população. O leitor principal é uma pessoa
// leiga, curiosa, que quer entender — não um médico lendo um abstract.
// A notícia é conteúdo jornalístico-educativo em PORTUGUÊS claro, acolhedor e
// preciso: explica o jargão, usa linguagem do dia a dia, e ao mesmo tempo é
// honesta sobre limites e nível de evidência. Sem infantilizar, sem promessa.
const SYSTEM_PROMPT = `Você é o redator do Protocolo 5R, um portal que TRADUZ ciência para a população brasileira.

QUEM LÊ: uma pessoa comum, curiosa sobre saúde intestinal, sem formação médica. Ela quer entender o que um novo estudo significa para a vida dela — em português claro. Profissionais também leem, mas o texto é escrito para o público geral.

COMO ESCREVER (voz de tradutor de ciência, não de abstract):
- Em PORTUGUÊS do Brasil, acessível e acolhedor, mas preciso. O estudo geralmente vem em inglês e em linguagem técnica: TRADUZA e EXPLIQUE. Nunca copie o resumo em inglês.
- Explique todo termo técnico na hora (ex.: "microbiota — o conjunto de micróbios que vivem no intestino").
- Frases de tamanho variado e naturais, como uma boa reportagem de saúde. Pode ter ritmo e clareza — não precisa ser seco, mas também não é sensacionalista.
- Conecte com o dia a dia da pessoa ("o que isso significa na prática", "quando vale procurar ajuda").

LINHAS VERMELHAS (inegociáveis):
- Zero promessa de cura, milagre, "elimina de vez", "definitivo". Zero urgência ou escassez.
- Não dê dose, diagnóstico, prescrição ou conduta individual.
- Deixe claro o que o estudo NÃO permite concluir. Evidência muda com o tempo.
- Sempre lembre que não substitui a avaliação de um profissional de saúde.

GRAU DE EVIDÊNCIA (seja rigoroso): A=revisão sistemática/meta-análise/diretriz; B=ensaio clínico ou coorte de boa qualidade; C=observacional/amostra pequena/preliminar; D=pré-clínico/mecanismo. Nível D NUNCA afirma efeito clínico em pessoas — resultado em laboratório não é prova de benefício.

RELAÇÃO 5R: conecte a um ou mais dos cinco Rs (remover, recolocar, reparar, reinocular, reequilibrar) de forma educativa, sem transformar em prescrição.

EXEMPLO do padrão editorial (estilo-alvo, resumido):
{"title":"Dieta low-FODMAP na síndrome do intestino irritável: o que uma grande revisão de 2025 mostra","quickAnswer":"Uma revisão que reúne vários estudos indica que a fase de restrição da dieta low-FODMAP melhora sintomas em parte das pessoas com SII — mas a reintrodução é essencial e a dieta não deve ser permanente.","found":"Na fase de restrição, houve melhora de distensão e dor abdominal em parte dos participantes, em comparação com dietas de controle.","cannotConclude":"Não permite concluir que a restrição deva ser mantida a longo prazo, nem que funcione para todos — a resposta é individual."}

RESPONDA APENAS JSON válido (sem markdown, sem comentários) nesta forma exata:
{"title":"(manchete popular em português, curiosa mas honesta, sem clickbait)","quickAnswer":"(a resposta direta que a pessoa procura, 1-2 frases simples)","category":"(ex.: Alimentação e sintomas, Microbiota e suplementos, Eixo intestino-cérebro)","studied":"(o que foi estudado, em linguagem do dia a dia)","participants":"(quem participou ou qual modelo — traduzido)","intervention":"(a intervenção/exposição analisada, explicada)","found":"(o que o estudo encontrou, sem exagero)","cannotConclude":"(o que o estudo NÃO permite concluir)","relationTo5R":"(como se relaciona com o Protocolo 5R, educativo)","rTags":["remover"],"terms":["low-fodmap"],"grade":"A|B|C|D","direction":"favoravel|desfavoravel|neutro|insuficiente","limitations":"(limitações em linguagem simples)","practical":"(o que isso significa na prática, educacional e nunca prescritivo; lembre de procurar um profissional)"}`;

function buildUserMessage(study) {
  return `Escreva a notícia popular (traduzindo a ciência para a população brasileira) a partir deste estudo. O material abaixo pode estar em inglês e em linguagem técnica — traduza e explique em português claro.

Título original: ${study.title}
Periódico: ${study.journal || "n/d"} (${study.year || "s/d"})
DOI: ${study.doi || "n/d"}
Tipo de estudo: ${study.study_type_slug || "n/d"}
Resumo (abstract): ${study.abstract || "(sem resumo disponível — seja conservador, baseie-se no título e não invente achados)"}

Lembre: manchete e texto em PORTUGUÊS claro para o público geral; explique o jargão; seja honesto sobre limites; nada de promessa ou prescrição.`;
}

// ---------------------------------------------------------------------
// FALLBACK determinístico (SEM IA) — NÃO é conteúdo popular publicável.
//   Sem um modelo de linguagem não há como traduzir o estudo (em geral em
//   inglês/técnico) para uma notícia acessível ao público. Então o fallback
//   é um ESQUELETO honesto, em português, EXPLICITAMENTE marcado como
//   "aguardando redação popular" — jamais o abstract cru como se fosse a
//   notícia. O revisor humano vê que precisa de redação de IA + revisão.
//   Serve para o pipeline rodar de ponta a ponta em dev/CI, não para publicar.
// ---------------------------------------------------------------------
export function fallbackDraft(study) {
  const grade = TYPE_TO_GRADE[study.study_type_slug] || "C";
  const nota = "[Rascunho automático sem IA — precisa de redação popular e revisão editorial antes de publicar.]";
  return {
    title: `[A redigir] Estudo sobre ${study.journal || "saúde intestinal"} (${study.year || "s/d"})`,
    quickAnswer: nota,
    category: "Ciência e evidência",
    studied: `Estudo a ser traduzido para linguagem acessível. Título original: "${study.title}". ${nota}`,
    participants: "A extrair e traduzir da fonte (população, tamanho amostral, critérios).",
    intervention: "A extrair e traduzir da fonte (intervenção ou exposição analisada).",
    found: "A redigir em linguagem clara para o público, a partir dos achados da fonte.",
    cannotConclude:
      grade === "D"
        ? "Evidência pré-clínica/mecanística: não permite concluir efeito clínico em pessoas."
        : "Não permite generalizar além da população, dose e desfechos efetivamente estudados; a resposta é individual.",
    relationTo5R: "Relação com o Protocolo 5R a ser definida na redação e na revisão editorial.",
    rTags: [],
    terms: [],
    grade,
    direction: "insuficiente",
    limitations: "Rascunho automático a partir de metadados; redação popular (IA) e revisão humana pendentes.",
    practical:
      "Conteúdo educacional, não prescritivo. Decisões individuais pertencem a um profissional que avalie o caso.",
    _needsPopularWriting: true,
  };
}

// ---------------------------------------------------------------------
// buildNewsArticle(draft, study, assessment) — monta o NewsArticle final.
//   Espelha a interface de content/news.ts (sem publishedAt real: a data
//   de publicação só existe quando um humano publicar).
// ---------------------------------------------------------------------
export function buildNewsArticle(draft, study, assessment) {
  const slug = slugify(draft.title || study.title);
  const now = new Date().toISOString();
  return {
    slug,
    title: draft.title || study.title,
    quickAnswer: draft.quickAnswer || "",
    category: draft.category || "Ciência e evidência",
    rTags: Array.isArray(draft.rTags) ? draft.rTags : [],
    terms: Array.isArray(draft.terms) ? draft.terms : [],
    studied: draft.studied || "",
    participants: draft.participants || "",
    intervention: draft.intervention || "",
    found: draft.found || "",
    cannotConclude: draft.cannotConclude || assessment.what_it_does_not_prove,
    relationTo5R: draft.relationTo5R || "",
    evidence: assessment.grade, // grau A/B/C/D já validado pelas travas
    studyType: study.study_type_slug || draft.study_type || "artigo",
    limitations: draft.limitations || assessment.limitations,
    practical: draft.practical || "",
    source: {
      journal: study.journal || "Fonte não informada",
      authors: authorsLabel(study.authors),
      doi: study.doi || undefined,
      pmid: study.pmid || undefined,
      year: study.year || new Date().getFullYear(),
      url: study.doi ? `https://doi.org/${study.doi}` : study.source_url || undefined,
      access: study.access || "pago",
    },
    // datas: reviewedAt/publishedAt reais só quando um humano agir.
    publishedAt: null,
    reviewedAt: null,
    reviewer: null,
    related: [],
    featured: false,
    _meta: { generatedAt: now, status: "em_revisao" },
  };
}

function authorsLabel(authors) {
  if (!Array.isArray(authors) || !authors.length) return "Autores diversos";
  const first = authors[0];
  const name = typeof first === "string" ? first : `${first.family || ""} ${first.given || ""}`.trim();
  return authors.length > 1 ? `${name} et al.` : name || "Autores diversos";
}

// ---------------------------------------------------------------------
// generateForStudy(study) — pipeline puro: IA/fallback -> evidência -> artigo.
//   Não toca no banco; útil para testes e para o modo seco.
// ---------------------------------------------------------------------
export async function generateForStudy(study) {
  const { draft, usage } = await callAI(study);
  const assessment = buildAssessment(
    { grade: draft.grade, study_type: study.study_type_slug, direction: draft.direction, does_not_prove: draft.cannotConclude, limitations: draft.limitations, summary: draft.quickAnswer },
    study
  );
  const article = buildNewsArticle(draft, study, assessment);
  return { article, assessment, usage };
}

// ---------------------------------------------------------------------
// Helpers de parsing/custo
// ---------------------------------------------------------------------
function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first >= 0 && last > first) {
      try {
        return JSON.parse(text.slice(first, last + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

// Estimativa de custo (USD). Preços aproximados por 1M tokens; ajuste conforme
// o modelo/contrato. Usado só para registro em ai_usage (best-effort).
function estimateCost(model, usage) {
  if (!usage) return 0;
  const PRICES = {
    "claude-sonnet-5": { in: 3, out: 15 },
    "claude-opus-4-8": { in: 5, out: 25 },
    "claude-haiku-4-5": { in: 1, out: 5 },
  };
  const p = PRICES[model] || { in: 3, out: 15 };
  const inTok = usage.input_tokens || 0;
  const outTok = usage.output_tokens || 0;
  return Number(((inTok / 1e6) * p.in + (outTok / 1e6) * p.out).toFixed(6));
}

// ---------------------------------------------------------------------
// PERSISTÊNCIA — modo banco
// ---------------------------------------------------------------------
async function getPool() {
  let pg;
  try {
    pg = await import("pg");
  } catch {
    throw new Error("O pacote 'pg' não está instalado. Rode `npm i pg` para o modo banco.");
  }
  const { Pool } = pg.default || pg;
  return new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 2 });
}

// Seleciona a pauta alvo: a informada, ou a de maior score ainda não gerada.
async function pickQueueRow(client, queueId) {
  if (queueId) {
    const r = await client.query(
      `SELECT q.id AS queue_id, s.* , st.slug AS study_type_slug
         FROM publication_queue q JOIN scientific_studies s ON s.id=q.study_id
         LEFT JOIN study_types st ON st.id=s.study_type_id
        WHERE q.id=$1`,
      [queueId]
    );
    return r.rows[0] || null;
  }
  const r = await client.query(
    `SELECT q.id AS queue_id, s.*, st.slug AS study_type_slug
       FROM publication_queue q JOIN scientific_studies s ON s.id=q.study_id
       LEFT JOIN study_types st ON st.id=s.study_type_id
      WHERE q.state IN ('capturada','priorizada','roteada')
        AND q.article_id IS NULL
      ORDER BY (s.access='gratuito') DESC, q.score DESC NULLS LAST
      LIMIT 1`
  );
  return r.rows[0] || null;
}

// runGenerate(queueId) — gera 1 rascunho e o deixa EM REVISÃO (nunca publica).
export async function runGenerate(queueId) {
  // ---- MODO SECO ----
  if (!process.env.DATABASE_URL) {
    console.log("[dry] DATABASE_URL ausente — modo seco: gerando de um estudo de exemplo.");
    const sample = {
      title: "Low-FODMAP diet reduces symptoms in irritable bowel syndrome: a systematic review",
      journal: "Example Journal of Gastroenterology",
      year: 2025,
      doi: "10.0000/exemplo.5r.2025",
      study_type_slug: "revisao-sistematica",
      access: "gratuito",
      authors: [{ family: "Silva", given: "A." }],
      abstract:
        "A systematic review of randomized trials evaluating the restriction phase of the low-FODMAP diet on gastrointestinal symptoms in adults with IBS.",
    };
    const { article, assessment, usage } = await generateForStudy(sample);
    console.log("\n[dry] NewsArticle (status em_revisao):\n", JSON.stringify(article, null, 2));
    console.log("\n[dry] Avaliação de evidência:\n", JSON.stringify(assessment, null, 2));
    console.log("\n[dry] Uso de IA:", JSON.stringify(usage));
    console.log("\n[dry] Nada publicado. Revisão humana obrigatória antes de publicar.");
    return { mode: "dry", article };
  }

  // ---- MODO BANCO ----
  const pool = await getPool();
  const client = await pool.connect();
  let runId = null;
  try {
    const run = await client.query(
      `INSERT INTO automation_runs (kind, status, triggered_by) VALUES ('generate','running',$1) RETURNING id`,
      [process.env.CRON_SECRET ? "cron" : "manual"]
    );
    runId = run.rows[0].id;

    const study = await pickQueueRow(client, queueId);
    if (!study) {
      await client.query(`UPDATE automation_runs SET status='success', finished_at=now(), message=$2 WHERE id=$1`, [
        runId,
        "Sem pautas elegíveis para geração.",
      ]);
      console.log("Nenhuma pauta elegível. (Se nada atende ao critério, não publicamos conteúdo fraco.)");
      return { mode: "db", generated: 0 };
    }

    // enriquece abstract se faltando (Europe PMC).
    if ((!study.abstract || study.abstract.length < 40) && study.doi) {
      const abs = await fetchAbstract(study.doi).catch(() => null);
      if (abs) study.abstract = abs;
    }

    const { article, assessment, usage } = await generateForStudy(study);

    await client.query("BEGIN");

    // 1. artigo (ainda sem versão publicada).
    const artRes = await client.query(
      `INSERT INTO articles (slug, study_id, doi, category, origin)
       VALUES ($1,$2,$3,$4,'motor')
       ON CONFLICT (slug) DO UPDATE SET updated_at=now()
       RETURNING id`,
      [article.slug, study.id, study.doi || null, article.category]
    );
    const articleId = artRes.rows[0].id;

    // 2. versão 'em_revisao' com o payload completo do NewsArticle.
    const typeRes = await client.query("SELECT id FROM study_types WHERE slug=$1", [study.study_type_slug || "artigo"]);
    const studyTypeId = typeRes.rows[0] ? typeRes.rows[0].id : null;
    const verNum = await nextVersion(client, articleId);
    await client.query(
      `INSERT INTO article_versions
         (article_id, version, status, title, quick_answer, evidence_grade,
          study_type_id, payload, generated_by, ai_run_id)
       VALUES ($1,$2,'em_revisao',$3,$4,$5,$6,$7,$8,$9)`,
      [
        articleId,
        verNum,
        article.title,
        article.quickAnswer,
        assessment.grade,
        studyTypeId,
        JSON.stringify(article),
        usage.model === "fallback" ? "fallback" : "ia",
        runId,
      ]
    );

    // 3. avaliação de evidência (rascunho — assinatura é humana).
    await client.query(
      `INSERT INTO evidence_assessments
         (study_id, r_id, grade, study_type_id, effect_direction, claims_clinical_effect,
          clinical_applicability, certainty, summary, what_it_does_not_prove, limitations,
          sample_size, standard_version, version, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'rascunho')`,
      [
        study.id,
        assessment.r_id,
        assessment.grade,
        studyTypeId,
        assessment.effect_direction,
        assessment.claims_clinical_effect,
        assessment.clinical_applicability,
        assessment.certainty,
        assessment.summary,
        assessment.what_it_does_not_prove,
        assessment.limitations,
        assessment.sample_size,
        assessment.standard_version,
        assessment.version,
      ]
    );

    // 4. relações R do artigo.
    for (const rSlug of article.rTags || []) {
      await client
        .query(
          `INSERT INTO article_r_relations (article_id, r_id)
           SELECT $1, id FROM five_r_categories WHERE slug=$2
           ON CONFLICT DO NOTHING`,
          [articleId, rSlug]
        )
        .catch(() => {});
    }

    // 5. a pauta vai para 'em_revisao' (NUNCA 'publicada' automaticamente).
    await client.query(`UPDATE publication_queue SET state='em_revisao', article_id=$2, updated_at=now() WHERE id=$1`, [
      study.queue_id,
      articleId,
    ]);

    // 6. registra uso de IA (best-effort).
    await client
      .query(
        `INSERT INTO ai_usage (run_id, article_id, provider, model, input_tokens, output_tokens, cost_usd, purpose)
         VALUES ($1,$2,'anthropic',$3,$4,$5,$6,'generate-draft')`,
        [runId, articleId, usage.model, usage.input_tokens, usage.output_tokens, usage.cost_usd]
      )
      .catch(() => {});

    await client.query("COMMIT");
    await client.query(
      `UPDATE automation_runs SET status='success', finished_at=now(), stats=$2 WHERE id=$1`,
      [runId, JSON.stringify({ generated: 1, article_slug: article.slug, grade: assessment.grade })]
    );
    console.log(`Rascunho gerado: "${article.title}" (grau ${assessment.grade}) → EM REVISÃO. Requer aprovação humana.`);
    return { mode: "db", generated: 1, articleId, slug: article.slug };
  } catch (e) {
    await client.query("ROLLBACK").catch(() => {});
    if (runId)
      await client
        .query(`UPDATE automation_runs SET status='failed', finished_at=now(), message=$2 WHERE id=$1`, [runId, e.message])
        .catch(() => {});
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

async function nextVersion(client, articleId) {
  const r = await client.query("SELECT COALESCE(MAX(version),0)+1 AS v FROM article_versions WHERE article_id=$1", [
    articleId,
  ]);
  return r.rows[0].v;
}

// ---------------------------------------------------------------------
// ENTRADA CLI
// ---------------------------------------------------------------------
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const queueId = process.argv[2] || null;
  runGenerate(queueId)
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
