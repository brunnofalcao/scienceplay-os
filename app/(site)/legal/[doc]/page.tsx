import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

// Documentos legais do portal, servidos por uma única rota dinâmica.
// A data abaixo é a referência de vigência da versão atual dos documentos.
const VIGENCIA = "julho de 2026";

type DocKey =
  | "termos"
  | "privacidade"
  | "cookies"
  | "aviso-medico"
  | "correcoes"
  | "publicidade-parcerias";

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
      "Termos de Uso do portal Protocolo 5R: condições de acesso, uso do conteúdo educacional, conteúdo comercial identificado, propriedade intelectual e limitações de responsabilidade.",
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
            utilizar o conteúdo para insinuar um endosso, aprovação ou parceria
            que não exista, seja da {SITE.legalName}, seja de terceiros citados;
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

        <h2>3. Conteúdo comercial e patrocinado</h2>
        <p>
          O portal pode publicar conteúdo patrocinado, parcerias comerciais e
          páginas de marca (Branded Pages). Esse conteúdo é sempre identificado de
          forma clara e visível. A inclusão de produtos, marcas, serviços ou
          intervenções — inclusive em conteúdo comercial — <strong>não</strong>{" "}
          representa recomendação individual, prescrição ou garantia de resultado.
          As regras completas estão na{" "}
          <a href="/legal/publicidade-parcerias">Política de Publicidade e Parcerias</a>.
        </p>

        <h2>4. Propriedade intelectual</h2>
        <p>
          A metodologia Protocolo 5R, a {SITE.certificationName}, as marcas, os
          textos, a identidade visual e a organização editorial do portal são de
          titularidade da {SITE.legalName}, salvo quando indicado o contrário. As
          referências a estudos e fontes científicas de terceiros pertencem aos
          respectivos autores e editoras e são citadas para fins informativos,
          preservando a titularidade de quem as detém.
        </p>

        <h2>5. Certificação Profissional 5R</h2>
        <p>
          A {SITE.certificationName} possui regras próprias de elegibilidade,
          participação e uso do título de {SITE.certifiedTitle}. O acesso ao
          portal não confere, por si só, qualquer certificação.
        </p>

        <h2>6. Limitação de responsabilidade</h2>
        <p>
          A {SITE.legalName} empenha-se em manter o conteúdo correto e atualizado,
          mas a ciência evolui e a informação pode mudar. Não nos
          responsabilizamos por decisões tomadas exclusivamente com base no
          conteúdo do portal. Decisões clínicas pertencem ao profissional de saúde
          habilitado que avalia cada pessoa.
        </p>

        <h2>7. Links e serviços de terceiros</h2>
        <p>
          O portal pode remeter a estudos, fontes e serviços externos. Não
          controlamos e não respondemos pelo conteúdo ou pelas práticas de
          privacidade de sites de terceiros.
        </p>

        <h2>8. Alterações destes termos</h2>
        <p>
          Estes termos podem ser atualizados a qualquer momento. A versão vigente
          é sempre a publicada nesta página, com a data de vigência indicada.
        </p>

        <h2>9. Legislação aplicável e contato</h2>
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
      "Política de Privacidade do Protocolo 5R conforme a LGPD: controlador, dados coletados, bases legais, operadores, transferências, direitos do titular, retenção, segurança, cookies e canal do encarregado.",
    Body: () => (
      <>
        <p>
          Esta Política de Privacidade descreve como a {SITE.legalName} (CNPJ{" "}
          {SITE.cnpj}) trata informações pessoais no portal {SITE.name}, em
          conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 —
          LGPD).
        </p>

        <h2>1. Controlador</h2>
        <p>
          A {SITE.legalName} (CNPJ {SITE.cnpj}) é a controladora dos dados
          pessoais tratados no portal, ou seja, a quem cabem as decisões sobre o
          tratamento. O contato para assuntos de privacidade é {mail}.
        </p>

        <h2>2. Dados que coletamos</h2>
        <ul>
          <li>
            <strong>Dados fornecidos por você:</strong> nome e e-mail quando você
            entra em contato, envia uma correção ou se cadastra em fluxos do
            portal, além do conteúdo das mensagens que nos envia.
          </li>
          <li>
            <strong>Dados de navegação:</strong> informações técnicas como
            endereço IP, tipo de dispositivo, navegador, páginas visitadas e
            data/hora de acesso, coletadas por meio de cookies e tecnologias
            semelhantes.
          </li>
          <li>
            <strong>Dados de medição de audiência:</strong> métricas de uso,
            quando ferramentas de análise estiverem ativas, sujeitas ao seu
            consentimento.
          </li>
        </ul>
        <p>
          Não solicitamos dados sensíveis de saúde por meio do portal. Pedimos que
          você não envie informações clínicas ou pessoais identificáveis em
          mensagens de contato.
        </p>
        <p>
          A busca do glossário e demais campos de pesquisa do portal servem para
          localizar conteúdo. <strong>Não</strong> envie por esses campos dados
          pessoais identificáveis ou informações clínicas sobre você ou terceiros.
        </p>

        <h2>3. Finalidades e bases legais</h2>
        <p>Tratamos dados pessoais para as seguintes finalidades e bases legais:</p>
        <ul>
          <li>
            <strong>Responder contatos, correções e solicitações</strong> — base
            no procedimento preliminar a seu pedido (art. 7º, V) e/ou legítimo
            interesse (art. 7º, IX).
          </li>
          <li>
            <strong>Medir audiência e cookies não essenciais</strong> — base no
            consentimento (art. 7º, I).
          </li>
          <li>
            <strong>Segurança, prevenção a fraudes e melhoria do portal</strong> —
            base no legítimo interesse (art. 7º, IX), com avaliação de
            proporcionalidade e respeito aos seus direitos.
          </li>
          <li>
            <strong>Cumprimento de obrigação legal ou regulatória</strong> — base
            no art. 7º, II, quando aplicável.
          </li>
        </ul>

        <h2>4. Operadores e compartilhamentos</h2>
        <p>
          Podemos compartilhar dados com operadores que prestam serviços de
          hospedagem, análise de audiência, envio de comunicações e infraestrutura,
          estritamente para as finalidades acima e sob obrigações contratuais de
          confidencialidade e segurança. Não vendemos dados pessoais.
          Compartilhamentos com autoridades ocorrem apenas quando exigidos por
          lei ou ordem competente.
        </p>

        <h2>5. Transferências internacionais</h2>
        <p>
          Alguns operadores podem estar localizados no exterior. Nesses casos, a
          transferência internacional de dados observa as hipóteses e garantias da
          LGPD, buscando prestadores que ofereçam nível adequado de proteção e
          cláusulas contratuais compatíveis.
        </p>

        <h2>6. Retenção e eliminação</h2>
        <p>
          Mantemos os dados apenas pelo tempo necessário às finalidades descritas
          ou para cumprir obrigações legais. Encerrada a finalidade, os dados são
          eliminados ou anonimizados, ressalvadas as hipóteses de guarda previstas
          em lei.
        </p>

        <h2>7. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os
          dados contra acesso não autorizado, perda ou alteração. Nenhum sistema é
          totalmente imune a riscos.
        </p>

        <h2>8. Direitos do titular</h2>
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
          <li>eliminação dos dados tratados com base no consentimento;</li>
          <li>informação sobre compartilhamentos;</li>
          <li>revogação do consentimento.</li>
        </ul>
        <p>
          Para exercer seus direitos, escreva para {mail}. Podemos solicitar
          informações para confirmar sua identidade antes de atender ao pedido.
        </p>

        <h2>9. Encarregado e canal de contato</h2>
        <p>
          O canal de comunicação com o encarregado pelo tratamento de dados
          pessoais é {mail}. Você também pode dirigir-se à Autoridade Nacional de
          Proteção de Dados (ANPD).
        </p>

        <h2>10. Cookies</h2>
        <p>
          O uso de cookies e o gerenciamento do consentimento estão detalhados na{" "}
          <a href="/legal/cookies">Política de Cookies</a>.
        </p>

        <h2>11. Incidentes de segurança</h2>
        <p>
          Em caso de incidente de segurança que possa acarretar risco ou dano
          relevante aos titulares, seguiremos os procedimentos previstos na LGPD,
          incluindo, quando aplicável, a comunicação à ANPD e aos titulares
          afetados.
        </p>

        <h2>12. Alterações</h2>
        <p>
          Esta política pode ser atualizada para refletir mudanças técnicas,
          operacionais ou legais. A versão vigente é sempre a publicada nesta
          página.
        </p>
      </>
    ),
  },

  cookies: {
    title: "Política de Cookies",
    description:
      "Política de Cookies do Protocolo 5R: categorias necessários, preferências, analytics, marketing e terceiros, finalidade de cada uma, ativação por consentimento e como desativar.",
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
          o seu consentimento, medir audiência e apoiar ações de comunicação.
        </p>

        <h2>2. Categorias que utilizamos</h2>
        <ul>
          <li>
            <strong>Necessários:</strong> essenciais ao funcionamento do portal e
            à sua segurança (por exemplo, manter a navegação estável e registrar o
            estado do consentimento). <em>Finalidade:</em> permitir que o site
            funcione. <em>Como desativar:</em> podem ser bloqueados nas
            configurações do navegador, mas isso pode comprometer a navegação;
            não dependem de consentimento.
          </li>
          <li>
            <strong>Preferências:</strong> guardam escolhas como idioma ou opções
            de exibição. <em>Finalidade:</em> lembrar suas preferências entre
            visitas. <em>Como desativar:</em> recuse a categoria no banner de
            consentimento ou limpe os cookies do navegador.
          </li>
          <li>
            <strong>Analytics (medição de audiência):</strong> ajudam a entender
            como o portal é utilizado. <em>Finalidade:</em> medir acessos e
            melhorar o conteúdo. <em>Como desativar:</em> não conceda ou revogue o
            consentimento no banner; sem consentimento, não são ativados.
          </li>
          <li>
            <strong>Marketing:</strong> apoiam ações de comunicação e mensuração de
            campanhas. <em>Finalidade:</em> medir e direcionar comunicações.{" "}
            <em>Como desativar:</em> não conceda ou revogue o consentimento no
            banner; sem consentimento, não são ativados.
          </li>
          <li>
            <strong>Terceiros:</strong> definidos por serviços externos (por
            exemplo, players de vídeo, provedores de análise ou de mídia
            incorporada). <em>Finalidade:</em> viabilizar recursos fornecidos por
            terceiros. <em>Como desativar:</em> dependem do seu consentimento e
            também podem ser geridos nas configurações do navegador.
          </li>
        </ul>

        <h2>3. Consentimento com escolhas reais</h2>
        <p>
          Os cookies não essenciais — preferências, analytics, marketing e
          terceiros — só são ativados mediante o seu consentimento. O banner de
          consentimento oferece <strong>escolhas reais</strong>: você pode aceitar
          ou recusar por categoria, e não apenas aceitar tudo de uma vez. Recusar
          é tão simples quanto aceitar. Enquanto você não autoriza, essas
          categorias permanecem inativas, em linha com a orientação da Autoridade
          Nacional de Proteção de Dados (ANPD).
        </p>

        <h2>4. Como alterar sua escolha</h2>
        <p>
          Sua escolha é registrada e pode ser alterada a qualquer momento,
          refazendo a seleção no banner de consentimento ou limpando os cookies do
          site. Você também pode bloquear ou remover cookies diretamente nas
          configurações do navegador, que permitem recusar cookies, apagar os já
          armazenados e ser avisado antes de novos serem gravados. Desativar
          cookies necessários pode comprometer funcionalidades do portal.
        </p>

        <h2>5. Relação com a privacidade</h2>
        <p>
          O tratamento dos dados coletados por cookies segue a{" "}
          <a href="/legal/privacidade">Política de Privacidade</a>.
        </p>

        <h2>6. Atualizações</h2>
        <p>
          Esta política pode ser atualizada para refletir mudanças técnicas ou
          legais. A versão vigente é sempre a publicada nesta página. Dúvidas podem
          ser enviadas para {mail}.
        </p>
      </>
    ),
  },

  "aviso-medico": {
    title: "Aviso Educacional e Médico",
    description:
      "Aviso Educacional e Médico do Protocolo 5R: o conteúdo é educacional, não faz diagnóstico, prescrição ou recomendação individual, e a decisão clínica pertence ao profissional habilitado.",
    Body: () => (
      <>
        <p>
          O conteúdo do portal {SITE.name} tem finalidade{" "}
          <strong>exclusivamente educacional e informativa</strong>. Ele explica o
          estado da ciência sobre saúde intestinal, microbiota, alimentação,
          comportamento e estilo de vida para apoiar o entendimento — não para
          orientar condutas individuais.
        </p>

        <h2>1. Não substitui a consulta profissional</h2>
        <p>
          Nada neste portal substitui a avaliação, o diagnóstico ou o tratamento
          por um profissional de saúde habilitado. A relação entre você e o seu
          profissional é insubstituível e considera o seu histórico, os seus
          exames e o seu contexto.
        </p>

        <h2>2. Sem diagnóstico, prescrição ou recomendação individual</h2>
        <p>
          O portal não realiza diagnóstico, não indica exames, não prescreve
          medicamentos, suplementos, dietas ou intervenções e não recomenda
          condutas individuais. Menções a intervenções servem para descrever o que
          a literatura investiga, sempre dentro dos limites do que a evidência
          sustenta.
        </p>

        <h2>3. Produtos, suplementos e Branded Pages</h2>
        <p>
          O portal pode publicar conteúdo sobre alimentos, suplementos, produtos,
          exames, serviços e intervenções, inclusive em conteúdo comercial e
          páginas de marca (Branded Pages).
        </p>
        <p>
          <strong>
            A existência de uma matéria, verbete, estudo, página comercial ou
            Branded Page sobre determinado alimento, suplemento, produto, exame,
            serviço ou intervenção não representa indicação para uso individual.
          </strong>
        </p>

        <h2>4. Variação individual</h2>
        <p>
          As respostas do corpo variam de pessoa para pessoa. Algo estudado em um
          grupo pode não se aplicar a você. Fatores como histórico, condições de
          saúde, medicamentos em uso e contexto de vida mudam o que é adequado em
          cada caso.
        </p>

        <h2>5. A ciência evolui</h2>
        <p>
          As evidências mudam. Uma informação correta hoje pode ser revista com
          novos estudos. Por isso, o conteúdo pode indicar o grau de confiança da
          evidência e ser atualizado. Veja como isso funciona na{" "}
          <a href="/politica-editorial">Política editorial e científica</a>.
        </p>

        <h2>6. A decisão clínica pertence ao profissional</h2>
        <p>
          Mesmo diante de evidência forte, a decisão sobre o que fazer em cada caso
          pertence ao profissional de saúde habilitado que avalia a pessoa. O
          conteúdo pode informar essa conversa, mas não a substitui. Procure um
          profissional habilitado antes de iniciar, interromper ou modificar
          qualquer conduta.
        </p>

        <h2>7. Sinais de alerta — procure atendimento</h2>
        <p>
          Este portal não é um serviço de emergência. Diante de sinais de alarme —
          por exemplo, dor intensa ou persistente, sangramento, febre alta,
          emagrecimento inexplicado, vômitos persistentes, sinais de desidratação
          ou qualquer sintoma grave ou que piora rapidamente — procure atendimento
          médico imediatamente ou os serviços de urgência da sua região.
        </p>

        <h2>8. Responsabilidade do usuário</h2>
        <p>
          O uso das informações do portal é de responsabilidade do usuário.
          Decisões sobre saúde devem ser tomadas com apoio de um profissional
          habilitado, considerando o seu caso concreto.
        </p>

        <h2>9. Contato</h2>
        <p>
          Dúvidas sobre este aviso podem ser enviadas para {mail}.
        </p>
      </>
    ),
  },

  correcoes: {
    title: "Política de Correções",
    description:
      "Política de Correções do Protocolo 5R: compromisso com a correção, como reportar, o que informar, tipos de alteração, histórico de mudanças relevantes e canal de contato.",
    Body: () => (
      <>
        <h2>1. Compromisso com a correção</h2>
        <p>
          A {SITE.legalName} mantém um canal aberto para relatos sobre possíveis
          erros no conteúdo do portal {SITE.name}. Levar a sério esses relatos faz
          parte do compromisso do portal com a precisão e com a transparência.
        </p>
        <p>
          A Science Play mantém um canal aberto para o recebimento de relatos sobre
          possíveis erros, imprecisões, referências incorretas, informações
          desatualizadas ou problemas de linguagem nos conteúdos do Protocolo 5R.
          Os relatos recebidos poderão resultar em correção, atualização, inclusão
          de contexto, alteração de fontes ou manutenção do conteúdo, conforme a
          análise realizada. Correções que alterem materialmente o sentido de uma
          publicação poderão ser sinalizadas na própria página.
        </p>

        <h2>2. Como reportar</h2>
        <p>
          Se você identificar um problema em um conteúdo, escreva para {mail}. Todo
          relato é bem-vindo, seja sobre um fato, uma citação, uma fonte ou a
          linguagem de um texto.
        </p>

        <h2>3. Informações necessárias no reporte</h2>
        <p>Para agilizar a análise, procure incluir:</p>
        <ul>
          <li>o endereço (URL) da página;</li>
          <li>o trecho específico em questão;</li>
          <li>a natureza do problema apontado;</li>
          <li>se possível, a fonte que sustenta a sua observação.</li>
        </ul>

        <h2>4. Como a Science Play poderá avaliar</h2>
        <p>
          Os relatos são analisados à luz das fontes e dos critérios da{" "}
          <a href="/politica-editorial">Política editorial e científica</a>. A
          análise pode resultar em alteração do conteúdo ou na sua manutenção,
          conforme o que as fontes sustentam. Nem todo relato leva a uma mudança, e
          não há prazo fixo de resposta: a avaliação depende da natureza do que foi
          apontado.
        </p>

        <h2>5. Tipos de alteração</h2>
        <ul>
          <li>
            <strong>Correções materiais:</strong> ajustes que alteram o sentido de
            uma informação, sinalizados de forma transparente e, quando cabível, na
            própria página.
          </li>
          <li>
            <strong>Atualizações editoriais:</strong> incorporação de novo contexto
            ou de evidências que atualizam o conteúdo.
          </li>
          <li>
            <strong>Correções menores:</strong> ajustes de clareza, grafia ou
            formatação que não mudam o sentido.
          </li>
          <li>
            <strong>Atualizações de fontes:</strong> substituição, inclusão ou
            revisão das referências utilizadas.
          </li>
        </ul>

        <h2>6. Histórico de alterações relevantes</h2>
        <p>
          Conteúdos que dependem do estado atual da literatura podem exibir a data
          de atualização. Quando uma alteração modifica materialmente o sentido de
          uma publicação, essa mudança pode ser sinalizada na própria página,
          preservando a rastreabilidade das fontes, para que o leitor saiba que a
          informação foi revista.
        </p>

        <h2>7. Canal de contato</h2>
        <p>
          O canal para relatos e correções é {mail}.
        </p>

        <h2>8. Limite de responsabilidade</h2>
        <p>
          A abertura deste canal não constitui garantia de alteração de qualquer
          conteúdo específico nem de resposta em prazo determinado. O conteúdo do
          portal é educacional e informativo e não substitui a avaliação de um
          profissional de saúde habilitado, conforme o{" "}
          <a href="/legal/aviso-medico">Aviso Educacional e Médico</a>.
        </p>

        <h2>9. Vigência</h2>
        <p>
          Esta política está em vigor desde {VIGENCIA} e pode ser atualizada. A
          versão vigente é sempre a publicada nesta página.
        </p>
      </>
    ),
  },

  "publicidade-parcerias": {
    title: "Publicidade e Parcerias",
    description:
      "Política de Publicidade e Parcerias do Protocolo 5R: como o portal é financiado, o que são conteúdo patrocinado e Branded Pages, e como as relações comerciais são identificadas.",
    Body: () => (
      <>
        <div
          role="note"
          className="not-prose mb-6 rounded-xl border border-navy/20 bg-mist p-5 text-[15px] leading-relaxed text-navy-deep"
        >
          <p>
            O portal Protocolo 5R é uma iniciativa da Science Play e pode ser
            mantido por receitas provenientes de certificações, empresas
            parceiras, patrocinadores, projetos especiais e conteúdos comerciais. A
            existência de uma relação comercial não será ocultada. Conteúdos
            produzidos mediante patrocínio, parceria, apoio institucional,
            contratação ou outra relação comercial serão identificados de forma
            clara e visível. O portal poderá publicar conteúdos sobre empresas,
            produtos, ingredientes, tecnologias e serviços. A presença de uma marca
            no portal não representa automaticamente recomendação individual,
            prescrição ou garantia de resultado.
          </p>
        </div>

        <h2>1. Como o portal é financiado</h2>
        <p>
          O {SITE.name} é uma iniciativa da {SITE.legalName}. Sua operação pode ser
          sustentada por receitas de certificações, empresas parceiras,
          patrocinadores, projetos especiais e conteúdos comerciais. Essa
          sustentação viabiliza a produção editorial e não altera os critérios de
          precisão descritos na{" "}
          <a href="/politica-editorial">Política editorial e científica</a>.
        </p>

        <h2>2. O que é conteúdo patrocinado</h2>
        <p>
          Conteúdo patrocinado é aquele cuja produção ou publicação decorre de uma
          relação comercial — patrocínio, contratação ou parceria. Ele é sempre
          identificado como tal, para que o leitor saiba distinguir o que é
          conteúdo editorial do que envolve uma relação comercial.
        </p>

        <h2>3. O que é uma Branded Page</h2>
        <p>
          Uma Branded Page é uma página produzida em relação comercial com uma
          marca, empresa ou instituição. Ela é identificada de forma visível como
          página de marca. Mesmo quando trata de ciência, uma Branded Page não é
          conteúdo editorial independente e não representa recomendação individual.
        </p>

        <h2>4. Apoio institucional</h2>
        <p>
          O portal pode receber apoio institucional de organizações que apoiam
          projetos ou iniciativas específicas. Esse apoio é identificado e não se
          confunde com endosso científico do conteúdo editorial.
        </p>

        <h2>5. Como as relações comerciais são identificadas</h2>
        <p>
          Conforme o tipo de relação, o conteúdo pode ser sinalizado com
          expressões como:
        </p>
        <ul>
          <li>Conteúdo patrocinado</li>
          <li>Parceria comercial</li>
          <li>Apoio institucional</li>
          <li>Oferecido por</li>
          <li>Produzido em parceria com</li>
          <li>Branded Page</li>
          <li>Projeto especial</li>
          <li>Patrocínio de</li>
        </ul>

        <h2>6. Diferença entre conteúdo editorial e comercial</h2>
        <p>
          O conteúdo editorial é produzido segundo os critérios da política
          editorial, com linguagem proporcional às fontes. O conteúdo comercial
          decorre de uma relação com um anunciante ou parceiro e é sempre
          identificado. A distinção entre os dois é mantida de forma visível, para
          que o leitor nunca confunda um com o outro.
        </p>

        <h2>7. Onde a identificação aparece</h2>
        <p>
          Quando um conteúdo envolve relação comercial, a identificação pode
          aparecer:
        </p>
        <ul>
          <li>no topo da página;</li>
          <li>antes do início do conteúdo;</li>
          <li>nos cartões de listagem que remetem ao conteúdo;</li>
          <li>ao compartilhar o conteúdo;</li>
          <li>nos metadados da página.</li>
        </ul>

        <h2>8. Links externos</h2>
        <p>
          Conteúdos comerciais podem conter links para sites de marcas ou
          parceiros. O portal não controla e não responde pelo conteúdo ou pelas
          práticas desses sites de terceiros.
        </p>

        <h2>9. Presença de marca não é recomendação</h2>
        <p>
          A presença de uma marca, produto, ingrediente, tecnologia ou serviço no
          portal — inclusive em conteúdo comercial — não representa recomendação
          individual, prescrição ou garantia de resultado. Decisões sobre saúde
          pertencem ao profissional habilitado que avalia cada pessoa, conforme o{" "}
          <a href="/legal/aviso-medico">Aviso Educacional e Médico</a>.
        </p>

        <h2>10. Contato comercial</h2>
        <p>
          Propostas de patrocínio, parceria e projetos comerciais podem ser
          enviadas para {mail}.
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
      description: "Documento legal não encontrado no portal Protocolo 5R.",
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
        <p className="mt-3 text-[14px] text-muted">Vigência: {VIGENCIA}.</p>
      </header>

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
