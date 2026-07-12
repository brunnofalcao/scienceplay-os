import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { query, hasDatabase } from "@/lib/persist";

// Ações editoriais sobre notícias. Reforça a autorização server-side (além do
// middleware). Publicar/despublicar/aprovar/rejeitar atualizam o estado no banco.
const STATE: Record<string, string> = {
  aprovar: "aprovado",
  rejeitar: "descartada",
  publicar: "publicado",
  despublicar: "despublicado",
};

export async function POST(req: Request) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyToken(token))) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }

  const { slug, action } = await req.json().catch(() => ({}));
  const next = STATE[action];
  if (!slug || !next) return NextResponse.json({ ok: false, error: "Ação inválida" }, { status: 400 });

  if (!hasDatabase()) {
    return NextResponse.json({ ok: true, persisted: false, note: "Sem banco: ação não persistida." });
  }

  const rows = await query(
    `UPDATE article_versions av SET status=$1, updated_at=now()
     FROM articles a WHERE av.article_id = a.id AND a.slug=$2 RETURNING av.id`,
    [next, slug]
  );
  return NextResponse.json({ ok: true, persisted: !!rows, status: next });
}
