// =====================================================================
// engine/lib/http.mjs — utilitário HTTPS mínimo (ESM), sem dependências.
//
// Responsabilidade única: fazer GET e devolver JSON (ou texto), enviando
// SEMPRE um User-Agent identificável com e-mail de contato, como exigem
// os termos de uso da CrossRef e do NCBI E-utilities ("polite pool").
//
// NÃO faz scraping nem baixa conteúdo protegido — só chama APIs públicas
// de metadados (CrossRef, PubMed, Europe PMC).
// =====================================================================
import https from "node:https";

// E-mail de contato enviado no User-Agent (polite pool). Configurável por env.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contato@scienceplay.com";
const USER_AGENT = `Protocolo5R-Engine/1.0 (+https://scienceplay.com; mailto:${CONTACT_EMAIL})`;

// Faz um GET e resolve com o corpo. asJson=true → faz JSON.parse.
// timeoutMs protege a fila de travar num endpoint lento (Europe PMC etc.).
export function get(url, { asJson = true, timeoutMs = 8000 } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { "User-Agent": USER_AGENT, Accept: asJson ? "application/json" : "*/*" } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          // Erros HTTP não derrubam a fila: devolvemos null e o chamador segue.
          if (res.statusCode < 200 || res.statusCode >= 300) return resolve(null);
          if (!asJson) return resolve(data);
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`JSON inválido de ${url}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve(null); // timeout → segue sem esse resultado
    });
  });
}

// Açúcar sintático: get() garantindo JSON (lança se o corpo não for JSON).
export function getJSON(url, opts = {}) {
  return get(url, { ...opts, asJson: true });
}

export { USER_AGENT, CONTACT_EMAIL };
