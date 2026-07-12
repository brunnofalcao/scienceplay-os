import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminConfigured } from "@/lib/admin-auth";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Entrar — Painel editorial",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const configured = adminConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo onDark variant="stacked" />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white p-7">
          <h1 className="font-serif text-[22px] text-navy-deep">Painel editorial</h1>
          <p className="mt-1 text-[13.5px] text-muted">Acesso restrito à equipe do Protocolo 5R.</p>
          {configured ? (
            <div className="mt-5">
              <LoginForm next={next || "/admin"} />
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-amber5r/30 bg-amber5r/5 p-4 text-[13.5px] text-ink/80">
              <p className="font-medium text-navy-deep">ADMIN não configurado</p>
              <p className="mt-1">
                Defina a variável <code className="font-mono text-[12px]">ADMIN_PASSWORD</code> no ambiente
                seguro para habilitar o acesso. Por segurança, o painel permanece bloqueado até lá.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
