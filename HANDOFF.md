# HANDOFF — Science Play OS

**Última atualização:** 21/07/2026 · **Status:** em produção; `main` mergeada e alinhada com o que está no ar (PR #1)

Este documento explica o que é o sistema, como ele funciona por dentro, o que foi feito na recuperação/melhoria de julho/2026 e como operar e evoluir a partir daqui.

---

## 1. O que é o sistema

O **Science Play OS** é o sistema operacional interno da Science Play: gestão de eventos (imersões, congressos, mentorias), tarefas por fase, DRE por evento, pipeline comercial (Vendas), Customer Success (mentorias Golden / A Mesa), M&A Readiness e Due Diligence — com um **CEO Command Center** como tela principal de decisão.

**URL de produção:** https://scienceplay-os.vercel.app

### Arquitetura (importante entender)

| Camada | Tecnologia | Observação |
|---|---|---|
| Frontend | **Um único `index.html` (~370KB)** com HTML + CSS + JS vanilla | Não há build, framework nem npm. Todo o app está nesse arquivo. `vendas.html` é uma página avulsa antiga. |
| Backend | **Supabase** — projeto `scienceplay-os` (`vapsolcgnrnfmddcikca`, us-east-2) | Postgres + Auth (email/senha) + Realtime. O frontend fala direto com o Supabase via `supabase-js` (CDN). |
| Bibliotecas | supabase-js e Chart.js via CDN (jsdelivr) | Nenhuma dependência local. |
| Hospedagem | **Vercel** — projeto `scienceplay-os` na conta `falcao-2727s-projects` | Site estático. |
| Código | GitHub **público**: `brunnofalcao/scienceplay-os` | ⚠️ Repositório público — nunca commitar segredos ou dados de clientes. A chave Supabase no HTML é a `anon key` (pública por design; a segurança vem do RLS). |

### Controle de acesso (RBAC)

- Papéis em `profiles.role` (ex.: `ceo`, `partner`, `director`, `finance_admin`, `member`...), permissões em `role_permissions` (ex.: `finance.view`, `vendas.edit`).
- No frontend: `can('permissao')`. No banco: policies RLS chamam `has_permission()` — ou seja, a segurança real está no Postgres, não no JS.
- Usuários de nível CEO veem o Command Center; membros veem um dashboard próprio reduzido.

---

## 2. Onde os dados vivem

### Tabelas principais (Supabase, todas com RLS)

- `events`, `tasks`, `finances`, `checkpoints`, `feeds`, `profiles` — operação central.
- `templates`, `template_tasks`, `checkpoint_templates`, `finance_template_items` — modelos POP: ao criar um evento a partir de template, tarefas/checkpoints/estrutura de DRE são gerados automaticamente.
- `role_permissions`, `access_groups`, `user_access` — RBAC.
- `audit_logs` — trilha de auditoria (ver §4).
- **`app_collections`** — ver abaixo, é a peça mais nova.

### `app_collections` — coleções compartilhadas (criada na migração v8)

Vendas (deals), CS (mentorados/contatos/tarefas), Due Diligence e Planos financeiros **viviam em `localStorage`** (dados presos ao navegador de cada pessoa, com seed de demonstração). Hoje:

- Cada módulo é uma linha JSONB: `deals`, `cs_students`, `cs_contacts`, `cs_tasks`, `dd_items`, `fin_plans`.
- **O servidor é a fonte da verdade.** O `localStorage` é só cache de pintura rápida.
- RLS por chave espelha o RBAC (ex.: `deals` exige `vendas.view`/`vendas.edit`).
- Realtime ativo: alteração feita por um usuário aparece para os demais.
- Regra de sincronização (função `loadCollections()` no `index.html`):
  1. Linha existe no servidor → ela vence, **mesmo vazia** (uma limpeza intencional não é repovoada por cache antigo).
  2. Linha não existe + navegador tem dados antigos → import único (migração transparente).
  3. Toda gravação (`saveDeals()`, `saveCSData()`...) faz upsert no servidor via `persistCollection()`.

Limitação consciente: o documento JSONB inteiro é gravado a cada save (last-write-wins). Para um time de ~4 pessoas é adequado; se o time crescer, normalizar `deals` em tabela própria é o próximo passo natural.

---

## 3. O CEO Command Center (dashboard)

Reescrito seguindo o princípio "decisão em 30 segundos" (auditoria completa em `AUDITORIA-DASHBOARD.md`):

1. **Decisões do Dia** no topo — follow-ups vencidos, tarefas críticas, margem baixa, Go/No-Go próximos, cada card com responsável/impacto/prazo/ação.
2. **5 KPIs principais** — Receita (com variação vs período anterior), Margem (meta 30%), Pipeline Comercial, Eventos Ativos, Tarefas Atrasadas. Todos clicáveis (drill-down). Linha contextual menor: Resultado, Receita Fechada, M&A Readiness, DD Score.
3. **Gráficos com função decisória** — Receita × Custos por mês (com aviso de datas estimadas) e Margem por Evento (verde ≥30% / amarelo / vermelho).
4. **Listas críticas** — Negociações Paradas e Go/No-Go Vencendo (14 dias).
5. **Rodapé de confiabilidade** — fonte de cada módulo, última atualização, pendências.

Regras de honestidade implementadas:

- **Falha de carga nunca vira zero**: se o Supabase não responder, aparece "Não foi possível carregar os dados" com botão de retry (antes, o painel mostrava R$ 0 como se fosse verdade).
- Variação sem base de comparação mostra "—", não um percentual enganoso.
- Dado vindo de cache local (não sincronizado) ganha badge "⚠️ local".
- KPIs sem lastro real (EBITDA) removidos. **Burn Rate e Runway voltaram** ao dashboard (jul/2026) agora com lastro no módulo de Caixa — e só aparecem quando o caixa está configurado (senão exibem "configure o caixa", nunca um número falso).

---

## 4. Governança e segurança

- **Trilha de auditoria**: criar/editar/fechar/perder negociação, criar/excluir evento e lançamentos financeiros gravam em `audit_logs` (quem, o quê, quando). A limpeza de dados de 09/07 também está registrada lá.
- **Backup pré-limpeza**: schema **`backup_20260709`** no próprio Supabase contém cópia integral de `events`, `tasks`, `finances`, `checkpoints`, `feeds` e `app_collections` de antes da limpeza. Restauração é um `INSERT ... SELECT` — qualquer dev (ou o Claude) faz em minutos.
- **Datas financeiras**: 196 lançamentos antigos sem data receberam a data do evento e a marca `date_estimated = true` — o dashboard sinaliza isso no gráfico mensal.

---

## 5. Histórico da recuperação (jul/2026) — o que aconteceu e por quê

1. **Site "fora do ar"**: na verdade o app estava no ar, mas a tela de detalhe de evento morria com `ReferenceError: isAdmin is not defined` (variável inexistente em `renderEventDetail`). Corrigido para `can('finance.view')`. O projeto Vercel também não estava acessível na conta atual — foi recriado em `falcao-2727s-projects`.
2. **Auditoria do dashboard** (`AUDITORIA-DASHBOARD.md`) → reescrita do Command Center (§3).
3. **Migração v8** (`migration-v8-collections.sql`) → `app_collections` + backfill de datas (§2, §4).
4. **Limpeza de dados fictícios (autorizada)**: removidos 10 eventos de projeção/demo com 444 tarefas, 201 lançamentos (195 projeções de template + 6 em eventos apagados), deals/CS/DD de demonstração. **Mantidos** os 4 eventos realizados com DRE real: Balneário Camboriú, Belo Horizonte, Palestre-se Brasília T14 e Golden Naturaltech. Seeds de demonstração removidos do código — dado fictício não volta.

Todo o trabalho foi mergeado na **`main`** via PR #1 em 21/07/2026 — a `main` é a fonte oficial e alinhada com a produção.

---

## 6. Como operar

### Publicar uma alteração no site

O deploy baixa os arquivos do GitHub no build (`build.js` aponta para a **`main`**). Fluxo:

1. Editar `index.html` em branch → merge na `main`.
2. **Redeploy** na Vercel (painel do projeto → botão Redeploy) — o build puxa a `main` mais recente automaticamente — ou pedir ao Claude.
3. **Melhoria recomendada**: conectar o repositório GitHub ao projeto Vercel (Settings → Git) para todo push na `main` publicar sozinho — elimina o passo manual.

### Verificar mudanças antes de publicar

Não há suíte formal, mas existe um harness usado nesta recuperação (Playwright + stub de Supabase, com 25+ asserções sobre o dashboard e a camada de dados) — qualquer dev pode reproduzir o padrão: servir o `index.html` local, injetar `window.supabase` fake, chamar as funções de render e inspecionar o DOM. Além disso, ESLint `no-undef` no JS extraído pega erros do tipo que derrubou o site.

### Administração de dados

- Novo usuário: criar no Supabase Auth + linha em `profiles` com `role`.
- Novo evento: **+ Novo Evento** no app, escolhendo template (gera tarefas/checkpoints/DRE automaticamente).
- Pagamentos/despesas: aba DRE do evento ou Financeiro/DRE. Campo `payment_status` distingue estimado × realizado.
- Restaurar algo apagado: dados estão em `backup_20260709.*`.

---

## 7. Pendências e próximos passos recomendados

| Prioridade | Item | Detalhe |
|---|---|---|
| ✅ | ~~Merge do branch na `main`~~ | Feito em 21/07/2026 (PR #1). |
| 🔴 | **Conectar GitHub ↔ Vercel** | Deploy automático por push; elimina o `build.js` manual. |
| 🟠 | Verificar domínio `scienceplay-os.vercel.app` | Confirmar no painel Vercel que o domínio está atribuído ao projeto da conta atual (os aliases do projeto usam o sufixo `-falcao-2727s-projects`). |
| 🟠 | Módulo de caixa | Contas a pagar/receber e inadimplência — devolveria Burn/Runway ao dashboard com lastro real. |
| 🟡 | Normalizar `deals` em tabela própria | Quando o time comercial crescer (concorrência de escrita no JSONB). |
| 🟡 | Modularizar o `index.html` | 370KB num arquivo só funciona, mas dificulta manutenção a médio prazo. |

---

## 9. POP Operacional por Evento (adicionado em 21/07/2026)

Sistema de POP em 3 camadas, integrado a eventos, tarefas, fornecedores, documentos e DRE:

| Camada | Onde vive | Exemplo |
|---|---|---|
| 1. Template Mestre | `templates` (`template_kind='master'`) + `pop_modules` + `template_tasks` | "Congresso Science Play · POP Mestre" — 12 módulos, 252 atividades com `task_key` único, prazos D-365..D+45, responsáveis por função, condicionais |
| 2. Overlay específico | `templates` (`template_kind='overlay'`, `parent_template_id`, `venue_id`) | "Nutrição Brasil Brasília · Ulysses Guimarães" — 31 atividades que sobrescrevem/detalham o mestre pelo mesmo `task_key` |
| 3. Instância do evento | `tasks` (com `module_key`, `task_key`, `pop_status`, custos por estágio, `source_layer`, `template_version`) | "Nutrição Brasil Brasília 2026" — 252 tarefas geradas (dedup automático; overlay prevalece), 15 checkpoints executivos, 11 fornecedores credenciados vinculados |

**Regras de geração**: ao criar evento com Template Mestre + overlay, o merge dedup por `task_key` (overlay vence, origem preservada em `source_layer`), datas calculadas de `event_date + day_offset` (editar prazo trava com `due_locked` — não é recalculado). Alterar evento nunca altera o template; alterar template nunca altera eventos criados (`template_version` registra a versão usada).

**Aba "POP & Operação"** (detalhe do evento): progresso quantitativo + ponderado (crítica×3, alta×2 — nunca 100% com crítica bloqueada), 11 estados de atividade, decisões condicionais (Sim/Não/Em análise; "Não" exige justificativa e marca filhas como Não aplicável sem excluí-las), responsáveis (função sugerida → usuário real), fornecedores por tarefa, custos por estágio (previsto/cotado/aprovado/contratado/realizado/pago) com "Lançar no DRE", documentos por link, tabela de custos por módulo.

**Fornecedores**: diretório global (menu Fornecedores) com categorias N:N (LOBL e Mobicom em Cenografia + Mobiliário, sem duplicidade), credenciamento por local (`venue_suppliers` — Ulysses Guimarães), vínculo a eventos/tarefas (`event_suppliers`), contatos ausentes = NULL exibidos como "Não informado".

**Permissões novas**: `pop.view/edit/assign/complete/approve/templates.manage`, `suppliers.*`, `event.documents.*` — aplicadas no RBAC do banco (RLS) e no frontend.

**Arquivos**: `migration-v9-pop.sql` (DDL + RLS + permissões) e `seed-pop-mestre-v1.sql` (seed idempotente completo). Ambos aplicados em produção.

**Rollback**: as tabelas novas podem ser dropadas sem afetar o legado (`pop_modules`, `suppliers*`, `venues*`, `event_suppliers`, `supplier_quotes`, `task_documents`, `task_dependencies`); as colunas novas em `templates/template_tasks/tasks` são aditivas e ignoradas pelo código antigo. Backup geral continua em `backup_20260709`.

**Fase 2a (entregue em 21/07/2026)**: visão **Kanban** por status na aba POP; **dependências entre tarefas** (13 vínculos da spec seedados na instância NB 2026 e criados automaticamente em novas gerações; concluir tarefa com dependência aberta é bloqueado com a lista de bloqueadores, responsável e prazo); **exportação CSV** do POP completo.

**Fase 2b (entregue em 21/07/2026)**: visão **Cronograma** (tarefas por mês com chips D-offset); **upload nativo de arquivos** no bucket privado `event-docs` do Supabase Storage (policies por permissão; abertura via URL assinada de 1h; links externos continuam suportados; migração `migration-v10-storage-lessons.sql`); **Relatório Executivo** imprimível/PDF (progresso, riscos, decisões pendentes, marcos Go/No-Go, fornecedores contratados, orçamento por módulo); **fluxo de pós-mortem**: lições aprendidas em `pop_lessons` (registrar → aprovar/descartar → aplicar), com geração de **nova versão do POP Mestre em rascunho** a partir das lições aprovadas — versões anteriores preservadas, changelog automático, e somente versão publicada é usada em novos eventos.

---

## 10. Módulo de Caixa (contas a pagar/receber) — adicionado em 21/07/2026

Fluxo de caixa real, distinto do DRE (`finances` é competência/reconhecimento; caixa é movimento de dinheiro no tempo). Migração `migration-v11-cashflow.sql`.

- **Tabelas** (RLS reusando `finance.view`/`finance.edit`, realtime): `cash_accounts` (saldo inicial + data — o lastro do Runway; consolidado por padrão, suporta múltiplas contas), `payables` (contas a pagar), `receivables` (contas a receber). Status: pagar `previsto/a_pagar/pago/cancelado`; receber `previsto/a_receber/recebido/cancelado`.
- **Página Fluxo de Caixa** (menu Financeiro): onboarding do saldo inicial; KPIs Caixa Atual, A Pagar/A Receber em aberto, Projeção 30 dias, Burn Rate e Runway; abas de contas a pagar/receber com liquidar (Pagar/Receber), editar, excluir; vencidas destacadas.
- **Cálculos**: Caixa Atual = saldo inicial + recebidos − pagos. Burn = saída líquida acumulada (pagos − recebidos) ÷ meses desde a abertura; Runway = caixa ÷ burn. Sem `opening_date`, Burn/Runway mostram "—" (não inventam). Caixa positivo no período → Runway ∞.
- **Semiautomático com o POP**: tarefa `contratada` com custo oferece "💸 Conta a pagar" (você confirma valor/vencimento/fornecedor); depois de gerada vira badge "lançada" (sem duplicar).
- **Dashboard**: Burn/Runway de volta à linha contextual do Command Center, com lastro real e gated (sem caixa configurado → "configure o caixa").
- **Auditoria**: criar/editar/liquidar/excluir contas e configurar caixa gravam em `audit_logs`.

---

## 8. Referências no repositório

- `AUDITORIA-DASHBOARD.md` — auditoria completa do dashboard (metodologia Command Center).
- `RECOVERY.md` — diagnóstico da recuperação do site.
- `migration-v11-cashflow.sql` — módulo de caixa (última migração aplicada)
- `migration-v10-storage-lessons.sql` — Storage de documentos + pós-mortem
- `migration-v9-pop.sql` + `seed-pop-mestre-v1.sql` — POP operacional
- `migration-v8-collections.sql` — coleções compartilhadas (as anteriores: `migration-fix.sql` a `migration-v7-security.sql`).
- `supabase-schema-v4.sql` — schema base das tabelas centrais.
- Seeds/templates SQL (`seed-*.sql`) — **histórico**; não executar em produção (foi justamente a origem dos dados fictícios).
