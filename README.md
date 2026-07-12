# Protocolo 5R — Portal Científico, Conteúdo e Certificação

Portal digital de autoridade sobre o **Protocolo 5R** (Science Play): informação
científica gratuita para a população, um **Glossário 5R inteligente**, notícias
baseadas em evidências e a **Certificação Profissional 5R**.

Modelo do produto: *informação gratuita → confiança → autoridade → certificação*.
A certificação é a **única oferta paga**. Nenhum paywall sobre a informação.

## Stack

- **Next.js 15 (App Router) + TypeScript + Tailwind** — SSR/SSG para SEO/AEO/GEO.
- **Design system** derivado do Brandbook oficial (`tailwind.config.ts`, `app/globals.css`):
  navy `#2B3990`, navy profundo `#131A45`, papel `#F7F4EE`, âmbar `#C8842E` (acento ≤10%),
  escala tonal dos 5 Rs. Tipografia Fraunces + Inter + IBM Plex Mono.
- **Motor científico** (`/engine`, `/db`) — pipeline de ingestão + classificação + geração,
  adaptado do padrão técnico do Microbiota.org (referência), sem copiar marca/conteúdo.
- **Postgres/Supabase** — schema dedicado (`db/schema-5r.sql`); persistência opcional
  (o site funciona standalone com a taxonomia versionada em `/content`).

## Estrutura

```
app/                    Rotas (Home, o-que-e-5r, os-cinco-rs, glossario, noticias,
                        certificacao, sobre, politica-editorial, legal, api, sitemap, robots)
components/             Design system e UI (Header, Footer, Logo, RScale, EvidenceBadge,
                        GlossarySearch, CertCTA, ConsentBanner, Analytics, States…)
lib/                    site, five-rs, evidence, glossary-types, search, seo, analytics, persist
content/                FONTE DE VERDADE editorial: glossary.ts, news.ts, certification.ts
engine/                 Motor científico (capture, dedup, evidence, generate, fulltext)
db/schema-5r.sql        Schema Postgres (33 tabelas, §16 do briefing)
```

## Como o conteúdo é a fonte de verdade

A classificação dos termos e a metodologia vivem em `/content` e `/lib`, **revisáveis
e versionáveis**. A IA (motor) interpreta, resume e traduz — **não** é a fonte primária
da classificação. Toda notícia passa por **revisão humana** antes de publicar
(não há publicação 100% automática nesta fase).

## Rodar

```bash
npm install
npm run dev          # desenvolvimento
npm run build && npm run start   # produção
```

O site roda sem banco nem chaves de IA (usa a seed de `/content`). Para ativar o
motor e a persistência, configure as variáveis de `/.env.example` no ambiente seguro
(nunca no repositório) e aplique `db/schema-5r.sql` em um banco dedicado.

Motor científico:
```bash
npm run engine:capture   # ingestão CrossRef + PubMed → fila editorial
npm run engine:generate  # gera rascunho de notícia (status em_revisao)
```

## Estado atual (P0 entregue)

- ✅ Home, O que é o 5R, os cinco Rs (índice + 5 páginas), Glossário (busca híbrida +
  páginas de termo com classificação múltipla), Notícias (índice + artigo), Certificação,
  Sobre, Política editorial, páginas legais.
- ✅ Busca do glossário (texto + sinônimos + fuzzy), estados obrigatórios, honestidade de
  evidência insuficiente, nuvem de termos navegável.
- ✅ SEO técnico: metadados por página, canonical, sitemap, robots, JSON-LD (Organization,
  WebSite+SearchAction, DefinedTerm, NewsArticle, Course, FAQPage, BreadcrumbList).
- ✅ Tracking com consentimento (LGPD) — GA4/GTM só com IDs reais + consentimento.
- ✅ Motor científico e schema Postgres prontos para plugar.
- ✅ `npm run build` verde; 50+ páginas; mobile-first verificado.

### Próximas fases (ver briefing)

- ADMIN editorial (dashboard, aprovação de pautas, gestão de glossário/taxonomia).
- Provisionar banco dedicado + cron diário do motor + revisão humana em produção.
- Busca semântica (embeddings) além da híbrida atual.
- Validação jurídica dos textos legais (hoje provisórios) e confirmação dos dados da
  certificação (professores, investimento, datas — hoje marcados como "a confirmar").

## Notas de conformidade

- Conteúdo **educacional** — não faz diagnóstico nem prescrição individual.
- Nenhum dado fictício apresentado como real (professores, preços, depoimentos).
- Secrets nunca versionados; ver `.env.example` (apenas nomes de variáveis).
- Banco de produção de outros produtos Science Play **não** foi tocado.

*Uma certificação Science Play — Ciência que vira conduta.*
