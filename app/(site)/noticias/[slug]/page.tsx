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
import { pageMetadata, newsArticleLd, faqLd } from "@/lib/seo";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) return {};
  return pageMetadata({
    title: n.title,
    description: n.quickAnswer,
    path: `/noticias/${n.slug}`,
    type: "article",
    publishedTime: n.publishedAt,
    modifiedTime: n.reviewedAt,
  });
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-5">
      <p className="font-mono text-[11px] uppercase tracking-wide text-amber5r">{label}</p>
      <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink/85">{children}</p>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) notFound();

  const lvl = EVIDENCE_SCALE[n.evidence];
  const terms = n.terms.map(getEntry).filter(Boolean);
  const related = n.related.map(getNews).filter(Boolean);

  const ld = [
    newsArticleLd({
      headline: n.title,
      description: n.quickAnswer,
      path: `/noticias/${n.slug}`,
      datePublished: n.publishedAt,
      dateModified: n.reviewedAt,
      authorName: n.reviewer,
    }),
    faqLd([
      { q: "O que foi estudado?", a: n.studied },
      { q: "O que o estudo encontrou?", a: n.found },
      { q: "O que o estudo não permite concluir?", a: n.cannotConclude },
    ]),
  ];

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

        <article className="mx-auto max-w-3xl">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag">{n.category}</span>
              {n.rTags.map((r) => <RChip key={r} rKey={r} />)}
            </div>
            <h1 className="mt-4 text-[36px] leading-[1.1]">{n.title}</h1>

            {/* Resposta rápida (AEO) */}
            <div className="mt-5 rounded-xl border-l-[3px] border-amber5r bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-amber5r">Resposta rápida</p>
              <p className="mt-1 text-[17px] leading-relaxed text-navy-deep">{n.quickAnswer}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px] text-muted">
              <EvidenceBadge grade={n.evidence} />
              <span>{STUDY_TYPE_LABEL[n.studyType]}</span>
              <span>·</span>
              <time dateTime={n.publishedAt}>Publicado em {new Date(n.publishedAt).toLocaleDateString("pt-BR")}</time>
              <span>·</span>
              <span>Revisado em {new Date(n.reviewedAt).toLocaleDateString("pt-BR")}</span>
            </div>
          </header>

          {/* Estrutura editorial obrigatória (§8.5) */}
          <div className="mt-8">
            <Block label="O que foi estudado">{n.studied}</Block>
            <Block label="Quem participou / qual modelo">{n.participants}</Block>
            <Block label="Intervenção ou exposição analisada">{n.intervention}</Block>
            <Block label="O que o estudo encontrou">{n.found}</Block>
            <Block label="O que o estudo NÃO permite concluir">{n.cannotConclude}</Block>
            <Block label="Relação possível com o Protocolo 5R">{n.relationTo5R}</Block>
            <Block label="Limitações">{n.limitations}</Block>
            <Block label="Aplicação prática (educacional)">{n.practical}</Block>
          </div>

          {/* Nível de evidência explicado */}
          <div className="mt-6 rounded-xl p-5" style={{ backgroundColor: `${lvl.color}12` }}>
            <div className="flex items-center gap-2">
              <EvidenceBadge grade={n.evidence} />
            </div>
            <p className="mt-2 text-[14px] text-ink/80">{lvl.meaning}</p>
            <p className="mt-1 text-[13px] text-ink/60">{lvl.ceiling}</p>
          </div>

          {/* Aviso */}
          <p className="mt-6 rounded-lg border border-line bg-white p-4 text-[13.5px] text-ink/70">
            Este conteúdo é educacional e informativo. Não substitui a avaliação de um profissional de saúde,
            não faz diagnóstico e não indica tratamento individual.
          </p>

          {/* Fonte */}
          <section className="mt-8 border-t border-line pt-6">
            <h2 className="text-[20px]">Fonte original</h2>
            <div className="mt-3 rounded-xl border border-line bg-white p-5 text-[14.5px]">
              <p><strong>Periódico:</strong> {n.source.journal}</p>
              <p><strong>Autores:</strong> {n.source.authors}</p>
              <p><strong>Ano:</strong> {n.source.year} · <strong>Acesso:</strong> {n.source.access === "gratuito" ? "Gratuito (open access)" : "Restrito"}</p>
              {n.source.doi && <p><strong>DOI:</strong> {n.source.doi}</p>}
              {n.source.pmid && <p><strong>PMID:</strong> {n.source.pmid}</p>}
              <SourceLink url={n.source.url} doi={n.source.doi} slug={n.slug} />
            </div>
          </section>

          {/* Termos relacionados */}
          {terms.length > 0 && (
            <section className="mt-8">
              <h2 className="text-[20px]">Termos do glossário nesta notícia</h2>
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

        <div className="mx-auto max-w-3xl">
          <CertCTA intent="news" context={`noticia-${n.slug}`} />
        </div>

        {/* Relacionadas */}
        {related.length > 0 && (
          <section className="mx-auto mt-6 max-w-3xl">
            <h2 className="text-[20px]">Conteúdos relacionados</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r!.slug}>
                  <Link href={`/noticias/${r!.slug}`} className="card group block">
                    <EvidenceBadge grade={r!.evidence} showLabel={false} />
                    <p className="mt-2 font-serif text-[16px] leading-snug group-hover:text-navy">{r!.title}</p>
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
