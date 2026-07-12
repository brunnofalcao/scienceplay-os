const MAP: Record<string, { label: string; color: string }> = {
  rascunho: { label: "Rascunho", color: "#6E7480" },
  em_revisao: { label: "Em revisão", color: "#C8842E" },
  aprovado: { label: "Aprovado", color: "#2B3990" },
  publicado: { label: "Publicado", color: "#1F5C3D" },
  despublicado: { label: "Despublicado", color: "#9A3B2E" },
  descartada: { label: "Descartada", color: "#9A3B2E" },
  capturada: { label: "Capturada", color: "#6E7480" },
  priorizada: { label: "Priorizada", color: "#4353B8" },
  roteada: { label: "Roteada", color: "#4353B8" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = MAP[status] || { label: status, color: "#6E7480" };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px] font-semibold" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}
