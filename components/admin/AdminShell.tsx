"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/noticias", label: "Notícias" },
  { href: "/admin/glossario", label: "Glossário" },
  { href: "/admin/taxonomia", label: "Taxonomia" },
  { href: "/admin/certificacao", label: "Certificação" },
  { href: "/admin/branded", label: "Branded Pages" },
];

export function AdminShell({ children, badge }: { children: React.ReactNode; badge: "banco" | "seed" }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-white">
        <div className="border-b border-line p-4">
          <Link href="/admin"><Logo /></Link>
          <span className="mt-2 inline-block rounded bg-mist px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-navy">
            Painel editorial
          </span>
        </div>
        <nav className="flex-1 p-3">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`mb-1 block rounded-lg px-3 py-2 text-[14px] font-medium ${
                  active ? "bg-navy text-white" : "text-ink/80 hover:bg-mist"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-3">
          <div className="mb-2 flex items-center gap-2 px-1">
            <span className={`h-2 w-2 rounded-full ${badge === "banco" ? "bg-[#1F5C3D]" : "bg-amber5r"}`} />
            <span className="text-[12px] text-muted">
              Fonte: {badge === "banco" ? "banco de dados" : "seed (demo)"}
            </span>
          </div>
          <Link href="/" className="block rounded px-1 py-1 text-[12.5px] text-navy hover:underline">
            ← Ver o portal
          </Link>
          <button onClick={logout} className="mt-1 block w-full rounded px-1 py-1 text-left text-[12.5px] text-[#9A3B2E] hover:underline">
            Sair
          </button>
        </div>
      </aside>
      <div className="flex-1 overflow-x-auto">{children}</div>
    </div>
  );
}

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-line bg-white px-8 py-6">
      <h1 className="font-serif text-[26px] text-navy-deep">{title}</h1>
      {subtitle && <p className="mt-1 text-[14px] text-muted">{subtitle}</p>}
    </header>
  );
}
