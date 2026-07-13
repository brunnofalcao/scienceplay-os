// Modelo de dados do Glossário 5R e da taxonomia.
// A base estruturada é a FONTE DE VERDADE da classificação — a IA interpreta
// a busca e explica, mas NÃO é a fonte primária da classificação (Briefing §10.4).

import type { EvidenceGrade, Confidence } from "./evidence";

export type EntityType =
  | "alimento"
  | "ingrediente"
  | "suplemento"
  | "nutriente"
  | "fibra"
  | "prebiotico"
  | "probiotico"
  | "posbiotico"
  | "microrganismo"
  | "metabolito"
  | "sintoma"
  | "condicao"
  | "habito"
  | "medicamento"
  | "exame"
  | "conceito";

export const ENTITY_TYPE_LABEL: Record<EntityType, string> = {
  alimento: "Alimento",
  ingrediente: "Ingrediente",
  suplemento: "Suplemento",
  nutriente: "Nutriente",
  fibra: "Fibra",
  prebiotico: "Prebiótico",
  probiotico: "Probiótico",
  posbiotico: "Pós-biótico",
  microrganismo: "Microrganismo",
  metabolito: "Metabólito",
  sintoma: "Sintoma",
  condicao: "Condição clínica",
  habito: "Hábito",
  medicamento: "Medicamento",
  exame: "Exame",
  conceito: "Conceito",
};

// Um termo pode se relacionar com vários Rs (classificação múltipla, §10.2).
export type RelationIntensity = "forte" | "moderada" | "fraca";

export interface RRelation {
  r: string; // slug do R (remover, recolocar, ...)
  intensity: RelationIntensity;
  rationale: string; // justificativa da relação
}

export interface SourceRef {
  label: string; // citação curta
  type: string; // tipo de estudo/documento
  doi?: string;
  pmid?: string;
  url?: string;
  year?: number;
}

// Camada comercial (para verbetes de produto/marca/ingrediente comercial).
// Regra: NÃO confundir evidência de um ingrediente com evidência do produto final.
export interface CommercialInfo {
  isProduct: boolean;
  manufacturer?: string; // fabricante ou responsável
  category?: string; // categoria comercial
  composition?: string[]; // ingredientes/ativos declarados
  commercialClaim?: string; // para que é comercialmente apresentado
  ingredientEvidenceNote?: string; // o que há de evidência sobre os ingredientes
  productEvidenceNote?: string; // o que há de evidência sobre o produto final
  commercialRelation?: string; // relação comercial declarada (patrocínio/parceria), quando houver
  brandedPageSlug?: string; // liga a uma Branded Page, quando existir
}

// Camada de Medicina Funcional — PERSPECTIVA, separada da evidência.
// Título de referência na UI: "Como a Medicina Funcional interpreta este tema".
export interface FunctionalMedicineView {
  conventional: string; // como a medicina convencional descreve
  functionalPerspective: string; // como a MF costuma interpretar
  mechanisms?: string; // mecanismos propostos
  practices?: string; // práticas frequentemente associadas
  consistent?: string; // pontos com sustentação mais consistente
  hypothesis?: string; // pontos que permanecem hipótese/prática/teoria
  divergences?: string; // onde há divergência
}

// Estudo/conexão para a biblioteca de evidências do verbete (/evidencias).
export type EvidenceScope = "produto" | "ingrediente" | "categoria" | "mecanismo" | "editorial";
export interface EvidenceLink {
  label: string;
  scope: EvidenceScope; // conexão direta (produto), com ingrediente, categoria, mecanismo, editorial
  grade: EvidenceGrade;
  type: string; // tipo de estudo
  year?: number;
  ingredient?: string; // quando scope = ingrediente
  doi?: string;
  pmid?: string;
  url?: string;
}

export interface GlossaryEntry {
  slug: string;
  name: string;
  type: EntityType;
  synonyms: string[];
  short: string; // resposta rápida (AEO)
  definition: string; // "O que é"
  gutRelation: string; // "Como se relaciona com a saúde intestinal"
  rPrimary: string; // slug do R principal ("" se insuficiente)
  rSecondary: RRelation[];
  classificationRationale: string; // "Por que foi classificado assim"
  confidence: Confidence;
  evidence: EvidenceGrade;
  evidenceSuggests: string; // "O que as evidências sugerem"
  notProven: string; // "O que ainda não está comprovado"
  cautions: string; // "Cuidados importantes"
  sources: SourceRef[];
  related: string[]; // slugs de termos relacionados
  lastReviewed: string; // ISO date
  status: "publicado" | "em-revisao";
  popularity?: number; // peso para a nuvem de palavras (não confundir com evidência)
  trending?: boolean;
  // Camadas opcionais (não quebram verbetes existentes):
  commercial?: CommercialInfo; // verbetes de produto/marca
  functionalMedicine?: FunctionalMedicineView; // perspectiva, separada da evidência
  evidenceLibrary?: EvidenceLink[]; // biblioteca de evidências (/evidencias)
}
