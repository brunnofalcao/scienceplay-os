import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { FIVE_RS } from "@/lib/five-rs";
import { GLOSSARY } from "@/content/glossary";
import { NEWS } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticRoutes = [
    "",
    "/o-que-e-5r",
    "/os-cinco-rs",
    "/glossario",
    "/noticias",
    "/certificacao",
    "/politica-editorial",
    "/sobre",
    "/legal/termos",
    "/legal/privacidade",
    "/legal/cookies",
    "/legal/aviso-medico",
    "/legal/correcoes",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const rRoutes = FIVE_RS.map((r) => ({
    url: `${base}/os-cinco-rs/${r.key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const glossaryRoutes = GLOSSARY.map((e) => ({
    url: `${base}/glossario/${e.slug}`,
    lastModified: new Date(e.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newsRoutes = NEWS.map((n) => ({
    url: `${base}/noticias/${n.slug}`,
    lastModified: new Date(n.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...rRoutes, ...glossaryRoutes, ...newsRoutes];
}
