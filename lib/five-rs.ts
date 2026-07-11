// Os cinco Rs — fonte de verdade da metodologia.
// ORDEM E NOMES seguem o Briefing (§7.3) e o Brandbook oficial, que têm
// prioridade sobre a ementa da certificação em caso de conflito de ordem.
// Cores = escala tonal dos 5 R's do Brandbook (denso R1 → claro R5).
//
// Conteúdo educacional, nunca prescritivo. Cada R descreve o que a etapa
// organiza — não indica dose, produto ou conduta individual.

export interface FiveR {
  key: string; // slug
  n: string; // "R·01"
  order: number;
  name: string; // "Remover"
  english: string; // "Remove"
  color: string;
  tagline: string;
  objective: string;
  definition: string;
  examples: string[]; // exemplos EDUCACIONAIS (categorias, não prescrição)
  relatedTerms: string[]; // slugs do glossário
  cautions: string;
  faqs: { q: string; a: string }[];
}

export const FIVE_RS: FiveR[] = [
  {
    key: "remover",
    n: "R·01",
    order: 1,
    name: "Remover",
    english: "Remove",
    color: "#131A45",
    tagline: "Tirar o que atrapalha antes de repor o que falta.",
    objective:
      "Identificar e reduzir gatilhos plausíveis que sustentam os sintomas — antes de qualquer reposição ou suplementação.",
    definition:
      "A primeira etapa organiza a intervenção pela lógica de risco e resposta: remover, com método e por tempo definido, gatilhos alimentares, fatores irritantes e causas prováveis dos sintomas gastrointestinais. 'Remover' é uma decisão clínica estruturada — com hipótese, prazo e critério de resposta — e não uma eliminação alimentar crônica ou um 'detox'. O objetivo é reduzir ruído para enxergar o que realmente importa, sem empobrecer a diversidade alimentar.",
    examples: [
      "Estratégias dietéticas estruturadas com fase de reintrodução (ex.: abordagens tipo low-FODMAP, quando indicadas)",
      "Gatilhos comuns avaliados por hipótese: lactose, cafeína, álcool, ultraprocessados",
      "Investigação de fatores infecciosos, inflamatórios ou iatrogênicos por um profissional",
      "Revisão de medicamentos que possam contribuir para os sintomas — sempre com o prescritor",
    ],
    relatedTerms: ["low-fodmap", "gluten", "sibo", "disbiose", "lactose"],
    cautions:
      "Restrição alimentar sem prazo, sem reintrodução e sem métrica é um risco, não um tratamento. Sinais de alarme (perda de peso, sangramento, anemia, febre, sintomas noturnos) exigem avaliação médica imediata — o 5R não é o primeiro passo nesses casos.",
    faqs: [
      {
        q: "Remover é fazer uma dieta restritiva?",
        a: "Não. Remover é uma etapa temporária e guiada por hipótese, com plano de reintrodução. Restrição crônica sem reavaliação vai contra o método.",
      },
      {
        q: "Preciso cortar glúten no Protocolo 5R?",
        a: "Não há uma regra única. A relevância do glúten é individual e, quando há suspeita de doença celíaca, ela deve ser investigada antes de qualquer exclusão. Essa é uma decisão profissional.",
      },
    ],
  },
  {
    key: "recolocar",
    n: "R·02",
    order: 2,
    name: "Recolocar",
    english: "Replace",
    color: "#2B3990",
    tagline: "Restaurar a função digestiva, não empurrar suplemento.",
    objective:
      "Repor o que é necessário para o funcionamento digestivo adequado — começando por comida, rotina e substrato, não por cápsulas.",
    definition:
      "A segunda etapa restaura a função: fibras adequadas e tituladas, hidratação, ritmo alimentar, mastigação e, quando há sinais clínicos, suporte à digestão (ácido gástrico, enzimas, bile) avaliado por um profissional. 'Recolocar' é reconstruir o básico que resolve — não distribuir enzimas ou suplementos para todos. Em constipação e outros quadros funcionais, fibras solúveis tituladas costumam ser primeira linha, com plano para minimizar gases e distensão.",
    examples: [
      "Fibras por tipo (solúvel, insolúvel, viscosa, fermentável), com dose titulada e tolerância",
      "Hidratação, horários das refeições, mastigação e volume alimentar",
      "Padrão alimentar sustentável em vez de 'receitinhas' isoladas",
      "Suporte digestivo (enzimas, ácido, bile) somente quando há hipótese clínica que justifique",
    ],
    relatedTerms: ["fibra-soluvel", "inulina", "enzimas-digestivas", "constipacao"],
    cautions:
      "Suplemento é ferramenta de terceira camada, não o núcleo. Recolocar enzimas ou fibras 'para todo mundo', sem hipótese, aumenta custo e efeitos adversos sem benefício comprovado.",
    faqs: [
      {
        q: "Recolocar significa tomar enzimas digestivas?",
        a: "Nem sempre. Enzimas entram apenas diante de sinais clínicos que sugiram déficit de função digestiva, avaliados por um profissional. A base é comida, fibra e rotina.",
      },
    ],
  },
  {
    key: "reparar",
    n: "R·03",
    order: 3,
    name: "Reparar",
    english: "Repair",
    color: "#4353B8",
    tagline: "Barreira e mucosa — mecanismo plausível, sem promessa.",
    objective:
      "Favorecer a integridade da barreira intestinal e reduzir a irritação da mucosa, separando o que é plausível do que é hype.",
    definition:
      "A terceira etapa cuida da barreira intestinal, da inflamação de baixo grau e da hipersensibilidade visceral. 'Reparar' precisa ser traduzido em mecanismos que fazem sentido clínico, priorizando o que tem melhor sinal (padrão alimentar, densidade nutricional, fibras, eixo cérebro-intestino) — e não transformar 'permeabilidade intestinal' em justificativa universal para qualquer suplemento. É a etapa-trava contra o charlatanismo: mecanismo possível não é promessa de cura.",
    examples: [
      "Padrão alimentar com densidade nutricional adequada",
      "Compostos com melhor sinal clínico, avaliados por evidência, dose e segurança",
      "Manejo de fatores que perpetuam inflamação de baixo grau",
      "Integração com o eixo intestino-cérebro (R5) para reduzir hipersensibilidade",
    ],
    relatedTerms: ["barreira-intestinal", "glutamina", "permeabilidade-intestinal", "polifenois"],
    cautions:
      "'Leaky gut' como explicação para tudo é uma bandeira vermelha. A permeabilidade intestinal é um mecanismo estudado, não um diagnóstico de conveniência nem uma indicação para 'stacks' de 20 suplementos.",
    faqs: [
      {
        q: "O Protocolo 5R trata 'intestino permeável'?",
        a: "O 5R trata a barreira intestinal como um mecanismo entre outros, com intervenções de melhor evidência. Não vende 'permeabilidade' como causa universal nem promete reparo com suplementos milagrosos.",
      },
    ],
  },
  {
    key: "reinocular",
    n: "R·04",
    order: 4,
    name: "Reinocular",
    english: "Reinoculate",
    color: "#7C89D6",
    tagline: "Microbiota com critério: cepa, dose, tempo e alvo.",
    objective:
      "Apoiar a microbiota com pré, pró, sim e pós-bióticos escolhidos por critério — não por moda.",
    definition:
      "A quarta etapa favorece a microbiota com prebióticos, probióticos, simbióticos, pós-bióticos, fermentados e fibras microbiota-friendly. 'Reinocular' com critério significa escolher por sintoma e fenótipo, respeitar cepa, dose e tempo de teste, e ter critérios claros para interromper se não houver resposta. Não é 'cápsula para todos': em pessoas sensíveis, prebióticos e fibras precisam ser introduzidos de forma titulada para não piorar gases e distensão.",
    examples: [
      "Probióticos escolhidos por cepa estudada, dose e alvo — com prazo de teste e critério de parada",
      "Prebióticos e fibras fermentáveis introduzidos de forma progressiva",
      "Alimentos fermentados, quando há sinal de utilidade",
      "Pós-bióticos e metabólitos (ex.: butirato) como área de estudo em evolução",
    ],
    relatedTerms: ["probiotico", "prebiotico", "kefir", "akkermansia", "butirato", "pos-biotico"],
    cautions:
      "Probiótico não é tudo igual: o efeito é cepa-específico. Há populações de risco (imunossuprimidos, pacientes hospitalizados, algumas condições cardíacas) em que o uso exige avaliação médica. 'Reinocular' não substitui as etapas anteriores.",
    faqs: [
      {
        q: "Qualquer probiótico serve para o Protocolo 5R?",
        a: "Não. O efeito depende da cepa, da dose e do alvo. A escolha é individual e deve considerar o quadro e a segurança — por isso o método enfatiza critério, não marca.",
      },
    ],
  },
  {
    key: "reequilibrar",
    n: "R·05",
    order: 5,
    name: "Reequilibrar",
    english: "Rebalance",
    color: "#B9C1EA",
    tagline: "Eixo intestino-cérebro, estilo de vida e manutenção.",
    objective:
      "Sustentar o resultado e reduzir recaídas integrando estresse, sono, ritmo e o eixo intestino-cérebro.",
    definition:
      "A quinta etapa mantém o resultado: eixo intestino-cérebro, sono, estresse, ritmo circadiano e mudanças de estilo de vida sustentáveis. 'Reequilibrar' integra as terapias cérebro-intestino com melhor evidência (quando indicadas) ao cuidado alimentar, com foco em adesão, reintrodução e manutenção — sem virar papo motivacional. É a etapa que transforma uma melhora pontual em resposta duradoura.",
    examples: [
      "Higiene do sono, manejo de estresse e ritmo circadiano",
      "Movimento como modulador (não como 'treino'), integrado à rotina",
      "Terapias cérebro-intestino com evidência, quando indicadas por um profissional",
      "Plano de manutenção e reintrodução para evitar restrição crônica",
    ],
    relatedTerms: ["eixo-intestino-cerebro", "sono", "estresse", "atividade-fisica"],
    cautions:
      "Reequilibrar não é substituir cuidado em saúde mental por 'lifestyle'. Sintomas psicológicos relevantes pedem avaliação profissional própria. O objetivo é manutenção, não uma nova lista de regras rígidas.",
    faqs: [
      {
        q: "Estresse e sono realmente afetam o intestino?",
        a: "O eixo intestino-cérebro é bidirecional e há evidência de que estresse, sono e comportamento modulam sintomas gastrointestinais. Por isso o 5R integra esses fatores na etapa de manutenção.",
      },
    ],
  },
];

export function getR(key: string): FiveR | undefined {
  return FIVE_RS.find((r) => r.key === key);
}
