"use client";

import { useState } from "react";
import type { GlossaryEntry } from "@/lib/glossary-types";
import { FIVE_RS } from "@/lib/five-rs";

// Editor de verbete. Persiste via /api/admin/glossary quando há banco; caso
// contrário, informa que a persistência exige DATABASE_URL (nada de fake save).
const R_OPTIONS = FIVE_RS.map((r) => ({ value: r.key, label: r.name }));
const GRADES = ["A", "B", "C", "D"];
const CONFIDENCES = ["alta", "moderada", "baixa", "insuficiente"];

export function GlossaryEditForm({ entry }: { entry: GlossaryEntry }) {
  const [form, setForm] = useState({
    rPrimary: entry.rPrimary,
    evidence: entry.evidence,
    confidence: entry.confidence,
    classificationRationale: entry.classificationRationale,
    short: entry.short,
    status: entry.status,
    synonyms: entry.synonyms.join(", "),
  });
  const [state, setState] = useState<"idle" | "saving" | "saved" | "nodb" | "error">("idle");

  function up<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save() {
    setState("saving");
    try {
      const res = await fetch("/api/admin/glossary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: entry.slug, ...form, synonyms: form.synonyms.split(",").map((s) => s.trim()).filter(Boolean) }),
      });
      const data = await res.json();
      if (data.persisted) setState("saved");
      else setState("nodb");
    } catch {
      setState("error");
    }
  }

  const field = "w-full rounded-lg border border-line bg-white px-3 py-2 text-[14px] outline-none focus:border-navy";

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <label className="mb-1 block text-[12px] font-medium text-muted">Resposta rápida</label>
        <textarea className={field} rows={2} value={form.short} onChange={(e) => up("short", e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-muted">R principal</label>
          <select className={field} value={form.rPrimary} onChange={(e) => up("rPrimary", e.target.value)}>
            <option value="">— insuficiente —</option>
            {R_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[12px] font-medium text-muted">Status editorial</label>
          <select className={field} value={form.status} onChange={(e) => up("status", e.target.value as any)}>
            <option value="publicado">Publicado</option>
            <option value="em-revisao">Em revisão</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[12px] font-medium text-muted">Nível de evidência</label>
          <select className={field} value={form.evidence} onChange={(e) => up("evidence", e.target.value as any)}>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[12px] font-medium text-muted">Confiança da classificação</label>
          <select className={field} value={form.confidence} onChange={(e) => up("confidence", e.target.value as any)}>
            {CONFIDENCES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-[12px] font-medium text-muted">Sinônimos (separados por vírgula)</label>
        <input className={field} value={form.synonyms} onChange={(e) => up("synonyms", e.target.value)} />
      </div>

      <div>
        <label className="mb-1 block text-[12px] font-medium text-muted">Justificativa da classificação</label>
        <textarea className={field} rows={3} value={form.classificationRationale} onChange={(e) => up("classificationRationale", e.target.value)} />
      </div>

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={state === "saving"} className="btn-navy disabled:opacity-60">
          {state === "saving" ? "Salvando..." : "Salvar alterações"}
        </button>
        {state === "saved" && <span className="text-[13px] text-[#1F5C3D]">Salvo no banco.</span>}
        {state === "nodb" && <span className="text-[13px] text-amber5r">Sem banco configurado — alteração não persistida. Configure DATABASE_URL.</span>}
        {state === "error" && <span className="text-[13px] text-[#9A3B2E]">Erro ao salvar.</span>}
      </div>
    </div>
  );
}
