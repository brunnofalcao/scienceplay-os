// Estados obrigatórios de interface (Briefing §21). Microcopy alinhada à voz.

export const STATE_COPY = {
  loading: "Carregando informações...",
  noResult: "Não encontramos este termo em nossa base.",
  insufficient: "Ainda não há evidência suficiente para classificar este termo com segurança.",
  error: "Não foi possível carregar esta informação.",
  integrationDown: "Esta fonte está temporariamente indisponível.",
  inReview: "Este conteúdo está passando por revisão editorial.",
  noValidNews: "Nenhum novo estudo atingiu os critérios editoriais de hoje.",
  success: "A informação foi carregada e está atualizada.",
} as const;

export function StateBlock({
  variant,
  title,
  children,
}: {
  variant: "loading" | "empty" | "insufficient" | "error" | "review" | "info";
  title?: string;
  children?: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    loading: "border-line bg-white text-muted",
    empty: "border-line bg-white text-ink",
    insufficient: "border-amber5r/30 bg-amber5r/5 text-ink",
    error: "border-[#9A3B2E]/30 bg-[#9A3B2E]/5 text-[#7a2f25]",
    review: "border-navy/20 bg-mist text-navy-deep",
    info: "border-line bg-white text-ink",
  };
  return (
    <div className={`rounded-xl border p-6 text-[15px] ${styles[variant]}`} role={variant === "error" ? "alert" : "status"}>
      {title && <p className="mb-1 font-serif text-[17px] text-navy-deep">{title}</p>}
      <div>{children}</div>
    </div>
  );
}
