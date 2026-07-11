import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RScale } from "@/components/RScale";
import { CertCTA } from "@/components/CertCTA";
import { JsonLd } from "@/components/JsonLd";
import { FIVE_RS } from "@/lib/five-rs";
import { pageMetadata, faqLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "O que é o Protocolo 5R",
  description:
    "O Protocolo 5R é um método clínico em cinco etapas — Remover, Recolocar, Reparar, Reinocular e Reequilibrar — para organizar o cuidado da saúde intestinal com base em evidências. Entenda origem, aplicações e limites.",
  path: "/o-que-e-5r",
});

const FAQS = [
  {
    q: "O Protocolo 5R é uma dieta?",
    a: "Não. O 5R é um método de raciocínio clínico em cinco etapas que organiza a intervenção em saúde intestinal por lógica de risco e resposta. A alimentação faz parte, mas o método não se resume a uma dieta única.",
  },
  {
    q: "Qualquer pessoa pode aplicar o Protocolo 5R sozinha?",
    a: "O conteúdo deste portal é educacional. A aplicação clínica — com decisões sobre exames, condutas e suplementos — deve ser conduzida por um profissional de saúde habilitado.",
  },
  {
    q: "O 5R serve para quê?",
    a: "É mais estudado em distúrbios funcionais do intestino, como a síndrome do intestino irritável. Não é indicado como primeiro passo diante de sinais de alarme, que exigem investigação médica.",
  },
  {
    q: "O 5R promete cura?",
    a: "Não. O objetivo é melhora sustentada e conduta reproduzível, não cura garantida. Evidências mudam e a resposta varia entre pessoas.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQS)} />
      <div className="wrap py-12">
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "O que é o 5R", path: "/o-que-e-5r" }]} />

        <header className="max-w-3xl">
          <span className="kicker">A metodologia</span>
          <h1 className="mt-3 text-[40px] leading-[1.08]">O que é o Protocolo 5R</h1>
          <p className="prose-5r mt-4 text-[18px]">
            O Protocolo 5R é um método clínico que organiza o cuidado da saúde intestinal em cinco etapas
            sequenciais. Ele existe para transformar ciência em conduta — e para separar o que tem evidência
            do que é apenas hype.
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="prose-5r max-w-none">
            <h2>Origem e propósito</h2>
            <p>
              A lógica dos &ldquo;Rs&rdquo; nasceu na medicina funcional como forma de estruturar a
              recuperação da função gastrointestinal. O Protocolo 5R, na leitura da Science Play, atualiza
              essa lógica com a melhor evidência disponível: diretrizes de sociedades científicas, revisões
              sistemáticas e ensaios clínicos sobre distúrbios da interação intestino-cérebro, dieta,
              microbiota e estilo de vida.
            </p>
            <p>
              O propósito é ser um <strong>sistema de raciocínio</strong>, não uma lista de produtos. Cada
              etapa responde a uma pergunta clínica: o que remover, o que recolocar, o que reparar, o que
              reinocular e como reequilibrar para manter o resultado.
            </p>

            <h2>Como a metodologia está organizada</h2>
            <p>
              As cinco etapas seguem uma ordem que reflete prioridade clínica — primeiro reduzir gatilhos e
              risco, depois restaurar função, cuidar da barreira, apoiar a microbiota e sustentar o
              resultado com estilo de vida.
            </p>
            <div className="not-prose my-6">
              <RScale />
            </div>
            <ul>
              {FIVE_RS.map((r) => (
                <li key={r.key}>
                  <Link href={`/os-cinco-rs/${r.key}`}>
                    <strong>{r.name}</strong>
                  </Link>{" "}
                  — {r.objective}
                </li>
              ))}
            </ul>

            <h2>Aplicações</h2>
            <p>
              O 5R é mais aplicável em distúrbios funcionais do intestino (como a síndrome do intestino
              irritável), em quadros de constipação e diarreia funcionais, distensão e sintomas
              pós-infecciosos. Nesses contextos, ele oferece uma sequência de decisões com checkpoints e
              critérios de progressão.
            </p>

            <h2>Limites do método</h2>
            <p>
              O 5R <strong>não</strong> é o primeiro passo diante de sinais de alarme (perda de peso,
              sangramento, anemia, febre, sintomas noturnos, início após os 50 anos): esses casos exigem
              investigação médica. O método também não valida &ldquo;permeabilidade intestinal&rdquo; como
              explicação universal, nem transforma &ldquo;disbiose&rdquo; em diagnóstico de conveniência, e
              não trata suplementos como núcleo do cuidado.
            </p>

            <h2>Educação não é prescrição</h2>
            <p>
              Este portal explica o método para a população e organiza o conhecimento. Ele{" "}
              <strong>não</strong> faz diagnóstico, não indica doses individuais e não substitui a avaliação
              de um profissional. A diferença entre entender o método e aplicá-lo com segurança é
              justamente o papel do profissional de saúde.
            </p>

            <h2>A importância do profissional</h2>
            <p>
              Aplicar o 5R exige avaliar risco, fenotipar o quadro, escolher intervenções por evidência e
              acompanhar a resposta ao longo do tempo. Por isso a Science Play oferece a Certificação
              Profissional 5R — para que quem cuida aplique o método com método.
            </p>

            <h2>Perguntas frequentes</h2>
            <dl className="not-prose divide-y divide-line rounded-xl border border-line bg-white">
              {FAQS.map((f) => (
                <div key={f.q} className="p-5">
                  <dt className="font-serif text-[17px] text-navy-deep">{f.q}</dt>
                  <dd className="mt-1.5 text-[15px] text-ink/80">{f.a}</dd>
                </div>
              ))}
            </dl>

            <h2>Referências</h2>
            <p className="text-[14px] text-muted">
              O conteúdo se apoia em diretrizes e revisões recentes sobre distúrbios da interação
              intestino-cérebro, dieta e microbiota. Cada notícia e cada verbete do glossário citam as
              fontes específicas. Veja a{" "}
              <Link href="/politica-editorial">política editorial e científica</Link> para entender como as
              evidências são selecionadas e classificadas.
            </p>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <h3 className="text-[16px]">Nesta página</h3>
              <ul className="mt-3 space-y-1.5 text-[14px] text-navy">
                <li><a href="#" className="hover:underline">Origem e propósito</a></li>
                <li>Como está organizada</li>
                <li>Aplicações e limites</li>
                <li>Educação × prescrição</li>
              </ul>
            </div>
            <div className="mt-4 card bg-navy-deep text-mist">
              <p className="font-serif text-[16px] text-white">Aviso educacional</p>
              <p className="mt-2 text-[13.5px] text-mist/80">
                Conteúdo informativo. Não substitui consulta, diagnóstico ou prescrição. Em situações de
                risco, procure atendimento profissional.
              </p>
              <Link href="/legal/aviso-medico" className="mt-3 inline-block text-[13px] text-amber5r hover:underline">
                Ler o aviso completo →
              </Link>
            </div>
          </aside>
        </div>

        <CertCTA intent="method" context="o-que-e-5r" />
      </div>
    </>
  );
}
