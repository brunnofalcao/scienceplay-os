import { query, hasDatabase } from "./persist";
import { GLOSSARY } from "@/content/glossary";
import { NEWS, newsOfTheDay } from "@/content/news";
import { FIVE_RS } from "@/lib/five-rs";

// Camada de dados do ADMIN. Usa o banco quando DATABASE_URL está configurado;
// caso contrário, deriva métricas e listas da seed versionada em /content
// (modo demonstração). `source` indica a origem para a UI ser transparente.

export type DataSource = "banco" | "seed";

export function dataSource(): DataSource {
  return hasDatabase() ? "banco" : "seed";
}

export interface DashboardMetrics {
  source: DataSource;
  publishedToday: { title: string; slug: string } | null;
  nextInQueue: number;
  pending: number;
  duplicateCandidates: number;
  integrationErrors: number;
  aiCostMonth: number;
  volumeByR: { r: string; name: string; color: string; count: number }[];
  glossaryTerms: number;
  unansweredSearches: number;
  topSearches: { query: string; n: number }[];
  certificationClicks: number;
  leads: number;
  cronHealth: { name: string; status: string; last: string | null }[];
}

async function scalar(sql: string): Promise<number> {
  const rows = await query<{ n: string }>(sql);
  if (!rows || !rows[0]) return 0;
  return Number(rows[0].n) || 0;
}

export async function getDashboard(): Promise<DashboardMetrics> {
  const source = dataSource();

  // Volume por R (seed: conta termos do glossário por R principal/secundário).
  const volumeByR = FIVE_RS.map((r) => ({
    r: r.key,
    name: r.name,
    color: r.color,
    count: GLOSSARY.filter((e) => e.rPrimary === r.key || e.rSecondary.some((s) => s.r === r.key)).length,
  }));

  if (source === "seed") {
    const today = newsOfTheDay();
    return {
      source,
      publishedToday: today ? { title: today.headline, slug: today.slug } : null,
      nextInQueue: 0,
      pending: 0,
      duplicateCandidates: 0,
      integrationErrors: 0,
      aiCostMonth: 0,
      volumeByR,
      glossaryTerms: GLOSSARY.length,
      unansweredSearches: 0,
      topSearches: [],
      certificationClicks: 0,
      leads: 0,
      cronHealth: [
        { name: "captura (ingestão)", status: "não configurado", last: null },
        { name: "geração (rascunho)", status: "não configurado", last: null },
      ],
    };
  }

  // Modo banco: consultas reais (tolerantes a tabelas vazias).
  const [pending, nextQ, dupes, errs, unanswered, leads, terms] = await Promise.all([
    scalar("SELECT count(*) n FROM publication_queue WHERE estado IN ('capturada','priorizada','roteada','em_revisao')"),
    scalar("SELECT count(*) n FROM publication_queue WHERE estado='em_revisao'"),
    scalar("SELECT count(*) n FROM duplicate_candidates"),
    scalar("SELECT count(*) n FROM error_logs WHERE created_at > now() - interval '7 days'"),
    scalar("SELECT count(*) n FROM unanswered_searches"),
    scalar("SELECT count(*) n FROM certification_leads"),
    scalar("SELECT count(*) n FROM entities"),
  ]);
  const top = (await query<{ query: string; n: string }>(
    "SELECT query, count(*) n FROM searches GROUP BY query ORDER BY n DESC LIMIT 8"
  )) || [];
  const cost = await query<{ total: string }>(
    "SELECT COALESCE(sum(cost_usd),0) total FROM ai_usage WHERE created_at > date_trunc('month', now())"
  );

  return {
    source,
    publishedToday: null,
    nextInQueue: nextQ,
    pending,
    duplicateCandidates: dupes,
    integrationErrors: errs,
    aiCostMonth: cost && cost[0] ? Number(cost[0].total) : 0,
    volumeByR,
    glossaryTerms: terms || GLOSSARY.length,
    unansweredSearches: unanswered,
    topSearches: top.map((t) => ({ query: t.query, n: Number(t.n) })),
    certificationClicks: 0,
    leads,
    cronHealth: [
      { name: "captura (ingestão)", status: "aguardando execução", last: null },
      { name: "geração (rascunho)", status: "aguardando execução", last: null },
    ],
  };
}

// ---- Notícias / fila editorial ----
export interface QueueItem {
  slug: string;
  title: string;
  status: string;
  evidence: string;
  rTags: string[];
  publishedAt: string;
  reviewer: string;
  source: DataSource;
}

export async function getNewsQueue(): Promise<QueueItem[]> {
  if (dataSource() === "banco") {
    const rows = await query<any>(
      `SELECT a.slug, a.title, av.status, a.evidence_grade, a.published_at
       FROM articles a LEFT JOIN article_versions av ON av.article_id = a.id
       ORDER BY a.created_at DESC LIMIT 100`
    );
    if (rows && rows.length) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        status: r.status || "publicado",
        evidence: r.evidence_grade || "C",
        rTags: [],
        publishedAt: r.published_at || "",
        reviewer: "—",
        source: "banco" as const,
      }));
    }
  }
  // seed: notícias publicadas (demonstração)
  return NEWS.map((n) => ({
    slug: n.slug,
    title: n.headline,
    status: "publicado",
    evidence: n.evidence,
    rTags: n.rTags,
    publishedAt: n.publishedAt,
    reviewer: n.author,
    source: "seed" as const,
  }));
}

// ---- Termos sem resposta (fila do glossário) ----
export async function getUnansweredSearches(): Promise<{ query: string; n: number; last: string | null }[]> {
  if (dataSource() === "banco") {
    const rows = await query<{ query: string; n: string; last: string }>(
      "SELECT query, count(*) n, max(created_at) last FROM unanswered_searches GROUP BY query ORDER BY n DESC LIMIT 50"
    );
    if (rows) return rows.map((r) => ({ query: r.query, n: Number(r.n), last: r.last }));
  }
  return [];
}

// ---- Leads da certificação ----
export async function getLeads(): Promise<{ nome: string; email: string; profissao: string; created_at: string }[]> {
  if (dataSource() === "banco") {
    const rows = await query<any>(
      "SELECT nome, email, profissao, created_at FROM certification_leads ORDER BY created_at DESC LIMIT 100"
    );
    if (rows) return rows;
  }
  return [];
}
