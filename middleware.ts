import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// Protege /admin e /api/admin. /admin/login e /api/admin/login são públicos.
// Sem sessão válida: páginas → redirect para login; APIs → 401.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLogin = pathname === "/admin/login" || pathname === "/api/admin/login";
  if (isLogin) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const ok = await verifyToken(token);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
