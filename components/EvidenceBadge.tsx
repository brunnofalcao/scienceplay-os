import { EVIDENCE_SCALE, CONFIDENCE_LABEL } from "@/lib/evidence";
import type { EvidenceGrade, Confidence } from "@/lib/evidence";

export function EvidenceBadge({ grade, showLabel = true }: { grade: EvidenceGrade; showLabel?: boolean }) {
  const lvl = EVIDENCE_SCALE[grade];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold"
      style={{ backgroundColor: `${lvl.color}18`, color: lvl.color }}
      title={lvl.meaning}
    >
      <span
        className="grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold text-white"
        style={{ backgroundColor: lvl.color }}
      >
        {grade}
      </span>
      {showLabel && lvl.label}
    </span>
  );
}

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const map: Record<Confidence, string> = {
    alta: "#1F5C3D",
    moderada: "#2B3990",
    baixa: "#C8842E",
    insuficiente: "#9A3B2E",
  };
  const color = map[confidence];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {CONFIDENCE_LABEL[confidence]}
    </span>
  );
}
