import Link from "next/link";
import { FIVE_RS } from "@/lib/five-rs";

// Visualização dos cinco Rs — escala tonal do Brandbook (denso → claro).
export function RScale({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {FIVE_RS.map((r) => (
        <Link
          key={r.key}
          href={`/os-cinco-rs/${r.key}`}
          className="group flex min-h-[128px] flex-col justify-between rounded-xl p-4 transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: r.color, color: r.order >= 5 ? "#131A45" : "#fff" }}
        >
          <span
            className="font-mono text-[11px]"
            style={{ opacity: r.order >= 5 ? 0.7 : 0.85 }}
          >
            {r.n}
          </span>
          <div>
            <span className="block font-serif text-[17px] font-medium">{r.name}</span>
            {!compact && (
              <span className="mt-1 block text-[11.5px] leading-snug" style={{ opacity: 0.9 }}>
                {r.tagline}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function RChip({ rKey }: { rKey: string }) {
  const r = FIVE_RS.find((x) => x.key === rKey);
  if (!r) return null;
  return (
    <Link
      href={`/os-cinco-rs/${r.key}`}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium text-white hover:opacity-90"
      style={{ backgroundColor: r.color, color: r.order >= 5 ? "#131A45" : "#fff" }}
    >
      <span className="font-mono text-[10px] opacity-80">{r.n}</span>
      {r.name}
    </Link>
  );
}
