import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertCTA } from "@/components/CertCTA";
import { FIVE_RS } from "@/lib/five-rs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Os cinco Rs",
  description:
    "Remover, Recolocar, Reparar, Reinocular e Reequilibrar: conheça cada uma das cinco etapas do Protocolo 5R, com objetivo, exemplos educacionais e limites.",
  path: "/os-cinco-rs",
});

export default function Page() {
  return (
    <div className="wrap py-12">
      <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Os cinco Rs", path: "/os-cinco-rs" }]} />

      <header className="max-w-3xl">
        <span className="kicker">A metodologia, etapa por etapa</span>
        <h1 className="mt-3 text-[40px] leading-[1.08]">Os cinco Rs</h1>
        <p className="prose-5r mt-4 text-[18px]">
          Uma sequência clínica que vai do que atrapalha ao que sustenta o resultado. Cada etapa tem um
          objetivo claro — e limites igualmente claros. Explore cada R.
        </p>
      </header>

      <div className="mt-12 space-y-4">
        {FIVE_RS.map((r) => (
          <Link
            key={r.key}
            href={`/os-cinco-rs/${r.key}`}
            className="group grid gap-5 overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-md md:grid-cols-[220px_1fr]"
          >
            <div
              className="flex flex-col justify-between p-6"
              style={{ backgroundColor: r.color, color: r.order >= 5 ? "#131A45" : "#fff" }}
            >
              <span className="font-mono text-[13px]" style={{ opacity: 0.85 }}>{r.n}</span>
              <span className="font-serif text-[28px] font-medium">{r.name}</span>
              <span className="font-mono text-[11px] uppercase tracking-wide" style={{ opacity: 0.75 }}>
                {r.english}
              </span>
            </div>
            <div className="p-6">
              <p className="font-serif text-[19px] text-navy-deep">{r.tagline}</p>
              <p className="prose-5r mt-2">{r.objective}</p>
              <span className="mt-3 inline-block font-medium text-navy group-hover:underline">
                Entender {r.name} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <CertCTA intent="method" context="os-cinco-rs" />
    </div>
  );
}
