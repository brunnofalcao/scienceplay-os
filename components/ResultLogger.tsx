"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Registra uma exibição de resultados do glossário (uma vez por busca real).
export function ResultLogger({ query, count }: { query: string; count: number }) {
  useEffect(() => {
    track("GlossaryResult", { query, count });
  }, [query, count]);
  return null;
}
