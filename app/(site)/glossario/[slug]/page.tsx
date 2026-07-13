import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertCTA } from "@/components/CertCTA";
import { EvidenceBadge, ConfidenceBadge } from "@/components/EvidenceBadge";
import { RChip } from "@/components/RScale";
import { StateBlock } from "@/components/States";
import { JsonLd } from "@/components/JsonLd";
import { GLOSSARY } from "@/content/glossary";
import { getEntry } from "@/lib/search";
import { getR } from "@/lib/five-rs";
import { newsByTerm } from "@/content/news";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import { EVIDENCE_SCALE } from "@/lib/evidence";
import { pageMetadata, definedTermLd, faqLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return GLOSSARY.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEntry(slug);
  if (!e) return {};
  return pageMetadata({
    title: `${e.name} e o Protocolo 5R`,
    description: e.short,
    path: `/glossario/${e.slug}`,
    modifiedTime: e.lastReviewed,
  });
}

const INTENSITY_LABEL: Record<string, string> = { forte: "relação forte", moderada: "relação moderada", fraca: "relação fraca" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEntry(slug);
  if (!e) notFound();

  const rPrimary = e.rPrimary ? getR(e.rPrimary) : undefined;
  const related = e.related.map(getEntry).filter(Boolean);
  const news = newsByTerm(e.slug);
  const lvl = EVIDENCE_SCALE[e.evidence];
  const insufficient = e.confidence === "insuficiente" || !e.rPrimary;

  const ld = [
    definedTermLd({ name: e.name, description: e.definition, path: `/glossario/${e.slug}` }),
    faqLd([
      { q: `O que é ${e.name}?`, a: e.definition },
      { q: `${e.name} tem relação com o Protocolo 5R?`, a: e.classificationRationale },
      { q: `O que as evidências dizem sobre ${e.name}?`, a: e.evidenceSuggests },
    ]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <div className="wrap py-12">
        <Breadcrumbs
          items={[
            { name: "Início", path: "/" },
            { name: "Glossário 5R", path: "/glossario" },
            { name: e.name, path: `/glossario/${e.slug}` },
          ]}
        />

        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">{ENTITY_TYPE_LABEL[e.type]}</span>
            {e.synonyms.length > 0 && (
              <span className="text-[12.5px] text-muted">também: {e.synonyms.join(", ")}</span>
            )}
          </div>
          <h1 className="mt-3 text-[40px] leading-tight">{e.name}</h1>

          {/* Resposta rápida (AEO) */}
          <div className="mt-4 rounded-xl border-l-[3px] border-amber5r bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-amber5r">Resposta rápida</p>
            <p className="mt-1 text-[17px] leading-relaxed text-navy-deep">{e.short}</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {e.rPrimary ? (
              <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
                R principal: <RChip rKey={e.rPrimary} />
              </span>
            ) : (
              <ConfidenceBadge confidence="insuficiente" />
            )}
            <EvidenceBadge grade={e.evidence} />
            {e.rPrimary && <ConfidenceBadge confidence={e.confidence} />}
          </div>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="prose-5r max-w-none">
            <h2>O que é</h2>
            <p>{e.definition}</p>

            <h2>Como se relaciona com a saúde intestinal</h2>
            <p>{e.gutRelation}</p>

            {e.commercial?.isProduct && (
              <div className="not-prose my-6 rounded-xl border border-navy/15 bg-mist/40 p-5">
                <span className="tag">Verbete comercial</span>
                <h3 className="mt-2 font-serif text-[19px] text-navy-deep">Sobre o produto</h3>
                <dl className="mt-3 grid gap-2 text-[14px] sm:grid-cols-2">
                  {e.commercial.manufacturer && (<div><dt className="text-muted">Responsável</dt><dd>{e.commercial.manufacturer}</dd></div>)}
                  {e.commercial.category && (<div><dt className="text-muted">Categoria</dt><dd>{e.commercial.category}</dd></div>)}
                </dl>
                {e.commercial.composition && e.commercial.composition.length > 0 && (
                  <p className="mt-2 text-[14px]"><span className="text-muted">Composição declarada: </span>{e.commercial.composition.join(", ")}</p>
                )}
                {e.commercial.commercialClaim && <p className="mt-2 text-[14px] text-ink/80">{e.commercial.commercialClaim}</p>}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {e.commercial.ingredientEvidenceNote && (
                    <div className="rounded-lg border border-line bg-white p-3">
                      <p className="text-[12px] font-semibold text-navy">Evidência dos ingredientes</p>
                      <p className="mt-1 text-[13px] text-ink/75">{e.commercial.ingredientEvidenceNote}</p>
                    </div>
                  )}
                  {e.commercial.productEvidenceNote && (
                    <div className="rounded-lg border border-line bg-white p-3">
                      <p className="text-[12px] font-semibold text-navy">Evidência do produto final</p>
                      <p className="mt-1 text-[13px] text-ink/75">{e.commercial.productEvidenceNote}</p>
                    </div>
                  )}
                </div>
                <p className="mt-3 text-[12px] text-ink/55">
                  Evidência sobre um ingrediente não se transfere automaticamente para o produto final.
                  {e.commercial.commercialRelation ? ` ${e.commercial.commercialRelation}` : ""}
                </p>
                {e.commercial.brandedPageSlug && (
                  <Link href={`/branded/${e.commercial.brandedPageSlug}`} className="mt-3 inline-block text-[13.5px] font-medium text-navy hover:underline">
                    Ver a página da marca →
                  </Link>
                )}
              </div>
            )}

            <h2>Relação com os cinco Rs</h2>
            {insufficient ? (
              <div className="not-prose">
                <StateBlock variant="insufficient" title="Classificação com cautela">
                  Não há evidência suficiente para classificar este termo com segurança dentro do Protocolo
                  5R. Apresentamos abaixo apenas relações possíveis, em estudo — sem afirmar um R principal.
                </StateBlock>
              </div>
            ) : (
              <p>
                O R principal é{" "}
                <Link href={`/os-cinco-rs/${rPrimary!.key}`}><strong>{rPrimary!.name}</strong></Link>. {e.classificationRationale}
              </p>
            )}

            {(e.rSecondary.length > 0 || e.rPrimary) && (
              <div className="not-prose my-5 space-y-2">
                {e.rPrimary && (
                  <div className="flex items-start gap-3 rounded-lg border border-line bg-white p-4">
                    <RChip rKey={e.rPrimary} />
                    <p className="text-[14px] text-ink/80">
                      <strong>Principal.</strong> {e.classificationRationale}
                    </p>
                  </div>
                )}
                {e.rSecondary.map((s) => {
                  const sr = getR(s.r);
                  if (!sr) return null;
                  return (
                    <div key={s.r} className="flex items-start gap-3 rounded-lg border border-line bg-white p-4">
                      <RChip rKey={s.r} />
                      <p className="text-[14px] text-ink/80">
                        <strong>{INTENSITY_LABEL[s.intensity]}.</strong> {s.rationale}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <h2>Nível de confiança da classificação</h2>
            <p>
              A classificação deste termo tem <strong>{e.confidence}</strong> confiança, e a evidência que a
              sustenta é de nível <strong>{e.evidence} — {lvl.label}</strong>. {lvl.meaning} {lvl.ceiling}
            </p>

            <h2>O que as evidências sugerem</h2>
            <p>{e.evidenceSuggests}</p>

            <h2>O que ainda não está comprovado</h2>
            <p>{e.notProven}</p>

            <div className="not-prose my-8 rounded-xl border border-amber5r/30 bg-amber5r/5 p-5">
              <p className="font-serif text-[17px] text-navy-deep">Cuidados importantes</p>
              <p className="mt-1.5 text-[15px] text-ink/80">{e.cautions}</p>
              <p className="mt-3 text-[13px] text-ink/60">
                Este verbete é educacional. Não é diagnóstico, prescrição, dose individual ou recomendação
                pessoal. Em situações de risco, procure um profissional de saúde.
              </p>
            </div>

            {e.functionalMedicine && (
              <div className="not-prose my-8 rounded-2xl border border-line bg-white p-6">
                <span className="tag">Perspectiva</span>
                <h2 className="mt-2 font-serif text-[22px] text-navy-deep">Como a Medicina Funcional interpreta este tema</h2>
                <p className="mt-1 text-[13px] text-ink/60">
                  Esta é uma perspectiva teórico-clínica adotada por determinados profissionais e instituições.
                  A seção “O que as evidências sugerem”, acima, apresenta separadamente a sustentação científica
                  disponível. A Medicina Funcional não é uma escola única e homogênea.
                </p>
                <dl className="mt-4 space-y-3 text-[14.5px]">
                  {[
                    ["Medicina convencional", e.functionalMedicine.conventional],
                    ["Perspectiva funcional", e.functionalMedicine.functionalPerspective],
                    ["Mecanismos propostos", e.functionalMedicine.mechanisms],
                    ["Práticas associadas", e.functionalMedicine.practices],
                    ["Pontos com sustentação mais consistente", e.functionalMedicine.consistent],
                    ["Ainda hipótese / prática / teoria", e.functionalMedicine.hypothesis],
                    ["Onde há divergência", e.functionalMedicine.divergences],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k as string} className="rounded-lg border border-line bg-paper/60 p-3">
                        <dt className="text-[12px] font-semibold uppercase tracking-wide text-navy">{k}</dt>
                        <dd className="mt-1 text-ink/80">{v}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            )}

            <h2>Fontes científicas</h2>
            <ul>
              {e.sources.map((s, i) => (
                <li key={i}>
                  {s.label} — <em>{s.type}</em>
                  {s.year ? `, ${s.year}` : ""}
                  {s.doi ? ` · DOI: ${s.doi}` : ""}
                  {s.pmid ? ` · PMID: ${s.pmid}` : ""}
                </li>
              ))}
            </ul>
            {e.evidenceLibrary && e.evidenceLibrary.length > 0 && (
              <p className="not-prose">
                <Link href={`/glossario/${e.slug}/evidencias`} className="inline-flex items-center gap-1.5 rounded-lg border border-navy/25 px-4 py-2 text-[14px] font-medium text-navy hover:bg-mist">
                  Estudos e conexões científicas ({e.evidenceLibrary.length}) →
                </Link>
              </p>
            )}
            <p className="text-[13px] text-muted">
              Última revisão editorial: {new Date(e.lastReviewed).toLocaleDateString("pt-BR")}.
            </p>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <h3 className="text-[15px]">Resumo</h3>
              <dl className="mt-3 space-y-2 text-[13.5px]">
                <div className="flex justify-between gap-2"><dt className="text-muted">Tipo</dt><dd>{ENTITY_TYPE_LABEL[e.type]}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted">R principal</dt><dd>{rPrimary ? rPrimary.name : "—"}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted">Evidência</dt><dd>{e.evidence} · {lvl.label}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted">Confiança</dt><dd className="capitalize">{e.confidence}</dd></div>
              </dl>
            </div>

            {related.length > 0 && (
              <div className="card">
                <h3 className="text-[15px]">Termos relacionados</h3>
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
                <h3 className="text-[15px]">Notícias relacionadas</h3>
                <ul className="mt-3 space-y-3">
                  {news.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/noticias/${n.slug}`} className="text-[14px] font-medium leading-snug hover:text-navy">
                        {n.headline}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <CertCTA intent="glossary" context={`termo-${e.slug}`} />
      </div>
    </>
  );
}
