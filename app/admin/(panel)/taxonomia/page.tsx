import { AdminHeader } from "@/components/admin/AdminShell";
import { FIVE_RS } from "@/lib/five-rs";
import { GLOSSARY } from "@/content/glossary";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import type { EntityType } from "@/lib/glossary-types";

export default function AdminTaxonomy() {
  const typeCounts = GLOSSARY.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});
  const allSynonyms = GLOSSARY.reduce((n, e) => n + e.synonyms.length, 0);

  return (
    <>
      <AdminHeader
        title="Taxonomia"
        subtitle="Gerenciar os Rs, tipos de entidade, temas, tags, sinônimos e relações que estruturam a nuvem de palavras e as páginas temáticas."
      />
      <div className="p-8 space-y-8">
        <section>
          <h2 className="mb-3 font-mono text-[12px] uppercase tracking-wide text-amber5r">Os cinco Rs</h2>
          <div className="grid gap-3 sm:grid-cols-5">
            {FIVE_RS.map((r) => (
              <div key={r.key} className="rounded-xl border border-line bg-white p-4">
                <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: r.color }} />
                <p className="mt-2 font-mono text-[11px] text-muted">{r.n}</p>
                <p className="font-serif text-[16px]">{r.name}</p>
                <p className="mt-1 text-[11px] text-muted">{r.english}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-[12px] uppercase tracking-wide text-amber5r">Tipos de entidade</h2>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ENTITY_TYPE_LABEL) as EntityType[]).map((t) => (
              <span key={t} className="rounded-lg border border-line bg-white px-3 py-1.5 text-[13px]">
                {ENTITY_TYPE_LABEL[t]}
                <span className="ml-2 font-mono text-[11px] text-muted">{typeCounts[t] || 0}</span>
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-[12px] uppercase tracking-wide text-amber5r">Resumo</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-white p-5">
              <p className="font-serif text-[26px] text-navy-deep">{GLOSSARY.length}</p>
              <p className="text-[13px] text-muted">Entidades cadastradas</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <p className="font-serif text-[26px] text-navy-deep">{allSynonyms}</p>
              <p className="text-[13px] text-muted">Sinônimos mapeados</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <p className="font-serif text-[26px] text-navy-deep">{Object.keys(typeCounts).length}</p>
              <p className="text-[13px] text-muted">Tipos em uso</p>
            </div>
          </div>
        </section>

        <p className="text-[12.5px] text-muted">
          A edição estrutural da taxonomia (criar temas, tags e relações persistentes, reordenar a nuvem)
          fica disponível com o banco configurado. A fonte de verdade atual é a seed versionada em
          <code className="mx-1 font-mono text-[12px]">content/glossary.ts</code> e
          <code className="ml-1 font-mono text-[12px]">lib/five-rs.ts</code>.
        </p>
      </div>
    </>
  );
}
