import { GLOSSARY } from "@/content/glossary";
import type { GlossaryEntry } from "./glossary-types";

// Busca híbrida do Glossário 5R: normalização sem acento + correspondência
// exata/prefixo/sinônimo + similaridade (fuzzy) por distância de edição.
// A base estruturada é a fonte de verdade; a "IA" (camada futura) apenas
// interpreta a intenção. Aqui a busca é determinística e rastreável.

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove marcas de acento combinantes (U+0300–U+036F)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export interface SearchHit {
  entry: GlossaryEntry;
  score: number;
  matchedOn: string;
}

// Índice pré-computado de termos pesquisáveis (nome + sinônimos).
const INDEX = GLOSSARY.map((e) => ({
  entry: e,
  keys: [e.name, ...e.synonyms].map(normalize),
}));

export function searchGlossary(query: string, limit = 12): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];
  const hits: SearchHit[] = [];

  for (const { entry, keys } of INDEX) {
    let best = 0;
    let matchedOn = "";
    for (const key of keys) {
      let score = 0;
      if (key === q) score = 100;
      else if (key.startsWith(q)) score = 85;
      else if (key.includes(q)) score = 70;
      else if (q.includes(key) && key.length > 3) score = 65;
      else {
        // fuzzy: tolera erros de digitação em consultas curtas
        const dist = levenshtein(q, key);
        const maxLen = Math.max(q.length, key.length);
        const sim = 1 - dist / maxLen;
        if (sim >= 0.7) score = Math.round(sim * 60);
      }
      // bônus por palavra individual dentro de termos compostos
      if (!score) {
        const words = key.split(" ");
        if (words.some((w) => w.startsWith(q) && q.length >= 3)) score = 55;
      }
      if (score > best) {
        best = score;
        matchedOn = key;
      }
    }
    // desempate leve por popularidade editorial (NÃO por força de evidência)
    if (best > 0) {
      best += Math.min(4, (entry.popularity || 0) / 25);
      hits.push({ entry, score: best, matchedOn });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function autocomplete(query: string, limit = 6): GlossaryEntry[] {
  return searchGlossary(query, limit).map((h) => h.entry);
}

export function getEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((e) => e.slug === slug);
}

export function entriesByR(rSlug: string): GlossaryEntry[] {
  return GLOSSARY.filter(
    (e) => e.rPrimary === rSlug || e.rSecondary.some((s) => s.r === rSlug)
  );
}

export function popularTerms(limit = 12): GlossaryEntry[] {
  return [...GLOSSARY].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, limit);
}
