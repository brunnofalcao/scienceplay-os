import Link from "next/link";
import { GlossarySearch } from "@/components/GlossarySearch";
import { RScale } from "@/components/RScale";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { RChip } from "@/components/RScale";
import { NEWS, newsOfTheDay } from "@/content/news";
import { popularTerms } from "@/lib/search";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Protocolo 5R",
  description: SITE.description,
  path: "/",
});

export default function Home() {
  const today = newsOfTheDay();
  const recent = NEWS.slice(0, 3);
  const terms = popularTerms(14);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-navy-deep text-white">
        <div className="wrap py-16 md:py-24">
          <span className="kicker">Portal científico · Science Play</span>
          <h1 className="mt-4 max-w-[16ch] font-serif text-[40px] font-normal leading-[1.05] text-white md:text-[58px]">
            O Protocolo 5R, traduzido da ciência para a sua vida.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-mist/85">
            Saúde intestinal e microbiota explicadas com base em evidências. Pesquise qualquer termo —
            alimento, sintoma, suplemento, bactéria — e entenda como ele se relaciona com os cinco Rs.
          </p>

          <div className="mt-8 max-w-2xl">
            <GlossarySearch size="lg" />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-mist/70">
              <span>Populares:</span>
              {["kefir", "glúten", "SII", "probiótico", "constipação"].map((t) => (
                <Link key={t} href={`/glossario?q=${encodeURIComponent(t)}`} className="rounded-full border border-white/20 px-3 py-1 hover:border-amber5r hover:text-white">
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OS CINCO RS */}
      <section className="wrap py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="kicker">A metodologia</span>
            <h2 className="mt-2 text-[30px]">Cinco etapas. Uma sequência clínica.</h2>
            <p className="prose-5r mt-2">
              O 5R organiza a intervenção em saúde intestinal por lógica de risco e resposta — não é um
              kit de suplementos. Cada etapa tem um objetivo e limites claros.
            </p>
          </div>
          <Link href="/os-cinco-rs" className="btn-ghost">Ver os cinco Rs</Link>
        </div>
        <div className="mt-8">
          <RScale />
        </div>
      </section>

      {/* NOTÍCIA DO DIA + RECENTES */}
      <section className="border-y border-line bg-white">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="kicker">Matéria do dia</span>
            <Link href={`/noticias/${today.slug}`} className="group mt-3 block">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-[12px] text-muted">{today.category}</span>
                {today.rTags.map((r) => (
                  <RChip key={r} rKey={r} />
                ))}
              </div>
              <h2 className="text-[27px] leading-tight group-hover:text-navy">{today.headline}</h2>
              <p className="prose-5r mt-3">{today.subheadline}</p>
              <span className="mt-3 inline-block font-medium text-navy">Ler a matéria completa →</span>
            </Link>
          </div>

          <div>
            <span className="kicker">Publicadas recentemente</span>
            <ul className="mt-4 divide-y divide-line">
              {recent.map((n) => (
                <li key={n.slug} className="py-4">
                  <Link href={`/noticias/${n.slug}`} className="group block">
                    <span className="mb-1 block text-[12px] text-muted">{n.category}</span>
                    <p className="text-[15.5px] font-medium leading-snug text-ink group-hover:text-navy">{n.headline}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/noticias" className="mt-3 inline-block text-[14px] font-medium text-navy hover:underline">
              Todas as notícias →
            </Link>
          </div>
        </div>
      </section>

      {/* NUVEM DE TERMOS / GLOSSÁRIO */}
      <section className="wrap py-16">
        <span className="kicker">Glossário 5R</span>
        <h2 className="mt-2 text-[30px]">Uma biblioteca viva de termos da saúde intestinal</h2>
        <p className="prose-5r mt-2">
          Cada termo explica o que é, como se relaciona com o intestino, em qual R se encaixa, o que as
          evidências sugerem e o que ainda não está comprovado — sempre com as fontes à vista.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {terms.map((t) => {
            const scale = 0.85 + Math.min(0.6, (t.popularity || 40) / 120);
            return (
              <Link
                key={t.slug}
                href={`/glossario/${t.slug}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 font-medium text-navy-deep transition-colors hover:border-navy hover:bg-mist"
                style={{ fontSize: `${13 * scale}px` }}
                title={ENTITY_TYPE_LABEL[t.type]}
              >
                {t.name}
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-[12.5px] text-muted">
          O destaque visual reflete interesse editorial e de busca — <strong>não</strong> a força da evidência.
        </p>
      </section>

      {/* DOIS PÚBLICOS */}
      <section className="border-t border-line bg-white">
        <div className="wrap grid gap-6 py-16 md:grid-cols-2">
          <div className="card flex flex-col">
            <span className="tag">Para a população</span>
            <h3 className="mt-3 text-[22px]">Entenda o que você sente e o que a ciência diz</h3>
            <p className="prose-5r mt-2 flex-1">
              Pesquise sintomas, alimentos e hábitos. Encontre respostas claras, com fontes, e saiba
              quando procurar um profissional. Informação gratuita, sempre.
            </p>
            <Link href="/o-que-e-5r" className="btn-navy mt-5 self-start">O que é o Protocolo 5R</Link>
          </div>
          <div className="card flex flex-col border-navy/20 bg-mist/40">
            <span className="tag">Para profissionais de saúde</span>
            <h3 className="mt-3 text-[22px]">Transforme evidência em conduta clínica</h3>
            <p className="prose-5r mt-2 flex-1">
              A Certificação Profissional 5R organiza o método em conduta aplicável — da triagem de risco
              à manutenção. A única formação paga do portal.
            </p>
            <Link href="/certificacao" className="btn-primary mt-5 self-start">Conheça a certificação</Link>
          </div>
        </div>
      </section>

      {/* COMO O CONHECIMENTO É PRODUZIDO */}
      <section className="wrap py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div>
            <span className="kicker">Nossa linha editorial</span>
            <h2 className="mt-2 text-[28px]">Como este conteúdo é produzido</h2>
            <p className="prose-5r mt-2">
              Partimos da literatura científica (PubMed, Crossref, Europe PMC) para encontrar temas
              relevantes e transformá-los em <strong>reportagens</strong> acessíveis. A linguagem de cada
              matéria respeita o alcance das fontes — diferenciando associação, hipótese, mecanismo e efeito
              demonstrado. As fontes ficam sempre à vista.
            </p>
            <Link href="/politica-editorial" className="btn-ghost mt-5">Leia a política editorial</Link>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {[
              ["01", "Encontrar", "Identificar, na literatura, temas relevantes para a saúde intestinal."],
              ["02", "Contextualizar", "Entender o que já se sabia e o que a nova pesquisa acrescenta."],
              ["03", "Traduzir", "Escrever a matéria em linguagem de gente, com o que importa no dia a dia."],
              ["04", "Rastrear", "Deixar visível o nível de evidência e as fontes originais."],
            ].map(([n, t, d]) => (
              <li key={n} className="card">
                <span className="font-mono text-[12px] text-amber5r">{n}</span>
                <h4 className="mt-1 text-[17px]">{t}</h4>
                <p className="mt-1 text-[13.5px] text-ink/70">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
