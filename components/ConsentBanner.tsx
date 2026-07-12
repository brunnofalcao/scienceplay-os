"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Consentimento de cookies (LGPD). Sem tracking até consentimento explícito.
// A escolha é persistida e lida pelo carregador de analytics.
const KEY = "p5r_consent";

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
      window.dispatchEvent(new CustomEvent("p5r-consent", { detail: value }));
    } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-white/95 backdrop-blur">
      <div className="wrap flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-[13.5px] text-ink/80">
          Usamos cookies para entender o uso do portal e melhorar o conteúdo. Você decide. Veja a{" "}
          <Link href="/legal/cookies" className="text-navy underline">Política de Cookies</Link> e a{" "}
          <Link href="/legal/privacidade" className="text-navy underline">Política de Privacidade</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => decide("denied")} className="btn-ghost text-[13px]">Recusar</button>
          <button onClick={() => decide("granted")} className="btn-navy text-[13px]">Aceitar</button>
        </div>
      </div>
    </div>
  );
}
