import type { FundamentalStudy } from "@/lib/five-r-studies";

// StudyCard — renderiza uma referência âncora da biblioteca de cada R.
// Server component: sem estado, apenas apresentação com os tokens da marca.

function studyHref(study: FundamentalStudy): string | undefined {
  if (study.url) return study.url;
  if (study.doi) return `https://doi.org/${study.doi}`;
  return undefined;
}

export function StudyCard({ study }: { study: FundamentalStudy }) {
  const href = studyHref(study);

  return (
    <li className="rounded-lg border border-line bg-paper p-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-block rounded font-mono text-[10px] uppercase tracking-[0.1em] bg-mist text-navy px-2 py-[3px]">
          Estudo fundamental
        </span>
        {study.gold && (
          <span
            className="inline-block rounded font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-[3px]"
            style={{ backgroundColor: "#C8842E1f", color: "#9A6410" }}
          >
            Revisão Ouro
          </span>
        )}
      </div>

      <p className="mt-2 font-serif text-[15px] leading-snug text-navy-deep">{study.title}</p>

      <p className="mt-1.5 text-[11.5px] text-muted">
        {study.type} · {study.source} · {study.year}
      </p>

      <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{study.synthesis}</p>

      <p className="mt-2 text-[12.5px] leading-relaxed text-ink/70">
        <span className="font-semibold text-navy">Por que sustenta este R: </span>
        {study.connection}
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
        <span className="uppercase tracking-[0.08em]">
          Acesso {study.access === "gratuito" ? "gratuito" : "pago"}
        </span>
        {study.doi && <span>DOI: {study.doi}</span>}
        {study.pmid && <span>PMID: {study.pmid}</span>}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-semibold text-navy underline decoration-line underline-offset-2 hover:decoration-navy"
          >
            Ver fonte →
          </a>
        )}
      </div>
    </li>
  );
}
