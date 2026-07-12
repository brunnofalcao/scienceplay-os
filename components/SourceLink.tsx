"use client";

import { track } from "@/lib/analytics";

// Link para a fonte original. Dispara SourceClick. Se não houver URL nem DOI,
// mostra que a fonte é um exemplo representativo (seed de demonstração).
export function SourceLink({ url, doi, slug }: { url?: string; doi?: string; slug: string }) {
  const href = url || (doi ? `https://doi.org/${doi}` : null);
  if (!href) {
    return (
      <p className="mt-2 text-[13px] text-muted">
        Fonte representativa de demonstração do formato editorial. As notícias reais do portal trazem o
        link direto para o estudo.
      </p>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={() => track("SourceClick", { slug, href })}
      className="mt-3 inline-flex items-center gap-1.5 font-medium text-navy hover:underline"
    >
      Acessar o estudo original
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
    </a>
  );
}
