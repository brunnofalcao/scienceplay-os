import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

// Documentos jurídicos do portal, servidos por uma única rota dinâmica.
// Todos os textos são PROVISÓRIOS e passarão por validação jurídica antes
// da publicação oficial. A data abaixo é a referência de última revisão
// editorial do texto provisório.
const LAST_REVIEW = "julho de 2026";

type DocKey =
  | "termos"
  | "privacidade"
  | "cookies"
  | "aviso-medico"
  | "correcoes";

interface DocDef {
  title: string;
  description: string;
  Body: () => React.ReactElement;
}

const mail = (
  <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
);

const DOCS: Record<DocKey, DocDef> = {
  termos: {
    title: "Termos de Uso",
    description:
      "Termos de Uso do portal Protocolo 5R: condições de acesso, uso do conteúdo educacional, propriedade intelectual e limitações de responsabilidade.",
    Body: () => (
      <>
        <p>
          Estes Termos de Uso regulam o acesso e a utilização do portal{" "}
          {SITE.name}, mantido pela {SITE.legalName} (CNPJ {SITE.cnpj}). Ao
          acessar o portal, você concorda com as condições descritas abaixo.
        </p>

        <h2>1. Objeto e natureza do conteúdo</h2>
        <p>
          O {SITE.name} é um portal de finalidade educacional e informativa sobre
          saúde intestinal, microbiota e o eixo intestino-cérebro. O conteúdo não
          constitui aconselhamento médico individual, não realiza diagnóstico nem
          prescreve tratamento. Consulte o{" "}
          <a href="/legal/aviso-medico">Aviso Educacional e Médico</a>.
        </p>

        <h2>2. Uso permitido</h2>
        <p>
          Você pode acessar, ler e compartilhar o conteúdo para fins pessoais,
          educacionais e informativos, mantendo a atribuição à fonte. É vedado:
        </p>
        <ul>
          <li>
            reproduzir o conteúdo de forma que sugira endosso, diagnóstico ou
            prescrição;
          </li>
          <li>
            alterar o conteúdo de modo a distorcer classificações de evidência ou
            o sentido original;
          </li>
          <li>
            usar o material para fins comerciais sem autorização expressa da{" "}
            {SITE.legalName};
          </li>
          <li>
            empregar meios automatizados de coleta que comprometam a estabilidade
            ou a segurança do portal.
          </li>
        </ul>

        <h2>3. Propriedade intelectual</h2>
        <p>
          A metodologia Protocolo 5R, a {SITE.certificationName}, as marcas, os
          textos, a identidade visual e a organização editorial do portal são de
          titularidade da {SITE.legalName}, salvo quando indicado o contrário. As
          referências a estudos e fontes de terceiros pertencem aos respectivos
          autores e editoras e são citadas para fins informativos.
        </p>

        <h2>4. Certificação Profissional 5R</h2>
        <p>
          A {SITE.certificationName} possui regras próprias de elegibilidade,
          participação e uso do título de {SITE.certifiedTitle}. O acesso ao
          portal não confere, por si só, qualquer certificação.
        </p>

        <h2>5. Limitação de responsabilidade</h2>
        <p>
          A {SITE.legalName} empenha-se em manter o conteúdo correto e atualizado,
          mas a ciência evolui e a informação pode mudar. Não nos
          responsabilizamos por decisões tomadas exclusivamente com base no
          conteúdo do portal. Decisões clínicas pertencem ao profissional de saúde
          habilitado que avalia cada pessoa.
        </p>

        <h2>6. Links e serviços de terceiros</h2>
        <p>
          O portal pode remeter a estudos, fontes e serviços externos. Não
          controlamos e não respondemos pelo conteúdo ou pelas práticas de
          privacidade de sites de terceiros.
        </p>

        <h2>7. Alterações destes termos</h2>
        <p>
          Estes termos podem ser atualizados a qualquer momento. A versão vigente
          é sempre a publicada nesta página, com a data de revisão indicada.
        </p>

        <h2>8. Legislação aplicável e contato</h2>
        <p>
          Estes termos são regidos pela legislação brasileira. Dúvidas podem ser
          enviadas para {mail}.
        </p>
      </>
    ),
  },

  privacidade: {
    title: "Política de Privacidade",
    description:
      "Política de Privacidade do Protocolo 5R conforme a LGPD: dados coletados, bases legais, direitos do titular, retenção, cookies e contato do encarregado (DPO).",
    Body: () => (
      <>
        <p>
          Esta Política de Privacidade descreve como a {SITE.legalName} (CNPJ{" "}
          {SITE.cnpj}), controladora dos dados, trata informações pessoais no
          portal {SITE.name}, em conformidade com a Lei Geral de Proteção de Dados
          (Lei nº 13.709/2018 — LGPD).
        </p>

        <h2>1. Dados que coletamos</h2>
        <ul>
          <li>
            <strong>Dados fornecidos por você:</strong> nome e e-mail quando você
            entra em contato, envia uma correção ou se cadastra em fluxos do
            portal.
          </li>
          <li>
            <strong>Dados de navegação:</strong> informações técnicas como
            endereço IP, tipo de dispositivo, navegador, páginas visitadas e
            data/hora de acesso, coletadas por meio de cookies e tecnologias
            semelhantes.
          </li>
          <li>
            <strong>Dados de medição de audiência:</strong> métricas agregadas de
            uso, quando ferramentas de análise estiverem ativas, sujeitas ao seu
            consentimento.
          </li>
        </ul>
        <p>
          Não coletamos intencionalmente dados sensíveis de saúde por meio do
          portal. Pedimos que você não envie informações clínicas identificáveis
          em mensagens de contato.
        </p>

        <h2>2. Bases legais e finalidades</h2>
        <ul>
          <li>
            <strong>Consentimento</strong> (art. 7º, I) — para cookies não
            essenciais e medição de audiência.
          </li>
          <li>
            <strong>Execução de procedimentos a seu pedido</strong> (art. 7º, V) —
            para responder contatos, correções e solicitações.
          </li>
          <li>
            <strong>Legítimo interesse</strong> (art. 7º, IX) — para segurança,
            prevenção a fraudes e melhoria do portal, sempre com avaliação de
            proporcionalidade e respeito aos seus direitos.
          </li>
          <li>
            <strong>Cumprimento de obrigação legal</strong> (art. 7º, II) — quando
            aplicável.
          </li>
        </ul>

        <h2>3. Compartilhamento</h2>
        <p>
          Podemos compartilhar dados com operadores que prestam serviços de
          hospedagem, análise e comunicação, estritamente para as finalidades
          acima e sob obrigações de confidencialidade e segurança. Não vendemos
          dados pessoais. Compartilhamentos com autoridades ocorrem apenas quando
          exigidos por lei.
        </p>

        <h2>4. Direitos do titular</h2>
        <p>Nos termos da LGPD, você pode solicitar a qualquer momento:</p>
        <ul>
          <li>confirmação da existência de tratamento;</li>
          <li>acesso aos dados;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            anonimização, bloqueio ou eliminação de dados desnecessários ou
            tratados em desconformidade;
          </li>
          <li>portabilidade, nos limites da lei;</li>
          <li>
            eliminação dos dados tratados com base no consentimento;
          </li>
          <li>informação sobre compartilhamentos;</li>
          <li>revogação do consentimento.</li>
        </ul>
        <p>
          Para exercer seus direitos, escreva para {mail}. Podemos solicitar
          informações para confirmar sua identidade antes de atender ao pedido.
        </p>

        <h2>5. Retenção e eliminação</h2>
        <p>
          Mantemos os dados apenas pelo tempo necessário às finalidades descritas
          ou para cumprir obrigações legais. Encerrada a finalidade, os dados são
          eliminados ou anonimizados, ressalvadas as hipóteses de guarda previstas
          em lei.
        </p>

        <h2>6. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os
          dados contra acesso não autorizado, perda ou alteração. Nenhum sistema é
          totalmente imune a riscos; em caso de incidente relevante, seguiremos os
          procedimentos previstos na LGPD.
        </p>

        <h2>7. Cookies</h2>
        <p>
          O uso de cookies e o gerenciamento do consentimento estão detalhados na{" "}
          <a href="/legal/cookies">Política de Cookies</a>.
        </p>

        <h2>8. Encarregado (DPO) e contato</h2>
        <p>
          O canal de comunicação com o encarregado pelo tratamento de dados
          pessoais (DPO) é {mail}. Você também pode dirigir-se à Autoridade
          Nacional de Proteção de Dados (ANPD).
        </p>
      </>
    ),
  },

  cookies: {
    title: "Política de Cookies",
    description:
      "Política de Cookies do Protocolo 5R: o que são cookies, categorias utilizadas, base no consentimento e como desativar ou gerenciar no navegador.",
    Body: () => (
      <>
        <p>
          Esta Política de Cookies explica como o portal {SITE.name}, mantido pela{" "}
          {SITE.legalName}, utiliza cookies e tecnologias semelhantes, e como você
          pode gerenciá-los.
        </p>

        <h2>1. O que são cookies</h2>
        <p>
          Cookies são pequenos arquivos armazenados no seu dispositivo quando você
          navega. Servem para fazer o site funcionar, lembrar preferências e, com
          o seu consentimento, medir audiência.
        </p>

        <h2>2. Categorias que utilizamos</h2>
        <ul>
          <li>
            <strong>Essenciais:</strong> necessários ao funcionamento do portal e
            à sua segurança. Não dependem de consentimento e não podem ser
            desativados sem prejuízo da navegação.
          </li>
          <li>
            <strong>De preferências:</strong> guardam escolhas como idioma ou o
            estado do banner de consentimento, para melhorar a sua experiência.
          </li>
          <li>
            <strong>De medição de audiência (analytics):</strong> ajudam a
            entender, de forma agregada, como o portal é utilizado. Só são
            ativados mediante o seu consentimento.
          </li>
        </ul>
        <p>
          O portal não ativa cookies de análise ou marketing sem consentimento.
          Identificadores de terceiros só passam a operar quando você os autoriza.
        </p>

        <h2>3. Consentimento</h2>
        <p>
          Ao acessar o portal, você pode aceitar ou recusar as categorias não
          essenciais por meio do banner de consentimento. Sua escolha é registrada
          e pode ser alterada a qualquer momento, limpando os cookies do site ou
          refazendo a seleção no banner.
        </p>

        <h2>4. Como desativar cookies</h2>
        <p>
          Você pode bloquear ou remover cookies diretamente nas configurações do
          seu navegador. Os principais navegadores permitem recusar cookies,
          apagar os já armazenados e ser avisado antes de novos serem gravados.
          Desativar cookies essenciais pode comprometer funcionalidades do portal.
        </p>

        <h2>5. Atualizações</h2>
        <p>
          Esta política pode ser atualizada para refletir mudanças técnicas ou
          legais. A versão vigente é sempre a publicada nesta página.
        </p>

        <h2>6. Relação com a privacidade</h2>
        <p>
          O tratamento dos dados coletados por cookies segue a{" "}
          <a href="/legal/privacidade">Política de Privacidade</a>. Dúvidas podem
          ser enviadas para {mail}.
        </p>
      </>
    ),
  },

  "aviso-medico": {
    title: "Aviso Educacional e Médico",
    description:
      "Aviso Educacional e Médico do Protocolo 5R: o conteúdo é educacional, não substitui consulta, não faz diagnóstico nem prescrição, e a decisão clínica pertence ao profissional.",
    Body: () => (
      <>
        <p>
          O conteúdo do portal {SITE.name} tem finalidade{" "}
          <strong>exclusivamente educacional e informativa</strong>. Ele explica o
          estado da ciência sobre saúde intestinal, microbiota e o eixo
          intestino-cérebro para apoiar o entendimento — não para orientar
          condutas individuais.
        </p>

        <h2>1. Não substitui a consulta profissional</h2>
        <p>
          Nada neste portal substitui a avaliação, o diagnóstico ou o tratamento
          por um profissional de saúde habilitado. A relação entre você e o seu
          profissional é insubstituível e considera o seu histórico, os seus
          exames e o seu contexto.
        </p>

        <h2>2. Não fazemos diagnóstico nem prescrição</h2>
        <p>
          O portal não realiza diagnóstico, não indica exames, não prescreve
          medicamentos, suplementos, dietas ou intervenções e não recomenda
          condutas individuais. Menções a intervenções servem para descrever o que
          a literatura investiga, sempre com a classificação de evidência
          correspondente.
        </p>

        <h2>3. A ciência muda</h2>
        <p>
          As evidências evoluem. Uma informação correta hoje pode ser revista com
          novos estudos. Por isso, cada conteúdo indica o grau de confiança da
          evidência e pode ser atualizado. Veja como classificamos e revisamos na{" "}
          <a href="/politica-editorial">Política editorial e científica</a>.
        </p>

        <h2>4. A decisão clínica pertence ao profissional</h2>
        <p>
          Mesmo diante de evidência forte, a decisão sobre o que fazer em cada caso
          pertence ao profissional de saúde que avalia a pessoa. O conteúdo pode
          informar essa conversa, mas não a substitui.
        </p>

        <h2>5. Situações de risco — procure atendimento</h2>
        <p>
          Este portal não é um serviço de emergência. Diante de sinais de alarme —
          por exemplo, dor intensa ou persistente, sangramento, febre alta,
          emagrecimento inexplicado, vômitos persistentes, sinais de desidratação
          ou qualquer sintoma grave ou que piora rapidamente — procure atendimento
          médico imediatamente ou os serviços de urgência da sua região.
        </p>

        <h2>6. Contato</h2>
        <p>
          Dúvidas sobre este aviso podem ser enviadas para {mail}.
        </p>
      </>
    ),
  },

  correcoes: {
    title: "Política de Correções",
    description:
      "Política de Correções do Protocolo 5R: como erros são reportados e corrigidos, versionamento e transparência sobre as mudanças no conteúdo.",
    Body: () => (
      <>
        <p>
          Errar é possível; corrigir de forma aberta é obrigatório. Esta política
          descreve como a {SITE.legalName} recebe, avalia e corrige erros no
          conteúdo do portal {SITE.name}, e como registra essas mudanças.
        </p>

        <h2>1. Como reportar um erro</h2>
        <p>
          Se você identificar uma imprecisão — factual, de citação, de
          classificação de evidência ou de linguagem — escreva para {mail}.
          Ajuda muito se você indicar:
        </p>
        <ul>
          <li>o endereço (URL) da página;</li>
          <li>o trecho específico em questão;</li>
          <li>
            a natureza do problema e, se possível, a fonte que sustenta a
            correção.
          </li>
        </ul>

        <h2>2. Como avaliamos</h2>
        <p>
          Toda solicitação relevante é analisada pela equipe editorial à luz das
          fontes primárias e dos critérios da{" "}
          <a href="/politica-editorial">Política editorial e científica</a>.
          Correções factuais e de classificação de evidência têm prioridade,
          porque afetam diretamente a confiabilidade da informação.
        </p>

        <h2>3. Tipos de correção</h2>
        <ul>
          <li>
            <strong>Correção factual:</strong> ajuste de uma informação incorreta,
            sinalizada de forma transparente quando material.
          </li>
          <li>
            <strong>Reclassificação de evidência:</strong> mudança do grau A–D
            quando novos estudos ou uma releitura o justificam.
          </li>
          <li>
            <strong>Atualização:</strong> incorporação de novas evidências que
            alteram o conteúdo, com registro de data.
          </li>
          <li>
            <strong>Correção editorial menor:</strong> ajustes de clareza, grafia
            ou formatação que não mudam o sentido.
          </li>
        </ul>

        <h2>4. Versionamento e transparência</h2>
        <p>
          Conteúdos que dependem do estado atual da literatura exibem a data de
          atualização. Quando uma correção altera o sentido ou a classificação de
          evidência, a mudança é feita de forma transparente, preservando a
          rastreabilidade das fontes. O objetivo é que o leitor sempre saiba que a
          informação foi revista e por quê.
        </p>

        <h2>5. Prazos</h2>
        <p>
          Buscamos responder às solicitações em prazo razoável. Correções que
          afetam a segurança da informação são tratadas com prioridade; ajustes
          menores entram no ciclo regular de revisão editorial.
        </p>

        <h2>6. Contato</h2>
        <p>
          O canal para correções é {mail}.
        </p>
      </>
    ),
  },
};

export function generateStaticParams() {
  return (Object.keys(DOCS) as DocKey[]).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const def = DOCS[doc as DocKey];
  if (!def) {
    return pageMetadata({
      title: "Documento não encontrado",
      description: "Documento jurídico não encontrado no portal Protocolo 5R.",
      path: `/legal/${doc}`,
      noindex: true,
    });
  }
  return pageMetadata({
    title: def.title,
    description: def.description,
    path: `/legal/${doc}`,
  });
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const def = DOCS[doc as DocKey];
  if (!def) notFound();

  return (
    <div className="wrap py-12">
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Legal", path: "/legal/termos" },
          { name: def.title, path: `/legal/${doc}` },
        ]}
      />

      <header className="mb-8 max-w-prose">
        <p className="kicker mb-3">Documento legal</p>
        <h1 className="text-[38px] leading-[1.1] md:text-[44px]">{def.title}</h1>
      </header>

      <div
        role="note"
        className="mb-8 max-w-prose rounded-xl border border-amber5r/30 bg-amber5r/5 p-5 text-[14.5px] leading-relaxed text-ink"
      >
        <p className="mb-1 font-serif text-[16px] text-navy-deep">
          Textos jurídicos provisórios
        </p>
        <p>
          Textos jurídicos provisórios — passarão por validação jurídica antes da
          publicação oficial. Última revisão editorial: {LAST_REVIEW}.
        </p>
      </div>

      <article className="prose-5r">
        <def.Body />
      </article>

      <p className="mt-10 max-w-prose text-[14px] text-muted">
        Documento mantido pela {SITE.legalName} (CNPJ {SITE.cnpj}). Contato:{" "}
        <a href={`mailto:${SITE.contactEmail}`} className="text-navy underline decoration-line underline-offset-2 hover:decoration-navy">
          {SITE.contactEmail}
        </a>
        .
      </p>
    </div>
  );
}
