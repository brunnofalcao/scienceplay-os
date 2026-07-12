"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { CERT } from "@/content/certification";

// Captura de interesse na certificação. Se houver checkout oficial configurado
// (CERT_CHECKOUT_URL público), o botão redireciona; caso contrário, registra o
// lead (sem armazenar dados sensíveis desnecessários) e confirma o cadastro.
const CHECKOUT = process.env.NEXT_PUBLIC_CERT_CHECKOUT_URL || "";

const PROFISSOES = CERT.eligible;

export function CertInterestForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    track("FormSubmit", { form: "certification_interest", profissao: data.profissao });
    try {
      const res = await fetch("/api/certification/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "certificacao", utm: window.location.search }),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
      track("NewsletterSignup", { list: "certification_interest" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function goCheckout() {
    track("InitiateCheckout", { product: "certificacao-5r" });
    window.location.href = CHECKOUT;
  }

  if (CHECKOUT) {
    return (
      <button onClick={goCheckout} className="btn-primary w-full text-[16px]">
        Fazer a inscrição
      </button>
    );
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-[#1F5C3D]/25 bg-[#1F5C3D]/5 p-5 text-[15px] text-[#1F5C3D]">
        <p className="font-serif text-[18px]">Interesse registrado.</p>
        <p className="mt-1 text-ink/80">
          Avisaremos você assim que as inscrições da próxima turma abrirem, com o conteúdo completo e o
          investimento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="nome" required placeholder="Seu nome" className="rounded-lg border border-line bg-white px-4 py-3 text-[15px] outline-none focus:border-navy" />
        <input name="email" type="email" required placeholder="Seu e-mail" className="rounded-lg border border-line bg-white px-4 py-3 text-[15px] outline-none focus:border-navy" />
      </div>
      <select name="profissao" required defaultValue="" className="w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] outline-none focus:border-navy">
        <option value="" disabled>Sua profissão</option>
        {PROFISSOES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <label className="flex items-start gap-2 text-[12.5px] text-mist/80">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          Autorizo o contato sobre a Certificação Profissional 5R e li a{" "}
          <a href="/legal/privacidade" className="underline hover:text-white">Política de Privacidade</a> (LGPD).
        </span>
      </label>
      {error && <p className="text-[13px] text-[#ffb4a8]">Não foi possível registrar agora. Tente novamente.</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full text-[16px] disabled:opacity-60">
        {loading ? "Enviando..." : "Quero saber quando abrir"}
      </button>
    </form>
  );
}
