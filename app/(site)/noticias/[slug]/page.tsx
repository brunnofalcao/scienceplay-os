import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertCTA } from "@/components/CertCTA";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { RChip } from "@/components/RScale";
import { JsonLd } from "@/components/JsonLd";
import { SourceLink } from "@/components/SourceLink";
import { NEWS, getNews } from "@/content/news";
import { getEntry } from "@/lib/search";
import { STUDY_TYPE_LABEL, EVIDENCE_SCALE } from "@/lib/evidence";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import { pageMetadata, newsArticleLd } from "@/lib/seo";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) return {};
  return pageMetadata({
    title: n.headline,
    description: n.subheadline,
    path: `/noticias/${n.slug}`,
    type: "article",
    publishedTime: n.publishedAt,
    modifiedTime: n.updatedAt,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) notFound();

  const lvl = EVIDENCE_SCALE[n.evidence];
  const terms = n.terms.map(getEntry).filter(Boolean);
  const related = n.related.map(getNews).filter(Boolean);

  const ld = newsArticleLd({
    headline: n.headline,
    description: n.subheadline,
    path: `/noticias/${n.slug}`,
    datePublished: n.publishedAt,
    dateModified: n.updatedAt,
    authorName: n.author,
  });

  return (
    <>
      <JsonLd data={ld} />
      <div className="wrap py-12">
        <Breadcrumbs
          items={[
            { name: "Início", path: "/" },
            { name: "Notícias", path: "/noticias" },
            { name: n.category, path: "/noticias" },
          ]}
        />

        <article className="mx-auto max-w-[720px]">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag">{n.category}</span>
              {n.rTags.map((r) => <RChip key={r} rKey={r} />)}
            </div>

            {/* Manchete jornalística */}
            <h1 className="mt-4 font-serif text-[38px] font-medium leading-[1.08] md:text-[44px]">{n.headline}</h1>

            {/* Linha-fina */}
            <p className="mt-4 text-[19px] leading-relaxed text-ink/75">{n.subheadline}</p>

            {/* Assinatura */}
            <div className="mt-5 flex flex-wrap items-center gap-2 border-y border-line py-3 text-[13px] text-muted">
              <span className="font-medium text-ink">{n.author}</span>
              <span>·</span>
              <time dateTime={n.publishedAt}>
                {new Date(n.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </time>
              {n.updatedAt !== n.publishedAt && (
                <>
                  <span>·</span>
                  <span>atualizado em {new Date(n.updatedAt).toLocaleDateString("pt-BR")}</span>
                </>
              )}
            </div>
          </header>

          {/* Lead */}
          <p className="mt-8 text-[19px] leading-relaxed text-ink first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[58px] first-letter:leading-[0.8] first-letter:text-navy">
            {n.lead}
          </p>

          {/* Corpo narrativo */}
          <div className="mt-6">
            {n.body.map((block, i) => (
              <section key={i}>
                {block.heading && <h2 className="mb-2 mt-8 font-serif text-[24px] text-navy-deep">{block.heading}</h2>}
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="mb-4 text-[17px] leading-[1.75] text-[#33373d]">{p}</p>
                ))}
              </section>
            ))}
          </div>

          {/* O que isso significa na prática */}
          <section className="mt-8 rounded-2xl border border-line bg-white p-6">
            <h2 className="font-serif text-[22px] text-navy-deep">O que isso significa na prática</h2>
            <p className="mt-2 text-[16.5px] leading-relaxed text-ink/85">{n.practical}</p>
          </section>

          {/* O que ainda não sabemos */}
          <section className="mt-6">
            <h2 className="font-serif text-[22px] text-navy-deep">O que ainda não sabemos</h2>
            <p className="mt-2 text-[17px] leading-relaxed text-[#33373d]">{n.whatWeDontKnow}</p>
          </section>

          {/* Conexão com o Protocolo 5R */}
          <section className="mt-8 rounded-2xl bg-mist/50 p-6">
            <span className="kicker">No Protocolo 5R</span>
            <p className="mt-2 text-[16.5px] leading-relaxed text-navy-deep">{n.rConnection}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {n.rTags.map((r) => <RChip key={r} rKey={r} />)}
            </div>
          </section>

          {/* Aviso */}
          <p className="mt-8 rounded-lg border border-line bg-white p-4 text-[13.5px] text-ink/70">
            Este conteúdo é educacional e informativo. Não substitui a avaliação de um profissional de saúde,
            não faz diagnóstico e não indica tratamento individual.
          </p>

          {/* Base científica (camada secundária, rastreável) */}
          <section className="mt-8 border-t border-line pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-mono text-[12px] uppercase tracking-wide text-muted">Base científica</h2>
              <EvidenceBadge grade={n.evidence} />
              <span className="text-[12.5px] text-muted">{STUDY_TYPE_LABEL[n.studyType]}</span>
            </div>
            <p className="mt-2 text-[13px] text-muted">{lvl.meaning}</p>
            <ul className="mt-4 space-y-3">
              {n.sources.map((s, i) => (
                <li key={i} className="rounded-lg border border-line bg-white p-4 text-[14px]">
                  <p className="font-medium text-ink">{s.label}</p>
                  <p className="mt-1 text-[13px] text-muted">
                    {s.type}
                    {s.year ? ` · ${s.year}` : ""}
                    {s.access ? ` · ${s.access === "gratuito" ? "acesso gratuito" : "acesso restrito"}` : ""}
                    {s.doi ? ` · DOI: ${s.doi}` : ""}
                    {s.pmid ? ` · PMID: ${s.pmid}` : ""}
                  </p>
                  <SourceLink url={s.url} doi={s.doi} slug={n.slug} />
                </li>
              ))}
            </ul>
          </section>

          {/* Termos relacionados */}
          {terms.length > 0 && (
            <section className="mt-8">
              <h2 className="text-[18px]">Termos do glossário nesta matéria</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {terms.map((t) => (
                  <Link key={t!.slug} href={`/glossario/${t!.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[13.5px] hover:border-navy">
                    {t!.name}
                    <span className="font-mono text-[10px] uppercase text-muted">{ENTITY_TYPE_LABEL[t!.type]}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <div className="mx-auto max-w-[720px]">
          <CertCTA intent="news" context={`noticia-${n.slug}`} />
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-6 max-w-[720px]">
            <h2 className="text-[20px]">Continue lendo</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r!.slug}>
                  <Link href={`/noticias/${r!.slug}`} className="card group block h-full">
                    <span className="text-[12px] text-muted">{r!.category}</span>
                    <p className="mt-1 font-serif text-[17px] leading-snug group-hover:text-navy">{r!.headline}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
