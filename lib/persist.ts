// Persistência opcional. Não importa `pg` estaticamente para não quebrar o
// build quando o driver/banco não estão presentes. Quando DATABASE_URL existe
// e o driver está instalado, grava; caso contrário, registra no log do servidor
// (best-effort). Nenhum dado sensível desnecessário é armazenado.

type Row = Record<string, unknown>;

let poolPromise: Promise<unknown> | null = null;

async function getPool(): Promise<any | null> {
  if (!process.env.DATABASE_URL) return null;
  if (!poolPromise) {
    poolPromise = (async () => {
      try {
        // import dinâmico: só ocorre em runtime, nunca no bundle do cliente.
        const pg = await import("pg").catch(() => null as any);
        if (!pg) return null;
        const { Pool } = pg;
        return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
          max: 1,
        });
      } catch {
        return null;
      }
    })();
  }
  return poolPromise as Promise<any | null>;
}

export function hasDatabase(): boolean {
  return !!process.env.DATABASE_URL;
}

// Consulta de leitura. Retorna null quando não há banco configurado ou em erro
// (o chamador cai para a seed). Nunca lança para não derrubar a página.
export async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T[] | null> {
  try {
    const pool = await getPool();
    if (!pool) return null;
    const res = await pool.query(sql, params);
    return res.rows as T[];
  } catch (e) {
    console.error("[persist:query] falhou", (e as Error).message);
    return null;
  }
}

export async function insert(table: string, row: Row): Promise<{ ok: boolean; persisted: boolean }> {
  try {
    const pool = await getPool();
    if (!pool) {
      console.log(`[persist:${table}]`, JSON.stringify(row));
      return { ok: true, persisted: false };
    }
    const cols = Object.keys(row);
    const vals = Object.values(row);
    const ph = cols.map((_, i) => `$${i + 1}`).join(",");
    await pool.query(
      `INSERT INTO ${table} (${cols.map((c) => `"${c}"`).join(",")}) VALUES (${ph})`,
      vals
    );
    return { ok: true, persisted: true };
  } catch (e) {
    console.error(`[persist:${table}] falhou`, (e as Error).message);
    return { ok: false, persisted: false };
  }
}
