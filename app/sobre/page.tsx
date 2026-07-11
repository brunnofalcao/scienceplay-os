import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "Sobre o Protocolo 5R e a Science Play: a metodologia, a missão de tornar o 5R a principal referência pública e científica em português, e o compromisso de transparência.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <div className="wrap py-12">
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ]}
      />

      <header className="mb-10 max-w-prose">
        <p className="kicker mb-3">Sobre</p>
        <h1 className="text-[40px] leading-[1.1] md:text-[46px]">
          Ciência intestinal, aberta e pesquisável
        </h1>
        <p className="prose-5r mt-5">
          O {SITE.name} é um portal científico de referência sobre saúde
          intestinal, microbiota e o eixo intestino-cérebro. Ele nasce de uma
          ideia simples: transformar conhecimento validado em algo claro,
          rastreável e acessível em português — sem promessas milagrosas e sem
          abrir mão do rigor.
        </p>
      </header>

      <div className="prose-5r">
        <h2>O Protocolo 5R</h2>
        <p>
          O Protocolo 5R é a metodologia da {SITE.legalName} para organizar o
          cuidado com a saúde intestinal e o eixo intestino-cérebro em cinco
          etapas encadeadas — os cinco Rs. Ele funciona como um mapa de leitura:
          uma forma estruturada de entender por onde o cuidado intestinal costuma
          passar, sempre ancorada em evidências e nos limites do que cada nível de
          estudo permite afirmar.
        </p>
        <p>
          O 5R é apresentado aqui como referência educacional. Ele organiza o
          conhecimento e ajuda a interpretar a literatura; não é um receituário
          nem substitui a conduta individual, que pertence ao profissional de
          saúde que avalia cada pessoa. Para conhecer a metodologia em detalhe,
          veja <a href="/o-que-e-5r">O que é o 5R</a> e{" "}
          <a href="/os-cinco-rs">Os cinco Rs</a>.
        </p>

        <h2>A Science Play</h2>
        <p>
          A {SITE.legalName} é a organização responsável pelo Protocolo 5R e por
          este portal. Atua na fronteira entre ciência e prática, traduzindo
          evidência em conteúdo utilizável por profissionais e pelo público, e
          mantém a <a href="/certificacao">{SITE.certificationName}</a> voltada a
          profissionais de saúde.
        </p>
        <p>
          Dados cadastrais da organização mantenedora:
        </p>
        <ul>
          <li>
            <strong>Razão social:</strong> {SITE.legalName}
          </li>
          <li>
            <strong>CNPJ:</strong> {SITE.cnpj}
          </li>
          <li>
            <strong>Contato:</strong>{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
          </li>
        </ul>

        <h2>Nossa missão</h2>
        <p>
          A missão do projeto é tornar o Protocolo 5R a{" "}
          <strong>
            principal referência pública, científica e pesquisável em português
          </strong>{" "}
          sobre saúde intestinal e o eixo intestino-cérebro. Isso significa
          construir uma base de conhecimento aberta, com fontes rastreáveis,
          classificação honesta de evidência e linguagem clara — um lugar em que
          tanto o público quanto profissionais possam consultar, comparar e
          entender o que a ciência de fato sustenta.
        </p>

        <h2>Política de transparência</h2>
        <p>
          Transparência não é um slogan; é um método. Deixamos explícito de onde
          vem a informação, como ela é avaliada, qual o grau de confiança da
          evidência e onde estão os limites do que se pode afirmar. Somos claros
          também sobre o papel da tecnologia: a inteligência artificial apoia a
          triagem, o resumo e a linguagem, mas a classificação segue critérios
          editoriais fixos e toda publicação passa por revisão humana. Não há, na
          fase atual, publicação totalmente automática.
        </p>
        <p>
          Quando encontramos um erro — ou quando você nos aponta um — corrigimos
          de forma aberta e registrada. O detalhamento está na{" "}
          <a href="/legal/correcoes">Política de Correções</a>.
        </p>

        <h2>Como o conhecimento é produzido</h2>
        <p>
          Cada conteúdo parte da literatura científica revisada por pares e de
          documentos de sociedades e órgãos de saúde, passa por triagem, avaliação
          e resumo, recebe uma classificação de evidência proporcional ao desenho
          dos estudos e só então é revisado por uma pessoa antes de ser publicado.
          O processo completo, incluindo os critérios de inclusão e exclusão e a
          escala de evidência A–D, está descrito na{" "}
          <a href="/politica-editorial">Política editorial e científica</a>.
        </p>

        <h2>Equipe e conselho científico</h2>
        <p>
          A composição editorial e o conselho científico do Protocolo 5R serão
          listados nesta página assim que estiverem formalizados. Optamos por não
          divulgar nomes, títulos ou vínculos antes dessa formalização: anunciar
          participações não confirmadas contrariaria o próprio compromisso de
          transparência do projeto. Até lá, a responsabilidade editorial é da{" "}
          {SITE.legalName}, conforme descrito na{" "}
          <a href="/politica-editorial">política editorial</a>.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas, sugestões, correções e contatos institucionais podem ser
          enviados para{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>

        <p className="text-[14px] text-muted">
          O conteúdo do {SITE.name} é educacional e não substitui a avaliação de
          um profissional de saúde. Veja o{" "}
          <a href="/legal/aviso-medico">Aviso Educacional e Médico</a>.
        </p>
      </div>
    </div>
  );
}
