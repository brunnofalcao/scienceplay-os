// =====================================================================
// engine/evidence.mjs — Ponte entre um rascunho e a avaliação de evidência
// VÁLIDA pelo padrão do Protocolo 5R, com as TRAVAS de proporcionalidade.
//
// Filosofia (espelha lib/evidence.ts e engine/evidence-map.js da referência):
//   deriva campos faltantes DETERMINISTICAMENTE a partir do grau, garantindo
//   que um nível nunca declare mais do que seu desenho permite:
//     - Grau D → só mecanismo/pré-clínico; NUNCA efeito clínico.
//     - Grau C → aplicabilidade clínica no máximo 'baixa'.
//     - Grau B → aplicabilidade no máximo 'moderada'.
//     - Grau A → pode 'alta', mas ainda não determina conduta individual.
//
// O objeto retornado é compatível com a tabela evidence_assessments do
// db/schema-5r.sql (mesmos enums e a mesma trava do CHECK chk_d_*).
// =====================================================================

// Graus válidos (espelha EvidenceGrade de lib/evidence.ts).
const GRADES = new Set(["A", "B", "C", "D"]);

// grau → certeza (conservador).
export function certaintyFromGrade(g) {
  return { A: "alta", B: "moderada", C: "baixa", D: "muito-baixa" }[g] || "baixa";
}

// grau → TETO de aplicabilidade clínica (proporcionalidade).
export function applicabilityFromGrade(g) {
  return { A: "alta", B: "moderada", C: "baixa", D: "muito-baixa" }[g] || "baixa";
}

// Ajusta a direção do efeito para respeitar a trava do grau:
//   - D com direção favorável/desfavorável → 'mecanistico' (não afirma clínica).
//   - C observacional favorável/desfavorável → mantém, mas marca 'associativo'
//     quando o desenho é observacional/associação (não prova causa).
export function effectForGrade(grade, direction, studyTypeSlug) {
  let dir = direction || "insuficiente";
  const observ = studyTypeSlug === "coorte" || studyTypeSlug === "observacional" || studyTypeSlug === "associacao";

  if (grade === "D" && (dir === "favoravel" || dir === "desfavoravel")) {
    return "mecanistico";
  }
  if (grade === "C" && observ && (dir === "favoravel" || dir === "desfavoravel")) {
    return "associativo";
  }
  return dir;
}

// Fallback honesto de "o que NÃO prova", por grau, quando o rascunho não fornece.
export function defaultDoesNotProve(grade, studyTypeSlug) {
  if (grade === "D")
    return "Evidência mecanística ou pré-clínica. Não estabelece efeito clínico em pessoas nem se generaliza para a prática ou para alegações de produto.";
  if (grade === "C")
    return "Evidência observacional ou indireta. Não estabelece causalidade — associação não é prova clínica.";
  if (grade === "B")
    return "Ensaio único ou evidência prospectiva limitada. Não estabelece, por si só, um efeito generalizável entre populações e contextos.";
  return "Não substitui o julgamento clínico; as conclusões limitam-se às populações, doses e desfechos efetivamente estudados.";
}

export function defaultLimitations(grade) {
  if (grade === "D") return "Desenho pré-clínico/mecanístico; achados não se traduzem diretamente para a clínica.";
  if (grade === "C") return "Desenho observacional; confusão residual e ausência de randomização limitam inferência causal.";
  if (grade === "B") return "Ensaio único ou evidência prospectiva limitada; generalização e replicação ainda por estabelecer.";
  return "Aplicam-se as limitações inerentes aos estudos incluídos; ver a fonte para o detalhamento metodológico.";
}

// ---------------------------------------------------------------------
// buildAssessment(draft, study)
//   draft = { grade, study_type, direction, sample_size, does_not_prove?, limitations?, summary? }
//   study = { id?, doi?, ... } (contexto opcional)
//
//   Devolve o objeto de avaliação já com as travas aplicadas, pronto para
//   inserir em evidence_assessments. NUNCA gera um objeto que violaria o CHECK.
// ---------------------------------------------------------------------
export function buildAssessment(draft = {}, study = {}) {
  const grade = GRADES.has(draft.grade) ? draft.grade : "C";
  const studyTypeSlug = draft.study_type || null;

  const effect = effectForGrade(grade, draft.direction, studyTypeSlug);
  const certainty = certaintyFromGrade(grade);
  const applicability = applicabilityFromGrade(grade);

  // efeito clínico só é "declarado" quando a direção é favorável/desfavorável
  // — e isso é IMPOSSÍVEL para D (já convertido acima para 'mecanistico').
  const claimsClinical = effect === "favoravel" || effect === "desfavoravel";

  const assessment = {
    study_id: study.id || null,
    entity_id: draft.entity_id || null,
    r_id: draft.r_id || null,
    grade,
    study_type_slug: studyTypeSlug,
    effect_direction: effect,
    claims_clinical_effect: claimsClinical,
    clinical_applicability: applicability,
    certainty,
    summary: draft.summary || "",
    what_it_does_not_prove: (draft.does_not_prove && String(draft.does_not_prove).trim()) || defaultDoesNotProve(grade, studyTypeSlug),
    limitations: (draft.limitations && String(draft.limitations).trim()) || defaultLimitations(grade),
    sample_size: draft.sample_size || null,
    standard_version: "v1.0",
    version: 1,
    status: "rascunho", // sempre nasce como rascunho — assinatura é humana
  };

  // Verificação defensiva: garante coerência com as travas do schema.
  validateAssessment(assessment);
  return assessment;
}

// Lança se o objeto violaria alguma trava de proporcionalidade (defesa em
// profundidade — o CHECK do banco é a última linha; isto falha antes).
export function validateAssessment(a) {
  const errs = [];
  if (a.grade === "D" && a.claims_clinical_effect) errs.push("Grau D não pode declarar efeito clínico.");
  if (a.grade === "D" && (a.effect_direction === "favoravel" || a.effect_direction === "desfavoravel"))
    errs.push("Grau D não pode ter direção favorável/desfavorável.");
  if (a.grade === "D" && a.clinical_applicability !== "muito-baixa")
    errs.push("Grau D: aplicabilidade deve ser 'muito-baixa'.");
  if (a.grade === "C" && ["alta", "moderada"].includes(a.clinical_applicability))
    errs.push("Grau C: aplicabilidade limitada a 'baixa'.");
  if (a.grade === "B" && a.clinical_applicability === "alta") errs.push("Grau B: aplicabilidade no máximo 'moderada'.");
  if (!a.what_it_does_not_prove) errs.push("Campo obrigatório: what_it_does_not_prove.");
  if (errs.length) throw new Error("Avaliação de evidência inválida: " + errs.join(" "));
  return true;
}
