// Autenticação do ADMIN — sessão assinada (HMAC-SHA256), compatível com o
// Edge Runtime (middleware) e com route handlers (Node). Autorização é sempre
// server-side. Sem senha configurada, o ADMIN fica BLOQUEADO (padrão seguro).

export const ADMIN_COOKIE = "p5r_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8h

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

const enc = new TextEncoder();

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(key: string, msg: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
  return b64url(sig);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSession(): Promise<string | null> {
  const key = secret();
  if (!key) return null;
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const sig = await hmac(key, String(exp));
  return `${exp}.${sig}`;
}

export async function verifyToken(token: string | undefined | null): Promise<boolean> {
  const key = secret();
  if (!key || !token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp)) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(key, exp);
  return safeEqual(sig, expected);
}

export async function checkPassword(password: string): Promise<boolean> {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  return safeEqual(password || "", real);
}
