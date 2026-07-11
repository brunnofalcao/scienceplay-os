// =====================================================================
// engine/dedup.mjs — Utilitários de deduplicação de estudos.
//
// Funções PURAS (sem I/O de banco): recebem itens/registros e devolvem
// candidatos a duplicata. Quem persiste em `duplicate_candidates` é o
// chamador (capture.mjs), passando os pares que estas funções retornam.
//
// Camadas de detecção, da mais forte à mais fraca:
//   1. DOI idêntico          (match_method 'doi',          similarity 1.0)
//   2. PMID idêntico         (match_method 'pmid',         similarity 1.0)
//   3. Título normalizado    (match_method 'title',        similarity 1.0)
//   4. Autores+ano iguais    (match_method 'authors_year', similarity ~0.9)
//   5. Similaridade Jaccard  (match_method 'jaccard',      0..1 por tokens)
// =====================================================================

// ---- Normalização de texto (sem acento, sem pontuação, minúsculo) ----
export function normalizeText(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ") // remove pontuação
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeDoi(doi) {
  if (!doi) return null;
  return String(doi).toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "").trim();
}

// ---- Tokenização + Jaccard (similaridade "semântica" simples) ----
// stopwords mínimas (inglês) — o suficiente para não inflar o Jaccard.
const STOP = new Set(
  "a an and are as at be by for from in into is of on or the to with we our this that study trial effect patients".split(
    " "
  )
);

export function tokenize(s) {
  return new Set(
    normalizeText(s)
      .split(" ")
      .filter((t) => t.length > 2 && !STOP.has(t))
  );
}

// Índice de Jaccard entre dois conjuntos de tokens: |A∩B| / |A∪B| (0..1).
export function jaccard(aSet, bSet) {
  if (!aSet.size || !bSet.size) return 0;
  let inter = 0;
  for (const t of aSet) if (bSet.has(t)) inter++;
  const union = aSet.size + bSet.size - inter;
  return union === 0 ? 0 : inter / union;
}

// Similaridade de título por Jaccard de tokens (conveniência).
export function titleSimilarity(a, b) {
  return jaccard(tokenize(a), tokenize(b));
}

// ---- Chave de autores+ano (primeiro sobrenome + ano) ----
export function authorsYearKey(item) {
  const y = item.year || item.ano || null;
  let first = "";
  const authors = item.authors || item.autores || [];
  if (Array.isArray(authors) && authors.length) {
    const a0 = authors[0];
    first = normalizeText(typeof a0 === "string" ? a0 : a0.family || a0.last || "");
  }
  if (!y || !first) return null;
  return `${first}|${y}`;
}

// ---------------------------------------------------------------------
// findDuplicatesInBatch(items, threshold)
//   Compara itens de UMA rodada entre si. Retorna lista de candidatos:
//   { study, duplicateOf, match_method, similarity }
//   (study/duplicateOf são os próprios itens; o chamador mapeia p/ IDs.)
// ---------------------------------------------------------------------
export function findDuplicatesInBatch(items, threshold = 0.85) {
  const candidates = [];
  const byDoi = new Map();
  const byPmid = new Map();
  const byTitle = new Map();
  const byAuthorYear = new Map();
  const tokenCache = [];

  items.forEach((item, i) => {
    const doi = normalizeDoi(item.doi);
    const pmid = item.pmid ? String(item.pmid) : null;
    const titleNorm = normalizeText(item.title || item.titulo);
    const ayKey = authorsYearKey(item);
    tokenCache[i] = tokenize(item.title || item.titulo);

    // 1. DOI
    if (doi) {
      if (byDoi.has(doi))
        candidates.push({ study: item, duplicateOf: byDoi.get(doi), match_method: "doi", similarity: 1.0 });
      else byDoi.set(doi, item);
    }
    // 2. PMID
    if (pmid) {
      if (byPmid.has(pmid))
        candidates.push({ study: item, duplicateOf: byPmid.get(pmid), match_method: "pmid", similarity: 1.0 });
      else byPmid.set(pmid, item);
    }
    // 3. Título normalizado idêntico
    if (titleNorm) {
      if (byTitle.has(titleNorm))
        candidates.push({ study: item, duplicateOf: byTitle.get(titleNorm), match_method: "title", similarity: 1.0 });
      else byTitle.set(titleNorm, item);
    }
    // 4. Autores + ano
    if (ayKey) {
      if (byAuthorYear.has(ayKey))
        candidates.push({
          study: item,
          duplicateOf: byAuthorYear.get(ayKey),
          match_method: "authors_year",
          similarity: 0.9,
        });
      else byAuthorYear.set(ayKey, item);
    }
  });

  // 5. Jaccard entre pares (só quando ainda não pegou por chave exata).
  const already = new Set(candidates.map((c) => `${idOf(c.study)}|${idOf(c.duplicateOf)}`));
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const key = `${idOf(items[j])}|${idOf(items[i])}`;
      if (already.has(key)) continue;
      const sim = jaccard(tokenCache[i], tokenCache[j]);
      if (sim >= threshold) {
        candidates.push({
          study: items[j],
          duplicateOf: items[i],
          match_method: "jaccard",
          similarity: Number(sim.toFixed(4)),
        });
      }
    }
  }
  return candidates;
}

// identificador estável de um item para deduplicar candidatos (DOI ou título).
function idOf(item) {
  return normalizeDoi(item.doi) || normalizeText(item.title || item.titulo) || JSON.stringify(item).slice(0, 40);
}

// ---------------------------------------------------------------------
// isLikelyDuplicate(a, b, threshold)
//   Compara DOIS estudos (ex.: um novo vs. um vindo do banco) e devolve
//   o melhor candidato encontrado, ou null.
// ---------------------------------------------------------------------
export function isLikelyDuplicate(a, b, threshold = 0.85) {
  const da = normalizeDoi(a.doi);
  const db = normalizeDoi(b.doi);
  if (da && db && da === db) return { match_method: "doi", similarity: 1.0 };

  const pa = a.pmid ? String(a.pmid) : null;
  const pb = b.pmid ? String(b.pmid) : null;
  if (pa && pb && pa === pb) return { match_method: "pmid", similarity: 1.0 };

  const ta = normalizeText(a.title || a.titulo);
  const tb = normalizeText(b.title || b.titulo);
  if (ta && tb && ta === tb) return { match_method: "title", similarity: 1.0 };

  const ka = authorsYearKey(a);
  const kb = authorsYearKey(b);
  if (ka && kb && ka === kb) return { match_method: "authors_year", similarity: 0.9 };

  const sim = jaccard(tokenize(a.title || a.titulo), tokenize(b.title || b.titulo));
  if (sim >= threshold) return { match_method: "jaccard", similarity: Number(sim.toFixed(4)) };

  return null;
}
