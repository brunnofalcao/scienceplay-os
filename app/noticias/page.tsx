import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { RChip } from "@/components/RScale";
import { StateBlock, STATE_COPY } from "@/components/States";
import { NEWS, newsOfTheDay } from "@/content/news";
import { FIVE_RS } from "@/lib/five-rs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notícias científicas sobre saúde intestinal",
  description:
    "Estudos recentes sobre microbiota, alimentação e saúde intestinal, reescritos em linguagem acessível — com nível de evidência, limitações e fontes rastreáveis.",
  path: "/noticias",
});

export default function Page() {
  const today = newsOfTheDay();
  const rest = NEWS.filter((n) => n.slug !== today.slug);

  return (
    <div className="wrap py-12">
      <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Notícias", path: "/noticias" }]} />

      <header className="max-w-3xl">
        <span className="kicker">Ciência traduzida, todos os dias</span>
        <h1 className="mt-3 text-[38px] leading-[1.08]">Notícias científicas</h1>
        <p className="prose-5r mt-3">
          Selecionamos estudos relevantes sobre saúde intestinal e microbiota e os reescrevemos com clareza
          — sempre mostrando o que o estudo encontrou, o que ele <em>não</em> permite concluir e a fonte
          original. Se nenhum estudo atinge os critérios do dia, preferimos não publicar.
        </p>
      </header>

      {/* Filtros por R */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-[13px] text-muted">Filtrar por R:</span>
        {FIVE_RS.map((r) => (
          <RChip key={r.key} rKey={r.key} />
        ))}
      </div>

      {/* Notícia do dia */}
      <section className="mt-10">
        <Link href={`/noticias/${today.slug}`} className="group grid gap-6 overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-2">
          <div className="bg-navy-deep p-8 text-white">
            <span className="kicker">Notícia do dia</span>
            <h2 className="mt-3 font-serif text-[26px] leading-tight text-white group-hover:text-mist">{today.title}</h2>
            <p className="mt-3 text-[15px] text-mist/85">{today.quickAnswer}</p>
          </div>
          <div className="flex flex-col justify-center p-8">
            <div className="flex flex-wrap items-center gap-2">
              <EvidenceBadge grade={today.evidence} />
              {today.rTags.map((r) => <RChip key={r} rKey={r} />)}
            </div>
            <p className="mt-4 text-[14px] text-ink/70">{today.found}</p>
            <span className="mt-4 font-medium text-navy group-hover:underline">Ler a análise completa →</span>
          </div>
        </Link>
      </section>

      {/* Lista */}
      <section className="mt-10">
        <h2 className="text-[22px]">Todas as notícias</h2>
        {rest.length === 0 ? (
          <div className="mt-4">
            <StateBlock variant="info" title={STATE_COPY.noValidNews}>
              Volte amanhã — publicamos quando um novo estudo atende aos critérios editoriais.
            </StateBlock>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((n) => (
              <li key={n.slug}>
                <Link href={`/noticias/${n.slug}`} className="card group flex h-full flex-col transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <EvidenceBadge grade={n.evidence} showLabel={false} />
                    <span className="text-[12px] text-muted">{n.category}</span>
                  </div>
                  <h3 className="mt-2 flex-1 font-serif text-[18px] leading-snug text-navy-deep group-hover:text-navy">{n.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {n.rTags.map((r) => <RChip key={r} rKey={r} />)}
                  </div>
                  <time className="mt-3 block text-[12px] text-muted">
                    {new Date(n.publishedAt).toLocaleDateString("pt-BR")}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
