// Símbolo 5R conforme direção do Brandbook (§06): quadrado + percurso
// geométrico contínuo de 5 dobras (uma por R), entrando por cima e saindo
// por baixo. Geometria, não anatomia. Wordmark serifado (Fraunces).
// Monocromático por natureza.

export function Logo({
  variant = "horizontal",
  className = "",
  onDark = false,
}: {
  variant?: "horizontal" | "symbol" | "stacked";
  className?: string;
  onDark?: boolean;
}) {
  const sq = onDark ? "#F7F4EE" : "#2B3990";
  const path = onDark ? "#131A45" : "#F7F4EE";
  const word = onDark ? "#F7F4EE" : "#131A45";
  const mono = "#C8842E";

  const Symbol = (
    <svg viewBox="0 0 100 100" className="h-full w-auto" aria-hidden="true">
      <rect x="4" y="4" width="92" height="92" rx="16" fill={sq} />
      <path
        d="M38 4 L38 22 Q38 30 46 30 L70 30 Q78 30 78 38 Q78 46 70 46 L40 46 Q32 46 32 54 Q32 62 40 62 L70 62 Q78 62 78 70 Q78 78 70 78 L54 78 Q46 78 46 86 L46 96"
        stroke={path}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  if (variant === "symbol") {
    return (
      <span className={`inline-flex ${className}`} role="img" aria-label="Protocolo 5R">
        {Symbol}
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center gap-1 ${className}`} role="img" aria-label="Protocolo 5R">
        <span className="h-12 w-12">{Symbol}</span>
        <span className="font-serif text-2xl font-semibold leading-none" style={{ color: word }}>
          5R
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: mono }}>
          Protocolo
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} role="img" aria-label="Protocolo 5R">
      <span className="h-9 w-9 shrink-0">{Symbol}</span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[22px] font-semibold" style={{ color: word }}>
          Protocolo 5R
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: onDark ? "#B9C1EA" : "#6E7480" }}>
          Uma certificação Science Play
        </span>
      </span>
    </span>
  );
}
