# Motor Científico — Protocolo 5R

Pipeline que alimenta o portal do Protocolo 5R com ciência rastreável: captura
literatura, deduplica, avalia evidência com travas de proporcionalidade e
**propõe** rascunhos de notícia. **Na Fase 1 o motor NUNCA publica sozinho** —
ele propõe, o revisor humano aprova e assina.

## Missão editorial: traduzir ciência para a população

A notícia gerada **não é um resumo técnico** — é conteúdo jornalístico-educativo
em **português claro** que traduz o estudo para uma pessoa leiga e curiosa
(manchete popular, resposta direta, explicação do jargão, "o que isso significa
na prática"), mantendo o rigor: nível de evidência, o que o estudo **não**
permite concluir, e o aviso de que não substitui um profissional. O prompt de
geração (`SYSTEM_PROMPT` em `generate.mjs`) define essa voz e inclui um exemplo
do padrão editorial (few-shot) espelhado nas notícias-modelo de
`content/news.ts`.

> **Sobre o fallback sem IA:** sem `ANTHROPIC_API_KEY`, o gerador **não** produz
> conteúdo popular publicável (não há como traduzir sem um modelo). Ele cria um
> **esqueleto honesto** em português, marcado como `[A redigir]`, só para o
> pipeline rodar de ponta a ponta em dev/CI. A redação popular de verdade exige
> a IA (`AI_MODEL`, default `claude-sonnet-5`) + revisão humana.

> Adaptado de um motor de referência (Microbiota.org), reorganizado em torno da
> metodologia dos 5 Rs (**remover → recolocar → reparar → reinocular →
> reequilibrar**) e do modelo de dados do Briefing §16.

## Princípios inegociáveis

1. **Sem auto-publicação (Fase 1).** Toda saída da IA entra na fila como
   `em_revisao` e o artigo nasce em `article_versions.status = 'em_revisao'`.
   Só um humano promove para `publicado`.
2. **1 notícia válida por dia.** Se nenhuma pauta atende ao critério de
   qualidade, o motor **registra a ausência** (`automation_runs`) e tenta no
   próximo ciclo. Nunca publicamos conteúdo fraco para "cumprir cota".
3. **Proporcionalidade da evidência.** Nível **D nunca declara efeito clínico**;
   C tem aplicabilidade no máximo baixa; B no máximo moderada. As travas estão
   no código (`engine/evidence.mjs`) **e** no banco (CHECK em
   `evidence_assessments`).
4. **Respeito aos termos das APIs.** User-Agent com e-mail de contato, sem
   scraping. Guardamos apenas **metadados + abstract + link** — nunca full-text
   protegido.

## Módulos

| Arquivo | Papel |
|---|---|
| `lib/http.mjs` | GET HTTPS com User-Agent identificável (polite pool). |
| `capture.mjs` | Radar: CrossRef + PubMed, dedup por DOI, score, insere estudos + fila (`capturada`). CLI + endpoint (guardado por `CRON_SECRET`). |
| `fulltext.mjs` | Europe PMC: status open access, PMCID, licença e abstract (uso livre). |
| `dedup.mjs` | Deduplicação: DOI, PMID, título normalizado, autores+ano e Jaccard de tokens. Funções puras → candidatos. |
| `evidence.mjs` | Mapeia rascunho → avaliação de evidência válida com as travas de proporcionalidade. Espelha `lib/evidence.ts`. |
| `generate.mjs` | Gera o rascunho de `NewsArticle` (IA provedor-agnóstica + fallback determinístico), grava como `em_revisao` e registra custo em `ai_usage`. |

## Os 24 passos do Briefing §8.3 → módulos

| # | Passo | Onde |
|---|---|---|
| 1 | Ler tópicos/termos da taxonomia 5R | `topics.search_terms` / `DEFAULT_QUERIES` |
| 2 | Consultar CrossRef | `capture.fromCrossRef` |
| 3 | Consultar PubMed E-utilities | `capture.fromPubMed` |
| 4 | Normalizar itens (DOI, autores, ano) | `capture.fetchForQuery` + `dedup.normalize*` |
| 5 | Dedup local por DOI | `capture.runCapture` (Set por DOI) |
| 6 | Dedup por PMID | `dedup.findDuplicatesInBatch` |
| 7 | Dedup por título normalizado | `dedup.findDuplicatesInBatch` |
| 8 | Dedup por autores+ano | `dedup.authorsYearKey` |
| 9 | Similaridade Jaccard (semântica simples) | `dedup.jaccard` |
| 10 | Registrar candidatos a duplicata | `duplicate_candidates` / `error_logs` |
| 11 | Dedup contra o banco (DOI existente) | `capture.upsertStudy` |
| 12 | Enriquecer open access/abstract | `fulltext.resolveOA` |
| 13 | Classificar desenho do estudo | `capture.studyWeight/studyTypeSlug` |
| 14 | Pontuar prioridade | `capture.scoreOf` |
| 15 | Inserir estudo (metadados+abstract+link) | `capture.upsertStudy` |
| 16 | Criar pauta na fila (`capturada`) | `capture.upsertStudy` |
| 17 | Priorizar / rotear pauta | `publication_queue.state` (`priorizada`/`roteada`) |
| 18 | Selecionar próxima pauta | `generate.pickQueueRow` |
| 19 | Chamar IA (abstração) | `generate.callAI` |
| 20 | Mapear evidência com travas | `evidence.buildAssessment` |
| 21 | Montar `NewsArticle` | `generate.buildNewsArticle` |
| 22 | Gravar versão `em_revisao` | `generate.runGenerate` |
| 23 | Registrar uso/custo de IA | `ai_usage` |
| 24 | **Revisão humana → publicar** | Painel editorial (fora do motor) |

## Cadência diária

- Roda a captura (radar) uma vez ao dia; a geração produz **no máximo 1
  rascunho válido/dia** para revisão.
- Sem pauta que atenda ao critério → grava a ausência em `automation_runs` e
  aguarda o próximo ciclo. Não força publicação.

## Como rodar

```bash
# Instalar a dependência do modo banco (pg NÃO vem por padrão no projeto):
npm i pg

# Captura (radar completo):
node engine/capture.mjs

# Captura de uma consulta específica:
node engine/capture.mjs "low FODMAP irritable bowel"

# Geração de 1 rascunho (próxima pauta da fila):
node engine/generate.mjs

# Geração para uma pauta específica:
node engine/generate.mjs <publication_queue.id>
```

**Modo seco (dry):** sem `DATABASE_URL`, ambos os comandos rodam sem tocar no
banco (e sem exigir `pg`), apenas reportando/imprimindo — útil em dev/CI.

**Como endpoint/cron:** importe `runCapture()` / `runGenerate()` e proteja com
`guardCron(req)` (exige `authorization: Bearer <CRON_SECRET>` ou `?secret=...`).

## Variáveis de ambiente

Ver `.env.example` na raiz. Essenciais:

- `DATABASE_URL` — Postgres (use o pooler de transações do Supabase, porta 6543).
- `ANTHROPIC_API_KEY` + `AI_MODEL` (default `claude-sonnet-5`) — IA de geração.
  Sem chave, `generate.mjs` usa o **fallback determinístico**.
- `CRON_SECRET` — protege os endpoints/cron.
- `NCBI_API_KEY` — opcional, aumenta o limite de chamadas ao PubMed.
- `CONTACT_EMAIL` — e-mail enviado no User-Agent (polite pool).

Aplicar o schema:

```bash
psql "$DATABASE_URL" -f db/schema-5r.sql
```
