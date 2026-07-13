import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { RChip } from "@/components/RScale";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { CtaButton } from "@/components/branded/CtaButton";
import { Infographic } from "@/components/branded/Infographic";
import { BRANDED, getBranded } from "@/content/branded";
import { STUDY_TYPE_LABEL } from "@/lib/evidence";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return BRANDED.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBranded(slug);
  if (!b) return {};
  return pageMetadata({
    title: `${b.brand} · Branded Page`,
    // Deixa clara a natureza comercial já nos metadados.
    description: `${b.partnershipLabel}. ${b.hero.intro}`,
    path: `/branded/${b.slug}`,
    modifiedTime: b.updatedAt,
  });
}

const INTENSITY_LABEL: Record<string, string> = {
  forte: "Conexão forte",
  moderada: "Conexão moderada",
  fraca: "Conexão fraca",
};

const ACCESS_LABEL: Record<string, string> = {
  aberto: "Acesso aberto",
  resumo: "Resumo disponível",
  pago: "Acesso pago",
};

export default async function BrandedPageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBranded(slug);
  if (!b) notFound();

  const updated = new Date(b.updatedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const heroCta = b.ctas[0];

  // JSON-LD simples e válido: uma WebPage identificada como conteúdo patrocinado.
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${b.brand} · Branded Page`,
    description: b.hero.intro,
    url: `${SITE.url}/branded/${b.slug}`,
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    about: b.about.category,
    sponsor: { "@type": "Organization", name: b.partner },
    publisher: { "@type": "Organization", name: SITE.legalName },
    dateModified: b.updatedAt,
  };

  return (
    <>
      <JsonLd data={webPageLd} />

      {/* Barra de identificação comercial — no TOPO, antes de tudo. */}
      <div className="border-b border-amber5r/40 bg-navy-deep">
        <div className="wrap flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-[12.5px] text-mist">
          <span className="rounded bg-amber5r px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
            Branded Page
          </span>
          <span className="text-mist/90">{b.partnershipLabel}</span>
          {b.status === "encerrado" && (
            <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-mist/80">Parceria encerrada</span>
          )}
        </div>
      </div>

      <div className="wrap py-10">
        <Breadcrumbs
          items={[
            { name: "Início", path: "/" },
            { name: "Parceria", path: `/branded/${b.slug}` },
            { name: b.brand, path: `/branded/${b.slug}` },
          ]}
        />

        {/* Hero */}
        <header className="mb-12 max-w-3xl">
          <span className="kicker">{b.hero.kicker}</span>
          <h1 className="mt-3 font-serif text-[40px] font-medium leading-tight md:text-[46px]">
            {b.hero.title}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#33373d]">{b.hero.intro}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
            <span>
              Responsável: <span className="text-ink/80">{b.partner}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Atualizado em {updated}</span>
          </div>
          {heroCta && (
            <div className="mt-6">
              <CtaButton
                label={heroCta.label}
                href={heroCta.href}
                kind={heroCta.kind}
                brand={b.brand}
                variant="hero"
              />
            </div>
          )}
        </header>

        {/* Sobre a marca */}
        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="prose-5r max-w-none">
            <h2>Sobre a {b.brand}</h2>
            <p>{b.about.what}</p>
            <p>{b.about.problem}</p>
            <p>{b.about.connectionToUniverse}</p>
          </div>
          <aside className="card h-fit lg:sticky lg:top-24">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Categoria</p>
            <p className="mt-1 text-[14.5px] text-ink/85">{b.about.category}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-muted">Ativos declarados</p>
            <ul className="mt-2 space-y-1.5">
              {b.about.assets.map((a) => (
                <li key={a} className="text-[13.5px] text-ink/80">• {a}</li>
              ))}
            </ul>
          </aside>
        </section>

        {/* No Protocolo 5R */}
        <section className="mb-14">
          <h2 className="font-serif text-[28px]">No Protocolo 5R</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-muted">
            Como o tema se conecta às etapas do método. Conexão forte não significa indicação individual — a
            escolha, a dose e a recomendação são sempre decisão profissional.
          </p>
          <ul className="mt-6 space-y-4">
            {b.rConnections.map((c) => (
              <li key={c.r} className="card">
                <div className="flex flex-wrap items-center gap-3">
                  <RChip rKey={c.r} />
                  <span className="tag">{INTENSITY_LABEL[c.intensity]}</span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{c.rationale}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* O que dizem os estudos */}
        <section className="mb-14">
          <h2 className="font-serif text-[28px]">O que dizem os estudos</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-muted">
            Evidência A e B é destacada quando a conexão é relevante e bem apoiada. Evidência C e D aparece
            apenas para contexto, mecanismo ou pesquisa emergente, com linguagem proporcional — nunca como
            prova clínica.
          </p>
          <ul className="mt-6 space-y-3">
            {b.library.map((item, i) => (
              <li key={i} className="card">
                <div className="flex flex-wrap items-center gap-2.5">
                  <EvidenceBadge grade={item.grade} />
                  <span className="tag">{STUDY_TYPE_LABEL[item.type]}</span>
                  <span className="font-mono text-[12px] text-muted">{item.year}</span>
                  <span className="font-mono text-[11px] text-muted">· {ACCESS_LABEL[item.access]}</span>
                </div>
                <p className="mt-3 text-[15px] font-medium text-navy-deep">{item.label}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink/75">{item.note}</p>
                {(item.url || item.doi) && (
                  <a
                    href={item.url || `https://doi.org/${item.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-[13px] text-navy hover:underline"
                  >
                    Ver referência {item.doi ? `(DOI: ${item.doi})` : "↗"}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Infográficos */}
        <section className="mb-14">
          <h2 className="font-serif text-[28px]">Infográficos</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-muted">
            Visualizações educacionais originais. Ilustram mecanismos e proporções em estudo — não representam
            resultados clínicos garantidos.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {b.infographics.map((g, i) => (
              <Infographic key={i} data={g} />
            ))}
          </div>
        </section>

        {/* Conteúdo relacionado */}
        {b.relatedContent.length > 0 && (
          <section className="mb-14">
            <h2 className="font-serif text-[28px]">Conteúdo relacionado</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {b.relatedContent.map((r) => (
                <Link key={r.href} href={r.href} className="card group transition-transform hover:-translate-y-0.5">
                  <span className="tag">{r.type}</span>
                  <p className="mt-3 text-[15px] font-medium leading-snug text-navy-deep group-hover:text-navy">
                    {r.label}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTAs */}
        {b.ctas.length > 0 && (
          <section className="mb-14">
            <h2 className="font-serif text-[28px]">Continuar com a {b.brand}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {b.ctas.map((c) => (
                <CtaButton key={c.href} label={c.label} href={c.href} kind={c.kind} brand={b.brand} />
              ))}
            </div>
          </section>
        )}

        {/* Nota de identificação comercial no rodapé do conteúdo */}
        <footer className="rounded-xl border border-amber5r/30 bg-amber5r/5 p-5 text-[13.5px] leading-relaxed text-ink/80">
          <p>
            <strong className="text-navy-deep">Conteúdo comercial identificado.</strong> Esta é uma Branded
            Page — {b.partnershipLabel}. O conteúdo é educacional, não substitui avaliação profissional e não
            indica conduta individual. Saiba mais na{" "}
            <Link href="/legal/publicidade-parcerias" className="text-navy underline underline-offset-2">
              Política de Publicidade e Parcerias
            </Link>{" "}
            e no{" "}
            <Link href="/legal/aviso-medico" className="text-navy underline underline-offset-2">
              Aviso Educacional e Médico
            </Link>
            .
          </p>
        </footer>
      </div>
    </>
  );
}
