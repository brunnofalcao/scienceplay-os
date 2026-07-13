import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { GLOSSARY } from "@/content/glossary";
import { getEntry } from "@/lib/search";
import type { EvidenceScope } from "@/lib/glossary-types";
import { pageMetadata } from "@/lib/seo";

// Biblioteca de evidências de um verbete: organiza estudos por escopo da
// conexão (produto final, ingrediente, categoria, mecanismo, editorial).
// Deixa explícito o tipo de conexão — sem confundir ingrediente com produto.

export function generateStaticParams() {
  return GLOSSARY.filter((e) => e.evidenceLibrary && e.evidenceLibrary.length > 0).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEntry(slug);
  if (!e) return {};
  return pageMetadata({
    title: `${e.name} — estudos e conexões científicas`,
    description: `Biblioteca de evidências de ${e.name}: estudos do produto final, dos ingredientes, da categoria e de mecanismo, com o tipo de conexão explícito.`,
    path: `/glossario/${e.slug}/evidencias`,
  });
}

const SCOPE_LABEL: Record<EvidenceScope, string> = {
  produto: "Conexão direta com o produto",
  ingrediente: "Conexão com um ingrediente",
  categoria: "Conexão com a categoria",
  mecanismo: "Conexão de mecanismo",
  editorial: "Conexão editorial / contextual",
};

const SCOPE_ORDER: EvidenceScope[] = ["produto", "ingrediente", "categoria", "mecanismo", "editorial"];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEntry(slug);
  if (!e || !e.evidenceLibrary || e.evidenceLibrary.length === 0) notFound();

  const byScope = SCOPE_ORDER.map((scope) => ({
    scope,
    items: e.evidenceLibrary!.filter((x) => x.scope === scope),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="wrap py-12">
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Glossário 5R", path: "/glossario" },
          { name: e.name, path: `/glossario/${e.slug}` },
          { name: "Evidências", path: `/glossario/${e.slug}/evidencias` },
        ]}
      />

      <header className="max-w-3xl">
        <span className="kicker">Estudos e conexões científicas</span>
        <h1 className="mt-3 text-[36px] leading-tight">{e.name}: o que sustenta cada afirmação</h1>
        <p className="prose-5r mt-3">
          Reunimos os estudos ligados a este termo e deixamos claro o <strong>tipo de conexão</strong> de
          cada um — se é sobre o produto final, sobre um ingrediente, sobre a categoria ou apenas sobre um
          mecanismo. Evidência de um ingrediente não é o mesmo que evidência do produto final.
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {byScope.map((group) => (
          <section key={group.scope}>
            <h2 className="mb-3 font-serif text-[22px] text-navy-deep">{SCOPE_LABEL[group.scope]}</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {group.items.map((s, i) => (
                <li key={i} className="card">
                  <div className="flex flex-wrap items-center gap-2">
                    <EvidenceBadge grade={s.grade} />
                    <span className="tag">{SCOPE_LABEL[s.scope]}</span>
                  </div>
                  <p className="mt-2 font-medium text-ink">{s.label}</p>
                  <p className="mt-1 text-[13px] text-muted">
                    {s.type}
                    {s.year ? ` · ${s.year}` : ""}
                    {s.ingredient ? ` · ingrediente: ${s.ingredient}` : ""}
                    {s.doi ? ` · DOI: ${s.doi}` : ""}
                    {s.pmid ? ` · PMID: ${s.pmid}` : ""}
                  </p>
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="mt-2 inline-block text-[13px] font-medium text-navy hover:underline">
                      Acessar a fonte →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-6">
        <Link href={`/glossario/${e.slug}`} className="text-[14px] font-medium text-navy hover:underline">
          ← Voltar ao verbete {e.name}
        </Link>
      </div>
    </div>
  );
}
