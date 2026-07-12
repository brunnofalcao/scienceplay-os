"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Ações editoriais sobre uma notícia/pauta. Em modo seed (sem banco), as ações
// ficam desabilitadas com explicação — nada de botão morto.
export function NewsActions({ slug, status, source }: { slug: string; status: string; source: "banco" | "seed" }) {
  const router = useRouter();
  const [busy, setBusy] = useState("");

  async function act(action: string) {
    setBusy(action);
    try {
      await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action }),
      });
      router.refresh();
    } finally {
      setBusy("");
    }
  }

  if (source === "seed") {
    return <span className="text-[12px] text-muted">requer banco</span>;
  }

  const btn = "rounded-md border border-line px-2.5 py-1 text-[12px] font-medium hover:bg-mist disabled:opacity-50";
  return (
    <div className="flex flex-wrap gap-1.5">
      {status === "em_revisao" && (
        <>
          <button disabled={!!busy} onClick={() => act("aprovar")} className={btn}>Aprovar</button>
          <button disabled={!!busy} onClick={() => act("rejeitar")} className={btn}>Rejeitar</button>
        </>
      )}
      {status === "aprovado" && (
        <button disabled={!!busy} onClick={() => act("publicar")} className={btn}>Publicar</button>
      )}
      {status === "publicado" && (
        <button disabled={!!busy} onClick={() => act("despublicar")} className={btn}>Despublicar</button>
      )}
    </div>
  );
}
