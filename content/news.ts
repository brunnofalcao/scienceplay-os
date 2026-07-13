import type { EvidenceGrade, StudyType } from "@/lib/evidence";

// MODELO EDITORIAL — MATÉRIA JORNALÍSTICA (não resenha de artigo).
// O estudo científico é a FONTE; o produto é uma reportagem de saúde acessível
// à população. A estrutura é de jornalismo (headline, linha-fina, lead,
// contexto, o que a pesquisa acrescenta, o que significa, o que não sabemos),
// não um formulário acadêmico. A força da informação é comunicada pela
// linguagem; o grau de evidência e as fontes ficam como camada secundária,
// rastreável, ao final. Autoria padrão: "Redação Protocolo 5R".

export interface SourceRef {
  label: string;
  type: string;
  journal?: string;
  authors?: string;
  year?: number;
  doi?: string;
  pmid?: string;
  url?: string;
  access?: "gratuito" | "pago";
}

export interface BodyBlock {
  heading?: string; // subtítulo da matéria (opcional)
  paragraphs: string[];
}

export interface NewsArticle {
  slug: string;
  headline: string; // manchete jornalística (NUNCA o título do estudo)
  subheadline: string; // linha-fina, amplia o contexto
  category: string;
  rTags: string[]; // slugs dos Rs envolvidos (conexão, não rótulo dominante)
  terms: string[]; // slugs do glossário relacionados
  lead: string; // abertura jornalística (situação humana / pergunta / descoberta)
  body: BodyBlock[]; // corpo narrativo com subtítulos
  whatWeDontKnow: string; // "O que ainda não sabemos"
  practical: string; // aplicação prática educacional (nunca prescrição)
  rConnection: string; // como se conecta ao Protocolo 5R
  evidence: EvidenceGrade; // camada secundária
  studyType: StudyType;
  sources: SourceRef[]; // fontes ao final (sustentam, não dominam)
  author: string; // "Redação Protocolo 5R" por padrão
  publishedAt: string;
  updatedAt: string;
  related: string[];
  featured?: boolean;
}

export const NEWS: NewsArticle[] = [
  {
    slug: "low-fodmap-intestino-irritavel-tem-hora-para-terminar",
    headline: "A dieta que alivia o intestino irritável — e por que ela tem hora para terminar",
    subheadline:
      "A restrição de FODMAPs virou a estratégia alimentar mais estudada para a síndrome do intestino irritável. Mas especialistas alertam: a parte que quase ninguém cumpre é justamente a mais importante.",
    category: "Alimentação e sintomas",
    rTags: ["remover", "recolocar"],
    terms: ["low-fodmap", "sindrome-intestino-irritavel", "fibra-soluvel"],
    lead:
      "Quem convive com a síndrome do intestino irritável conhece a rotina: a distensão que aperta a roupa no fim do dia, a dor que aparece sem aviso, a lista mental de alimentos que “parecem” fazer mal. Nos últimos anos, uma abordagem alimentar ganhou espaço nos consultórios e nas redes sociais para tentar organizar esse caos — a dieta low-FODMAP. E uma leva de estudos ajuda a entender o que ela realmente entrega.",
    body: [
      {
        heading: "O que são, afinal, os FODMAPs",
        paragraphs: [
          "FODMAP é uma sigla em inglês para um grupo de carboidratos que o intestino fermenta com facilidade — presentes em alimentos tão comuns quanto cebola, alho, trigo, maçã, leite e adoçantes. Em pessoas sensíveis, essa fermentação puxa água e produz gás, o que pode virar distensão e dor.",
          "A ideia da dieta é reduzir esses carboidratos por um período curto para acalmar os sintomas e, então, reintroduzi-los aos poucos para descobrir quais realmente incomodam. Não é uma dieta de eliminação para a vida toda — e esse detalhe muda tudo.",
        ],
      },
      {
        heading: "O que as pesquisas mais recentes acrescentam",
        paragraphs: [
          "Revisões que reúnem dezenas de estudos apontam na mesma direção: na fase inicial de restrição, uma parte considerável das pessoas com intestino irritável sente menos distensão e dor abdominal do que quem segue uma dieta de controle.",
          "O efeito, porém, não é igual para todo mundo, e os estudos têm limitações conhecidas — é difícil “cegar” alguém para o que está comendo, e o acompanhamento costuma ser curto. Ou seja: há um sinal consistente de alívio, mas não uma promessa de solução para todos.",
        ],
      },
      {
        heading: "A fase que quase ninguém cumpre",
        paragraphs: [
          "O ponto que mais preocupa nutricionistas não é a restrição — é a reintrodução. Ficar meses cortando alimentos, sem reintroduzir, empobrece a variedade da dieta, pode afetar a própria microbiota intestinal e alimenta uma relação de medo com a comida.",
          "Por isso o consenso entre quem estuda o tema é claro: a low-FODMAP é uma ferramenta de curto prazo, conduzida por um profissional, com um plano de retorno dos alimentos. A meta não é comer menos para sempre — é descobrir o que o seu intestino tolera.",
        ],
      },
    ],
    whatWeDontKnow:
      "Ainda não está claro por quanto tempo a fase de restrição pode ser mantida com segurança, nem como prever quem vai responder bem antes de tentar. A resposta é individual, e a ciência ainda busca marcadores que ajudem a personalizar a estratégia.",
    practical:
      "Se você suspeita de intestino irritável, o caminho não é cortar alimentos por conta própria a partir de listas da internet. Vale procurar um nutricionista ou médico para investigar o quadro e, se a low-FODMAP fizer sentido, conduzi-la com fase de reintrodução. Autodiagnóstico e restrição crônica costumam causar mais problema do que alívio.",
    rConnection:
      "Esta é a lógica das duas primeiras etapas do Protocolo 5R em ação: primeiro Remover, com método e prazo, os gatilhos alimentares mais prováveis; depois Recolocar diversidade e função na alimentação através da reintrodução — evitando que a restrição vire um fim em si mesma.",
    evidence: "A",
    studyType: "revisao-sistematica",
    sources: [
      { label: "Revisão sistemática sobre dieta low-FODMAP na síndrome do intestino irritável", type: "Revisão sistemática (exemplo representativo)", year: 2025, access: "gratuito" },
      { label: "Diretriz de manejo dos distúrbios da interação intestino-cérebro", type: "Diretriz", year: 2025, access: "pago" },
    ],
    author: "Redação Protocolo 5R",
    publishedAt: "2026-07-11T09:00:00Z",
    updatedAt: "2026-07-11T09:00:00Z",
    related: ["probiotico-cepa-certa-intestino", "cabeca-conversa-intestino-terapias"],
    featured: true,
  },
  {
    slug: "probiotico-cepa-certa-intestino",
    headline: "Nem todo probiótico serve para o seu intestino — e a ciência explica por quê",
    subheadline:
      "A palavra “probiótico” na embalagem não diz quase nada. O que importa, mostram estudos recentes, é a cepa específica, a dose e o objetivo — e saber a hora de parar.",
    category: "Microbiota e suplementos",
    rTags: ["reinocular"],
    terms: ["probiotico", "sindrome-intestino-irritavel", "disbiose"],
    lead:
      "Basta uma busca rápida na farmácia para encontrar dezenas de potes prometendo “equilibrar a flora intestinal”. Todos dizem a mesma coisa na frente do rótulo — probiótico. Mas, para a ciência, dois produtos com esse nome podem ser tão diferentes quanto dois remédios distintos. E isso muda completamente o resultado.",
    body: [
      {
        heading: "O detalhe que o rótulo esconde",
        paragraphs: [
          "Probióticos são microrganismos vivos que, em quantidade adequada, podem trazer algum benefício. O ponto é que esse benefício é específico da cepa — o “sobrenome” científico da bactéria, aquele código de letras e números depois do nome.",
          "Uma cepa pode ajudar em um sintoma específico e não fazer diferença nenhuma em outro. Trocar de cepa é, na prática, trocar de intervenção — mesmo que os dois potes digam “Lactobacillus” na frente.",
        ],
      },
      {
        heading: "O que os estudos recentes mostram",
        paragraphs: [
          "Análises que agrupam vários ensaios clínicos em pessoas com intestino irritável encontram o mesmo padrão: algumas cepas apresentam sinal de benefício para determinados sintomas, enquanto “probiótico” como categoria genérica não garante nada.",
          "Os próprios pesquisadores ressaltam a heterogeneidade: estudos diferentes, cepas diferentes, doses diferentes. Isso reforça que a pergunta certa não é “probiótico funciona?”, e sim “qual cepa, para qual pessoa, por quanto tempo”.",
        ],
      },
      {
        heading: "Quando é melhor não usar por conta própria",
        paragraphs: [
          "Há situações em que probióticos exigem cautela — pessoas com imunidade comprometida, internadas ou com certas condições de saúde. Não é um suplemento inofensivo por definição.",
          "E há um princípio prático que os estudos sugerem: se depois de algumas semanas não houve resposta, insistir raramente ajuda. Ter um critério para parar é tão importante quanto ter um critério para começar.",
        ],
      },
    ],
    whatWeDontKnow:
      "A ciência ainda não consegue dizer, para a maioria das pessoas, qual cepa vai funcionar antes de testar. Também falta clareza sobre efeitos a longo prazo e sobre combinações de cepas. É um campo ativo, longe de respostas definitivas.",
    practical:
      "Se você pensa em usar um probiótico, o mais útil é conversar com um profissional sobre qual cepa tem evidência para o seu caso, qual dose e por quanto tempo testar — e não escolher pelo apelo do rótulo ou pelo preço. Guardar a embalagem para registrar a cepa ajuda a avaliar se valeu a pena.",
    rConnection:
      "É a etapa Reinocular do Protocolo 5R levada a sério: apoiar a microbiota com critério — escolhendo por cepa, dose e alvo, com prazo de teste — em vez de tratar “probiótico” como uma solução única para qualquer queixa.",
    evidence: "B",
    studyType: "meta-analise",
    sources: [
      { label: "Meta-análise de probióticos por cepa na síndrome do intestino irritável", type: "Meta-análise (exemplo representativo)", year: 2025, access: "pago" },
      { label: "Documento de consenso sobre definição e uso de probióticos", type: "Consenso", year: 2014, access: "gratuito" },
    ],
    author: "Redação Protocolo 5R",
    publishedAt: "2026-07-10T09:00:00Z",
    updatedAt: "2026-07-10T09:00:00Z",
    related: ["low-fodmap-intestino-irritavel-tem-hora-para-terminar", "cabeca-conversa-intestino-terapias"],
  },
  {
    slug: "cabeca-conversa-intestino-terapias",
    headline: "Quando a cabeça conversa com o intestino: as terapias que ajudam quem vive com sintomas digestivos",
    subheadline:
      "Estresse e sono não são “desculpa” para dor de barriga. Pesquisas mostram que tratar o eixo entre cérebro e intestino pode aliviar sintomas — sem reduzir tudo ao psicológico.",
    category: "Eixo intestino-cérebro",
    rTags: ["reequilibrar"],
    terms: ["eixo-intestino-cerebro", "sindrome-intestino-irritavel", "estresse"],
    lead:
      "“É só nervosismo.” Quem tem sintomas digestivos recorrentes provavelmente já ouviu isso — muitas vezes de forma que soa como desconsideração. Só que a relação entre a cabeça e o intestino é real, tem nome e, cada vez mais, tem tratamento. E entender isso pode mudar a forma como se cuida do problema.",
    body: [
      {
        heading: "Uma via de mão dupla",
        paragraphs: [
          "Cérebro e intestino trocam sinais o tempo todo, por vias nervosas, imunes e hormonais — o chamado eixo intestino-cérebro. Por isso o estresse pode intensificar a dor abdominal, e um intestino inflamado pode afetar o humor e o sono.",
          "Reconhecer essa via de mão dupla não é dizer que “é tudo da cabeça”. É o oposto: significa que existem mais pontos por onde ajudar, e não menos.",
        ],
      },
      {
        heading: "O que a pesquisa acrescenta",
        paragraphs: [
          "Sínteses de estudos em pessoas com intestino irritável indicam que terapias dirigidas a esse eixo — como a terapia cognitivo-comportamental e a hipnoterapia focada no intestino — podem reduzir sintomas e melhorar a qualidade de vida em comparação com o cuidado usual.",
          "Não são tratamentos “de crença”: são abordagens estruturadas, com protocolo, que atuam sobre a forma como o corpo processa a dor e reage ao estresse.",
        ],
      },
      {
        heading: "Sono, rotina e o que dá para fazer",
        paragraphs: [
          "Além das terapias formais, hábitos importam: sono de má qualidade e estresse crônico se associam a piora dos sintomas. Cuidar dessas frentes não substitui a investigação clínica, mas costuma fazer parte de um plano que se sustenta no tempo.",
          "O objetivo não é adicionar mais uma lista de regras rígidas, e sim reduzir recaídas e dar ao intestino condições melhores de funcionar.",
        ],
      },
    ],
    whatWeDontKnow:
      "Ainda faltam respostas sobre para quem cada terapia funciona melhor e como ampliar o acesso a esses tratamentos, que nem sempre estão disponíveis. Sintomas de saúde mental relevantes pedem avaliação própria — não devem ser “resolvidos” apenas com estilo de vida.",
    practical:
      "Se os sintomas pioram em fases de estresse ou de sono ruim, vale levar isso ao profissional que acompanha você — não como confissão, mas como informação clínica útil. Terapias cérebro-intestino existem e têm evidência; perguntar sobre elas é razoável.",
    rConnection:
      "É a etapa Reequilibrar do Protocolo 5R: integrar sono, estresse e o eixo intestino-cérebro ao cuidado alimentar para manter o resultado ao longo do tempo — sem transformar isso em papo motivacional nem em culpa.",
    evidence: "A",
    studyType: "meta-analise",
    sources: [
      { label: "Meta-análise de terapias cérebro-intestino na síndrome do intestino irritável", type: "Meta-análise (exemplo representativo)", year: 2025, access: "gratuito" },
      { label: "Diretriz sobre distúrbios da interação intestino-cérebro", type: "Diretriz", year: 2025, access: "pago" },
    ],
    author: "Redação Protocolo 5R",
    publishedAt: "2026-07-09T09:00:00Z",
    updatedAt: "2026-07-09T09:00:00Z",
    related: ["low-fodmap-intestino-irritavel-tem-hora-para-terminar", "probiotico-cepa-certa-intestino"],
  },
];

export function newsByR(rSlug: string): NewsArticle[] {
  return NEWS.filter((n) => n.rTags.includes(rSlug));
}
export function newsByTerm(termSlug: string): NewsArticle[] {
  return NEWS.filter((n) => n.terms.includes(termSlug));
}
export function getNews(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}
export function newsOfTheDay(): NewsArticle {
  return NEWS.find((n) => n.featured) || NEWS[0];
}
