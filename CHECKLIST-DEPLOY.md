# CHECKLIST — Colocar o Science Play OS no ar

## FASE 1: SUPABASE (Banco de dados + Auth)

- [ ] Acessar [supabase.com](https://supabase.com) e fazer login (ou criar conta)
- [ ] Clicar "New Project"
  - Nome: `scienceplay-os`
  - Senha do banco: criar uma forte e guardar
  - Região: South America (São Paulo)
- [ ] Aguardar o projeto ser criado (~2 min)
- [ ] Ir em **Settings → API** e copiar:
  - [ ] `Project URL` (ex: https://xyzxyz.supabase.co)
  - [ ] `anon public key` (começa com `eyJ...`)
- [ ] Ir em **SQL Editor** → New Query
- [ ] Colar TODO o conteúdo do arquivo `supabase-schema.sql` → clicar **Run**
- [ ] Verificar que apareceu "Success" sem erros
- [ ] Nova query → colar TODO o conteúdo do arquivo `seed-data.sql` → clicar **Run**
- [ ] Verificar que apareceu "Success" (dados dos 3 eventos inseridos)

## FASE 2: AUTH (Criar seu usuário admin)

- [ ] Ir em **Authentication → Providers** → confirmar que "Email" está habilitado
- [ ] (Opcional) Em **Authentication → Settings → Email Auth** → desativar "Confirm email" pra facilitar no início
- [ ] Ir em **Authentication → Users → Add User → Create New User**
  - Email: `falcao@scienceplay.com`
  - Password: definir uma senha
  - Marcar "Auto Confirm User"
- [ ] Ir em **SQL Editor** e rodar:
  ```sql
  UPDATE public.profiles 
  SET role = 'admin', name = 'Brunno Falcão', department = 'ADM'
  WHERE id = (SELECT id FROM auth.users WHERE email = 'falcao@scienceplay.com');
  ```
- [ ] (Opcional) Criar usuários do time agora ou deixar eles se cadastrarem depois

## FASE 3: FRONTEND (Configurar credenciais)

- [ ] Abrir o arquivo `index.html` em qualquer editor de texto
- [ ] Localizar estas duas linhas (perto da linha 380):
  ```javascript
  const SUPABASE_URL = 'YOUR_SUPABASE_URL';
  const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
  ```
- [ ] Substituir `YOUR_SUPABASE_URL` pela URL do projeto (com aspas)
- [ ] Substituir `YOUR_SUPABASE_ANON_KEY` pela chave anon (com aspas)
- [ ] Salvar o arquivo

## FASE 4: DEPLOY (Colocar online)

### Opção A — Vercel (recomendado)

- [ ] Criar conta em [vercel.com](https://vercel.com) (pode logar com GitHub)
- [ ] Criar repositório no GitHub com os arquivos da pasta `scienceplay-os-app/`
- [ ] No Vercel: "Add New Project" → importar o repositório
- [ ] Framework: "Other"
- [ ] Root Directory: `/` (ou `scienceplay-os-app` se estiver dentro de outra pasta)
- [ ] Clicar Deploy
- [ ] Aguardar — vai gerar URL tipo `scienceplay-os.vercel.app`
- [ ] Testar: abrir a URL → tela de login deve aparecer

### Opção B — Netlify (alternativa rápida)

- [ ] Acessar [app.netlify.com](https://app.netlify.com)
- [ ] Arrastar a pasta `scienceplay-os-app/` direto na tela
- [ ] Pronto — URL gerada automaticamente

## FASE 5: DOMÍNIO CUSTOM (Opcional mas recomendado)

- [ ] No Vercel/Netlify: ir em Settings → Domains
- [ ] Adicionar domínio: `os.scienceplay.com` (ou similar)
- [ ] No painel DNS do seu domínio: criar registro CNAME apontando pra URL do Vercel/Netlify
- [ ] Aguardar propagação (~5 min)
- [ ] Testar acesso pelo domínio custom

## FASE 6: INSTALAR COMO APP (PWA)

- [ ] No celular (Chrome): abrir a URL do sistema
- [ ] Tocar no menu (⋮) → "Adicionar à tela inicial"
- [ ] Aceitar — ícone aparece como app
- [ ] Abrir pelo ícone — roda fullscreen sem barra do navegador
- [ ] Repetir no celular de cada membro do time

## FASE 7: CONVIDAR O TIME

- [ ] Enviar a URL pro time no WhatsApp
- [ ] Cada pessoa:
  - Abre a URL
  - Clica "Criar conta"
  - Coloca email + senha + nome
  - Pronto — já está dentro
- [ ] (Admin) Após cadastro, se quiser promover alguém a admin:
  ```sql
  UPDATE public.profiles SET role = 'admin' 
  WHERE id = (SELECT id FROM auth.users WHERE email = 'email@da-pessoa.com');
  ```

## FASE 8: VALIDAR QUE TUDO FUNCIONA

- [ ] Login funciona no desktop
- [ ] Login funciona no mobile
- [ ] Os 3 eventos aparecem na aba Eventos
- [ ] DRE do NB BH mostra receita R$102.506 e resultado R$19.995
- [ ] DRE do PALESTRE•SE T14 mostra receita R$159.373 e resultado R$69.435
- [ ] Criar uma tarefa teste → verificar se aparece em outro dispositivo em tempo real
- [ ] Marcar tarefa como concluída → verificar atualização realtime
- [ ] Testar criar novo evento pelo botão +
- [ ] Testar registrar venda e custo

---

## TEMPO ESTIMADO TOTAL: 20-30 minutos

| Fase | Tempo |
|------|-------|
| Supabase | 5 min |
| Auth | 3 min |
| Frontend | 2 min |
| Deploy | 5 min |
| Domínio | 5-10 min |
| PWA | 2 min |
| Time | 5 min |
| Validação | 5 min |

---

## SE DER ERRO

| Problema | Solução |
|----------|---------|
| "Invalid API key" | Conferir se copiou a chave `anon` (não a `service_role`) |
| "relation does not exist" | Rodar o `supabase-schema.sql` de novo |
| Tela branca | Abrir Console do navegador (F12) e ver o erro |
| "Email not confirmed" | Desativar confirmação de email no Supabase Auth Settings |
| Dados não aparecem | Verificar se rodou o `seed-data.sql` sem erro |
| Realtime não funciona | No Supabase, ir em Database → Replication → verificar se as tabelas estão listadas |
