"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { NAV_PRIMARY } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Página inicial do Protocolo 5R" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {NAV_PRIMARY.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${
                  active ? "text-navy" : "text-ink/80 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link href="/certificacao" className="btn-primary text-[14px]">
            Conheça a certificação
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-navy"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="wrap flex flex-col py-3" aria-label="Navegação móvel">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 text-[15px] font-medium text-ink hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/certificacao" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Conheça a certificação
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
