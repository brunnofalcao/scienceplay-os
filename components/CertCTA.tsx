"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

// CTA contextual da certificação. Sem urgência ou escassez falsas.
// Variação de intenção conforme o contexto (Briefing §13).
const INTENTS: Record<string, { title: string; body: string; cta: string }> = {
  default: {
    title: "Aprenda a aplicar o Protocolo 5R na prática clínica",
    body: "A Certificação Profissional 5R é a formação da Science Play para profissionais de saúde que querem transformar evidência em conduta.",
    cta: "Conheça a certificação",
  },
  method: {
    title: "Do conteúdo à conduta",
    body: "Para profissionais de saúde: a Certificação Profissional 5R organiza o método em conduta clínica aplicável, das red flags à manutenção.",
    cta: "Veja a formação completa",
  },
  news: {
    title: "É profissional de saúde?",
    body: "Aprofunde a leitura de evidências e aplique o método com segurança na Certificação Profissional 5R.",
    cta: "Conheça a certificação",
  },
  glossary: {
    title: "Leve o método para o consultório",
    body: "Este glossário é educacional. A aplicação clínica estruturada é o que a Certificação Profissional 5R ensina.",
    cta: "Torne-se um Profissional Certificado 5R",
  },
};

export function CertCTA({ intent = "default", context = "" }: { intent?: keyof typeof INTENTS; context?: string }) {
  const c = INTENTS[intent] || INTENTS.default;
  return (
    <aside className="my-10 overflow-hidden rounded-2xl border border-navy/15 bg-navy-deep text-white">
      <div className="grid gap-6 p-8 md:grid-cols-[1.6fr_1fr] md:items-center">
        <div>
          <span className="kicker">Para profissionais de saúde</span>
          <h3 className="mt-2 font-serif text-[24px] text-white">{c.title}</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mist/85">{c.body}</p>
        </div>
        <div className="flex md:justify-end">
          <Link
            href="/certificacao"
            className="btn-primary"
            onClick={() => track("ClickCertificationCTA", { intent, context })}
          >
            {c.cta}
          </Link>
        </div>
      </div>
    </aside>
  );
}
