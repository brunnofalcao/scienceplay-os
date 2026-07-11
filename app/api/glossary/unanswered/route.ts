import { NextResponse } from "next/server";
import { insert } from "@/lib/persist";

// Fila de "termos sem resposta" (Briefing §11.3): buscas recorrentes viram
// candidatos a novos verbetes no ADMIN. Não armazena dados pessoais.
export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const q = String(query || "").trim().slice(0, 120);
    if (!q) return NextResponse.json({ ok: false }, { status: 400 });
    await insert("unanswered_searches", { query: q, created_at: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
