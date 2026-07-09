# Recuperação do Science Play OS — 09/07/2026

## Diagnóstico

O site `https://scienceplay-os.vercel.app/` parou de responder, mas **nada do produto foi perdido**:

| Componente | Estado |
|---|---|
| Código-fonte | ✅ Intacto no GitHub (`brunnofalcao/scienceplay-os`, repositório público, branch `main`) |
| Banco de dados (Supabase) | ✅ Projeto `scienceplay-os` (`vapsolcgnrnfmddcikca`, us-east-2) ativo e saudável |
| Deploy na Vercel | ❌ O projeto não estava acessível na conta Vercel conectada (`falcao-2727s-projects`) |

Ou seja: o problema era **apenas o deploy/projeto na Vercel**, não o app nem os dados.

## O que já foi feito

- Foi criado/recriado o projeto **`scienceplay-os`** na conta Vercel `falcao-2727s-projects`, com um deploy de **preview** gerado a partir do conteúdo deste repositório (branch `main`).
- Painel do projeto: <https://vercel.com/falcao-2727s-projects/scienceplay-os>

O deploy usa um build mínimo (`build.js`) que baixa `index.html`, `vendas.html` e `manifest.json` direto do GitHub — o site é 100% estático (SPA em arquivo único + Supabase via CDN).

## Como colocar em produção de forma definitiva (recomendado)

A forma mais robusta é conectar o repositório GitHub diretamente à Vercel, assim todo push na `main` publica automaticamente:

1. Acesse <https://vercel.com/new> logado na conta correta.
2. Em **Import Git Repository**, selecione `brunnofalcao/scienceplay-os`.
3. Framework: **Other** (site estático — não precisa de build command nem output directory; deixe em branco para servir os arquivos da raiz).
4. Clique em **Deploy**.
5. Em **Settings → Domains** do projeto, confirme/adicione o domínio `scienceplay-os.vercel.app` (se o subdomínio ainda estiver preso a um projeto antigo de outra conta, será preciso removê-lo lá primeiro ou usar outro subdomínio/domínio próprio).

## Backend (Supabase)

O `index.html` aponta para `https://vapsolcgnrnfmddcikca.supabase.co` — esse projeto está ativo, nenhuma ação necessária. As migrações e seeds estão versionados neste repositório (`migration-*.sql`, `seed-*.sql`).
