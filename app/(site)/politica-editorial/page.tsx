import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, faqLd } from "@/lib/seo";
import { EVIDENCE_SCALE, type EvidenceGrade } from "@/lib/evidence";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política editorial e científica",
  description:
    "Como o Protocolo 5R transforma temas científicos em notícias e conteúdos acessíveis: fontes utilizadas, uso de estudos como base para pautas originais, linguagem proporcional às fontes e a escala de evidência A–D.",
  path: "/politica-editorial",
});

const FAQS = [
  {
    q: "Qual é a diferença entre uma notícia e a Biblioteca Científica?",
    a: "A notícia é uma pauta editorial original, escrita em linguagem acessível a partir de um ou mais estudos, com contexto e explicação. A Biblioteca Científica reúne verbetes e registros de referência sobre estudos e temas, organizados para consulta. O estudo é a fonte; a publicação é o produto editorial construído a partir dela.",
  },
  {
    q: "O Protocolo 5R apenas traduz ou resume estudos?",
    a: "Não. Os estudos são utilizados como fontes para a construção de pautas editoriais originais. A publicação reúne, contextualiza e explica achados, sempre respeitando o alcance das fontes e diferenciando hipóteses, associações, mecanismos e efeitos clínicos demonstrados.",
  },
  {
    q: "O que significam as classificações A, B, C e D?",
    a: "São graus de confiança na evidência disponível. A indica evidência forte (revisões sistemáticas, meta-análises, diretrizes); B, evidência moderada; C, evidência limitada; e D, evidência insuficiente. Cada grau tem um teto: não afirma mais do que o desenho dos estudos permite. A classificação é uma referência secundária que acompanha o conteúdo, não um selo de recomendação.",
  },
  {
    q: "Existe conteúdo comercial no portal?",
    a: "Sim. O portal é mantido também por certificações, parcerias, patrocínios e conteúdos comerciais, incluindo Branded Pages. Toda relação comercial é identificada de forma clara e visível, e nunca é ocultada. Os detalhes estão na Política de Publicidade e Parcerias.",
  },
  {
    q: "Como reporto um erro que encontrei no portal?",
    a: "Escreva para " + SITE.contactEmail + " descrevendo o conteúdo e o problema. O procedimento completo está descrito na Política de Correções.",
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
          Como o Protocolo 5R trata a ciência
        </h1>
        <p className="prose-5r mt-5">
          Este documento descreve, de forma aberta, o objetivo editorial do
          portal, os temas que cobre, os tipos de fontes que utiliza e os
          critérios que orientam a construção de cada publicação. A transparência
          sobre o método é parte do compromisso do {SITE.name}: informar sobre
          saúde com rigor, cautela e honestidade sobre os próprios limites.
        </p>
      </header>

      <div className="prose-5r">
        <div
          role="note"
          className="not-prose my-6 rounded-xl border border-navy/20 bg-mist p-5 text-[15px] leading-relaxed text-navy-deep"
        >
          <p className="mb-2 font-serif text-[17px]">Premissa editorial</p>
          <p>
            O Protocolo 5R transforma temas científicos relacionados à saúde
            intestinal, microbiota, alimentação, comportamento e estilo de vida
            em notícias e conteúdos acessíveis para a população. Os estudos são
            utilizados como fontes para a construção de pautas editoriais
            originais. A linguagem de cada publicação deve respeitar o alcance
            das fontes utilizadas, diferenciando hipóteses, associações,
            mecanismos e efeitos clínicos demonstrados.
          </p>
        </div>

        <h2>Objetivo editorial</h2>
        <p>
          O {SITE.name} existe para tornar a ciência da saúde intestinal e do
          eixo intestino-cérebro compreensível para o público em geral, sem
          abrir mão do rigor. O objetivo não é apenas divulgar estudos, mas
          construir pautas editoriais originais que expliquem, contextualizem e
          conectem achados científicos ao cotidiano de quem lê — sempre dentro
          dos limites do que a evidência sustenta.
        </p>

        <h2>Temas cobertos</h2>
        <p>
          O escopo editorial reúne os temas em torno dos quais o Protocolo 5R se
          organiza:
        </p>
        <ul>
          <li>saúde intestinal e funcionamento do trato digestivo;</li>
          <li>microbiota e sua relação com a saúde;</li>
          <li>alimentação, nutrientes e padrões alimentares;</li>
          <li>comportamento, sono, estresse e eixo intestino-cérebro;</li>
          <li>estilo de vida e hábitos com impacto sobre a saúde intestinal.</li>
        </ul>

        <h2>Tipos de fontes</h2>
        <p>
          A base do conteúdo é a literatura científica revisada por pares e os
          documentos de referência de sociedades e órgãos reconhecidos. Entre as
          fontes utilizadas estão:
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
            <strong>Crossref</strong> — metadados e DOIs para rastrear a origem, a
            versão e as citações de cada publicação.
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
          A prioridade é sempre a fonte primária. Agregadores e bases de busca
          ajudam a localizar o material, mas a leitura e a interpretação partem
          do estudo original, não de resumos de terceiros.
        </p>

        <h2>Notícia e Biblioteca Científica</h2>
        <p>
          O portal publica em dois formatos complementares, com propósitos
          distintos:
        </p>
        <ul>
          <li>
            <strong>Notícia:</strong> pauta editorial original, escrita em
            linguagem acessível a partir de uma ou mais fontes científicas.
            Explica, contextualiza e conecta achados ao interesse do público.
          </li>
          <li>
            <strong>Biblioteca Científica:</strong> conjunto de verbetes e
            registros de referência sobre estudos e temas, organizados para
            consulta e para dar rastreabilidade às pautas.
          </li>
        </ul>

        <h2>O estudo é fonte, não produto</h2>
        <p>
          Um artigo científico não é publicado como se fosse o conteúdo final. Ele
          é a <strong>fonte</strong> a partir da qual se constrói uma pauta
          original. Isso significa reunir o que o estudo de fato mediu, a
          população envolvida, as limitações reconhecidas pelos autores e o
          contexto de outros trabalhos sobre o tema. O produto editorial é a
          explicação — não o resumo mecânico de um único artigo.
        </p>

        <h2>Critérios de precisão</h2>
        <p>
          Cada publicação busca fidelidade ao que as fontes sustentam. Preservamos
          o que o estudo mediu, a população estudada e as limitações declaradas.
          Evitamos exageros, extrapolações e a transformação de associação em
          causa. Um resultado isolado, por mais chamativo, não altera sozinho o
          entendimento de um tema: o que pesa é o conjunto da evidência e a sua
          replicação.
        </p>

        <h2>Linguagem proporcional às fontes</h2>
        <p>
          A linguagem de cada publicação respeita o alcance das fontes utilizadas.
          Há uma trava de proporcionalidade em todo o conteúdo: um texto não pode
          declarar mais do que o desenho dos estudos permite. Por isso, diferentes
          níveis de afirmação recebem palavras diferentes:
        </p>
        <ul>
          <li>
            <strong>Associação:</strong> dois fatores aparecem relacionados nos
            dados, sem que isso demonstre que um cause o outro.
          </li>
          <li>
            <strong>Hipótese:</strong> uma explicação plausível ainda em
            investigação, que precisa de confirmação.
          </li>
          <li>
            <strong>Mecanismo:</strong> um caminho biológico que explica como algo
            poderia acontecer, muitas vezes observado em laboratório ou modelos.
          </li>
          <li>
            <strong>Efeito clínico demonstrado:</strong> um benefício ou dano
            medido em pessoas, em estudos de desenho adequado e, idealmente,
            replicado.
          </li>
        </ul>
        <p>
          Confundir esses níveis é a origem mais comum da desinformação em saúde.
          Mantê-los separados é um critério editorial central do portal.
        </p>

        <h2>Classificação de evidência A–D</h2>
        <p>
          Como referência secundária, os temas podem receber um grau que comunica
          a confiança da evidência disponível. A escala é adaptada de padrões de
          evidência reconhecidos e cada grau tem um teto — aquilo que ele{" "}
          <em>não</em> autoriza afirmar. O nível D nunca declara efeito clínico.
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

        <h2>Conteúdo comercial e Branded Pages</h2>
        <p>
          O {SITE.name} é uma iniciativa da {SITE.legalName} e pode ser mantido
          por receitas de certificações, empresas parceiras, patrocinadores,
          projetos especiais e conteúdos comerciais. Isso inclui conteúdo
          patrocinado e <strong>Branded Pages</strong> — páginas produzidas em
          relação comercial com uma marca. A existência de uma relação comercial
          nunca é ocultada: esses conteúdos são identificados de forma clara e
          visível. A presença de uma marca, produto ou serviço no portal não
          representa recomendação individual. As regras completas estão na{" "}
          <a href="/legal/publicidade-parcerias">Política de Publicidade e Parcerias</a>.
        </p>

        <h2>Conflitos de interesse</h2>
        <p>
          Buscamos identificar e sinalizar conflitos de interesse relevantes nos
          estudos citados — financiamento, vínculos comerciais ou patrocínio que
          possam influenciar a leitura dos resultados. Da mesma forma, quando o
          próprio conteúdo do portal decorre de uma relação comercial, essa
          relação é declarada de forma visível.
        </p>

        <h2>Patrocínios</h2>
        <p>
          Patrocínios sustentam parte da operação do portal e são sempre
          sinalizados. Um patrocínio não altera a proporcionalidade entre a
          linguagem e as fontes: mesmo em conteúdo apoiado comercialmente, os
          critérios de precisão e a distinção entre associação, hipótese,
          mecanismo e efeito clínico continuam valendo. A separação entre
          conteúdo editorial e conteúdo comercial é detalhada na{" "}
          <a href="/legal/publicidade-parcerias">Política de Publicidade e Parcerias</a>.
        </p>

        <h2>Correções</h2>
        <p>
          Se você encontrar uma imprecisão, escreva para{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. O
          procedimento completo — como reportar, como os relatos são avaliados e
          como as mudanças são registradas — está descrito na{" "}
          <a href="/legal/correcoes">Política de Correções</a>.
        </p>

        <h2>Atualizações</h2>
        <p>
          A ciência muda. Um tema tratado hoje pode ser reavaliado quando surgem
          novas revisões, diretrizes ou ensaios relevantes. O conteúdo pode ser
          atualizado e a classificação de evidência pode subir ou descer conforme
          o conjunto de estudos evolui. A data de atualização acompanha os
          conteúdos que dependem do estado atual da literatura.
        </p>

        <h2>Autoria e colaboradores</h2>
        <p>
          A autoria padrão das publicações é da <strong>Redação Protocolo 5R</strong>,
          que responde editorialmente pelo conteúdo. Nomes de autores, revisores
          ou colaboradores aparecem apenas quando a participação é real e
          confirmada — o portal não atribui conteúdo a pessoas ou especialistas
          que não tenham efetivamente contribuído. Quando um conselho científico
          ou colaboradores forem formalizados, serão identificados de forma
          nominal.
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

        <h2>Contato</h2>
        <p>
          Dúvidas sobre esta política, sugestões de pauta e contatos institucionais
          podem ser enviados para{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
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
