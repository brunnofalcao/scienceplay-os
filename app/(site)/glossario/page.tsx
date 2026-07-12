import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GlossarySearch } from "@/components/GlossarySearch";
import { EvidenceBadge, ConfidenceBadge } from "@/components/EvidenceBadge";
import { RChip } from "@/components/RScale";
import { StateBlock, STATE_COPY } from "@/components/States";
import { NoResultLogger } from "@/components/NoResultLogger";
import { ResultLogger } from "@/components/ResultLogger";
import { searchGlossary, popularTerms } from "@/lib/search";
import { GLOSSARY } from "@/content/glossary";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import { FIVE_RS } from "@/lib/five-rs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Glossário 5R — pesquise termos da saúde intestinal",
  description:
    "Pesquise alimentos, sintomas, suplementos, bactérias e conceitos e veja como cada termo se relaciona com os cinco Rs, com nível de evidência e fontes rastreáveis.",
  path: "/glossario",
});

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; tipo?: string; r?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q || "").trim();
  const hits = q ? searchGlossary(q, 30) : [];
  const popular = popularTerms(16);

  return (
    <div className="wrap py-12">
      <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Glossário 5R", path: "/glossario" }]} />

      <header className="max-w-3xl">
        <span className="kicker">Glossário inteligente 5R</span>
        <h1 className="mt-3 text-[38px] leading-[1.08]">Pesquise qualquer termo da saúde intestinal</h1>
        <p className="prose-5r mt-3">
          Escreva um alimento, sintoma, suplemento, bactéria ou conceito. Explicamos o que é, como se
          relaciona com o intestino, em qual R se encaixa e o que as evidências sugerem — sempre com as
          fontes à vista. Quando não há evidência suficiente, nós dizemos.
        </p>
      </header>

      <div className="mt-8 max-w-2xl">
        <GlossarySearch size="lg" initial={q} autoFocus={!q} />
      </div>

      {/* RESULTADOS */}
      {q ? (
        <section className="mt-10">
          <p className="mb-4 text-[14px] text-muted">
            {hits.length > 0
              ? `${hits.length} resultado${hits.length > 1 ? "s" : ""} para "${q}"`
              : `Nenhum resultado para "${q}"`}
          </p>

          {hits.length === 0 ? (
            <>
              <NoResultLogger query={q} />
              <StateBlock variant="empty" title={STATE_COPY.noResult}>
                <p className="mt-1 text-[14.5px] text-ink/70">
                  Registramos sua busca para avaliação editorial — termos procurados com frequência viram
                  novos verbetes. Enquanto isso, tente um termo relacionado ou explore os populares abaixo.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {popular.slice(0, 10).map((t) => (
                    <Link key={t.slug} href={`/glossario/${t.slug}`} className="tag hover:bg-navy hover:text-white">
                      {t.name}
                    </Link>
                  ))}
                </div>
              </StateBlock>
            </>
          ) : (
            <>
              <ResultLogger query={q} count={hits.length} />
              <ul className="grid gap-4 md:grid-cols-2">
              {hits.map(({ entry }) => (
                <li key={entry.slug}>
                  <Link href={`/glossario/${entry.slug}`} className="card group block h-full transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-serif text-[19px] text-navy-deep group-hover:text-navy">{entry.name}</h2>
                      <span className="tag shrink-0">{ENTITY_TYPE_LABEL[entry.type]}</span>
                    </div>
                    <p className="mt-2 text-[14px] leading-snug text-ink/75">{entry.short}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {entry.rPrimary ? <RChip rKey={entry.rPrimary} /> : <ConfidenceBadge confidence="insuficiente" />}
                      <EvidenceBadge grade={entry.evidence} showLabel={false} />
                    </div>
                  </Link>
                </li>
              ))}
              </ul>
            </>
          )}
        </section>
      ) : (
        <>
          {/* NUVEM + NAVEGAÇÃO POR R E TIPO quando sem busca */}
          <section className="mt-12">
            <h2 className="text-[22px]">Termos populares</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {popular.map((t) => {
                const scale = 0.85 + Math.min(0.6, (t.popularity || 40) / 120);
                return (
                  <Link
                    key={t.slug}
                    href={`/glossario/${t.slug}`}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 font-medium text-navy-deep hover:border-navy hover:bg-mist"
                    style={{ fontSize: `${13 * scale}px` }}
                  >
                    {t.name}
                  </Link>
                );
              })}
            </div>
            <p className="mt-3 text-[12.5px] text-muted">
              O destaque reflete interesse editorial e de busca, não a força da evidência.
            </p>
          </section>

          <section className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-[20px]">Navegar por R</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {FIVE_RS.map((r) => (
                  <RChip key={r.key} rKey={r.key} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-[20px]">Navegar por tipo</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {Array.from(new Set(GLOSSARY.map((e) => e.type))).map((tp) => (
                  <span key={tp} className="tag">{ENTITY_TYPE_LABEL[tp]}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-[22px]">Todos os verbetes ({GLOSSARY.length})</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[...GLOSSARY].sort((a, b) => a.name.localeCompare(b.name)).map((e) => (
                <li key={e.slug}>
                  <Link href={`/glossario/${e.slug}`} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[14px] hover:border-navy">
                    <span className="truncate">{e.name}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase text-muted">{ENTITY_TYPE_LABEL[e.type]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
