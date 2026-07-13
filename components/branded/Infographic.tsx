// Renderizador de infográficos originais (CSS/SVG) para Branded Pages.
// Sem imagens externas: cada "kind" vira um visual on-brand e responsivo,
// com título, legenda, fonte, ano e rótulos acessíveis (aria/alt).

import { EVIDENCE_SCALE } from "@/lib/evidence";
import type { EvidenceGrade } from "@/lib/evidence";
import type { Infographic as InfographicData } from "@/content/branded";

// Cores tonais dos 5 R's (denso → claro), reaproveitadas nos gráficos.
const R_TONES = ["#131A45", "#2B3990", "#4353B8", "#7C89D6", "#B9C1EA"];

function Frame({
  data,
  children,
}: {
  data: InfographicData;
  children: React.ReactNode;
}) {
  return (
    <figure className="card overflow-hidden">
      <figcaption className="mb-4">
        <h3 className="text-[18px] leading-snug">{data.title}</h3>
        <p className="mt-1 text-[13.5px] text-muted">{data.caption}</p>
      </figcaption>
      <div className="my-2">{children}</div>
      <p className="mt-4 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-wide text-muted">
        Fonte: {data.source} · {data.year}
      </p>
    </figure>
  );
}

// Fluxo de mecanismo: passos ligados por setas, quebra em coluna no mobile.
function Mechanism({ data }: { data: InfographicData }) {
  const steps = data.steps ?? [];
  return (
    <ol
      className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch"
      aria-label={`Fluxo: ${data.title}`}
    >
      {steps.map((s, i) => (
        <li key={i} className="flex items-stretch gap-2 md:flex-1 md:min-w-[150px]">
          <div
            className="flex w-full flex-col justify-between rounded-lg p-3 text-white"
            style={{ backgroundColor: R_TONES[Math.min(i, R_TONES.length - 1)], color: i >= 4 ? "#131A45" : "#fff" }}
          >
            <span className="font-mono text-[10px] opacity-80">Etapa {i + 1}</span>
            <span className="mt-2 text-[13px] font-medium leading-snug">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="hidden shrink-0 items-center self-center text-navy md:flex"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

// Barras de composição empilhadas horizontalmente (100%).
function Composition({ data }: { data: InfographicData }) {
  const segs = data.segments ?? [];
  const total = segs.reduce((a, s) => a + s.value, 0) || 1;
  return (
    <div aria-label={`Composição: ${data.title}`}>
      <div className="flex h-8 w-full overflow-hidden rounded-lg" role="img" aria-hidden="true">
        {segs.map((s, i) => (
          <div
            key={i}
            className="h-full"
            style={{ width: `${(s.value / total) * 100}%`, backgroundColor: R_TONES[i % R_TONES.length] }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segs.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-[13px]">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: R_TONES[i % R_TONES.length] }}
            />
            <span className="text-ink/80">{s.label}</span>
            <span className="font-mono text-[12px] text-muted">{Math.round((s.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Mapa de conexão com os 5 R's: barras por etapa, largura = intensidade.
function Connection5R({ data }: { data: InfographicData }) {
  const segs = data.segments ?? [];
  const max = Math.max(...segs.map((s) => s.value), 1);
  return (
    <div className="space-y-2.5" aria-label={`Conexão com o Protocolo 5R: ${data.title}`}>
      {segs.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-[13px] text-ink/80">{s.label}</span>
          <div className="h-5 flex-1 overflow-hidden rounded bg-mist">
            <div
              className="h-full rounded"
              style={{ width: `${(s.value / max) * 100}%`, backgroundColor: R_TONES[i % R_TONES.length] }}
            />
          </div>
          <span className="w-14 text-right font-mono text-[12px] text-muted">
            {s.value >= 75 ? "forte" : s.value >= 45 ? "moderada" : "fraca"}
          </span>
        </div>
      ))}
    </div>
  );
}

// Jornada / linha do tempo vertical.
function Journey({ data }: { data: InfographicData }) {
  const steps = data.steps ?? [];
  return (
    <ol className="relative space-y-4 border-l-2 border-line pl-5" aria-label={`Jornada: ${data.title}`}>
      {steps.map((s, i) => (
        <li key={i} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[26px] top-0.5 grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: R_TONES[Math.min(i, R_TONES.length - 1)] }}
          >
            {i + 1}
          </span>
          <span className="text-[13.5px] text-ink/80">{s}</span>
        </li>
      ))}
    </ol>
  );
}

// Mapa de evidências: colunas por grau A–D, cor da EVIDENCE_SCALE.
function EvidenceMap({ data }: { data: InfographicData }) {
  const segs = data.segments ?? [];
  const max = Math.max(...segs.map((s) => s.value), 1);
  const gradeOf = (label: string) => label.trim().charAt(0).toUpperCase() as EvidenceGrade;
  return (
    <div
      className="flex items-end justify-around gap-3"
      style={{ minHeight: 140 }}
      aria-label={`Mapa de evidências: ${data.title}`}
    >
      {segs.map((s, i) => {
        const g = gradeOf(s.label);
        const color = EVIDENCE_SCALE[g]?.color ?? "#6E7480";
        return (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2">
            <span className="font-mono text-[12px] text-muted">{s.value}</span>
            <div
              className="w-full max-w-[54px] rounded-t-md"
              style={{ height: `${(s.value / max) * 96 + 12}px`, backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="text-center text-[11.5px] leading-tight text-ink/80">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function Infographic({ data }: { data: InfographicData }) {
  return (
    <Frame data={data}>
      {data.kind === "mecanismo" && <Mechanism data={data} />}
      {data.kind === "composicao" && <Composition data={data} />}
      {data.kind === "conexao-5r" && <Connection5R data={data} />}
      {data.kind === "jornada" && <Journey data={data} />}
      {data.kind === "mapa-evidencias" && <EvidenceMap data={data} />}
    </Frame>
  );
}
