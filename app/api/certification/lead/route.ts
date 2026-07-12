import { NextResponse } from "next/server";
import { insert } from "@/lib/persist";

// Captura de lead de interesse na certificação. Armazena apenas o necessário
// (nome, e-mail, profissão, origem/UTM). Consentimento é coletado no formulário.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nome = String(body.nome || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 160);
    const profissao = String(body.profissao || "").trim().slice(0, 80);
    if (!nome || !email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
    }
    await insert("certification_leads", {
      nome,
      email,
      profissao,
      source: String(body.source || "").slice(0, 60),
      utm: String(body.utm || "").slice(0, 300),
      created_at: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Erro ao registrar" }, { status: 400 });
  }
}
