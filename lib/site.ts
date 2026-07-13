// Configuração institucional central. Fonte de verdade para nomes fixos,
// URLs e metadados. Nomes seguem o Brandbook (grafias imutáveis).

export const SITE = {
  name: "Protocolo 5R",
  legalName: "Science Play",
  cnpj: "33.612.911/0001-29",
  tagline: "Ciência que vira conduta.",
  description:
    "Portal científico de referência sobre o Protocolo 5R: saúde intestinal e microbiota explicadas com base em evidências, um glossário inteligente e a Certificação Profissional 5R da Science Play.",
  // URL de produção — ajustar quando o domínio for conectado.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://protocolo5r.com.br",
  locale: "pt-BR",
  contactEmail: "contato@scienceplay.com",
  certificationName: "Certificação Profissional 5R",
  certifiedTitle: "Profissional Certificado 5R",
  // Só ativa quando IDs reais forem fornecidos (nunca IDs fictícios).
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
} as const;

export const NAV_PRIMARY = [
  { label: "O que é o 5R", href: "/o-que-e-5r" },
  { label: "Os cinco Rs", href: "/os-cinco-rs" },
  { label: "Glossário 5R", href: "/glossario" },
  { label: "Notícias", href: "/noticias" },
  { label: "Certificação", href: "/certificacao" },
] as const;

export const NAV_FOOTER = {
  portal: [
    { label: "O que é o Protocolo 5R", href: "/o-que-e-5r" },
    { label: "Os cinco Rs", href: "/os-cinco-rs" },
    { label: "Glossário 5R", href: "/glossario" },
    { label: "Notícias científicas", href: "/noticias" },
  ],
  professional: [
    { label: "Certificação Profissional 5R", href: "/certificacao" },
    { label: "Para profissionais de saúde", href: "/certificacao#elegiveis" },
    { label: "Política editorial e científica", href: "/politica-editorial" },
    { label: "Sobre a Science Play", href: "/sobre" },
  ],
  legal: [
    { label: "Termos de Uso", href: "/legal/termos" },
    { label: "Política de Privacidade", href: "/legal/privacidade" },
    { label: "Política de Cookies", href: "/legal/cookies" },
    { label: "Aviso Educacional e Médico", href: "/legal/aviso-medico" },
    { label: "Política de Correções", href: "/legal/correcoes" },
    { label: "Publicidade e Parcerias", href: "/legal/publicidade-parcerias" },
  ],
} as const;
