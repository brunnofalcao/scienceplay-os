import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, createSession, adminConfigured } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "ADMIN não configurado. Defina ADMIN_PASSWORD no ambiente." },
      { status: 503 }
    );
  }
  let password = "";
  let next = "/admin";
  try {
    const body = await req.json();
    password = String(body.password || "");
    if (typeof body.next === "string" && body.next.startsWith("/admin")) next = body.next;
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida" }, { status: 400 });
  }

  if (!(await checkPassword(password))) {
    return NextResponse.json({ ok: false, error: "Senha incorreta" }, { status: 401 });
  }

  const token = await createSession();
  if (!token) return NextResponse.json({ ok: false, error: "Falha ao criar sessão" }, { status: 500 });

  const res = NextResponse.json({ ok: true, next });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
