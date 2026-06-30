# Science Play OS v5 — Command Center — Guia de Deploy

## Passo 1: Configurar Supabase (primeira vez)

1. Acesse seu projeto: https://supabase.com/dashboard
2. Va em **SQL Editor**
3. Execute `supabase-schema-v4.sql` (cria todas as tabelas base)
4. Execute `seed-v4.sql` (carrega templates + eventos existentes)

## Passo 2: Migrar para v5 (Command Center)

No SQL Editor, execute na ordem:

1. **`migration-v5.sql`** — Adiciona colunas operacionais (area, phase_code, criticidade, dependencias, checkpoints Go/No-Go)
2. **`seed-template-nb.sql`** — Importa template "Imersao Nutricao Brasil" com 81 tarefas em 7 fases + 6 checkpoints Go/No-Go
3. **`import-dre-data.sql`** — Importa dados financeiros dos 3 eventos existentes (NB BC, NB BH, Palestrese T14)

**IMPORTANTE:** O migration-v5.sql e idempotente (pode rodar varias vezes sem problema).

## Passo 3: Criar Usuario Admin

No Supabase > Authentication > Users > Add User:
- Email: falcao@scienceplay.com
- Senha: (sua senha)
- Auto Confirm: ON

Depois no SQL Editor:
```sql
update public.profiles
set role = 'admin', name = 'Brunno Falcao'
where email = 'falcao@scienceplay.com';
```

## Passo 4: Deploy no Vercel

A pasta `scienceplay-os-app/` contem:
- `index.html` — SPA completo (Command Center)
- `manifest.json` — PWA config

### Opcao A: Vercel CLI
```bash
cd scienceplay-os-app
npx vercel --prod
```

### Opcao B: GitHub
1. Suba a pasta para um repo
2. Conecte no Vercel
3. Framework: Other
4. Output directory: ./

URL final: `scienceplay-os.vercel.app`

## Passo 5: Testar

1. Acesse a URL
2. Login com email/senha do admin
3. Dashboard CEO carrega com KPIs + alertas + proximos eventos
4. Crie um evento e selecione o template "Imersao Nutricao Brasil"
5. Verifique as 81 tarefas auto-criadas por fase (F0-F6)
6. Verifique os 6 checkpoints Go/No-Go gerados
7. Acesse o Command Center do evento (clique no card)
8. Teste as 6 abas: Central, Operacional, Timeline, DRE, Go/No-Go, Feed

## Estrutura de Tabelas (v5)

| Tabela | Funcao |
|--------|--------|
| profiles | Usuarios (vinculado ao auth) |
| events | Eventos com KPIs-alvo + link ao template |
| tasks | Tarefas com area, fase, criticidade, dependencia, status operacional |
| finances | Receitas e custos unificados |
| feeds | Mural/comunicacao do time |
| templates | Modelos POP operacionais |
| template_tasks | Tarefas modelo com 81 items por template |
| checkpoints | Go/No-Go por evento (D-90, D-60, D-30, D-15, D-7) |
| checkpoint_templates | Modelos de Go/No-Go por template |
| access_groups | Grupos customizaveis |
| user_access | Permissao usuario <-> grupo/evento |

## Fases Operacionais

| Fase | Periodo | Objetivo |
|------|---------|----------|
| F0 | D-120 a D-90 | Fundacao & Validacao |
| F1 | D-90 a D-60 | Lancamento & Estruturacao |
| F2 | D-60 a D-30 | Aquecimento & Escala |
| F3 | D-30 a D-7 | Reta Final & Producao |
| F4 | D-7 a D-1 | Montagem & Preparacao |
| F5 | D-Day | Execucao |
| F6 | D+1 a D+30 | Pos-evento & Fechamento |

## Areas Operacionais (7)

1. Estrategia & Comercial (18 tarefas)
2. Curadoria & Palestrantes (12 tarefas)
3. Marketing & Trafego (7 tarefas)
4. Vendas & Atendimento (14 tarefas)
5. Logistica & Venue (9 tarefas)
6. Operacao & Materiais (12 tarefas)
7. Producao AV & Conteudo (9 tarefas)
