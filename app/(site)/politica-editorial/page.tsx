import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, faqLd } from "@/lib/seo";
import { EVIDENCE_SCALE, type EvidenceGrade } from "@/lib/evidence";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política editorial e científica",
  description:
    "Como o Protocolo 5R encontra, seleciona, avalia, resume e classifica evidências científicas. O papel da inteligência artificial, a revisão humana obrigatória e a escala de evidência A–D.",
  path: "/politica-editorial",
});

const FAQS = [
  {
    q: "A inteligência artificial decide a classificação de evidência?",
    a: "Não. A IA interpreta, resume e traduz os estudos para uma linguagem acessível, mas não é a fonte primária da classificação. A escala de evidência é definida por critérios editoriais fixos e toda publicação passa por revisão humana antes de ir ao ar.",
  },
  {
    q: "Existe conteúdo publicado de forma totalmente automática?",
    a: "Não. Na fase atual do projeto, nenhum conteúdo é publicado sem revisão humana. A automação apoia a triagem e o resumo, mas a decisão de publicar é sempre de uma pessoa responsável.",
  },
  {
    q: "O que significam as classificações A, B, C e D?",
    a: "São graus de confiança na evidência disponível. A indica evidência forte (revisões sistemáticas, meta-análises, diretrizes); B, evidência moderada; C, evidência limitada; e D, evidência insuficiente. Cada grau tem um teto: não pode afirmar mais do que o desenho dos estudos permite.",
  },
  {
    q: "Como reporto um erro que encontrei no portal?",
    a: "Escreva para " + SITE.contactEmail + " descrevendo o conteúdo e o problema. Todo erro relevante é corrigido de forma transparente e registrado conforme a nossa Política de Correções.",
  },
  {
    q: "O conteúdo do Protocolo 5R substitui uma consulta profissional?",
    a: "Não. Todo o material é educacional e informativo. Ele não faz diagnóstico, não prescreve tratamento e não substitui a avaliação de um profissional de saúde habilitado.",
  },
];

const GRADES: EvidenceGrade[] = ["A", "B", "C", "D"];

export default function PoliticaEditorialPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Política editorial e científica", path: "/politica-editorial" },
        ]}
      />
      <JsonLd data={faqLd(FAQS)} />

      <header className="mb-10 max-w-prose">
        <p className="kicker mb-3">Política editorial e científica</p>
        <h1 className="text-[40px] leading-[1.1] md:text-[46px]">
          Como o Protocolo 5R trata a evidência
        </h1>
        <p className="prose-5r mt-5">
          Este documento descreve, de forma aberta, como o portal encontra
          estudos, decide o que entra, avalia a qualidade da evidência, resume os
          achados e os classifica. A transparência sobre o método é parte do
          compromisso do {SITE.name}: publicar informação de saúde com rigor,
          cautela e honestidade sobre os próprios limites.
        </p>
      </header>

      <div className="prose-5r">
        <h2>Como os estudos são encontrados</h2>
        <p>
          A base do portal é a literatura científica revisada por pares e os
          documentos de referência de sociedades e órgãos reconhecidos. A busca é
          contínua e combina fontes primárias e agregadores:
        </p>
        <ul>
          <li>
            <strong>PubMed / MEDLINE</strong> — principal indexador de literatura
            biomédica, mantido pela National Library of Medicine.
          </li>
          <li>
            <strong>Europe PMC</strong> — repositório aberto de artigos e
            manuscritos das ciências da vida, incluindo pré-prints identificados
            como tal.
          </li>
          <li>
            <strong>Crossref</strong> — metadados e DOIs para rastrear a origem,
            a versão e as citações de cada publicação.
          </li>
          <li>
            <strong>Diretrizes (guidelines) e consensos</strong> de sociedades
            científicas e órgãos de saúde, que resumem o estado da arte de um
            tema.
          </li>
          <li>
            <strong>Publicações de sociedades científicas</strong> das áreas de
            gastroenterologia, nutrição, microbiologia e neurociência, quando
            relevantes ao eixo intestino-cérebro.
          </li>
        </ul>
        <p>
          A prioridade é sempre a fonte primária. Agregadores e ferramentas de
          busca ajudam a localizar o material, mas a leitura e a interpretação
          partem do estudo original, não de resumos de terceiros.
        </p>

        <h2>Critérios de inclusão e exclusão</h2>
        <p>
          Nem todo estudo publicado se torna conteúdo. Antes de entrar na base, um
          estudo passa por uma triagem editorial com critérios explícitos.
        </p>
        <h3>Incluímos preferencialmente</h3>
        <ul>
          <li>Revisões sistemáticas, meta-análises e diretrizes atualizadas.</li>
          <li>
            Ensaios clínicos e coortes com desenho descrito, população definida e
            desfechos claros.
          </li>
          <li>
            Estudos relevantes ao escopo do Protocolo 5R: saúde intestinal,
            microbiota e eixo intestino-cérebro.
          </li>
          <li>Publicações com fonte, metodologia e conflitos de interesse rastreáveis.</li>
        </ul>
        <h3>Excluímos ou sinalizamos com cautela</h3>
        <ul>
          <li>
            Estudos sem revisão por pares apresentados como conclusivos, quando
            usados fora do contexto de hipótese.
          </li>
          <li>
            Resultados pré-clínicos ou mecanísticos apresentados como se fossem
            efeito clínico comprovado.
          </li>
          <li>
            Conteúdo promocional, opinião sem base metodológica ou fontes sem
            rastreabilidade.
          </li>
          <li>
            Trabalhos com conflito de interesse não declarado que comprometa a
            leitura dos resultados.
          </li>
        </ul>

        <h2>Como os estudos são avaliados</h2>
        <p>
          A avaliação considera o desenho do estudo, o tamanho e a
          representatividade da amostra, a consistência com outros achados, a
          qualidade metodológica e a aplicabilidade à prática. Um resultado
          isolado, por mais chamativo, não altera sozinho a classificação de um
          tema: o que pesa é o conjunto da evidência e a sua replicação.
        </p>
        <p>
          Há uma trava de proporcionalidade em todo o processo: um nível de
          evidência não pode declarar mais do que o seu desenho permite. Um
          achado de laboratório sugere hipótese; não prova benefício em pessoas.
        </p>

        <h2>Como os estudos são resumidos</h2>
        <p>
          O resumo busca fidelidade ao estudo original e clareza para quem não é
          especialista. Preservamos o que o estudo de fato mediu, a população
          envolvida e as limitações reconhecidas pelos próprios autores. Evitamos
          exageros, extrapolações e a transformação de associação em causa.
        </p>

        <h2>O papel da inteligência artificial</h2>
        <p>
          A inteligência artificial é uma ferramenta de apoio ao trabalho
          editorial, não a autoridade final. Ela ajuda a triar volumes grandes de
          literatura, a resumir textos técnicos e a gerar uma linguagem mais
          acessível. Deixamos explícitos os seus limites:
        </p>
        <ul>
          <li>
            A IA <strong>interpreta, resume e traduz</strong> os estudos para uma
            linguagem clara.
          </li>
          <li>
            A IA <strong>não é a fonte primária da classificação</strong> de
            evidência. A escala A–D segue critérios editoriais fixos.
          </li>
          <li>
            A IA <strong>não publica sozinha</strong>. Toda saída passa por
            conferência humana.
          </li>
        </ul>

        <h2>O papel da revisão humana</h2>
        <p>
          A revisão humana é obrigatória antes de qualquer publicação. Na fase
          atual do projeto <strong>não existe publicação 100% automática</strong>:
          uma pessoa responsável confere se o resumo é fiel à fonte, se a
          classificação de evidência é proporcional ao desenho dos estudos e se a
          linguagem respeita a voz educacional e cautelosa do portal. A decisão de
          publicar é sempre humana.
        </p>

        <h2>Classificação de evidência</h2>
        <p>
          Cada tema recebe um grau que comunica a confiança da evidência
          disponível. A escala é adaptada de padrões de evidência reconhecidos,
          com uma trava importante: cada grau tem um teto — aquilo que ele
          <em> não</em> autoriza afirmar. O nível D nunca declara efeito clínico.
        </p>

        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          {GRADES.map((g) => {
            const level = EVIDENCE_SCALE[g];
            return (
              <div key={g} className="card">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg font-serif text-[18px] font-semibold text-white"
                    style={{ backgroundColor: level.color }}
                    aria-hidden="true"
                  >
                    {level.grade}
                  </span>
                  <div>
                    <p className="font-serif text-[17px] text-navy-deep">
                      {level.label}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                      Grau {level.grade}
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-[15px] leading-relaxed text-[#33373d]">
                  {level.meaning}
                </p>
                <p className="rounded-lg bg-mist px-3 py-2 text-[13.5px] leading-relaxed text-navy-deep">
                  <span className="font-semibold">Teto: </span>
                  {level.ceiling}
                </p>
              </div>
            );
          })}
        </div>

        <h2>Conflitos de interesse</h2>
        <p>
          Buscamos identificar e sinalizar conflitos de interesse relevantes nos
          estudos citados — financiamento, vínculos comerciais ou patrocínio que
          possam influenciar a leitura dos resultados. O {SITE.name} é um projeto
          editorial da {SITE.legalName} e não vende os produtos ou intervenções
          discutidos no conteúdo. Quando houver qualquer relação que possa
          configurar conflito, ela será declarada de forma visível.
        </p>

        <h2>Atualização</h2>
        <p>
          A ciência muda. Um tema classificado hoje pode ser reavaliado quando
          surgem novas revisões, diretrizes ou ensaios relevantes. O conteúdo é
          revisado periodicamente e a classificação de evidência pode subir ou
          descer conforme o conjunto de estudos evolui. A data de atualização
          acompanha os conteúdos que dependem do estado atual da literatura.
        </p>

        <h2>Correções</h2>
        <p>
          Erros acontecem e são corrigidos de forma aberta. Se você encontrar uma
          imprecisão, escreva para{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. O
          procedimento completo — como reportar, como corrigimos e como
          registramos as mudanças — está descrito na{" "}
          <a href="/legal/correcoes">Política de Correções</a>.
        </p>

        <h2>Fontes</h2>
        <p>
          As fontes primárias do portal são a literatura científica revisada por
          pares indexada em PubMed/MEDLINE e Europe PMC, os metadados de
          publicação do Crossref e os documentos de diretrizes e consensos de
          sociedades científicas e órgãos de saúde. Sempre que possível, o
          conteúdo remete à publicação original.
        </p>

        <h2>Limites da informação</h2>
        <p>
          Todo o conteúdo do {SITE.name} é educacional e informativo. Ele{" "}
          <strong>não faz diagnóstico</strong>,{" "}
          <strong>não prescreve tratamento</strong> e{" "}
          <strong>não substitui</strong> a avaliação de um profissional de saúde
          habilitado. A decisão clínica pertence ao profissional que avalia cada
          pessoa individualmente. Consulte também o{" "}
          <a href="/legal/aviso-medico">Aviso Educacional e Médico</a>.
        </p>

        <h2>Perguntas frequentes</h2>
        <div className="not-prose mt-4 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="card">
              <summary className="cursor-pointer font-serif text-[17px] text-navy-deep">
                {f.q}
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-[#33373d]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
