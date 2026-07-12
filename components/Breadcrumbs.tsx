import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="Trilha de navegação" className="mb-6 text-[13px] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-line">/</span>}
              {i === items.length - 1 ? (
                <span className="text-ink">{it.name}</span>
              ) : (
                <Link href={it.path} className="hover:text-navy">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
