import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertInterestForm } from "@/components/CertInterestForm";
import { CertView } from "@/components/CertView";
import { JsonLd } from "@/components/JsonLd";
import { RScale } from "@/components/RScale";
import {
  CERT,
  CORE_MODULES,
  MED_MODULES,
  BONUS_MODULES,
  SCOPE_LIMITS,
  CERT_FAQS,
} from "@/content/certification";
import { pageMetadata, courseLd, faqLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Certificação Profissional 5R",
  description:
    "A Certificação Profissional 5R da Science Play forma profissionais de saúde para aplicar o Protocolo 5R com segurança clínica — do intestino ao eixo intestino-cérebro. Conheça a ementa.",
  path: "/certificacao",
});

export default function Page() {
  const ld = [
    courseLd({
      name: `${CERT.name} — ${CERT.subtitle}`,
      description:
        "Formação para profissionais de saúde no Protocolo 5R: saúde intestinal e eixo intestino-cérebro, das red flags à manutenção, com conduta clínica aplicável.",
      path: "/certificacao",
    }),
    faqLd(CERT_FAQS),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <CertView />

      {/* HERO */}
      <section className="border-b border-line bg-navy-deep text-white">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <span className="kicker">Certificação Science Play</span>
            <h1 className="mt-3 font-serif text-[42px] font-normal leading-[1.05] text-white">
              {CERT.name}
            </h1>
            <p className="mt-2 font-mono text-[13px] uppercase tracking-wide text-mist/70">{CERT.subtitle}</p>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-mist/85">
              A formação para profissionais de saúde que querem transformar evidência em conduta. Cinco
              etapas, uma sequência clínica, resultado no paciente.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
              {[CERT.coreLoad, CERT.medLoad].map((t) => (
                <span key={t} className="rounded-full border border-white/20 px-3 py-1.5 text-mist/85">{t}</span>
              ))}
            </div>
          </div>

          <div id="inscricao" className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
            <p className="font-serif text-[20px] text-white">Torne-se um Profissional Certificado 5R</p>
            <p className="mt-1 text-[13.5px] text-mist/75">
              As inscrições da próxima turma ainda não abriram. Cadastre seu interesse — sem compromisso.
            </p>
            <div className="mt-4">
              <CertInterestForm />
            </div>
          </div>
        </div>
      </section>

      <div className="wrap py-12">
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Certificação", path: "/certificacao" }]} />

        {/* O que é / objetivo */}
        <section className="grid gap-10 md:grid-cols-2">
          <div>
            <span className="kicker">O que é</span>
            <h2 className="mt-2 text-[26px]">Uma credencial clínica, não mais um curso</h2>
            <p className="prose-5r mt-2">
              A Certificação Profissional 5R organiza o cuidado da saúde intestinal em um método replicável.
              O centro é o desfecho do paciente: o sintoma que regride, a qualidade de vida que volta. A
              autoridade profissional é consequência.
            </p>
          </div>
          <div>
            <span className="kicker">Objetivo e transformação</span>
            <h2 className="mt-2 text-[26px]">Do &ldquo;encaminho&rdquo; ao &ldquo;conduzo&rdquo;</h2>
            <p className="prose-5r mt-2">
              Ao final, o profissional domina a sequência 5R com checkpoints e critérios de progressão —
              sabendo quando avançar, quando insistir, quando integrar terapias cérebro-intestino e quando
              rever a hipótese diagnóstica.
            </p>
          </div>
        </section>

        {/* Metodologia */}
        <section className="mt-14">
          <span className="kicker">Metodologia</span>
          <h2 className="mt-2 text-[26px]">Cinco etapas, ensinadas como conduta</h2>
          <p className="prose-5r mt-2">{CERT.lessonFormat}</p>
          <div className="mt-6">
            <RScale />
          </div>
        </section>

        {/* Público elegível */}
        <section id="elegiveis" className="mt-14">
          <span className="kicker">Público elegível</span>
          <h2 className="mt-2 text-[26px]">Para quem cuida de saúde intestinal</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {CERT.eligible.map((p) => (
              <span key={p} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium text-navy-deep">
                {p}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-muted">O escopo de atuação de cada profissão é respeitado ao longo da formação.</p>
        </section>

        {/* Ementa / disciplinas */}
        <section className="mt-14">
          <span className="kicker">Disciplinas</span>
          <h2 className="mt-2 text-[26px]">Ementa</h2>
          <p className="prose-5r mt-2">
            <strong>Trilha Nutrição (core)</strong> — {CORE_MODULES.reduce((a, b) => a + b.lessons.length, 0)} aulas
            organizadas pelos cinco Rs.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {CORE_MODULES.map((m) => (
              <div key={m.block} className="card">
                <h3 className="text-[16px] text-navy">{m.block}</h3>
                <ul className="mt-2 space-y-1.5 text-[14px] text-ink/80">
                  {m.lessons.map((l) => (
                    <li key={l} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber5r" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-[16px] text-navy">Trilha Medicina (+9 aulas)</h3>
              <ul className="mt-2 space-y-1.5 text-[14px] text-ink/80">
                {MED_MODULES.map((l) => (
                  <li key={l} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber5r" />{l}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="text-[16px] text-navy">Bônus premium (por público)</h3>
              <ul className="mt-2 space-y-1.5 text-[14px] text-ink/80">
                {BONUS_MODULES.map((l) => (
                  <li key={l} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber5r" />{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Travas de escopo — sinal de seriedade */}
        <section className="mt-14 rounded-2xl border border-line bg-white p-8">
          <span className="kicker">Linhas vermelhas do método</span>
          <h2 className="mt-2 text-[24px]">O que esta certificação nunca faz</h2>
          <p className="prose-5r mt-2">
            Uma certificação séria se define também pelo que recusa. Estas são travas explícitas da formação.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {SCOPE_LIMITS.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-[14.5px] text-ink/85">
                <span className="mt-0.5 font-mono text-[13px] text-[#9A3B2E]">✕</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Itens a confirmar — transparência, sem inventar */}
        <section className="mt-14 grid gap-4 md:grid-cols-2">
          {[
            ["Professores", CERT.pending.faculty],
            ["Investimento e parcelamento", CERT.pending.price],
            ["Próxima turma", CERT.pending.dates],
            ["Certificado e validade", CERT.pending.certificate],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-dashed border-line bg-mist/30 p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted">A confirmar</p>
              <h3 className="mt-1 text-[17px]">{t}</h3>
              <p className="mt-1 text-[14px] text-ink/75">{d}</p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <span className="kicker">Dúvidas frequentes</span>
          <h2 className="mt-2 text-[26px]">Perguntas frequentes</h2>
          <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-white">
            {CERT_FAQS.map((f) => (
              <div key={f.q} className="p-5">
                <dt className="font-serif text-[17px] text-navy-deep">{f.q}</dt>
                <dd className="mt-1.5 text-[15px] text-ink/80">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA final */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-navy-deep p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="font-serif text-[28px] text-white">Torne-se um Profissional Certificado 5R</h2>
              <p className="mt-2 max-w-xl text-[15px] text-mist/85">
                Cadastre seu interesse e seja avisado, em primeira mão, quando as inscrições abrirem — com a
                ementa completa e o investimento.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <CertInterestForm />
            </div>
          </div>
          <p className="mt-6 text-[12.5px] text-mist/60">
            Uma certificação {SITE.legalName}. Conteúdo educacional e profissional — não constitui promessa
            de resultado clínico. Veja a <Link href="/politica-editorial" className="underline">política editorial</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
