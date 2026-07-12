import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { query, hasDatabase } from "@/lib/persist";

// Salva a classificação editada de um verbete. O banco é a fonte de verdade
// quando configurado; versionamento é feito no schema (entity + revisão).
export async function POST(req: Request) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyToken(token))) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.slug) return NextResponse.json({ ok: false, error: "slug ausente" }, { status: 400 });

  if (!hasDatabase()) {
    // Sem banco: não simula persistência. A seed permanece a fonte de verdade.
    return NextResponse.json({ ok: true, persisted: false });
  }

  const rows = await query(
    `UPDATE entities SET
       resumo = $2, r_principal = $3, evidence_grade = $4, confidence = $5,
       classification_rationale = $6, synonyms = $7, status = $8, updated_at = now()
     WHERE slug = $1 RETURNING id`,
    [
      body.slug,
      body.short || "",
      body.rPrimary || null,
      body.evidence || "C",
      body.confidence || "moderada",
      body.classificationRationale || "",
      body.synonyms || [],
      body.status || "publicado",
    ]
  );
  return NextResponse.json({ ok: true, persisted: !!rows });
}
