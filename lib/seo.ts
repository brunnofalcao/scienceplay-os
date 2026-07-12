import type { Metadata } from "next";
import { SITE } from "./site";

// Helpers de SEO/AEO/GEO: metadados por página + JSON-LD (dados estruturados).
// Regra: nunca marcar dados que não aparecem na página.

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  const fullTitle =
    opts.path === "/" ? `${SITE.name} — ${SITE.tagline}` : `${opts.title} · ${SITE.name}`;
  return {
    title: fullTitle,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: "pt_BR",
      type: opts.type || "website",
      publishedTime: opts.publishedTime,
      modifiedTime: opts.modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
    },
  };
}

// ---- JSON-LD builders ----
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
    brand: { "@type": "Brand", name: SITE.name },
    description: SITE.description,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/glossario?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function definedTermLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: opts.name,
    description: opts.description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Glossário 5R",
      url: `${SITE.url}/glossario`,
    },
    url: `${SITE.url}${opts.path}`,
  };
}

export function newsArticleLd(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: opts.authorName },
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
    },
    mainEntityOfPage: `${SITE.url}${opts.path}`,
  };
}

export function courseLd(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    provider: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
    url: `${SITE.url}${opts.path}`,
  };
}
