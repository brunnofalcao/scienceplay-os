import type { EvidenceGrade, StudyType } from "@/lib/evidence";

// SEED DE NOTÍCIAS — exemplos com a ESTRUTURA editorial completa exigida
// pelo Briefing §8.5. São DEMONSTRAÇÕES do formato produzido pelo motor
// científico (capture → avaliação → geração → revisão humana → publicação),
// não substituem a publicação diária real, que virá do pipeline.
// Toda notícia é rastreável (fonte, tipo de estudo, nível de evidência).

export interface NewsArticle {
  slug: string;
  title: string; // título popular
  quickAnswer: string; // resposta rápida (AEO)
  category: string;
  rTags: string[]; // slugs dos Rs envolvidos
  terms: string[]; // slugs do glossário relacionados
  studied: string; // o que foi estudado
  participants: string; // quem participou / qual modelo
  intervention: string; // intervenção ou exposição
  found: string; // o que o estudo encontrou
  cannotConclude: string; // o que não permite concluir
  relationTo5R: string; // relação possível com o Protocolo 5R
  evidence: EvidenceGrade;
  studyType: StudyType;
  limitations: string;
  practical: string; // aplicação prática educacional
  source: {
    journal: string;
    authors: string;
    doi?: string;
    pmid?: string;
    year: number;
    url?: string;
    access: "gratuito" | "pago";
  };
  publishedAt: string; // ISO
  reviewedAt: string; // ISO
  reviewer: string;
  related: string[]; // slugs de outras notícias
  featured?: boolean;
}

export const NEWS: NewsArticle[] = [
  {
    slug: "low-fodmap-sii-revisao-2025",
    title: "Dieta low-FODMAP na síndrome do intestino irritável: o que uma grande revisão de 2025 mostra",
    quickAnswer:
      "Uma revisão que reúne vários estudos indica que a fase de restrição da dieta low-FODMAP melhora sintomas em parte das pessoas com SII — mas a reintrodução é essencial e a dieta não deve ser permanente.",
    category: "Alimentação e sintomas",
    rTags: ["remover", "recolocar"],
    terms: ["low-fodmap", "sindrome-intestino-irritavel", "fibra-soluvel"],
    studied:
      "O conjunto de estudos avaliou o efeito da dieta low-FODMAP sobre sintomas gastrointestinais em adultos com síndrome do intestino irritável.",
    participants:
      "Adultos com diagnóstico de SII, reunidos a partir de múltiplos ensaios clínicos em uma revisão que agrupa resultados.",
    intervention:
      "Redução temporária de carboidratos fermentáveis (FODMAPs), seguida, nos protocolos adequados, de uma fase de reintrodução guiada.",
    found:
      "Na fase de restrição, houve melhora de distensão e dor abdominal em parte dos participantes, em comparação com dietas de controle.",
    cannotConclude:
      "Não permite concluir que a restrição deva ser mantida a longo prazo, nem que funcione para todos — a resposta é individual e a reintrodução é parte do método.",
    relationTo5R:
      "Ilustra a etapa Remover conduzida com método (hipótese, prazo, reintrodução) e a transição para Recolocar, evitando restrição crônica.",
    evidence: "A",
    studyType: "revisao-sistematica",
    limitations:
      "Estudos heterogêneos, cegamento difícil em intervenções dietéticas, seguimento curto e adesão variável.",
    practical:
      "Educacionalmente: a low-FODMAP é temporária e precisa de acompanhamento profissional, sempre com plano de reintrodução para preservar a diversidade alimentar.",
    source: {
      journal: "Revisão sistemática (exemplo representativo)",
      authors: "Autores diversos",
      year: 2025,
      access: "gratuito",
    },
    publishedAt: "2026-07-11T09:00:00Z",
    reviewedAt: "2026-07-10T18:00:00Z",
    reviewer: "Revisão editorial Protocolo 5R",
    related: ["probioticos-sii-cepa", "eixo-cerebro-intestino-terapias"],
    featured: true,
  },
  {
    slug: "probioticos-sii-cepa",
    title: "Probióticos para o intestino irritável: por que a cepa importa mais que a palavra 'probiótico'",
    quickAnswer:
      "Análises recentes indicam que algumas cepas específicas de probióticos ajudam em subtipos de SII, enquanto 'probiótico' como categoria genérica não garante benefício.",
    category: "Microbiota e suplementos",
    rTags: ["reinocular"],
    terms: ["probiotico", "sindrome-intestino-irritavel", "disbiose"],
    studied:
      "Os estudos avaliaram diferentes cepas de probióticos em desfechos de sintomas na síndrome do intestino irritável.",
    participants:
      "Adultos com SII em ensaios clínicos com diferentes formulações e cepas.",
    intervention:
      "Uso de probióticos por período definido (tipicamente semanas), comparado a placebo.",
    found:
      "O efeito variou conforme a cepa e o subtipo de SII; algumas cepas mostraram sinal em desfechos específicos.",
    cannotConclude:
      "Não permite concluir que qualquer probiótico funcione para qualquer pessoa, nem definir 'a melhor marca'.",
    relationTo5R:
      "Exemplifica a etapa Reinocular com critério: escolha por cepa, dose e alvo, com prazo de teste e critério de parada.",
    evidence: "B",
    studyType: "meta-analise",
    limitations:
      "Heterogeneidade entre cepas e estudos, risco de viés de publicação e desfechos autorrelatados.",
    practical:
      "Educacionalmente: 'probiótico' não é tudo igual. A decisão é individual e deve considerar cepa, segurança e resposta.",
    source: {
      journal: "Meta-análise (exemplo representativo)",
      authors: "Autores diversos",
      year: 2025,
      access: "pago",
    },
    publishedAt: "2026-07-10T09:00:00Z",
    reviewedAt: "2026-07-09T18:00:00Z",
    reviewer: "Revisão editorial Protocolo 5R",
    related: ["low-fodmap-sii-revisao-2025", "eixo-cerebro-intestino-terapias"],
  },
  {
    slug: "eixo-cerebro-intestino-terapias",
    title: "Terapias que conectam cérebro e intestino reduzem sintomas na SII, aponta síntese de estudos",
    quickAnswer:
      "Uma síntese de estudos sugere que terapias cérebro-intestino (como terapia cognitivo-comportamental e hipnoterapia dirigida) ajudam a reduzir sintomas na síndrome do intestino irritável.",
    category: "Eixo intestino-cérebro",
    rTags: ["reequilibrar"],
    terms: ["eixo-intestino-cerebro", "sindrome-intestino-irritavel", "estresse"],
    studied:
      "Os estudos compararam terapias cérebro-intestino com cuidados usuais em pessoas com SII.",
    participants:
      "Adultos com SII em ensaios de intervenções comportamentais e psicológicas dirigidas ao intestino.",
    intervention:
      "Terapia cognitivo-comportamental, hipnoterapia dirigida ao intestino e abordagens relacionadas.",
    found:
      "As terapias associaram-se a melhora de sintomas e qualidade de vida em comparação com o cuidado usual.",
    cannotConclude:
      "Não permite concluir que os sintomas sejam 'apenas psicológicos', nem que essas terapias substituam a avaliação clínica.",
    relationTo5R:
      "Representa a etapa Reequilibrar: integrar o eixo intestino-cérebro para sustentar resultado e reduzir recaídas.",
    evidence: "A",
    studyType: "meta-analise",
    limitations:
      "Dificuldade de cegamento, variação nos formatos de terapia e acesso desigual a esses tratamentos.",
    practical:
      "Educacionalmente: estresse, sono e comportamento fazem parte do cuidado intestinal — não como 'papo motivacional', mas como terapias com evidência.",
    source: {
      journal: "Meta-análise (exemplo representativo)",
      authors: "Autores diversos",
      year: 2025,
      access: "gratuito",
    },
    publishedAt: "2026-07-09T09:00:00Z",
    reviewedAt: "2026-07-08T18:00:00Z",
    reviewer: "Revisão editorial Protocolo 5R",
    related: ["low-fodmap-sii-revisao-2025", "probioticos-sii-cepa"],
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
