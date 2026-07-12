"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { autocomplete } from "@/lib/search";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import type { GlossaryEntry } from "@/lib/glossary-types";
import { track } from "@/lib/analytics";

// Campo central de busca do Glossário 5R: autocomplete instantâneo (base
// estruturada), histórico local respeitando privacidade, e navegação para a
// página do termo. Dispara eventos GlossarySearch / (No)GlossaryResult.

const HISTORY_KEY = "p5r_glossary_history";

export function GlossarySearch({
  size = "lg",
  initial = "",
  autoFocus = false,
}: {
  size?: "lg" | "md";
  initial?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<GlossaryEntry[]>([]);
  const [active, setActive] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw).slice(0, 5));
    } catch {}
  }, []);

  // Autocomplete local (base estruturada) — sem disparar eventos por tecla.
  // Os eventos analíticos são emitidos apenas em uma busca real (ver go()).
  useEffect(() => {
    const t = setTimeout(() => {
      setResults(q.trim().length >= 2 ? autocomplete(q, 6) : []);
    }, 150);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function pushHistory(term: string) {
    try {
      const next = [term, ...history.filter((h) => h !== term)].slice(0, 5);
      setHistory(next);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {}
  }

  function go(term: string) {
    const t = term.trim();
    if (!t) return;
    pushHistory(t);
    // Evento de busca real (não por tecla): alimenta "termos mais pesquisados".
    track("GlossarySearch", { query: t });
    router.push(`/glossario?q=${encodeURIComponent(t)}`);
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Enter") {
      if (active >= 0 && results[active]) router.push(`/glossario/${results[active].slug}`);
      else go(q);
    }
  }

  const big = size === "lg";

  return (
    <div ref={boxRef} className="relative w-full">
      <div
        className={`flex items-center gap-2 rounded-xl border border-line bg-white shadow-sm focus-within:border-navy ${
          big ? "px-4 py-3.5" : "px-3 py-2.5"
        }`}
      >
        <svg className="shrink-0 text-muted" width={big ? 22 : 18} height={big ? 22 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          autoFocus={autoFocus}
          placeholder={big ? "Pesquise um alimento, sintoma, suplemento, bactéria…" : "Pesquisar no glossário…"}
          aria-label="Pesquisar no Glossário 5R"
          className={`w-full bg-transparent outline-none placeholder:text-muted ${big ? "text-[16px]" : "text-[14px]"}`}
        />
        <button onClick={() => go(q)} className={`btn-navy shrink-0 ${big ? "" : "px-3 py-1.5 text-[13px]"}`}>
          Buscar
        </button>
      </div>

      {open && (results.length > 0 || (q.length < 2 && history.length > 0)) && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-xl border border-line bg-white shadow-lg">
          {q.length < 2 && history.length > 0 && (
            <div className="p-2">
              <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">Buscas recentes</p>
              {history.map((h) => (
                <button key={h} onClick={() => go(h)} className="block w-full rounded px-2 py-1.5 text-left text-[14px] hover:bg-mist">
                  {h}
                </button>
              ))}
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={r.slug}
              onMouseEnter={() => setActive(i)}
              onClick={() => router.push(`/glossario/${r.slug}`)}
              className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left ${
                active === i ? "bg-mist" : "hover:bg-mist/60"
              }`}
            >
              <span className="text-[14.5px] font-medium text-ink">{r.name}</span>
              <span className="tag">{ENTITY_TYPE_LABEL[r.type]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
