"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Registra buscas sem resultado. Dispara evento analítico e envia (best-effort)
// para a fila de "termos sem resposta" (unanswered_searches) — que o ADMIN usa
// para transformar buscas recorrentes em novos verbetes (Briefing §11.3).
export function NoResultLogger({ query }: { query: string }) {
  useEffect(() => {
    track("NoGlossaryResult", { query });
    try {
      fetch("/api/glossary/unanswered", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }, [query]);
  return null;
}
