import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertCTA } from "@/components/CertCTA";
import { JsonLd } from "@/components/JsonLd";
import { FIVE_RS, getR } from "@/lib/five-rs";
import { FUNDAMENTAL_STUDIES } from "@/lib/five-r-studies";
import { StudyCard } from "@/components/StudyCard";
import { getEntry, entriesByR } from "@/lib/search";
import { newsByR } from "@/content/news";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import { pageMetadata, faqLd } from "@/lib/seo";

export function generateStaticParams() {
  return FIVE_RS.map((r) => ({ r: r.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ r: string }> }) {
  const { r: rKey } = await params;
  const r = getR(rKey);
  if (!r) return {};
  return pageMetadata({
    title: `${r.name} — o ${r.n} do Protocolo 5R`,
    description: `${r.objective} Exemplos educacionais, termos do glossário, notícias e cuidados da etapa ${r.name} (${r.english}) do Protocolo 5R.`,
    path: `/os-cinco-rs/${r.key}`,
  });
}

export default async function Page({ params }: { params: Promise<{ r: string }> }) {
  const { r: rKey } = await params;
  const r = getR(rKey);
  if (!r) notFound();

  const related = r.relatedTerms.map(getEntry).filter(Boolean);
  const news = newsByR(r.key);
  const studies = FUNDAMENTAL_STUDIES[r.key] ?? [];
  const idx = FIVE_RS.findIndex((x) => x.key === r.key);
  const prev = FIVE_RS[idx - 1];
  const next = FIVE_RS[idx + 1];

  return (
    <>
      <JsonLd data={faqLd(r.faqs)} />
      {/* Cabeçalho com a cor tonal do R */}
      <div style={{ backgroundColor: r.color }} className="border-b border-black/10">
        <div className="wrap py-12" style={{ color: r.order >= 5 ? "#131A45" : "#fff" }}>
          <div className="text-[13px]" style={{ opacity: 0.85 }}>
            <Link href="/os-cinco-rs" className="hover:underline" style={{ color: "inherit" }}>
              ← Os cinco Rs
            </Link>
          </div>
          <span className="mt-4 block font-mono text-[14px]" style={{ opacity: 0.85 }}>{r.n} · {r.english}</span>
          <h1 className="mt-2 font-serif text-[48px] font-medium" style={{ color: "inherit" }}>{r.name}</h1>
          <p className="mt-3 max-w-2xl text-[18px]" style={{ opacity: 0.92 }}>{r.tagline}</p>
        </div>
      </div>

      <div className="wrap py-12">
        <Breadcrumbs
          items={[
            { name: "Início", path: "/" },
            { name: "Os cinco Rs", path: "/os-cinco-rs" },
            { name: r.name, path: `/os-cinco-rs/${r.key}` },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="prose-5r max-w-none">
            <h2>Definição</h2>
            <p>{r.definition}</p>

            <h2>Objetivo</h2>
            <p>{r.objective}</p>

            <h2>Exemplos educacionais</h2>
            <p className="text-[14px] text-muted">
              Exemplos de categorias que costumam entrar nesta etapa. São ilustrativos, não uma prescrição
              — a escolha e a dose são decisões profissionais e individuais.
            </p>
            <ul>
              {r.examples.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>

            <div className="not-prose my-8 rounded-xl border border-amber5r/30 bg-amber5r/5 p-5">
              <p className="font-serif text-[17px] text-navy-deep">Cuidado importante</p>
              <p className="mt-1.5 text-[15px] text-ink/80">{r.cautions}</p>
            </div>

            <h2>Perguntas frequentes</h2>
            <dl className="not-prose divide-y divide-line rounded-xl border border-line bg-white">
              {r.faqs.map((f) => (
                <div key={f.q} className="p-5">
                  <dt className="font-serif text-[17px] text-navy-deep">{f.q}</dt>
                  <dd className="mt-1.5 text-[15px] text-ink/80">{f.a}</dd>
                </div>
              ))}
            </dl>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {related.length > 0 && (
              <div className="card">
                <h3 className="text-[16px]">Termos relacionados</h3>
                <ul className="mt-3 space-y-2">
                  {related.map((t) => (
                    <li key={t!.slug}>
                      <Link href={`/glossario/${t!.slug}`} className="flex items-center justify-between gap-2 text-[14px] hover:text-navy">
                        <span>{t!.name}</span>
                        <span className="tag">{ENTITY_TYPE_LABEL[t!.type]}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {news.length > 0 && (
              <div className="card">
                <h3 className="text-[16px]">Notícias sobre {r.name}</h3>
                <ul className="mt-3 space-y-3">
                  {news.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/noticias/${n.slug}`} className="group block">
                        <span className="mb-0.5 block text-[11px] text-muted">{n.category}</span>
                        <p className="text-[14px] font-medium leading-snug group-hover:text-navy">{n.headline}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {studies.length > 0 && (
              <div className="card">
                <h3 className="text-[16px]">Estudos fundamentais deste R</h3>
                <p className="mt-1.5 text-[12.5px] text-muted">
                  Biblioteca de referência: revisões, meta-análises, diretrizes e consensos que
                  sustentam a lógica desta etapa. Curadoria, não lista exaustiva — e não é notícia.
                </p>
                <ul className="mt-3 space-y-3">
                  {studies.map((s) => (
                    <StudyCard key={s.title} study={s} />
                  ))}
                </ul>
              </div>
            )}

            <div className="card bg-navy-deep text-mist">
              <p className="text-[13.5px] text-mist/85">
                Informação educacional. A aplicação da etapa {r.name} no consultório é individual e pertence
                ao profissional de saúde.
              </p>
            </div>
          </aside>
        </div>

        <CertCTA intent="method" context={`r-${r.key}`} />

        {/* Navegação entre Rs */}
        <div className="mt-10 flex items-center justify-between border-t border-line pt-6 text-[14px]">
          {prev ? (
            <Link href={`/os-cinco-rs/${prev.key}`} className="text-navy hover:underline">← {prev.n} {prev.name}</Link>
          ) : <span />}
          {next ? (
            <Link href={`/os-cinco-rs/${next.key}`} className="text-navy hover:underline">{next.n} {next.name} →</Link>
          ) : <span />}
        </div>
      </div>
    </>
  );
}
