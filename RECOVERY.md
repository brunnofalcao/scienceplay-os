# Recuperação do Science Play OS — 09/07/2026

## Diagnóstico final

O site `https://scienceplay-os.vercel.app/` está no ar e o backend funciona — o problema era um **bug de JavaScript na tela de detalhe de evento**:

- Em `renderEventDetail()` (index.html), o código referenciava a variável `isAdmin`, que não existe em lugar nenhum do app.
- Ao abrir qualquer evento, isso lançava `ReferenceError: isAdmin is not defined` e abortava a renderização no meio: o banner roxo (hero) ficava vazio e as abas e o conteúdo não apareciam.

| Componente | Estado |
|---|---|
| Código-fonte | ✅ Intacto no GitHub (`brunnofalcao/scienceplay-os`, branch `main`) |
| Banco de dados (Supabase) | ✅ Projeto `scienceplay-os` (`vapsolcgnrnfmddcikca`) ativo e saudável |
| Deploy na Vercel | ✅ No ar — mas servindo a versão com o bug |

## Correção

`isAdmin` foi substituído por `can('finance.view')`, o mesmo padrão de permissão já usado na listagem de eventos para exibir os KPIs financeiros (Receita, Custos, Resultado, Margem). Com isso a tela de evento volta a renderizar por completo, e os KPIs financeiros aparecem apenas para quem tem a permissão `finance.view` (CEO, sócios, diretoria, financeiro).

A correção foi verificada em navegador (Chromium/Playwright): antes do fix a tela morre com `isAdmin is not defined`; depois do fix o hero, as 6 abas e o conteúdo renderizam normalmente. Uma varredura de variáveis indefinidas (ESLint `no-undef`) em todo o JS do app não encontrou nenhum outro caso.

## Como publicar a correção

1. Fazer merge do branch `claude/scienceplay-os-recovery-sitqxm` na `main`.
2. Redeploy na Vercel (se o projeto estiver conectado ao GitHub, o deploy é automático após o merge; caso contrário, redeployar manualmente no painel).

## Backend (Supabase)

O `index.html` aponta para `https://vapsolcgnrnfmddcikca.supabase.co` — projeto ativo, nenhuma ação necessária. Migrações e seeds estão versionados neste repositório (`migration-*.sql`, `seed-*.sql`).
