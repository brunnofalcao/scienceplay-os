// Escala editorial de evidência do Protocolo 5R.
// Adaptada do "Evidence Standard" do motor de referência (Microbiota.org),
// com travas de proporcionalidade: um nível não pode declarar mais do que
// seu desenho permite. Nível D nunca afirma efeito clínico.

export type EvidenceGrade = "A" | "B" | "C" | "D";

export type StudyType =
  | "revisao-sistematica"
  | "meta-analise"
  | "guideline"
  | "consenso"
  | "ensaio-clinico"
  | "coorte"
  | "observacional"
  | "pre-clinico"
  | "mecanismo"
  | "associacao"
  | "hipotese";

export interface EvidenceLevel {
  grade: EvidenceGrade;
  label: string;
  color: string;
  meaning: string;
  ceiling: string; // o que este nível NÃO permite afirmar
}

export const EVIDENCE_SCALE: Record<EvidenceGrade, EvidenceLevel> = {
  A: {
    grade: "A",
    label: "Evidência forte",
    color: "#1F5C3D",
    meaning:
      "Sustentada por revisões sistemáticas, meta-análises consistentes ou diretrizes de sociedades científicas. Achados replicados e aplicáveis à prática.",
    ceiling:
      "Ainda assim, não determina conduta individual — isso pertence ao profissional que avalia o paciente.",
  },
  B: {
    grade: "B",
    label: "Evidência moderada",
    color: "#2B3990",
    meaning:
      "Sustentada por ensaios clínicos ou coortes de boa qualidade, com alguma inconsistência ou limitação de aplicabilidade.",
    ceiling:
      "Não deve ser lida como recomendação definitiva; o efeito pode variar entre pessoas e contextos.",
  },
  C: {
    grade: "C",
    label: "Evidência limitada",
    color: "#C8842E",
    meaning:
      "Baseada em estudos observacionais, amostras pequenas ou resultados preliminares. Sugere associação ou plausibilidade, não causa.",
    ceiling:
      "Não permite afirmar que a intervenção funciona; indica hipótese que precisa de confirmação.",
  },
  D: {
    grade: "D",
    label: "Evidência insuficiente",
    color: "#9A3B2E",
    meaning:
      "Apoiada apenas em estudos pré-clínicos, mecanismos teóricos ou dados iniciais. Interessante para pesquisa, sem tradução clínica estabelecida.",
    ceiling:
      "Nunca declara efeito clínico. Um resultado estatisticamente significativo em laboratório não é prova de benefício em pessoas.",
  },
};

// Hierarquia de desenho → grau máximo permitido (usada na classificação editorial).
export const STUDY_TYPE_LABEL: Record<StudyType, string> = {
  "revisao-sistematica": "Revisão sistemática",
  "meta-analise": "Meta-análise",
  guideline: "Diretriz (guideline)",
  consenso: "Consenso",
  "ensaio-clinico": "Ensaio clínico",
  coorte: "Estudo de coorte",
  observacional: "Estudo observacional",
  "pre-clinico": "Estudo pré-clínico",
  mecanismo: "Mecanismo",
  associacao: "Associação",
  hipotese: "Hipótese",
};

// Confiança da classificação de um termo dentro dos 5 Rs.
export type Confidence = "alta" | "moderada" | "baixa" | "insuficiente";

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  alta: "Confiança alta",
  moderada: "Confiança moderada",
  baixa: "Confiança baixa",
  insuficiente: "Evidência insuficiente",
};
