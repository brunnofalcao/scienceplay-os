"use client";

// CTA rastreado de uma Branded Page. Único componente client desta feature:
// dispara o evento "BrandedCTAClick" no dataLayer (GTM/GA4) com {brand, kind, href}.
// A página em si permanece server component.

import { track } from "@/lib/analytics";
import type { CtaKind } from "@/content/branded";

const KIND_STYLE: Record<CtaKind, string> = {
  produto: "btn-primary",
  site: "btn-navy",
  material: "btn-navy",
  contato: "btn-ghost",
};

export function CtaButton({
  label,
  href,
  kind,
  brand,
  variant,
}: {
  label: string;
  href: string;
  kind: CtaKind;
  brand: string;
  // "hero" força o estilo âmbar de destaque; caso contrário segue o kind.
  variant?: "hero";
}) {
  const cls = variant === "hero" ? "btn-primary" : KIND_STYLE[kind];
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={cls}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer sponsored" : undefined}
      onClick={() =>
        // Evento customizado — nome estável para configurar no GTM/GA4.
        track("BrandedCTAClick" as never, { brand, kind, href })
      }
    >
      {label}
    </a>
  );
}
