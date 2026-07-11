"use client";
// Camada de tracking. Eventos padronizados (Briefing §13.1) despachados via
// dataLayer (GTM/GA4). NÃO usa IDs fictícios — só dispara se houver dataLayer,
// e o carregamento de GA4/GTM depende de consentimento + IDs reais no ambiente.

export type TrackEvent =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "GlossarySearch"
  | "GlossaryResult"
  | "NoGlossaryResult"
  | "NewsView"
  | "SourceClick"
  | "CertificationView"
  | "ClickCertificationCTA"
  | "InitiateCheckout"
  | "Purchase"
  | "NewsletterSignup"
  | "FormSubmit"
  | "Share"
  | "ScrollDepth";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
