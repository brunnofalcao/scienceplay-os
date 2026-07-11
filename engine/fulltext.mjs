// =====================================================================
// engine/fulltext.mjs — Enriquecimento via Europe PMC (open access).
//
// Para um DOI, descobre: status open access, PMCID, licença e o ABSTRACT
// (que é de uso livre). Só isso. Para artigos PAGOS não busca texto algum
// — respeita o direito autoral. O motor usa apenas metadados + abstract +
// link à fonte.
//
// Exporta:
//   resolveOA(doi)   -> { pmcid, isOpenAccess, inEPMC, license, abstract }
//   fetchAbstract(doi) -> string | null   (conveniência)
// =====================================================================
import { getJSON } from "./lib/http.mjs";

// Resolve metadados de acesso aberto a partir do DOI (Europe PMC search).
export async function resolveOA(doi) {
  if (!doi) return null;
  const url =
    `https://www.ebi.ac.uk/europepmc/webservices/rest/search` +
    `?query=DOI:${encodeURIComponent(doi)}&format=json&resultType=core`;
  const j = await getJSON(url, { timeoutMs: 8000 });
  const r = j && j.resultList && j.resultList.result && j.resultList.result[0];
  if (!r) return null;
  return {
    pmcid: r.pmcid || null,
    pmid: r.pmid || null,
    isOpenAccess: r.isOpenAccess === "Y",
    inEPMC: r.inEPMC === "Y",
    license: r.license || null,
    // abstractText é o resumo — metadado de uso livre. NÃO é o full-text.
    abstract: r.abstractText ? String(r.abstractText).replace(/<[^>]+>/g, "").trim() : null,
  };
}

// Conveniência: devolve só o abstract (ou null) para uso na geração.
export async function fetchAbstract(doi) {
  const meta = await resolveOA(doi);
  return meta && meta.abstract ? meta.abstract.slice(0, 2000) : null;
}
