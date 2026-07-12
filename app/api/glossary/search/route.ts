import { NextResponse } from "next/server";
import { searchGlossary } from "@/lib/search";
import { insert } from "@/lib/persist";

// Endpoint de busca do Glossário 5R (para integrações/admin). A busca é
// determinística sobre a base estruturada. Registra a consulta (best-effort).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ query: q, count: 0, results: [] });

  const hits = searchGlossary(q, 20);
  // registro de busca (sem dado pessoal) para o painel editorial
  insert("searches", { query: q, results: hits.length, created_at: new Date().toISOString() }).catch(() => {});
  if (hits.length === 0) {
    insert("unanswered_searches", { query: q, created_at: new Date().toISOString() }).catch(() => {});
  }

  return NextResponse.json({
    query: q,
    count: hits.length,
    results: hits.map((h) => ({
      slug: h.entry.slug,
      name: h.entry.name,
      type: h.entry.type,
      rPrimary: h.entry.rPrimary || null,
      evidence: h.entry.evidence,
      confidence: h.entry.confidence,
      short: h.entry.short,
      score: h.score,
    })),
  });
}
