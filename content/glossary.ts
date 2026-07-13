import type { GlossaryEntry } from "@/lib/glossary-types";

// SEED DO GLOSSÁRIO 5R — base estruturada, revisável e versionável.
// Conteúdo educacional. Nenhuma entrada indica dose individual, diagnóstico
// ou conduta. Fontes são referências reais rastreáveis (guidelines/revisões).
// Quando não há evidência suficiente, o campo o declara honestamente.

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: "kefir",
    name: "Kefir",
    type: "alimento",
    synonyms: ["quefir", "kefir de leite", "kefir de água"],
    short:
      "Bebida fermentada por uma comunidade de bactérias e leveduras, usada como alimento fermentado com potencial impacto na microbiota.",
    definition:
      "O kefir é um alimento fermentado produzido pela fermentação do leite (ou de água açucarada) por uma cultura simbiótica de bactérias lácticas e leveduras. Contém microrganismos vivos e metabólitos da fermentação.",
    gutRelation:
      "Como alimento fermentado com microrganismos vivos, o kefir é estudado por seu possível papel em apoiar a diversidade e a função da microbiota intestinal.",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "recolocar", intensity: "fraca", rationale: "Pode compor um padrão alimentar de reposição funcional." },
    ],
    classificationRationale:
      "É classificado sobretudo em Reinocular por ser um fermentado com microrganismos vivos; a relação com Recolocar é secundária, como parte do padrão alimentar.",
    confidence: "moderada",
    evidence: "C",
    evidenceSuggests:
      "Estudos sugerem que fermentados podem contribuir para a diversidade da microbiota e, em alguns contextos, para sintomas gastrointestinais. O sinal é heterogêneo entre produtos e populações.",
    notProven:
      "Não está comprovado que o kefir trate condições específicas, nem que uma marca ou preparo seja superior a outro para desfechos clínicos.",
    cautions:
      "Pessoas com intolerância à lactose, imunossupressão ou restrições específicas devem avaliar o uso com um profissional. Não substitui tratamento.",
    sources: [
      { label: "Revisão sobre alimentos fermentados e microbiota", type: "Revisão", year: 2021 },
    ],
    related: ["probiotico", "fermentados", "prebiotico", "lactose"],
    lastReviewed: "2026-06-01",
    status: "publicado",
    popularity: 78,
    trending: true,
  },
  {
    slug: "gluten",
    name: "Glúten",
    type: "ingrediente",
    synonyms: ["gluten", "proteína do trigo"],
    short:
      "Conjunto de proteínas do trigo, centeio e cevada. Sua relevância clínica varia muito entre pessoas.",
    definition:
      "O glúten é um grupo de proteínas presente em trigo, centeio e cevada. É central na doença celíaca (condição autoimune) e é discutido na chamada sensibilidade ao glúten não-celíaca.",
    gutRelation:
      "Em pessoas com doença celíaca, o glúten desencadeia dano intestinal. Fora desse contexto, seu papel nos sintomas é individual e frequentemente confundido com o de outros componentes (ex.: FODMAPs do trigo).",
    rPrimary: "remover",
    rSecondary: [],
    classificationRationale:
      "Relaciona-se com Remover porque, quando há hipótese clínica, sua retirada é conduzida de forma estruturada — sempre após excluir doença celíaca quando indicado.",
    confidence: "moderada",
    evidence: "B",
    evidenceSuggests:
      "A evidência é forte para a exclusão do glúten na doença celíaca. Para a sensibilidade não-celíaca, a evidência é limitada e o efeito pode se dever a outros componentes do trigo.",
    notProven:
      "Não está comprovado que excluir glúten beneficie pessoas sem doença celíaca ou sensibilidade documentada. Exclusão sem critério pode empobrecer a dieta.",
    cautions:
      "Nunca retire o glúten antes de investigar doença celíaca com um profissional — a exclusão prévia atrapalha o diagnóstico. Autodiagnóstico é arriscado.",
    sources: [
      { label: "Diretrizes de doença celíaca e sensibilidade ao glúten", type: "Guideline", year: 2023 },
    ],
    related: ["low-fodmap", "sindrome-intestino-irritavel", "lactose"],
    lastReviewed: "2026-06-10",
    status: "publicado",
    popularity: 90,
    trending: true,
  },
  {
    slug: "low-fodmap",
    name: "Dieta low-FODMAP",
    type: "conceito",
    synonyms: ["fodmap", "dieta fodmap", "baixo fodmap"],
    short:
      "Estratégia alimentar estruturada, temporária, com fases de restrição, reintrodução e personalização — usada em quadros funcionais.",
    definition:
      "A dieta low-FODMAP reduz temporariamente carboidratos fermentáveis de cadeia curta (oligo, di e monossacarídeos e polióis) e prevê reintrodução guiada para personalizar a alimentação.",
    gutRelation:
      "É uma das intervenções dietéticas mais estudadas na síndrome do intestino irritável, especialmente para distensão e dor. Não é uma dieta para a vida toda.",
    rPrimary: "remover",
    rSecondary: [
      { r: "recolocar", intensity: "moderada", rationale: "A fase de reintrodução recoloca alimentos e diversidade." },
    ],
    classificationRationale:
      "É primariamente Remover (restrição estruturada por hipótese), com forte componente de Recolocar na reintrodução — o que evita restrição crônica.",
    confidence: "alta",
    evidence: "A",
    evidenceSuggests:
      "Revisões sistemáticas indicam melhora de sintomas em parte das pessoas com SII na fase de restrição, seguida de reintrodução para manter diversidade.",
    notProven:
      "Não está comprovado que a restrição prolongada seja segura ou vantajosa; a fase de reintrodução é parte essencial e frequentemente negligenciada.",
    cautions:
      "Deve ser conduzida por profissional. Restrição sem reintrodução aumenta o risco de perda de diversidade alimentar e relação disfuncional com a comida.",
    sources: [
      { label: "Umbrella review low-FODMAP na SII", type: "Revisão sistemática", year: 2025 },
    ],
    related: ["sindrome-intestino-irritavel", "gluten", "fibra-soluvel", "constipacao"],
    lastReviewed: "2026-06-12",
    status: "publicado",
    popularity: 72,
  },
  {
    slug: "sibo",
    name: "SIBO (supercrescimento bacteriano)",
    type: "condicao",
    synonyms: ["supercrescimento bacteriano do intestino delgado", "small intestinal bacterial overgrowth"],
    short:
      "Aumento anormal de bactérias no intestino delgado. É um diagnóstico específico, com testes de limitações conhecidas.",
    definition:
      "SIBO é o supercrescimento bacteriano no intestino delgado, associado a distensão, gases e alteração do hábito intestinal em contextos específicos (ex.: alteração de motilidade, pós-cirúrgico).",
    gutRelation:
      "Quando presente e corretamente diagnosticado, é um alvo da etapa Remover. É também uma área de sobrediagnóstico, com testes de interpretação delicada.",
    rPrimary: "remover",
    rSecondary: [
      { r: "recolocar", intensity: "fraca", rationale: "A recuperação da motilidade/função entra na fase de reposição." },
    ],
    classificationRationale:
      "Relaciona-se com Remover porque o manejo, quando indicado, envolve reduzir o supercrescimento — mas apenas após diagnóstico criterioso.",
    confidence: "moderada",
    evidence: "C",
    evidenceSuggests:
      "Há evidência de associação com sintomas em subgrupos, e de que o tratamento pode ajudar quando o diagnóstico é bem estabelecido.",
    notProven:
      "Não está comprovado que 'todo mundo com distensão tem SIBO', nem que rodar antibiótico repetidamente sem critério seja seguro ou eficaz.",
    cautions:
      "Testes respiratórios têm falsos positivos. Autotratamento e uso repetido de antimicrobianos sem avaliação médica são arriscados.",
    sources: [
      { label: "Revisão sobre diagnóstico e limitações do SIBO", type: "Revisão", year: 2025 },
    ],
    related: ["disbiose", "sindrome-intestino-irritavel", "constipacao"],
    lastReviewed: "2026-06-05",
    status: "publicado",
    popularity: 65,
  },
  {
    slug: "disbiose",
    name: "Disbiose",
    type: "conceito",
    synonyms: ["desequilíbrio da microbiota"],
    short:
      "Termo amplo para um desequilíbrio da microbiota. Útil como conceito, mas frequentemente usado de forma imprecisa.",
    definition:
      "Disbiose descreve uma alteração na composição ou função da microbiota associada a doença. É um conceito de pesquisa, não um diagnóstico único e padronizado.",
    gutRelation:
      "Atravessa vários Rs: pode envolver remover gatilhos, reinocular a microbiota e reequilibrar hábitos. Raramente se resolve com uma única intervenção.",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "remover", intensity: "moderada", rationale: "Reduzir gatilhos que perpetuam o desequilíbrio." },
      { r: "reequilibrar", intensity: "moderada", rationale: "Sono, estresse e dieta modulam a microbiota." },
    ],
    classificationRationale:
      "Recebe classificação múltipla porque 'disbiose' é um estado que se relaciona com vários Rs; forçar um único R seria impreciso.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Há associação entre alterações da microbiota e diversas condições, e plausibilidade de que intervenções ajudem.",
    notProven:
      "Não está comprovado que 'corrigir a disbiose' com um produto específico trate doenças. Painéis comerciais de microbiota não têm validação clínica robusta como guia de conduta.",
    cautions:
      "Cuidado com 'disbiose' usada como diagnóstico de conveniência para vender exames e suplementos. Não substitui avaliação clínica.",
    sources: [
      { label: "Revisão sobre microbiota e doença", type: "Revisão", year: 2024 },
    ],
    related: ["sibo", "probiotico", "prebiotico", "akkermansia"],
    lastReviewed: "2026-06-05",
    status: "publicado",
    popularity: 70,
    functionalMedicine: {
      conventional:
        "A medicina convencional usa 'disbiose' com cautela: reconhece que alterações da microbiota se associam a doenças, mas não a trata como um diagnóstico único e padronizado.",
      functionalPerspective:
        "Parte da medicina funcional interpreta a disbiose como um desequilíbrio a ser mapeado e corrigido, frequentemente organizando a conduta em etapas semelhantes às do Protocolo 5R.",
      mechanisms:
        "Propõe-se que alterações na composição e função da microbiota influenciem barreira intestinal, inflamação de baixo grau e o eixo intestino-cérebro.",
      practices:
        "Costumam ser associadas mudanças alimentares, prebióticos, probióticos e ajustes de estilo de vida.",
      consistent:
        "Há sustentação mais consistente para intervenções alimentares estruturadas e para probióticos por cepa em desfechos específicos.",
      hypothesis:
        "O uso de painéis comerciais de microbiota como guia de conduta permanece sem validação clínica robusta.",
      divergences:
        "A principal divergência é o quanto 'corrigir a disbiose' com produtos específicos altera desfechos clínicos — algo que a evidência ainda não sustenta.",
    },
  },
  {
    slug: "lactose",
    name: "Lactose",
    type: "nutriente",
    synonyms: ["açúcar do leite", "intolerância à lactose"],
    short:
      "Açúcar do leite. Sua má digestão (intolerância) pode causar sintomas em pessoas com baixa lactase.",
    definition:
      "A lactose é o principal açúcar do leite, digerido pela enzima lactase. Quando a lactase é insuficiente, a lactose não digerida pode causar gases, distensão e diarreia.",
    gutRelation:
      "É um gatilho comum, avaliado por hipótese na etapa Remover, e um exemplo de por que testar antes de excluir para sempre.",
    rPrimary: "remover",
    rSecondary: [],
    classificationRationale:
      "Relaciona-se com Remover como gatilho testável; a exclusão é pragmática e reversível conforme a tolerância individual.",
    confidence: "alta",
    evidence: "B",
    evidenceSuggests:
      "A intolerância à lactose é bem descrita e a redução de lactose melhora sintomas em quem tem má digestão comprovada.",
    notProven:
      "Não está comprovado que todos se beneficiem de cortar lactose; muitas pessoas toleram quantidades moderadas.",
    cautions:
      "Excluir laticínios sem necessidade pode reduzir cálcio e outros nutrientes. Avalie tolerância com um profissional.",
    sources: [{ label: "Guideline de intolerância à lactose", type: "Guideline", year: 2022 }],
    related: ["gluten", "low-fodmap", "enzimas-digestivas"],
    lastReviewed: "2026-05-20",
    status: "publicado",
    popularity: 58,
  },
  {
    slug: "fibra-soluvel",
    name: "Fibra solúvel",
    type: "fibra",
    synonyms: ["fibras solúveis", "psyllium", "psílio"],
    short:
      "Tipo de fibra que forma gel e é primeira linha em vários quadros funcionais, com titulação de dose.",
    definition:
      "Fibras solúveis (como psyllium) dissolvem-se em água formando gel, modulando o trânsito e servindo de substrato para a microbiota.",
    gutRelation:
      "São centrais na etapa Recolocar (reposição funcional) e também alimentam a microbiota, tocando Reinocular.",
    rPrimary: "recolocar",
    rSecondary: [
      { r: "reinocular", intensity: "moderada", rationale: "Fibras fermentáveis servem de substrato à microbiota." },
    ],
    classificationRationale:
      "Primariamente Recolocar por restaurar função (trânsito, saciedade); secundariamente Reinocular como prebiótico.",
    confidence: "alta",
    evidence: "A",
    evidenceSuggests:
      "Fibras solúveis tituladas são primeira linha em constipação e ajudam em subtipos de SII, com melhor tolerância que insolúveis.",
    notProven:
      "Não está comprovado que doses altas sem titulação sejam melhores; podem piorar gases e distensão.",
    cautions:
      "Aumentar fibra rápido demais piora sintomas. Hidratação e titulação gradual são essenciais.",
    sources: [{ label: "Guideline de constipação crônica (WGO)", type: "Guideline", year: 2025 }],
    related: ["inulina", "prebiotico", "constipacao", "low-fodmap"],
    lastReviewed: "2026-06-08",
    status: "publicado",
    popularity: 55,
  },
  {
    slug: "inulina",
    name: "Inulina",
    type: "prebiotico",
    synonyms: ["fibra de inulina", "FOS", "fruto-oligossacarídeo"],
    short:
      "Fibra prebiótica fermentável que alimenta a microbiota — potente, porém mal tolerada por pessoas sensíveis.",
    definition:
      "A inulina é uma fibra prebiótica solúvel e fermentável, presente em vegetais como chicória, alho e cebola, usada para estimular bactérias benéficas.",
    gutRelation:
      "É um prebiótico clássico (Reinocular), mas por ser um FODMAP pode piorar distensão em pessoas sensíveis.",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "recolocar", intensity: "fraca", rationale: "Contribui como fibra na reposição funcional." },
    ],
    classificationRationale:
      "Primariamente Reinocular por ser prebiótico; a intensidade da recomendação depende da tolerância individual.",
    confidence: "moderada",
    evidence: "B",
    evidenceSuggests:
      "Prebióticos como a inulina podem aumentar bifidobactérias e, em alguns contextos, melhorar função intestinal.",
    notProven:
      "Não está comprovado benefício clínico universal; em pessoas sensíveis (ex.: SII) pode piorar sintomas.",
    cautions:
      "Introduzir de forma titulada. Em quem faz low-FODMAP, a inulina costuma ser um gatilho.",
    sources: [{ label: "Revisão sobre prebióticos e microbiota", type: "Revisão", year: 2024 }],
    related: ["prebiotico", "fibra-soluvel", "low-fodmap", "butirato"],
    lastReviewed: "2026-06-08",
    status: "publicado",
    popularity: 60,
  },
  {
    slug: "enzimas-digestivas",
    name: "Enzimas digestivas",
    type: "suplemento",
    synonyms: ["suplemento de enzimas", "lactase", "enzimas"],
    short:
      "Suplementos que auxiliam a digestão em contextos específicos — não uma solução para todos.",
    definition:
      "Enzimas digestivas (ex.: lactase, enzimas pancreáticas) auxiliam a quebra de nutrientes quando há déficit funcional documentado.",
    gutRelation:
      "Fazem parte da etapa Recolocar, como suporte à função digestiva quando há sinais clínicos que o justifiquem.",
    rPrimary: "recolocar",
    rSecondary: [],
    classificationRationale:
      "Relaciona-se com Recolocar (restaurar função). O uso é orientado por hipótese clínica, não por regra geral.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Há benefício claro em contextos específicos (ex.: lactase na intolerância à lactose, enzimas pancreáticas na insuficiência).",
    notProven:
      "Não está comprovado que enzimas 'genéricas' beneficiem pessoas sem déficit; o uso amplo carece de evidência.",
    cautions:
      "Uso indiscriminado aumenta custo sem benefício. A indicação deve ser individual e profissional.",
    sources: [{ label: "Revisão sobre suporte enzimático digestivo", type: "Revisão", year: 2021 }],
    related: ["lactose", "fibra-soluvel"],
    lastReviewed: "2026-05-18",
    status: "publicado",
    popularity: 40,
  },
  {
    slug: "constipacao",
    name: "Constipação",
    type: "sintoma",
    synonyms: ["prisão de ventre", "intestino preso", "obstipação"],
    short:
      "Dificuldade ou baixa frequência de evacuação. Tem mecanismos diferentes que mudam a conduta.",
    definition:
      "Constipação é um sintoma com vários mecanismos (trânsito lento, disfunção evacuatória, secundária a medicamentos ou doenças), não uma doença única.",
    gutRelation:
      "É um alvo típico de Recolocar (fibra, hidratação, rotina), mas exige diferenciar o mecanismo antes de 'repetir fibra'.",
    rPrimary: "recolocar",
    rSecondary: [
      { r: "reequilibrar", intensity: "fraca", rationale: "Rotina, movimento e ritmo influenciam o hábito intestinal." },
    ],
    classificationRationale:
      "Primariamente Recolocar por resposta a fibra/hidratação/rotina; classificação múltipla porque a manutenção envolve estilo de vida.",
    confidence: "alta",
    evidence: "A",
    evidenceSuggests:
      "Medidas basais (fibra solúvel titulada, hidratação, rotina) são primeira linha, com escalonamento quando necessário.",
    notProven:
      "Não está comprovado que 'mais fibra' resolva todos os casos; disfunção evacuatória pode até piorar com fibra.",
    cautions:
      "Sinais de alarme (sangramento, perda de peso, início após os 50 anos) exigem investigação. Constipação refratária pede avaliação.",
    sources: [{ label: "WGO — Constipation guideline", type: "Guideline", year: 2025 }],
    related: ["fibra-soluvel", "sindrome-intestino-irritavel", "atividade-fisica"],
    lastReviewed: "2026-06-11",
    status: "publicado",
    popularity: 68,
  },
  {
    slug: "barreira-intestinal",
    name: "Barreira intestinal",
    type: "conceito",
    synonyms: ["mucosa intestinal", "integridade da barreira"],
    short:
      "A camada que separa o conteúdo intestinal do organismo. Mecanismo real, alvo da etapa Reparar.",
    definition:
      "A barreira intestinal é composta pelo epitélio, muco, junções e componentes imunes que regulam o que atravessa a parede intestinal.",
    gutRelation:
      "É o foco da etapa Reparar, associada à inflamação de baixo grau e à hipersensibilidade visceral em quadros funcionais.",
    rPrimary: "reparar",
    rSecondary: [],
    classificationRationale:
      "Relaciona-se diretamente com Reparar, que organiza intervenções que favorecem a integridade da mucosa.",
    confidence: "moderada",
    evidence: "C",
    evidenceSuggests:
      "Há plausibilidade mecanística e sinal para intervenções alimentares e de estilo de vida sobre a barreira.",
    notProven:
      "Não está comprovado que 'consertar a barreira' com suplementos específicos trate doenças. 'Permeabilidade' não é causa universal.",
    cautions:
      "Desconfie de promessas de 'selar o intestino'. A barreira é um mecanismo, não um diagnóstico de venda.",
    sources: [{ label: "Consenso sobre DGBI/SII e barreira", type: "Consenso", year: 2025 }],
    related: ["permeabilidade-intestinal", "glutamina", "polifenois"],
    lastReviewed: "2026-06-09",
    status: "publicado",
    popularity: 52,
  },
  {
    slug: "permeabilidade-intestinal",
    name: "Permeabilidade intestinal",
    type: "conceito",
    synonyms: ["leaky gut", "intestino permeável"],
    short:
      "Mecanismo estudado de aumento da passagem pela parede intestinal — não um diagnóstico clínico validado.",
    definition:
      "A permeabilidade intestinal descreve o quanto a parede intestinal permite a passagem de substâncias. Alterações são estudadas em várias condições.",
    gutRelation:
      "É um mecanismo dentro da etapa Reparar. Popularizada como 'leaky gut', frequentemente extrapolada além da evidência.",
    rPrimary: "reparar",
    rSecondary: [],
    classificationRationale:
      "Relaciona-se com Reparar como mecanismo; a classificação vem acompanhada de forte alerta contra sobreinterpretação.",
    confidence: "baixa",
    evidence: "D",
    evidenceSuggests:
      "Estudos observam alterações de permeabilidade em algumas condições, sugerindo hipóteses de pesquisa.",
    notProven:
      "Não está comprovado que 'intestino permeável' seja causa de doenças sistêmicas, nem que testes comerciais guiem conduta.",
    cautions:
      "'Leaky gut' é usado para vender protocolos sem base. Não é diagnóstico clínico estabelecido. Procure avaliação profissional.",
    sources: [{ label: "Revisão crítica sobre permeabilidade intestinal", type: "Revisão", year: 2023 }],
    related: ["barreira-intestinal", "glutamina"],
    lastReviewed: "2026-06-09",
    status: "publicado",
    popularity: 63,
    functionalMedicine: {
      conventional:
        "Na medicina convencional, a permeabilidade intestinal é um mecanismo estudado — não um diagnóstico clínico estabelecido nem causa comprovada de doenças sistêmicas.",
      functionalPerspective:
        "Parte da medicina funcional dá ao 'intestino permeável' um papel central, propondo-o como elo entre intestino e sintomas em outros sistemas.",
      mechanisms:
        "Propõe-se que o aumento da permeabilidade permita a passagem de substâncias que ativariam respostas imunes e inflamação.",
      practices:
        "Associam-se estratégias alimentares e compostos ditos 'reparadores' da mucosa.",
      consistent:
        "É plausível que dieta e estilo de vida influenciem a barreira; intervenções de melhor evidência priorizam padrão alimentar e o eixo intestino-cérebro.",
      hypothesis:
        "A ideia de 'permeabilidade' como causa universal de doenças, e os testes comerciais que a medem, permanecem sem validação para guiar conduta.",
      divergences:
        "A divergência central é transformar um mecanismo em diagnóstico e justificativa para 'stacks' de suplementos — o que a evidência não sustenta.",
    },
  },
  {
    slug: "glutamina",
    name: "Glutamina",
    type: "suplemento",
    synonyms: ["l-glutamina", "glutamine"],
    short:
      "Aminoácido estudado como suporte à mucosa em subgrupos específicos — não um reparo universal.",
    definition:
      "A glutamina é um aminoácido usado como combustível por células intestinais, investigado como adjuvante em contextos de barreira intestinal alterada.",
    gutRelation:
      "Aparece na etapa Reparar como composto com sinal em subgrupos (ex.: pós-infeccioso com permeabilidade aumentada).",
    rPrimary: "reparar",
    rSecondary: [],
    classificationRationale:
      "Classificada em Reparar por seu papel mecanístico na mucosa; a força da recomendação é limitada a subgrupos.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Há sinal em subgrupos específicos (ex.: SII pós-infecciosa com permeabilidade aumentada) em estudos iniciais.",
    notProven:
      "Não está comprovado benefício amplo em quadros gastrointestinais; a evidência é restrita e heterogênea.",
    cautions:
      "Não é 'reparador' universal. Uso deve ser individual e avaliado por um profissional.",
    sources: [{ label: "Ensaio de glutamina em SII com permeabilidade aumentada", type: "Ensaio clínico", year: 2018 }],
    related: ["barreira-intestinal", "permeabilidade-intestinal"],
    lastReviewed: "2026-05-30",
    status: "publicado",
    popularity: 45,
  },
  {
    slug: "polifenois",
    name: "Polifenóis",
    type: "nutriente",
    synonyms: ["compostos fenólicos", "polyphenols"],
    short:
      "Compostos vegetais que interagem com a microbiota; parte de um padrão alimentar, não um remédio.",
    definition:
      "Polifenóis são compostos bioativos de vegetais, frutas, chá e cacau, metabolizados em parte pela microbiota intestinal.",
    gutRelation:
      "Contribuem para as etapas Reparar (padrão anti-inflamatório) e Reinocular (interação com a microbiota).",
    rPrimary: "reparar",
    rSecondary: [
      { r: "reinocular", intensity: "moderada", rationale: "São metabolizados e modulam a microbiota." },
    ],
    classificationRationale:
      "Classificação múltipla: entram como padrão alimentar (Reparar) e como moduladores da microbiota (Reinocular).",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Padrões alimentares ricos em polifenóis associam-se a marcadores favoráveis; há plausibilidade mecanística.",
    notProven:
      "Não está comprovado que suplementos isolados de polifenóis tratem condições. Comida e padrão importam mais que a cápsula.",
    cautions:
      "Evite tratar polifenóis como remédio. Foque em variedade alimentar, não em doses altas isoladas.",
    sources: [{ label: "Revisão sobre polifenóis e microbiota", type: "Revisão", year: 2024 }],
    related: ["butirato", "prebiotico", "barreira-intestinal"],
    lastReviewed: "2026-05-28",
    status: "publicado",
    popularity: 42,
  },
  {
    slug: "probiotico",
    name: "Probiótico",
    type: "probiotico",
    synonyms: ["probióticos", "probiotics", "microrganismos vivos"],
    short:
      "Microrganismos vivos que, em quantidade adequada, podem trazer benefício. O efeito é cepa-específico.",
    definition:
      "Probióticos são microrganismos vivos que, administrados em quantidades adequadas, podem conferir benefício à saúde. O efeito depende da cepa.",
    gutRelation:
      "São o centro da etapa Reinocular, escolhidos por sintoma, cepa, dose e tempo de teste.",
    rPrimary: "reinocular",
    rSecondary: [],
    classificationRationale:
      "Classificado em Reinocular. A confiança da recomendação depende da cepa e do desfecho, não da categoria 'probiótico'.",
    confidence: "moderada",
    evidence: "B",
    evidenceSuggests:
      "Certas cepas têm sinal em desfechos específicos (ex.: alguns subtipos de SII, diarreia associada a antibióticos).",
    notProven:
      "Não está comprovado que 'qualquer probiótico serve para qualquer coisa'. Muitos estudos são heterogêneos.",
    cautions:
      "Há populações de risco (imunossuprimidos, hospitalizados). A escolha deve considerar cepa, dose e segurança, com um profissional.",
    sources: [{ label: "Meta-análise de probióticos na SII", type: "Meta-análise", year: 2023 }],
    related: ["prebiotico", "simbiotico", "pos-biotico", "kefir", "akkermansia"],
    lastReviewed: "2026-06-12",
    status: "publicado",
    popularity: 88,
    trending: true,
  },
  {
    slug: "prebiotico",
    name: "Prebiótico",
    type: "prebiotico",
    synonyms: ["prebióticos", "prebiotics", "fibra prebiótica"],
    short:
      "Substrato seletivamente utilizado pela microbiota, conferindo benefício. Frequentemente fibras fermentáveis.",
    definition:
      "Prebióticos são substratos utilizados seletivamente por microrganismos do hospedeiro, com benefício à saúde — tipicamente fibras fermentáveis como inulina e FOS.",
    gutRelation:
      "Fazem parte de Reinocular (alimentar a microbiota) e tocam Recolocar (reposição de fibra).",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "recolocar", intensity: "moderada", rationale: "Fibras prebióticas também repõem função e substrato." },
    ],
    classificationRationale:
      "Primariamente Reinocular; classificação múltipla porque muitas fibras prebióticas cumprem papel de reposição funcional.",
    confidence: "moderada",
    evidence: "B",
    evidenceSuggests:
      "Prebióticos podem modular a microbiota e melhorar aspectos da função intestinal em alguns contextos.",
    notProven:
      "Não está comprovado benefício universal; em pessoas sensíveis podem piorar gases e distensão.",
    cautions:
      "Titular a introdução. Em quadros funcionais, alguns prebióticos são gatilhos (FODMAPs).",
    sources: [{ label: "Consenso ISAPP sobre prebióticos", type: "Consenso", year: 2017 }],
    related: ["inulina", "fibra-soluvel", "probiotico", "butirato"],
    lastReviewed: "2026-06-12",
    status: "publicado",
    popularity: 74,
  },
  {
    slug: "simbiotico",
    name: "Simbiótico",
    type: "suplemento",
    synonyms: ["simbióticos", "synbiotics"],
    short: "Combinação de probióticos e prebióticos pensada para agir em conjunto.",
    definition:
      "Simbióticos combinam microrganismos vivos e substratos que eles utilizam, com o objetivo de potencializar o efeito sobre a microbiota.",
    gutRelation: "Pertencem à etapa Reinocular, como uma das ferramentas de apoio à microbiota.",
    rPrimary: "reinocular",
    rSecondary: [],
    classificationRationale:
      "Classificado em Reinocular por combinar pró e prebiótico. A força depende da formulação estudada.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Algumas formulações simbióticas mostram sinal em desfechos específicos, com evidência ainda heterogênea.",
    notProven:
      "Não está comprovado que simbióticos sejam superiores a pró ou prebióticos isolados de forma geral.",
    cautions: "Como probióticos, exigem atenção em populações de risco. Escolha por evidência, não por marketing.",
    sources: [{ label: "Consenso ISAPP sobre simbióticos", type: "Consenso", year: 2020 }],
    related: ["probiotico", "prebiotico", "pos-biotico"],
    lastReviewed: "2026-05-25",
    status: "publicado",
    popularity: 38,
  },
  {
    slug: "pos-biotico",
    name: "Pós-biótico",
    type: "posbiotico",
    synonyms: ["pos-biotico", "postbiotics", "posbióticos"],
    short:
      "Preparações de microrganismos inanimados e/ou seus componentes com benefício à saúde. Área em evolução.",
    definition:
      "Pós-bióticos são preparações de microrganismos inanimados e/ou seus componentes que conferem benefício à saúde, incluindo metabólitos da fermentação.",
    gutRelation:
      "Fazem parte de Reinocular como abordagem emergente que não depende de células vivas.",
    rPrimary: "reinocular",
    rSecondary: [],
    classificationRationale:
      "Classificado em Reinocular; por ser área recente, a confiança da classificação é moderada e a evidência, inicial.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Estudos iniciais sugerem efeitos em desfechos específicos, com vantagem teórica de estabilidade e segurança.",
    notProven:
      "Não está comprovado benefício clínico amplo; o campo é novo e a padronização, incipiente.",
    cautions: "Evite tratar 'pós-biótico' como palavra mágica. Avalie a evidência de cada preparação.",
    sources: [{ label: "Consenso ISAPP sobre pós-bióticos", type: "Consenso", year: 2021 }],
    related: ["probiotico", "butirato", "prebiotico"],
    lastReviewed: "2026-05-25",
    status: "publicado",
    popularity: 41,
    trending: true,
  },
  {
    slug: "butirato",
    name: "Butirato",
    type: "metabolito",
    synonyms: ["ácido butírico", "butyrate", "AGCC"],
    short:
      "Ácido graxo de cadeia curta produzido pela microbiota, importante para as células do cólon.",
    definition:
      "O butirato é um ácido graxo de cadeia curta produzido pela fermentação de fibras pela microbiota, usado como energia pelas células do intestino grosso.",
    gutRelation:
      "É um elo entre Reinocular (a microbiota o produz) e Reparar (efeitos sobre a mucosa e a inflamação).",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "reparar", intensity: "moderada", rationale: "Nutre o epitélio e modula a inflamação local." },
    ],
    classificationRationale:
      "Classificação múltipla: é um produto da microbiota (Reinocular) com papel na integridade da mucosa (Reparar).",
    confidence: "moderada",
    evidence: "C",
    evidenceSuggests:
      "Há forte plausibilidade mecanística e associações favoráveis; a via mais robusta é aumentar fibras que geram butirato.",
    notProven:
      "Não está comprovado que suplementar butirato diretamente traga os mesmos benefícios da produção endógena.",
    cautions:
      "Priorize fibras alimentares em vez de suplementos de butirato sem evidência sólida.",
    sources: [{ label: "Revisão sobre AGCC e saúde intestinal", type: "Revisão", year: 2022 }],
    related: ["prebiotico", "inulina", "fibra-soluvel", "polifenois"],
    lastReviewed: "2026-05-22",
    status: "publicado",
    popularity: 50,
  },
  {
    slug: "akkermansia",
    name: "Akkermansia muciniphila",
    type: "microrganismo",
    synonyms: ["akkermansia", "a. muciniphila"],
    short:
      "Bactéria intestinal associada à saúde metabólica em estudos — promissora, mas ainda em pesquisa.",
    definition:
      "Akkermansia muciniphila é uma bactéria que reside na camada de muco intestinal, estudada por associações com saúde metabólica e barreira.",
    gutRelation:
      "É alvo de interesse em Reinocular (como próxima geração de probióticos) e toca Reparar (interação com o muco).",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "reparar", intensity: "fraca", rationale: "Interage com a camada de muco da barreira." },
    ],
    classificationRationale:
      "Classificado em Reinocular como microrganismo de interesse; a evidência clínica em humanos ainda é inicial.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Estudos iniciais (incluindo formas pasteurizadas) sugerem sinais metabólicos favoráveis em contextos específicos.",
    notProven:
      "Não está comprovado benefício clínico amplo; é uma área de pesquisa ativa, não uma recomendação geral.",
    cautions:
      "Cuidado com produtos que prometem resultados metabólicos com base em estudos preliminares.",
    sources: [{ label: "Estudo piloto com Akkermansia em humanos", type: "Ensaio clínico", year: 2019 }],
    related: ["probiotico", "disbiose", "pos-biotico"],
    lastReviewed: "2026-05-22",
    status: "publicado",
    popularity: 54,
    trending: true,
  },
  {
    slug: "sindrome-intestino-irritavel",
    name: "Síndrome do intestino irritável (SII)",
    type: "condicao",
    synonyms: ["sii", "ibs", "colon irritavel", "intestino irritável"],
    short:
      "Distúrbio da interação intestino-cérebro com dor abdominal e alteração do hábito, diagnosticado por critérios clínicos.",
    definition:
      "A SII é um distúrbio funcional (da interação intestino-cérebro) caracterizado por dor abdominal recorrente associada à evacuação, com subtipos (constipação, diarreia, misto).",
    gutRelation:
      "É o quadro onde o Protocolo 5R mais se aplica de forma educacional, atravessando todas as etapas conforme o fenótipo.",
    rPrimary: "reequilibrar",
    rSecondary: [
      { r: "remover", intensity: "forte", rationale: "Manejo dietético estruturado (ex.: low-FODMAP)." },
      { r: "recolocar", intensity: "moderada", rationale: "Fibra e rotina conforme o subtipo." },
      { r: "reinocular", intensity: "moderada", rationale: "Probióticos por cepa em subgrupos." },
    ],
    classificationRationale:
      "Recebe classificação múltipla por definição: a SII é multifatorial e o 5R a aborda de forma integrada, com o eixo intestino-cérebro (Reequilibrar) como fio condutor.",
    confidence: "alta",
    evidence: "A",
    evidenceSuggests:
      "Diretrizes recentes apoiam diagnóstico positivo por critérios, manejo dietético estruturado, probióticos selecionados e terapias cérebro-intestino.",
    notProven:
      "Não está comprovado que exista uma única causa ou 'cura'. É um diagnóstico clínico, não de exclusão infinita.",
    cautions:
      "Sinais de alarme exigem investigação (excluir doença orgânica). O 5R é educacional e não substitui diagnóstico.",
    sources: [{ label: "Consenso de Seul (DGBI/SII)", type: "Consenso", year: 2025 }],
    related: ["low-fodmap", "constipacao", "sibo", "eixo-intestino-cerebro", "probiotico"],
    lastReviewed: "2026-06-12",
    status: "publicado",
    popularity: 85,
    trending: true,
  },
  {
    slug: "eixo-intestino-cerebro",
    name: "Eixo intestino-cérebro",
    type: "conceito",
    synonyms: ["gut-brain axis", "eixo cérebro-intestino", "brain-gut"],
    short:
      "Comunicação bidirecional entre intestino e cérebro que modula sintomas digestivos e o bem-estar.",
    definition:
      "O eixo intestino-cérebro é a rede de comunicação entre o sistema nervoso, o intestino e a microbiota, envolvendo vias neurais, imunes e endócrinas.",
    gutRelation:
      "É a base da etapa Reequilibrar: estresse, sono e comportamento modulam sintomas e recaídas.",
    rPrimary: "reequilibrar",
    rSecondary: [],
    classificationRationale:
      "Classificado em Reequilibrar, que organiza as intervenções de estilo de vida e terapias cérebro-intestino.",
    confidence: "moderada",
    evidence: "B",
    evidenceSuggests:
      "Terapias cérebro-intestino (ex.: TCC, hipnoterapia dirigida) têm evidência em SII, e estresse/sono modulam sintomas.",
    notProven:
      "Não está comprovado que 'é tudo emocional'. O eixo é bidirecional; reduzir tudo ao psicológico é um erro.",
    cautions:
      "Sintomas de saúde mental relevantes pedem avaliação própria. Reequilibrar não substitui cuidado especializado.",
    sources: [{ label: "Meta-análise de terapias cérebro-intestino na SII", type: "Meta-análise", year: 2025 }],
    related: ["sono", "estresse", "sindrome-intestino-irritavel", "atividade-fisica"],
    lastReviewed: "2026-06-10",
    status: "publicado",
    popularity: 60,
  },
  {
    slug: "sono",
    name: "Sono",
    type: "habito",
    synonyms: ["qualidade do sono", "higiene do sono"],
    short:
      "Fator de estilo de vida que influencia a microbiota e os sintomas intestinais via eixo intestino-cérebro.",
    definition:
      "O sono é um pilar do estilo de vida com efeitos sobre o ritmo circadiano, a microbiota e a regulação do apetite e do humor.",
    gutRelation:
      "Faz parte de Reequilibrar: privação e má qualidade de sono associam-se a piora de sintomas gastrointestinais.",
    rPrimary: "reequilibrar",
    rSecondary: [],
    classificationRationale:
      "Classificado em Reequilibrar como fator de manutenção e modulação via eixo intestino-cérebro.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Há associação entre sono e sintomas intestinais, e plausibilidade de que melhorar o sono ajude na manutenção.",
    notProven:
      "Não está comprovado que ajustar o sono, isoladamente, trate condições intestinais.",
    cautions:
      "Distúrbios do sono persistentes merecem avaliação própria. Faz parte de um conjunto, não de uma solução única.",
    sources: [{ label: "Revisão sobre sono, ritmo circadiano e microbiota", type: "Revisão", year: 2023 }],
    related: ["eixo-intestino-cerebro", "estresse", "atividade-fisica"],
    lastReviewed: "2026-05-15",
    status: "publicado",
    popularity: 48,
  },
  {
    slug: "estresse",
    name: "Estresse",
    type: "habito",
    synonyms: ["estresse crônico", "stress"],
    short:
      "Modulador do eixo intestino-cérebro que pode intensificar sintomas digestivos funcionais.",
    definition:
      "O estresse ativa vias neuroendócrinas que influenciam a motilidade, a sensibilidade e a microbiota intestinal.",
    gutRelation:
      "É um fator central de Reequilibrar, associado a gatilhos e recaídas em quadros funcionais.",
    rPrimary: "reequilibrar",
    rSecondary: [],
    classificationRationale:
      "Classificado em Reequilibrar, que integra manejo de estresse ao cuidado alimentar.",
    confidence: "moderada",
    evidence: "B",
    evidenceSuggests:
      "Terapias que atuam sobre estresse e o eixo cérebro-intestino têm evidência de melhora em SII.",
    notProven:
      "Não está comprovado que 'controlar o estresse' resolva sozinho os sintomas em todos os casos.",
    cautions:
      "Não minimize sintomas físicos como 'só estresse'. Investigação clínica continua necessária quando indicada.",
    sources: [{ label: "Revisão sobre estresse e eixo intestino-cérebro", type: "Revisão", year: 2022 }],
    related: ["eixo-intestino-cerebro", "sono", "sindrome-intestino-irritavel"],
    lastReviewed: "2026-05-15",
    status: "publicado",
    popularity: 46,
  },
  {
    slug: "atividade-fisica",
    name: "Atividade física",
    type: "habito",
    synonyms: ["exercício", "exercicio fisico", "movimento"],
    short:
      "Modulador do trânsito intestinal e da microbiota, integrado como hábito na etapa de manutenção.",
    definition:
      "A atividade física regular influencia a motilidade intestinal, o metabolismo e a composição da microbiota.",
    gutRelation:
      "Entra em Reequilibrar como modulador de estilo de vida — não como 'treino', mas como parte da rotina.",
    rPrimary: "reequilibrar",
    rSecondary: [],
    classificationRationale:
      "Classificado em Reequilibrar como hábito de manutenção que modula função intestinal.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Atividade física moderada associa-se a melhora do trânsito e a maior diversidade da microbiota em estudos.",
    notProven:
      "Não está comprovado que o exercício, isolado, trate condições intestinais; em atletas, sintomas GI têm mecanismos próprios.",
    cautions:
      "Exercício extenuante pode causar sintomas GI (endurance). Ajuste conforme tolerância e orientação.",
    sources: [{ label: "Revisão sobre exercício e microbiota", type: "Revisão", year: 2023 }],
    related: ["eixo-intestino-cerebro", "constipacao", "sono"],
    lastReviewed: "2026-05-15",
    status: "publicado",
    popularity: 44,
  },
  {
    slug: "fermentados",
    name: "Alimentos fermentados",
    type: "alimento",
    synonyms: ["comida fermentada", "fermentados"],
    short:
      "Alimentos produzidos por fermentação microbiana (iogurte, kefir, kimchi), estudados por efeitos na microbiota.",
    definition:
      "Alimentos fermentados são transformados por microrganismos, podendo conter culturas vivas e metabólitos da fermentação.",
    gutRelation:
      "Fazem parte de Reinocular e, como padrão alimentar, tocam Recolocar.",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "recolocar", intensity: "fraca", rationale: "Compõem um padrão alimentar de reposição." },
    ],
    classificationRationale:
      "Primariamente Reinocular por conterem microrganismos e metabólitos; secundariamente Recolocar como parte da dieta.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Estudos sugerem que dietas ricas em fermentados podem aumentar a diversidade da microbiota.",
    notProven:
      "Não está comprovado que fermentados tratem condições específicas; o efeito varia por produto.",
    cautions:
      "Nem todo 'fermentado' industrial tem culturas vivas. Pessoas sensíveis à histamina podem reagir a alguns.",
    sources: [{ label: "Estudo sobre dieta rica em fermentados e microbiota", type: "Ensaio clínico", year: 2021 }],
    related: ["kefir", "probiotico", "prebiotico"],
    lastReviewed: "2026-05-20",
    status: "publicado",
    popularity: 56,
  },
  {
    slug: "antibiotico",
    name: "Antibiótico",
    type: "medicamento",
    synonyms: ["antibióticos", "antibiotics"],
    short:
      "Medicamento que combate bactérias e pode afetar a microbiota. Uso é sempre decisão médica.",
    definition:
      "Antibióticos tratam infecções bacterianas. Além do alvo, podem reduzir temporariamente a diversidade da microbiota intestinal.",
    gutRelation:
      "Relaciona-se com Remover (em contextos específicos e sob prescrição) e com Reinocular (recuperação da microbiota após o uso).",
    rPrimary: "remover",
    rSecondary: [
      { r: "reinocular", intensity: "moderada", rationale: "Recuperação da microbiota após o curso." },
    ],
    classificationRationale:
      "Classificação múltipla: é uma ferramenta de Remover em indicações específicas e um contexto que motiva Reinocular na recuperação.",
    confidence: "moderada",
    evidence: "B",
    evidenceSuggests:
      "O impacto de antibióticos sobre a microbiota é bem descrito; a diversidade costuma se recuperar parcialmente com o tempo.",
    notProven:
      "Não está comprovado que probióticos 'previnam' todos os efeitos, embora haja sinal para diarreia associada a antibióticos.",
    cautions:
      "Nunca inicie, troque ou suspenda antibiótico por conta própria. Uso indevido gera resistência e danos.",
    sources: [{ label: "Revisão sobre antibióticos e microbiota", type: "Revisão", year: 2022 }],
    related: ["probiotico", "disbiose", "sibo"],
    lastReviewed: "2026-05-27",
    status: "publicado",
    popularity: 62,
  },
  {
    slug: "magnesio",
    name: "Magnésio",
    type: "nutriente",
    synonyms: ["magnesium", "cloreto de magnésio", "citrato de magnésio"],
    short:
      "Mineral essencial; algumas formas têm efeito osmótico usado em constipação, sob orientação.",
    definition:
      "O magnésio é um mineral essencial para inúmeras funções. Certas formas (ex.: óxido, citrato) têm efeito laxativo osmótico.",
    gutRelation:
      "Aparece em Recolocar como recurso pontual em constipação — não como suplemento de rotina para 'saúde intestinal'.",
    rPrimary: "recolocar",
    rSecondary: [],
    classificationRationale:
      "Classificado em Recolocar por seu papel funcional (osmótico) em constipação, quando indicado.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Formas osmóticas de magnésio podem ajudar na constipação; a evidência para 'saúde intestinal' ampla é limitada.",
    notProven:
      "Não está comprovado que suplementar magnésio melhore a microbiota ou trate condições intestinais de forma geral.",
    cautions:
      "Doses inadequadas causam diarreia; há risco em doença renal. Uso deve ser individual e profissional.",
    sources: [{ label: "Guideline de constipação (opções osmóticas)", type: "Guideline", year: 2025 }],
    related: ["constipacao", "fibra-soluvel"],
    lastReviewed: "2026-05-19",
    status: "publicado",
    popularity: 66,
    trending: true,
  },
  {
    slug: "vitamina-d",
    name: "Vitamina D",
    type: "nutriente",
    synonyms: ["vitamin d", "colecalciferol", "vitamina d3"],
    short:
      "Nutriente com papéis imunes; sua relação com a microbiota é estudada, mas ainda inicial.",
    definition:
      "A vitamina D regula o metabolismo ósseo e funções imunes. Receptores de vitamina D estão presentes no intestino.",
    gutRelation:
      "É investigada em Reparar/Reequilibrar por vias imunes e de barreira, com evidência ainda preliminar para desfechos intestinais.",
    rPrimary: "",
    rSecondary: [
      { r: "reparar", intensity: "fraca", rationale: "Vias imunes e de barreira, em estudo." },
    ],
    classificationRationale:
      "Não há base suficiente para classificar a vitamina D em um R principal dentro do 5R com segurança — a relação intestinal é uma hipótese em pesquisa.",
    confidence: "insuficiente",
    evidence: "D",
    evidenceSuggests:
      "Há associações e plausibilidade imune, mas os dados para desfechos intestinais são iniciais e inconsistentes.",
    notProven:
      "Não está comprovado que suplementar vitamina D melhore a saúde intestinal ou a microbiota. Corrigir deficiência é outra questão, clínica.",
    cautions:
      "Suplementação deve ser guiada por avaliação (dosagem e necessidade). Excesso é prejudicial.",
    sources: [{ label: "Revisão sobre vitamina D e microbiota", type: "Revisão", year: 2023 }],
    related: ["barreira-intestinal"],
    lastReviewed: "2026-05-14",
    status: "publicado",
    popularity: 59,
  },
  {
    slug: "corebiome",
    name: "COREBIOME",
    type: "suplemento",
    synonyms: ["core biome"],
    short:
      "Marca de produto voltado à microbiota, usada aqui como exemplo de verbete comercial. A presença no glossário não é recomendação individual.",
    definition:
      "COREBIOME é uma marca do universo da microbiota intestinal. Este verbete é comercial e serve de modelo de como o portal apresenta produtos: separando o que é apresentação comercial do que a ciência sustenta.",
    gutRelation:
      "Produtos dessa categoria costumam se posicionar no apoio à microbiota — o que, no Protocolo 5R, conversa sobretudo com a etapa Reinocular. A relevância real depende dos ativos e da evidência de cada um.",
    rPrimary: "reinocular",
    rSecondary: [
      { r: "reparar", intensity: "fraca", rationale: "Alguns ativos da categoria são estudados na barreira intestinal." },
    ],
    classificationRationale:
      "Classificado em Reinocular por ser um produto de apoio à microbiota. A força da relação depende de cada ingrediente — não do nome da marca.",
    confidence: "baixa",
    evidence: "C",
    evidenceSuggests:
      "Há evidência de níveis variados sobre ingredientes frequentemente associados a essa categoria (fibras prebióticas, probióticos por cepa). A evidência é sobre os ingredientes, avaliada caso a caso.",
    notProven:
      "Evidência sobre um ingrediente isolado não se transfere automaticamente para o produto final. O benefício clínico da formulação completa precisa de estudos próprios.",
    cautions:
      "A presença de uma marca no portal não representa recomendação individual, prescrição ou garantia de resultado. Uso deve ser avaliado por um profissional.",
    sources: [
      { label: "Consenso ISAPP sobre probióticos", type: "Consenso", year: 2014 },
      { label: "Consenso ISAPP sobre prebióticos", type: "Consenso", year: 2017 },
    ],
    related: ["probiotico", "prebiotico", "akkermansia", "pos-biotico"],
    lastReviewed: "2026-07-12",
    status: "publicado",
    popularity: 30,
    commercial: {
      isProduct: true,
      manufacturer: "COREBIOME (marca-exemplo)",
      category: "Apoio à microbiota",
      composition: ["Fibras prebióticas", "Probióticos (cepas declaradas na embalagem)"],
      commercialClaim: "Apresentado comercialmente como apoio ao equilíbrio da microbiota intestinal.",
      ingredientEvidenceNote:
        "Os ingredientes típicos da categoria (prebióticos, probióticos por cepa) têm evidência de níveis variados, avaliada individualmente.",
      productEvidenceNote:
        "Não há, neste modelo educacional, evidência clínica atribuída à formulação final específica — o que não é o mesmo que evidência dos ingredientes.",
      commercialRelation: "Conteúdo institucional de exemplo. Relações comerciais reais serão identificadas de forma clara.",
      brandedPageSlug: "corebiome",
    },
    evidenceLibrary: [
      { label: "Consenso ISAPP sobre probióticos", scope: "ingrediente", ingredient: "Probióticos", grade: "A", type: "Consenso", year: 2014 },
      { label: "Consenso ISAPP sobre prebióticos", scope: "ingrediente", ingredient: "Prebióticos", grade: "A", type: "Consenso", year: 2017 },
      { label: "Meta-análise de probióticos por cepa na SII", scope: "categoria", grade: "B", type: "Meta-análise", year: 2025 },
      { label: "Estudo de mecanismo sobre fibras fermentáveis e AGCC", scope: "mecanismo", grade: "C", type: "Revisão", year: 2022 },
    ],
  },
];
