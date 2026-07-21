# Auditoria · Dashboard Overview / CEO Command Center — Science Play OS

**Data:** 09/07/2026 · **Base:** código de produção (`index.html`) + dados reais do Supabase (`vapsolcgnrnfmddcikca`)

---

## 1. Objetivo do overview

Ser a tela-mãe do Science Play OS: em até 30 segundos, o gestor entende a saúde financeira do ano, o estado da operação de eventos e mentorias, os riscos ativos e a próxima ação — sem abrir os módulos internos.

**Estado atual:** o `renderCEOCommandCenter()` já tem a intenção correta (KPIs + "Decisões do Dia" + eventos + gráficos), mas falha em priorização visual, confiabilidade de dados e estados de erro. É um painel informativo, ainda não um command center.

## 2. Público usuário

| Perfil | Acesso hoje | Necessidade |
|---|---|---|
| CEO (Brunno) | `renderCEOCommandCenter()` (nível CEO) | Situação + risco + decisão |
| Sócios / Diretoria | Mesmo painel CEO (`dashboard.ceo`) | Saúde geral e execução |
| Membros da operação | `renderDashboardMember()` (reduzido) | Suas tarefas e eventos |

Hoje há **4 usuários** cadastrados. O painel prioritário é o do CEO.

## 3. Decisões que a tela deve apoiar

1. Continuar, corrigir ou cancelar um evento (Go/No-Go, margem, ritmo de tarefas).
2. Onde alocar atenção comercial hoje (follow-ups vencidos, pipeline parado).
3. Intervir em evento com margem abaixo da meta (meta atual no código: 30%; margem consolidada real: **~1,5%**).
4. Destravar operação (tarefas críticas atrasadas, responsáveis).
5. Confiar ou não nos números (dado real × dado local × dado sem data).

## 4. KPIs principais

**Problema atual:** 16 KPIs em 3 fileiras com o mesmo peso visual (6 financeiros + 6 operacionais + 4 índices). Viola o limite de 4–6 e dilui o que importa. `EBITDA Gerencial` e `Margem EBITDA` duplicam `Resultado`/`Margem` (o código admite: `ebitda = resultado`). `Runway` e `Burn Rate` são derivações simplificadas de caixa que não existe no sistema (não há contas a pagar/receber) — hoje são números com aparência de precisão e sem lastro.

**Proposta — 5 KPIs principais:**

| KPI | Por que importa | Fonte | Frequência | Status hoje | Próxima ação se piorar |
|---|---|---|---|---|---|
| Receita do ano | Volume do negócio | `finances` (Supabase) | Tempo real | ✅ Confiável no total; ⚠️ 71% sem data (quebra visão mensal) | Revisar pipeline e agenda de eventos |
| Margem consolidada | Rentabilidade | `finances` | Tempo real | ⚠️ ~1,5% — abaixo da meta de 30% e hoje não é destacado | Auditar custos dos eventos ativos |
| Pipeline comercial | Receita futura | `deals` (**localStorage**) | Local | 🔴 Não confiável: dado só existe no navegador de quem digitou | Migrar Vendas para Supabase |
| Eventos em risco | Execução | `events`+`tasks`+`finances` | Tempo real | ✅ Calculável (`healthColor`) | Abrir evento e destravar tarefas |
| Tarefas críticas atrasadas | Gargalo operacional | `tasks` | Tempo real | ✅ 45 atrasadas / 582 abertas (dado real) | Cobrar responsáveis no card de ação |

Segunda linha (contextual, menor): Resultado, Receita fechada, M&A Readiness, DD Score. **Remover do overview:** EBITDA/Margem EBITDA (duplicados), Burn/Runway (sem lastro até existir caixa real).

## 5. Arquitetura da tela (7 zonas)

| Zona | Existe hoje? | Gap |
|---|---|---|
| 1. Header executivo | Parcial (título + filtros globais ano/mês/BU/responsável) | Falta última atualização, status dos dados, exportar |
| 2. KPIs principais | Existe, mas 16 KPIs | Reduzir a 5 + variação vs período anterior (não existe hoje) |
| 3. Alertas e riscos | Misturado em "Decisões do Dia" | Separar risco (fato) de ação (tarefa); margem consolidada baixa não aparece |
| 4. Próximas ações | "Decisões do Dia" (bom!) já tem responsável/impacto/prazo/CTA | Vem **depois** dos 16 KPIs; deve subir para o topo |
| 5. Tendências | Receita por Mês + por Evento (Chart.js) | Receita por mês distorcida: 196/277 lançamentos sem `date` caem em fallback |
| 6. Listas críticas | Próximos eventos | Faltam: deals parados, tarefas críticas com responsável, checkpoints vencendo |
| 7. Rodapé de confiabilidade | Não existe | Criar: fontes, o que é local, última sync, gaps |

## 6. Componentes (existentes × faltantes)

| # | Componente | Estado |
|---|---|---|
| 1 | OverviewHeader | Parcial (`page-header` + filtros globais) |
| 2 | PeriodFilter | ✅ `gf-year`/`gf-month` |
| 3 | DataFreshnessBadge | ❌ Criar (última carga + realtime ok/erro) |
| 4 | KPIGrid / 5. KPICard | Parcial — `kpiCard()` sem variação, sem fonte, sem drill-down |
| 6 | RiskAlertCard | Parcial (decision-card critical) |
| 7 | NextBestActionCard | ✅ `renderDecisionsBlock()` — melhor componente do app |
| 8 | TrendChart | Parcial (Receita por Mês; dados com gap de datas) |
| 9 | FunnelChart | ❌ (funil de Vendas existe só no módulo Vendas, em localStorage) |
| 10 | StatusDistribution | Parcial (Receita por Evento) |
| 11 | CriticalList | Parcial (próximos eventos) |
| 12 | DrillDownLink | Parcial (só nos cards de decisão) |
| 13 | ExportButton | ❌ no overview (existe exportação em Relatórios) |
| 14 | IntegrationStatus | Parcial (`renderLocalDataWarning` existe mas não é usado no dashboard) |
| 15–18 | Empty/Loading/Error/PermissionState | ❌ **Não existem no dashboard** (ver §7) |

## 7. Estados — risco mais grave da auditoria

`loadAllData()` usa `Promise.allSettled` e converte **qualquer falha em array vazio** (`gd()` → `[]`). Consequência: se a rede ou o Supabase falhar, o dashboard renderiza **"Receita R$ 0, nenhuma decisão urgente"** com cara de dado verdadeiro. Para um painel que orienta decisão (e futuramente due diligence), silêncio em erro é o pior modo de falha.

Obrigatório implementar: `Carregando dados...` (skeleton nos KPIs), `Não foi possível carregar os dados.` (com botão tentar de novo), `Nenhum dado encontrado.`, `Você não tem permissão para acessar esta área.` e o banner de dados locais (`Dados demonstrativos/locais...`) no overview.

## 8. Fontes de dados

| Fonte | Módulos | Confiabilidade |
|---|---|---|
| Supabase (RLS ativo) | Eventos (14), Tarefas (627), Finanças (277), Perfis (4), Checkpoints (52), Templates, Feed | ✅ Real, multiusuário, tempo real |
| **localStorage** | **Vendas/deals, CS (mentorados, contatos, tarefas), Due Diligence, Planos financeiros** | 🔴 Por navegador: não compartilhado, não versionado, some ao limpar cache |
| Nenhuma | Caixa, contas a pagar/receber, inadimplência | ❌ Burn/Runway hoje são aproximações sem fonte |

## 9. Riscos de dados (priorizados)

1. 🔴 **Vendas/CS/DD em localStorage** — o KPI "Pipeline Comercial" do CEO muda conforme o computador que abre o painel.
2. 🔴 **Falha silenciosa** (§7) — erro de carga vira zero sem aviso.
3. 🟠 **71% dos lançamentos financeiros sem `date`** (196/277) — filtro mensal e gráfico de tendência ficam aproximados; fallback usa data do evento.
4. 🟠 **52 checkpoints Go/No-Go, todos "pendente"** — o processo de decisão existe no sistema mas não está sendo operado; o dashboard não cobra isso.
5. 🟡 **`audit_logs` com 0 linhas** — trilha de auditoria (relevante p/ M&A e DD) não está sendo gravada.
6. 🟡 KPIs derivados sem lastro (EBITDA=Resultado, Runway sem caixa) apresentados com o mesmo peso dos reais.

## 10. Regras de UX/UI

- Prioridade visual: **Decisões do Dia no topo** (nível 1), depois 5 KPIs (nível 2), tendências (3), listas (4), rodapé de confiabilidade (5).
- Todo KPI: valor + variação vs período anterior + badge de fonte (`Supabase` / `Local`) + clique = drill-down para o módulo.
- Todo número derivado de dado local ou incompleto recebe badge ⚠️ com tooltip explicando o limite.
- Nada de gráfico sem decisão: manter Receita por Mês (com aviso de datas faltantes) e trocar "Receita por Evento" por "Margem por Evento" (decisão: intervir no evento não rentável).
- Princípios: Stripe (confiança nos números), Linear (velocidade/foco), Vercel (status explícito), Oura (score + insight acionável).

## 11. Wireframe textual (proposto)

```text
┌──────────────────────────────────────────────────────────────┐
│ CEO Command Center · 2026 | Mês | BU | Resp. | ⟳ há 2min ✅ │
├──────────────────────────────────────────────────────────────┤
│ ⚡ DECISÕES DO DIA (3)                                        │
│ [Follow-up vencido: X · R$50k · Comercial · Imediato · Abrir]│
│ [Margem 4% em Imersão Y · Financeiro · 7 dias · Abrir DRE]  │
├───────────┬───────────┬───────────┬───────────┬──────────────┤
│ Receita   │ Margem    │ Pipeline  │ Eventos   │ Tarefas      │
│ R$ 1,71M  │ 1,5% 🔴   │ R$ — ⚠️Local│ 8 (2 🔴) │ 45 atrasadas │
│ +12% vs ant│ meta 30% │ migrar DB │ ver risco │ 6 críticas   │
├───────────┴─────────────────┬─────────────────┴──────────────┤
│ Receita × Custo por mês     │ Margem por evento (ativos)     │
│ (⚠️ 71% lançtos sem data)   │ barra + linha meta 30%         │
├─────────────────────────────┼────────────────────────────────┤
│ Deals parados (top 5)       │ Go/No-Go vencendo (top 5)      │
├─────────────────────────────┴────────────────────────────────┤
│ Fontes: Supabase ✅ · Vendas/CS/DD: locais ⚠️ · Export CSV   │
└──────────────────────────────────────────────────────────────┘
```

## 12. Backlog para DEV (priorizado)

| # | Tarefa | Área | Tipo | Arquivos prováveis | Critério de aceite |
|---|---|---|---|---|---|
| F1-1 | Estado de erro/loading no dashboard: `loadAllData` distingue falha de vazio; skeleton + retry | Frontend | Frontend | `index.html` (`loadAllData`, `renderCEOCommandCenter`) | Simulando falha de rede, o painel mostra "Não foi possível carregar" e nunca zeros |
| F1-2 | Reordenar: Decisões do Dia acima dos KPIs; reduzir para 5 KPIs + linha contextual | UX/UI | Frontend | `renderCEOCommandCenter` | Tela responde situação/risco/ação em 30s; máx. 6 KPIs nível 1 |
| F1-3 | Badge de fonte + banner de dados locais no overview (Pipeline ⚠️) | Dados | Frontend | `kpiCard`, `renderLocalDataWarning` | Todo KPI de localStorage exibe ⚠️ com explicação |
| F1-4 | Variação vs período anterior nos KPIs | Analytics | Frontend | `renderCEOCommandCenter` | Cada KPI principal mostra Δ% vs ano/mês anterior |
| F2-1 | **Migrar Vendas (deals) para Supabase** (tabela `deals` + RLS + realtime) | Banco | Backend/Banco | novo `migration-v8-deals.sql`, `loadDeals`/`saveDeals` | Deal criado num navegador aparece em outro; localStorage vira fallback de leitura única (import) |
| F2-2 | Migrar CS (students/contacts/tasks) para Supabase | Banco | Backend/Banco | `migration-v8`, funções CS | Idem F2-1 |
| F2-3 | Backfill de `date` nos 196 lançamentos financeiros (usar data do evento; marcar `date_estimated=true`) | Dados | Banco | SQL de correção | 100% dos lançamentos com data; gráfico mensal sem fallback |
| F2-4 | Rodapé de confiabilidade (fontes, última carga, gaps, export CSV) | Dados | Frontend | novo bloco no dashboard | Rodapé lista fontes e pendências reais |
| F3-1 | Lista "Go/No-Go vencendo" no overview + fluxo de marcar decisão | Operação | Frontend | `renderDecisionsBlock`, checkpoints | Checkpoints deixam de acumular em "pendente" |
| F3-2 | Gravar `audit_logs` nas mutações principais | Segurança | Backend | wrappers de insert/update | Ações críticas geram log consultável |
| F3-3 | Trocar "Receita por Evento" por "Margem por Evento" com linha de meta | Analytics | Frontend | `renderCharts` | Evento abaixo da meta é visualmente óbvio |
| F3-4 | Remover/recolher EBITDA, Burn e Runway até existir módulo de caixa | Dados | Frontend | `renderCEOCommandCenter` | Nenhum KPI sem fonte real no nível 1 |

## 13. Critérios de aceite do overview

- [ ] Situação, risco e próxima ação compreensíveis em 30 segundos.
- [ ] Máximo 6 KPIs no nível principal, todos com fonte visível e variação.
- [ ] Decisões/riscos aparecem antes de qualquer gráfico.
- [ ] Falha de carga NUNCA renderiza zeros silenciosos.
- [ ] Dado local (localStorage) sempre sinalizado.
- [ ] Todo KPI tem drill-down clicável.
- [ ] Estados: loading, empty, error, sem permissão.
- [ ] Mobile funcional (grid colapsa para 2 colunas — já existe base no CSS).

## 14. Próximo passo

**Fase 1 (frontend puro, sem risco de dados):** F1-1 a F1-4 — reorganizar o command center e eliminar a falha silenciosa. Entregável em um ciclo curto no próprio `index.html`.

**Fase 2 (estrutural, maior impacto):** migração de Vendas/CS para Supabase — é o que transforma o "Pipeline Comercial" de número decorativo em número confiável.

Recomendação: executar Fase 1 imediatamente e planejar a Fase 2 na sequência, começando por Vendas (é o dado que alimenta o KPI mais visível do CEO).
