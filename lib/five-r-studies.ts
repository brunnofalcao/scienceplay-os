// Biblioteca de referência dos cinco Rs — "Estudos fundamentais deste R".
//
// NÃO é notícia nem resenha: é uma BIBLIOTECA CURADA de referências âncora
// (revisões sistemáticas, meta-análises, diretrizes e consensos) que sustentam
// a lógica de cada etapa do Protocolo 5R. Serve para dar rastreabilidade
// científica ao método, não para prescrever conduta.
//
// Curadoria, não exaustividade: são poucas referências reconhecíveis por R
// (máximo 4), escolhidas pela força do desenho e pela relevância clínica.
// Existem muitas outras publicações relevantes fora desta lista.
//
// Sobre identificadores: quando não há certeza do DOI/PMID exato, o campo é
// OMITIDO de propósito — a referência é identificada por nome + fonte + ano.
// Nunca inventamos um DOI. É preferível uma âncora sem link a um link errado.

import { FIVE_RS } from "@/lib/five-rs";

export interface FundamentalStudy {
  title: string;
  type: "Diretriz" | "Revisão sistemática" | "Meta-análise" | "Consenso";
  source: string; // periódico ou instituição
  year: number;
  connection: string; // 1 frase: por que sustenta este R
  synthesis: string; // 1-2 frases, acessível
  doi?: string;
  pmid?: string;
  url?: string;
  access: "gratuito" | "pago";
  gold?: boolean; // "Revisão Ouro" — as mais fortes do R
}

type RKey = (typeof FIVE_RS)[number]["key"];

export const FUNDAMENTAL_STUDIES: Record<RKey, FundamentalStudy[]> = {
  remover: [
    {
      title: "ACG Clinical Guideline: Management of Irritable Bowel Syndrome",
      type: "Diretriz",
      source: "American College of Gastroenterology (ACG) · American Journal of Gastroenterology",
      year: 2021,
      connection:
        "Estrutura, com base em evidência, quando e como investigar e remover gatilhos antes de escalonar o tratamento do intestino irritável.",
      synthesis:
        "Diretriz que revisa dieta, testes diagnósticos e terapias no intestino irritável, recomendando estratégias como a restrição de FODMAPs por tempo limitado e desencorajando exames de baixo valor.",
      access: "pago",
      gold: true,
    },
    {
      title:
        "Rome IV — Functional Gastrointestinal Disorders / Disorders of Gut-Brain Interaction",
      type: "Consenso",
      source: "Rome Foundation",
      year: 2016,
      connection:
        "Define os distúrbios da interação intestino-cérebro e os critérios que orientam quando remover gatilhos faz sentido clínico.",
      synthesis:
        "Consenso internacional que padroniza o diagnóstico dos distúrbios funcionais digestivos, base conceitual para separar sintoma de causa antes de qualquer intervenção.",
      access: "pago",
      gold: true,
    },
    {
      title:
        "Does a diet low in FODMAPs reduce symptoms associated with functional gastrointestinal disorders? A systematic review and meta-analysis",
      type: "Meta-análise",
      source: "European Journal of Nutrition",
      year: 2016,
      connection:
        "Sustenta a fase de remoção guiada: reduzir FODMAPs por período curto diminui sintomas em parte das pessoas sensíveis.",
      synthesis:
        "Revisão que agrupa estudos sobre a dieta baixa em FODMAPs e encontra sinal consistente de alívio de distensão e dor abdominal — sem indicar restrição crônica.",
      access: "pago",
    },
    {
      title: "ACG Clinical Guideline: Small Intestinal Bacterial Overgrowth (SIBO)",
      type: "Diretriz",
      source: "American College of Gastroenterology (ACG) · American Journal of Gastroenterology",
      year: 2020,
      connection:
        "Orienta quando investigar o sobrecrescimento bacteriano do intestino delgado como fator a identificar e tratar.",
      synthesis:
        "Diretriz que avalia diagnóstico e manejo do SIBO, delimitando o que a evidência sustenta e alertando contra testes e tratamentos sem indicação clara.",
      access: "pago",
    },
  ],
  recolocar: [
    {
      title: "World Gastroenterology Organisation Global Guidelines: Constipation",
      type: "Diretriz",
      source: "World Gastroenterology Organisation (WGO)",
      year: 2010,
      connection:
        "Coloca fibra, hidratação e hábito intestinal como primeira linha — o núcleo da lógica de recolocar função.",
      synthesis:
        "Diretriz global que organiza a abordagem da constipação por níveis de recurso, priorizando medidas alimentares e de estilo de vida antes de fármacos.",
      access: "gratuito",
      gold: true,
    },
    {
      title:
        "The effect of fiber supplementation on irritable bowel syndrome: a systematic review and meta-analysis",
      type: "Meta-análise",
      source: "American Journal of Gastroenterology",
      year: 2014,
      connection:
        "Mostra que a fibra solúvel (psyllium), e não a insolúvel, melhora sintomas — base do recolocar titulado.",
      synthesis:
        "Meta-análise que separa tipos de fibra e conclui que a fibra solúvel traz benefício no intestino irritável, enquanto a insolúvel pode não ajudar ou piorar.",
      access: "pago",
      gold: true,
    },
    {
      title:
        "British Dietetic Association systematic review and evidence-based practice guidelines for the dietary management of irritable bowel syndrome",
      type: "Revisão sistemática",
      source: "Journal of Human Nutrition and Dietetics · British Dietetic Association",
      year: 2016,
      connection:
        "Traduz a evidência alimentar em recomendações práticas de reposição de fibra, ritmo e padrão de refeições.",
      synthesis:
        "Revisão que consolida a conduta dietética no intestino irritável, incluindo titulação de fibra e ajustes de rotina como primeiras medidas antes de restrições amplas.",
      access: "pago",
    },
  ],
  reparar: [
    {
      title: "Leaky gut: mechanisms, measurement and clinical implications in humans",
      type: "Revisão sistemática",
      source: "Gut (BMJ)",
      year: 2019,
      connection:
        "Trava contra o hype: revisa criticamente a permeabilidade intestinal como mecanismo, não como diagnóstico universal.",
      synthesis:
        "Revisão que examina como se mede a barreira intestinal e o que os dados realmente permitem afirmar, distinguindo mecanismo plausível de promessa de cura.",
      access: "pago",
      gold: true,
    },
    {
      title: "Intestinal permeability — a new target for disease prevention and therapy",
      type: "Consenso",
      source: "BMC Gastroenterology",
      year: 2014,
      connection:
        "Reúne especialistas para delimitar o que a barreira intestinal é, e não é, como alvo terapêutico.",
      synthesis:
        "Documento de consenso que revisa a estrutura e a função da barreira intestinal e os métodos de avaliação, pedindo cautela na interpretação clínica.",
      access: "gratuito",
    },
    {
      title:
        "The Intestinal Microenvironment and Functional Gastrointestinal Disorders (Rome Working Team Report)",
      type: "Consenso",
      source: "Gastroenterology · Rome Foundation",
      year: 2016,
      connection:
        "Liga barreira, microbiota e hipersensibilidade visceral aos distúrbios funcionais — o alvo mecanístico do reparar.",
      synthesis:
        "Relatório de consenso que revisa como microbiota, permeabilidade e inflamação de baixo grau interagem nos sintomas digestivos funcionais.",
      access: "pago",
    },
  ],
  reinocular: [
    {
      title:
        "Expert consensus document: The ISAPP consensus statement on the scope and appropriate use of the term probiotic",
      type: "Consenso",
      source: "Nature Reviews Gastroenterology & Hepatology · ISAPP",
      year: 2014,
      connection:
        "Define o que é (e o que não é) probiótico e por que o efeito é cepa-específico — o critério central do reinocular.",
      synthesis:
        "Consenso da ISAPP que padroniza o termo probiótico e reforça que benefício depende de cepa, dose e desfecho estudados, não do rótulo genérico.",
      access: "pago",
      gold: true,
    },
    {
      title:
        "Systematic review with meta-analysis: the efficacy of prebiotics, probiotics, synbiotics and antibiotics in irritable bowel syndrome",
      type: "Meta-análise",
      source: "Alimentary Pharmacology & Therapeutics",
      year: 2018,
      connection:
        "Mostra que algumas cepas têm sinal de benefício no intestino irritável, enquanto 'probiótico' como categoria genérica não garante nada.",
      synthesis:
        "Meta-análise que compara pré, pró e simbióticos no intestino irritável, destacando a heterogeneidade entre cepas e a necessidade de escolher por alvo.",
      access: "pago",
      gold: true,
    },
    {
      title:
        "Expert consensus document: The ISAPP consensus statement on the definition and scope of prebiotics",
      type: "Consenso",
      source: "Nature Reviews Gastroenterology & Hepatology · ISAPP",
      year: 2017,
      connection:
        "Delimita o conceito de prebiótico, base para introduzir substrato e fibra fermentável com critério e titulação.",
      synthesis:
        "Consenso da ISAPP que atualiza a definição de prebiótico para além da fibra clássica, orientando o uso baseado em efeito sobre a microbiota.",
      access: "pago",
    },
    {
      title:
        "The International Scientific Association of Probiotics and Prebiotics (ISAPP) consensus statement on the definition and scope of postbiotics",
      type: "Consenso",
      source: "Nature Reviews Gastroenterology & Hepatology · ISAPP",
      year: 2021,
      connection:
        "Define pós-bióticos e metabólitos como área emergente — a fronteira em evolução do reinocular.",
      synthesis:
        "Consenso da ISAPP que estabelece o que conta como pós-biótico, delimitando um campo ainda em construção e evitando promessas prematuras.",
      access: "pago",
    },
  ],
  reequilibrar: [
    {
      title:
        "Efficacy of psychological therapies for irritable bowel syndrome: systematic review and network meta-analysis",
      type: "Meta-análise",
      source: "Gut (BMJ)",
      year: 2020,
      connection:
        "Sustenta a integração das terapias cérebro-intestino ao cuidado: elas reduzem sintomas frente ao cuidado usual.",
      synthesis:
        "Meta-análise em rede que compara terapias psicológicas no intestino irritável, encontrando benefício para abordagens como a terapia cognitivo-comportamental e a hipnoterapia.",
      access: "pago",
      gold: true,
    },
    {
      title:
        "A Rome Working Team Report on Brain-Gut Behavior Therapies for Disorders of Gut-Brain Interaction",
      type: "Consenso",
      source: "Gastroenterology · Rome Foundation",
      year: 2022,
      connection:
        "Formaliza as terapias comportamentais cérebro-intestino como parte estruturada, e não acessória, do manejo.",
      synthesis:
        "Relatório de consenso que descreve quais terapias comportamentais têm evidência nos distúrbios da interação intestino-cérebro e como integrá-las ao cuidado.",
      access: "pago",
      gold: true,
    },
    {
      title:
        "Effect of antidepressants and psychological therapies in irritable bowel syndrome: a systematic review and meta-analysis",
      type: "Meta-análise",
      source: "American Journal of Gastroenterology",
      year: 2019,
      connection:
        "Reforça o eixo intestino-cérebro como alvo com evidência para manter o resultado e reduzir recaídas.",
      synthesis:
        "Revisão que agrupa ensaios sobre terapias dirigidas ao eixo cérebro-intestino, apontando melhora de sintomas em comparação com placebo ou cuidado usual.",
      access: "pago",
    },
    {
      title: "Gut/brain axis and the microbiota",
      type: "Revisão sistemática",
      source: "Journal of Clinical Investigation",
      year: 2015,
      connection:
        "Fundamenta por que sono, estresse e ritmo modulam sintomas digestivos — a base fisiológica do reequilibrar.",
      synthesis:
        "Revisão que descreve a comunicação bidirecional entre cérebro, intestino e microbiota, explicando como estresse e comportamento afetam a função gastrointestinal.",
      access: "gratuito",
    },
  ],
};
