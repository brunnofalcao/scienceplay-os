export function Stat({ label, value, hint, tone = "default" }: { label: string; value: string | number; hint?: string; tone?: "default" | "warn" | "good" }) {
  const toneColor = tone === "warn" ? "#9A3B2E" : tone === "good" ? "#1F5C3D" : "#131A45";
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1.5 font-serif text-[28px] leading-none" style={{ color: toneColor }}>{value}</p>
      {hint && <p className="mt-1.5 text-[12.5px] text-muted">{hint}</p>}
    </div>
  );
}
