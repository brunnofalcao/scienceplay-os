-- =====================================================================
-- PROTOCOLO 5R — ESQUEMA DO MOTOR CIENTÍFICO  ·  schema-5r.sql  ·  v1.0
-- Postgres 14+ (testado para 14/15/16).
--
-- O grafo do 5R: ENTIDADE — (RELAÇÃO com um dos 5 Rs + evidência/DOI)
--   — TÓPICO/CONDIÇÃO — ESTUDO — ARTIGO (notícia) — REVISÃO HUMANA.
--
-- Adaptado do motor de referência (Microbiota.org), porém reorganizado
-- em torno da metodologia dos CINCO Rs (remover → recolocar → reparar →
-- reinocular → reequilibrar) e do modelo de dados do Briefing §16.
--
-- PRINCÍPIOS DE GOVERNANÇA (embutidos no schema, não só na aplicação):
--   1. Toda afirmação tem um nível de evidência (A/B/C/D) com TRAVAS de
--      proporcionalidade — nível D NUNCA declara efeito clínico (ver CHECK
--      em evidence_assessments). Espelha lib/evidence.ts.
--   2. NADA é publicado automaticamente na Fase 1: o motor PROPÕE, o
--      revisor humano APROVA e ASSINA (ver article_versions.status e
--      publication_queue.state).
--   3. Só metadados + abstract + link são armazenados de estudos — NUNCA
--      texto integral protegido por direito autoral (ver comentário em
--      scientific_studies).
-- =====================================================================

-- ---------------------------------------------------------------------
-- EXTENSÕES — uuid, busca sem acento e busca por similaridade (híbrida)
-- ---------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "unaccent";   -- busca PT-BR sem acento
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- busca por similaridade (trigramas)

-- unaccent() do dicionário NÃO é IMMUTABLE (não pode entrar em índice
-- diretamente). Este wrapper IMMUTABLE fixa o dicionário e permite indexar
-- por texto sem acento (padrão documentado do Postgres). Usado nos índices
-- GIN de busca híbrida abaixo.
CREATE OR REPLACE FUNCTION f_unaccent(text)
  RETURNS text
  LANGUAGE sql IMMUTABLE STRICT PARALLEL SAFE
AS $$ SELECT public.unaccent('public.unaccent'::regdictionary, $1) $$;

-- =====================================================================
-- 0. VOCABULÁRIO CONTROLADO
-- =====================================================================

-- 0.1 As CINCO categorias (os 5 Rs). Fonte de verdade = lib/five-rs.ts.
--     A ORDEM importa (remover=1 ... reequilibrar=5) e é imutável.
CREATE TABLE five_r_categories (
  id           SMALLINT PRIMARY KEY,             -- 1..5 (ordem do método)
  slug         TEXT UNIQUE NOT NULL,             -- 'remover','recolocar','reparar','reinocular','reequilibrar'
  code         TEXT UNIQUE NOT NULL,             -- 'R·01' ... 'R·05'
  name         TEXT NOT NULL,                    -- 'Remover'
  english      TEXT NOT NULL,                    -- 'Remove'
  color        TEXT,                             -- cor da escala tonal do brandbook
  tagline      TEXT,
  objective    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE five_r_categories IS 'Os 5 Rs do Protocolo (ordem fixa). Espelha lib/five-rs.ts.';

-- 0.2 Tipos de entidade (espelha EntityType de lib/glossary-types.ts).
CREATE TABLE entity_types (
  id        SMALLSERIAL PRIMARY KEY,
  slug      TEXT UNIQUE NOT NULL,               -- 'probiotico','fibra','condicao'...
  name      TEXT NOT NULL,                      -- rótulo pt-BR
  category  TEXT NOT NULL                        -- agrupador: 'agente'|'dietetico'|'clinico'|'conceito'
            DEFAULT 'conceito'
);
COMMENT ON TABLE entity_types IS 'Tipos de entidade da taxonomia (alimento, fibra, probiótico, condição...).';

-- 0.3 Tipos de estudo — hierarquia de evidência (espelha StudyType de lib/evidence.ts).
--     'weight' pontua o score de priorização e sugere o grau máximo.
CREATE TABLE study_types (
  id        SMALLSERIAL PRIMARY KEY,
  slug      TEXT UNIQUE NOT NULL,               -- 'meta-analise','ensaio-clinico','coorte'...
  name      TEXT NOT NULL,
  weight    SMALLINT NOT NULL DEFAULT 20         -- meta=100, ensaio=80, coorte=50, observacional=30, pré=15
);
COMMENT ON TABLE study_types IS 'Desenhos de estudo com peso de evidência (hierarquia GRADE-like).';

-- =====================================================================
-- 1. ENTIDADES — o nó central do grafo (termo do glossário 5R)
-- =====================================================================
CREATE TABLE entities (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT UNIQUE NOT NULL,        -- 'probiotico','low-fodmap','butirato'
  name              TEXT NOT NULL,               -- nome canônico pt-BR
  scientific_name   TEXT,                        -- 'Lacticaseibacillus rhamnosus GG'
  type_id           SMALLINT NOT NULL REFERENCES entity_types(id),
  -- identificadores externos (normalização na ingestão)
  ncbi_taxid        INTEGER,                     -- táxons/cepas (NCBI Taxonomy)
  pubchem_cid       INTEGER,                     -- metabólitos/compostos (PubChem)
  -- conteúdo editorial da página da entidade (campos do GlossaryEntry)
  short             TEXT,                        -- resposta rápida (AEO)
  definition        TEXT,                        -- "O que é"
  gut_relation      TEXT,                        -- "Como se relaciona com a saúde intestinal"
  evidence_suggests TEXT,                        -- "O que as evidências sugerem"
  not_proven        TEXT,                        -- "O que ainda não está comprovado"
  cautions          TEXT,                        -- "Cuidados importantes"
  -- classificação global (o R principal; relações finas ficam em entity_r_relations)
  primary_r_id      SMALLINT REFERENCES five_r_categories(id),
  confidence        TEXT NOT NULL DEFAULT 'insuficiente'
                    CHECK (confidence IN ('alta','moderada','baixa','insuficiente')),
  evidence_grade    CHAR(1) CHECK (evidence_grade IN ('A','B','C','D')),
  popularity        INTEGER DEFAULT 0,           -- peso para nuvem de palavras (≠ evidência)
  trending          BOOLEAN DEFAULT FALSE,
  status            TEXT NOT NULL DEFAULT 'em-revisao'
                    CHECK (status IN ('em-revisao','publicado','despublicado')),
  last_reviewed     DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_entities_type   ON entities(type_id);
CREATE INDEX idx_entities_status ON entities(status);
CREATE INDEX idx_entities_r      ON entities(primary_r_id);
-- busca híbrida: trigramas sobre o nome sem acento
CREATE INDEX idx_entities_name_trgm ON entities USING gin (f_unaccent(lower(name)) gin_trgm_ops);
COMMENT ON TABLE entities IS 'Termos do glossário 5R. Fonte estruturada = verdade da classificação (Briefing §10.4).';

-- 1.1 Sinônimos (normalização na ingestão e busca). N sinônimos por entidade.
CREATE TABLE entity_synonyms (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id   UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  synonym     TEXT NOT NULL,
  UNIQUE (entity_id, synonym)
);
CREATE INDEX idx_entity_synonyms_trgm ON entity_synonyms USING gin (f_unaccent(lower(synonym)) gin_trgm_ops);
COMMENT ON TABLE entity_synonyms IS 'Sinônimos/abreviações de uma entidade (ex.: LGG, ATCC 53103).';

-- 1.2 Relação ENTIDADE × R (classificação múltipla, Briefing §10.2).
--     Uma entidade pode se ligar a vários Rs, cada um com sua intensidade,
--     justificativa, confiança e grau de evidência próprios.
CREATE TABLE entity_r_relations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id      UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  r_id           SMALLINT NOT NULL REFERENCES five_r_categories(id) ON DELETE CASCADE,
  intensity      TEXT NOT NULL DEFAULT 'moderada'
                 CHECK (intensity IN ('forte','moderada','fraca')),
  rationale      TEXT,                           -- justificativa da relação
  confidence     TEXT NOT NULL DEFAULT 'insuficiente'
                 CHECK (confidence IN ('alta','moderada','baixa','insuficiente')),
  evidence_grade CHAR(1) CHECK (evidence_grade IN ('A','B','C','D')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (entity_id, r_id)
);
CREATE INDEX idx_err_entity ON entity_r_relations(entity_id);
CREATE INDEX idx_err_r      ON entity_r_relations(r_id);
COMMENT ON TABLE entity_r_relations IS 'Grafo entidade↔R com intensidade, justificativa, confiança e evidência.';

-- =====================================================================
-- 2. TÓPICOS e TAGS — organização temática e de conteúdo
-- =====================================================================

-- 2.1 Tópicos = temas/condições monitorados (SII, low-FODMAP, SIBO, eixo...).
--     Alimentam as consultas do radar (engine/capture.mjs) e a navegação.
CREATE TABLE topics (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,            -- 'sindrome-intestino-irritavel'
  name          TEXT NOT NULL,
  kind          TEXT NOT NULL DEFAULT 'tema'
                CHECK (kind IN ('tema','condicao','eixo')),
  description   TEXT,
  primary_r_id  SMALLINT REFERENCES five_r_categories(id),
  -- termos de busca externa (CrossRef/PubMed) para o radar diário
  search_terms  JSONB NOT NULL DEFAULT '[]',     -- ["low FODMAP irritable bowel", ...]
  active        BOOLEAN NOT NULL DEFAULT TRUE,   -- entra no radar?
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_topics_active ON topics(active);
COMMENT ON TABLE topics IS 'Temas/condições/eixos monitorados. search_terms alimenta o radar de captura.';

-- 2.2 Tags livres (curadoria editorial). N:N com artigos.
CREATE TABLE tags (
  id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug   TEXT UNIQUE NOT NULL,
  name   TEXT NOT NULL
);

-- 2.3 Entidade ↔ Tópico (N:N)
CREATE TABLE entity_topics (
  entity_id  UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  topic_id   UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (entity_id, topic_id)
);

-- =====================================================================
-- 3. CORPO EDITORIAL — revisores, autores, usuários e papéis
--    (declarados antes das tabelas que os referenciam)
-- =====================================================================

-- 3.1 Papéis de acesso (RBAC simples).
CREATE TABLE roles (
  id           SMALLSERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,             -- 'admin','editor','revisor','leitor'
  name         TEXT NOT NULL,
  permissions  JSONB NOT NULL DEFAULT '[]'       -- lista de escopos ["queue:read","article:publish"...]
);

-- 3.2 Usuários do painel (motor/editorial). Autenticação real fica no Supabase Auth;
--     aqui guardamos o vínculo com papel e metadados editoriais.
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  role_id     SMALLINT NOT NULL REFERENCES roles(id),
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login  TIMESTAMPTZ
);
CREATE INDEX idx_users_role ON users(role_id);

-- 3.3 Revisores (assinam avaliações de evidência e aprovam artigos).
CREATE TABLE reviewers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),         -- vínculo opcional com conta do painel
  name        TEXT NOT NULL,
  credential  TEXT,                              -- 'CRN-3 12345' / 'CRM ...'
  orcid       TEXT,
  role        TEXT NOT NULL DEFAULT 'revisor'
              CHECK (role IN ('revisor','coordenacao','conselho','admin')),
  r_focus     SMALLINT[] DEFAULT '{}',           -- Rs que revisa (roteamento da fila)
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE reviewers IS 'Corpo editorial que assina avaliações de evidência e aprova artigos.';

-- 3.4 Autores (assinatura pública dos artigos; podem ser humanos ou "motor + revisão").
CREATE TABLE authors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  name        TEXT NOT NULL,
  bio         TEXT,
  is_engine   BOOLEAN NOT NULL DEFAULT FALSE,    -- TRUE = "Motor científico Protocolo 5R"
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 4. ESTUDOS CIENTÍFICOS — índice bibliográfico (DOI = chave de dedup)
--    ATENÇÃO: nunca guardamos texto integral protegido. Apenas metadados,
--    abstract (uso livre) e link à fonte. Ver engine/fulltext.mjs.
-- =====================================================================
CREATE TABLE scientific_studies (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doi             TEXT UNIQUE,                    -- '10.1016/j...' — DEDUP por aqui
  pmid            TEXT,                           -- PubMed ID quando houver
  pmcid           TEXT,                           -- PMC ID (open access) quando houver
  title           TEXT NOT NULL,
  abstract        TEXT,                           -- metadado livre (CrossRef/Europe PMC)
  journal         TEXT,
  year            SMALLINT,
  pub_date        DATE,
  authors         JSONB NOT NULL DEFAULT '[]',    -- [{"family":"...","given":"..."}]
  study_type_id   SMALLINT REFERENCES study_types(id),
  sample_size     INTEGER,                        -- n= quando extraível
  citations       INTEGER NOT NULL DEFAULT 0,     -- is-referenced-by-count (CrossRef)
  access          TEXT NOT NULL DEFAULT 'pago'    -- 'gratuito' (open access) | 'pago'
                  CHECK (access IN ('gratuito','pago')),
  is_open_access  BOOLEAN NOT NULL DEFAULT FALSE,
  license         TEXT,                           -- licença OA (CC-BY...) quando aplicável
  source_url      TEXT,                           -- link ao periódico/fonte
  ingestion_source TEXT NOT NULL DEFAULT 'crossref'
                  CHECK (ingestion_source IN ('crossref','pubmed','europepmc','upload','editorial')),
  raw_type        TEXT,                           -- tipo bruto retornado pela API (auditoria)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_studies_year   ON scientific_studies(year DESC);
CREATE INDEX idx_studies_type   ON scientific_studies(study_type_id);
CREATE INDEX idx_studies_access ON scientific_studies(access);
CREATE INDEX idx_studies_pmid   ON scientific_studies(pmid);
CREATE INDEX idx_studies_title_trgm ON scientific_studies USING gin (f_unaccent(lower(title)) gin_trgm_ops);
COMMENT ON TABLE scientific_studies IS 'Índice bibliográfico. Só metadados + abstract + link (nunca full-text protegido).';

-- 4.1 Estudo ↔ Entidade (N:N) — quais entidades um estudo cita.
CREATE TABLE study_entities (
  study_id    UUID NOT NULL REFERENCES scientific_studies(id) ON DELETE CASCADE,
  entity_id   UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  PRIMARY KEY (study_id, entity_id)
);

-- 4.2 Estudo ↔ Tópico (N:N)
CREATE TABLE study_topics (
  study_id    UUID NOT NULL REFERENCES scientific_studies(id) ON DELETE CASCADE,
  topic_id    UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (study_id, topic_id)
);

-- =====================================================================
-- 5. AVALIAÇÃO DE EVIDÊNCIA — ★ o coração do rigor editorial ★
--    Liga um estudo (e opcionalmente uma entidade+R) a um grau A/B/C/D,
--    com as TRAVAS de proporcionalidade embutidas como CHECKs.
--    Espelha lib/evidence.ts e engine/evidence.mjs.
-- =====================================================================
CREATE TABLE evidence_assessments (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id               UUID REFERENCES scientific_studies(id) ON DELETE CASCADE,
  entity_id              UUID REFERENCES entities(id) ON DELETE SET NULL,
  r_id                   SMALLINT REFERENCES five_r_categories(id),

  grade                  CHAR(1) NOT NULL CHECK (grade IN ('A','B','C','D')),
  study_type_id          SMALLINT REFERENCES study_types(id),

  -- direção do efeito. 'mecanistico' e 'associativo' NÃO afirmam efeito clínico.
  effect_direction       TEXT NOT NULL DEFAULT 'insuficiente'
                         CHECK (effect_direction IN
                           ('favoravel','desfavoravel','neutro','insuficiente',
                            'mecanistico','associativo')),

  -- flag explícita: esta avaliação declara efeito CLÍNICO em pessoas?
  claims_clinical_effect BOOLEAN NOT NULL DEFAULT FALSE,

  -- teto de aplicabilidade clínica (proporcionalidade §4.1 do padrão).
  clinical_applicability TEXT NOT NULL DEFAULT 'baixa'
                         CHECK (clinical_applicability IN ('alta','moderada','baixa','muito-baixa')),
  certainty              TEXT NOT NULL DEFAULT 'baixa'
                         CHECK (certainty IN ('alta','moderada','baixa','muito-baixa')),

  -- campos textuais do padrão
  summary                TEXT,                    -- síntese/lide clínico
  what_it_does_not_prove TEXT NOT NULL,           -- "O que NÃO prova" (obrigatório)
  limitations            TEXT,
  sample_size            INTEGER,

  -- governança: assinatura humana
  reviewer_id            UUID REFERENCES reviewers(id),
  signed_at              TIMESTAMPTZ,             -- NULL = ainda não assinada
  standard_version       TEXT NOT NULL DEFAULT 'v1.0',
  version                INTEGER NOT NULL DEFAULT 1,
  status                 TEXT NOT NULL DEFAULT 'rascunho'
                         CHECK (status IN ('rascunho','assinada','revogada')),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- ============ TRAVAS DE PROPORCIONALIDADE (não negociáveis) ============
  -- Grau D NUNCA declara efeito clínico (só mecanismo/pré-clínico).
  CONSTRAINT chk_d_no_clinical_effect
    CHECK (NOT (grade = 'D' AND claims_clinical_effect = TRUE)),
  -- Grau D não pode ter direção 'favoravel'/'desfavoravel' (isso é efeito clínico).
  CONSTRAINT chk_d_effect_direction
    CHECK (NOT (grade = 'D' AND effect_direction IN ('favoravel','desfavoravel'))),
  -- Grau D no máximo aplicabilidade 'muito-baixa'.
  CONSTRAINT chk_d_applicability
    CHECK (NOT (grade = 'D' AND clinical_applicability <> 'muito-baixa')),
  -- Grau C: aplicabilidade limitada a 'baixa' (nunca alta/moderada).
  CONSTRAINT chk_c_applicability
    CHECK (NOT (grade = 'C' AND clinical_applicability IN ('alta','moderada'))),
  -- Grau B: aplicabilidade no máximo 'moderada' (nunca alta).
  CONSTRAINT chk_b_applicability
    CHECK (NOT (grade = 'B' AND clinical_applicability = 'alta'))
);
CREATE INDEX idx_evidence_study    ON evidence_assessments(study_id);
CREATE INDEX idx_evidence_entity   ON evidence_assessments(entity_id);
CREATE INDEX idx_evidence_grade    ON evidence_assessments(grade);
CREATE INDEX idx_evidence_reviewer ON evidence_assessments(reviewer_id);
COMMENT ON TABLE evidence_assessments IS 'Nível de evidência A/B/C/D com travas: D nunca afirma efeito clínico. Espelha lib/evidence.ts.';

-- =====================================================================
-- 6. ARTIGOS (notícias) + VERSÕES editoriais
--    O artigo publicado tem a forma do NewsArticle de content/news.ts.
--    Fluxo de status: rascunho→em_revisao→aprovado→publicado→despublicado.
--    NADA nasce 'publicado' pelo motor: um humano promove o status.
-- =====================================================================
CREATE TABLE articles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  study_id       UUID REFERENCES scientific_studies(id) ON DELETE SET NULL,
  doi            TEXT,                            -- redundante p/ anti-duplicata rápida por DOI
  category       TEXT,
  -- ponteiro para a versão atualmente publicada (NULL = nunca publicado)
  current_version_id UUID,                        -- FK adicionada após article_versions
  featured       BOOLEAN NOT NULL DEFAULT FALSE,
  origin         TEXT NOT NULL DEFAULT 'motor'    -- 'motor' (IA) | 'editorial' (humano)
                 CHECK (origin IN ('motor','editorial')),
  author_id      UUID REFERENCES authors(id),
  published_at   TIMESTAMPTZ,                     -- 1ª publicação
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_articles_doi      ON articles(doi);
CREATE INDEX idx_articles_featured ON articles(featured);
CREATE INDEX idx_articles_category ON articles(category);
COMMENT ON TABLE articles IS 'Notícia/análise. Forma publicada = NewsArticle de content/news.ts.';

-- 6.1 Versões do artigo — histórico editorial completo e status de fluxo.
--     O corpo (payload) guarda os campos do NewsArticle em JSONB, para o
--     schema não engessar a estrutura editorial (que pode evoluir).
CREATE TABLE article_versions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id     UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  version        INTEGER NOT NULL,               -- 1,2,3...
  status         TEXT NOT NULL DEFAULT 'rascunho'
                 CHECK (status IN ('rascunho','em_revisao','aprovado','publicado','despublicado')),

  -- campos editoriais principais (também presentes no payload; expostos p/ busca)
  title          TEXT NOT NULL,                  -- título popular
  quick_answer   TEXT,                           -- resposta rápida (AEO)
  evidence_grade CHAR(1) CHECK (evidence_grade IN ('A','B','C','D')),
  study_type_id  SMALLINT REFERENCES study_types(id),

  -- payload = objeto NewsArticle completo (studied, participants, intervention,
  -- found, cannotConclude, relationTo5R, rTags, limitations, practical, source...)
  payload        JSONB NOT NULL DEFAULT '{}',

  -- rastreabilidade da geração por IA
  generated_by   TEXT,                           -- 'ia' | 'humano'
  ai_run_id      UUID,                           -- FK adicionada após automation_runs

  -- governança da versão
  reviewer_id    UUID REFERENCES reviewers(id),
  reviewed_at    TIMESTAMPTZ,
  published_at   TIMESTAMPTZ,
  notes          TEXT,                           -- notas de revisão
  created_by     UUID REFERENCES users(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (article_id, version)
);
CREATE INDEX idx_article_versions_status  ON article_versions(status);
CREATE INDEX idx_article_versions_article ON article_versions(article_id);
COMMENT ON TABLE article_versions IS 'Histórico versionado do artigo. Status: rascunho→em_revisao→aprovado→publicado→despublicado.';

-- FK tardia: articles.current_version_id → article_versions.id
ALTER TABLE articles
  ADD CONSTRAINT fk_articles_current_version
  FOREIGN KEY (current_version_id) REFERENCES article_versions(id);

-- 6.2 Artigo ↔ R (N:N) — quais Rs o artigo aborda (rTags).
CREATE TABLE article_r_relations (
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  r_id        SMALLINT NOT NULL REFERENCES five_r_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, r_id)
);

-- 6.3 Artigo ↔ Entidade (N:N) — termos do glossário citados/relacionados.
CREATE TABLE article_entity_relations (
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  entity_id   UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, entity_id)
);

-- 6.4 Artigo ↔ Tag (N:N)
CREATE TABLE article_tags (
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  tag_id      UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- 6.5 Correções editoriais (transparência: erratas visíveis).
CREATE TABLE editorial_corrections (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id     UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  version        INTEGER,                         -- versão corrigida
  description    TEXT NOT NULL,                   -- o que foi corrigido e por quê
  corrected_by   UUID REFERENCES reviewers(id),
  corrected_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE editorial_corrections IS 'Erratas públicas — registro transparente de correções.';

-- =====================================================================
-- 7. PIPELINE — fila de publicação, candidatos a duplicata e execuções
-- =====================================================================

-- 7.1 Fila de publicação (do radar ao publicado).
--     Estados: capturada→priorizada→roteada→em_revisao→publicada→descartada.
CREATE TABLE publication_queue (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id       UUID REFERENCES scientific_studies(id) ON DELETE CASCADE,
  article_id     UUID REFERENCES articles(id) ON DELETE SET NULL,   -- preenchido ao gerar
  state          TEXT NOT NULL DEFAULT 'capturada'
                 CHECK (state IN ('capturada','priorizada','roteada','em_revisao','publicada','descartada')),
  score          NUMERIC(6,2) NOT NULL DEFAULT 0, -- prioridade (tipo+recência+citações+tópico)
  topic_id       UUID REFERENCES topics(id),
  r_id           SMALLINT REFERENCES five_r_categories(id),
  reviewer_id    UUID REFERENCES reviewers(id),   -- atribuído no roteamento
  discard_reason TEXT,                            -- por que foi descartada (auditoria)
  notified_at    TIMESTAMPTZ,                     -- notificação ao revisor
  deadline       TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_queue_state   ON publication_queue(state);
CREATE INDEX idx_queue_score   ON publication_queue(score DESC);
CREATE INDEX idx_queue_reviewer ON publication_queue(reviewer_id);
COMMENT ON TABLE publication_queue IS 'Fila editorial. capturada→priorizada→roteada→em_revisao→publicada→descartada.';

-- 7.2 Candidatos a duplicata (saída de engine/dedup.mjs).
--     Guarda pares suspeitos com o método e o score de similaridade para
--     decisão humana. DOI idêntico é resolvido antes (UNIQUE em studies).
CREATE TABLE duplicate_candidates (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id       UUID NOT NULL REFERENCES scientific_studies(id) ON DELETE CASCADE,
  duplicate_of   UUID REFERENCES scientific_studies(id) ON DELETE CASCADE,
  match_method   TEXT NOT NULL                    -- 'doi'|'pmid'|'title'|'authors_year'|'jaccard'
                 CHECK (match_method IN ('doi','pmid','title','authors_year','jaccard')),
  similarity     NUMERIC(5,4) NOT NULL DEFAULT 0, -- 0..1
  status         TEXT NOT NULL DEFAULT 'pendente'
                 CHECK (status IN ('pendente','confirmada','descartada')),
  resolved_by    UUID REFERENCES users(id),
  resolved_at    TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (study_id, duplicate_of, match_method)
);
CREATE INDEX idx_dupe_study  ON duplicate_candidates(study_id);
CREATE INDEX idx_dupe_status ON duplicate_candidates(status);
COMMENT ON TABLE duplicate_candidates IS 'Pares suspeitos de duplicata (método + similaridade) para decisão humana.';

-- 7.3 Execuções de automação (cada rodada de captura/geração).
CREATE TABLE automation_runs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind           TEXT NOT NULL                    -- 'capture'|'fulltext'|'dedup'|'generate'|'route'
                 CHECK (kind IN ('capture','fulltext','dedup','generate','route')),
  status         TEXT NOT NULL DEFAULT 'running'
                 CHECK (status IN ('running','success','partial','failed')),
  started_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at    TIMESTAMPTZ,
  stats          JSONB NOT NULL DEFAULT '{}',     -- {evaluated, inserted, queued, generated...}
  message        TEXT,                            -- resumo/erro amigável
  triggered_by   TEXT                             -- 'cron'|'manual'|'painel'
);
CREATE INDEX idx_runs_kind   ON automation_runs(kind);
CREATE INDEX idx_runs_status ON automation_runs(status);
COMMENT ON TABLE automation_runs IS 'Auditoria de cada execução do pipeline (captura, geração, etc.).';

-- FK tardia: article_versions.ai_run_id → automation_runs.id
ALTER TABLE article_versions
  ADD CONSTRAINT fk_article_versions_run
  FOREIGN KEY (ai_run_id) REFERENCES automation_runs(id);

-- 7.4 Uso de IA (rastreio de custo por chamada ao provedor).
CREATE TABLE ai_usage (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id         UUID REFERENCES automation_runs(id) ON DELETE SET NULL,
  article_id     UUID REFERENCES articles(id) ON DELETE SET NULL,
  provider       TEXT NOT NULL DEFAULT 'anthropic',
  model          TEXT NOT NULL,                   -- ex.: 'claude-sonnet-5'
  input_tokens   INTEGER NOT NULL DEFAULT 0,
  output_tokens  INTEGER NOT NULL DEFAULT 0,
  cost_usd       NUMERIC(10,6) NOT NULL DEFAULT 0, -- custo estimado em USD
  purpose        TEXT,                            -- 'generate-draft'|'classify'|'summary'
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ai_usage_model ON ai_usage(model);
CREATE INDEX idx_ai_usage_run   ON ai_usage(run_id);
COMMENT ON TABLE ai_usage IS 'Contabilidade de tokens/custo por chamada de IA (best-effort).';

-- 7.5 Log de erros do motor (diagnóstico).
CREATE TABLE error_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id         UUID REFERENCES automation_runs(id) ON DELETE SET NULL,
  scope          TEXT,                            -- 'capture'|'fulltext'|'generate'|'api'...
  severity       TEXT NOT NULL DEFAULT 'error'
                 CHECK (severity IN ('info','warning','error','critical')),
  message        TEXT NOT NULL,
  context        JSONB NOT NULL DEFAULT '{}',     -- {doi, query, endpoint...}
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_errors_severity ON error_logs(severity);
CREATE INDEX idx_errors_scope    ON error_logs(scope);
COMMENT ON TABLE error_logs IS 'Registro de erros/avisos do pipeline para diagnóstico.';

-- =====================================================================
-- 8. BUSCA, SEO E CONVERSÃO
-- =====================================================================

-- 8.1 Buscas dos usuários (relatório de demanda + melhoria do glossário).
CREATE TABLE searches (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query          TEXT NOT NULL,
  query_norm     TEXT,                            -- normalizada (sem acento/lower) p/ agregação
  results_count  INTEGER NOT NULL DEFAULT 0,
  clicked_slug   TEXT,                            -- resultado clicado, se houver
  session_hint   TEXT,                            -- hash de sessão (não-PII)
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_searches_norm ON searches USING gin (query_norm gin_trgm_ops);
COMMENT ON TABLE searches IS 'Buscas realizadas no portal — insumo para pautas e novos verbetes.';

-- 8.2 Buscas SEM resposta (lacunas de conteúdo — vira backlog editorial).
CREATE TABLE unanswered_searches (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query          TEXT NOT NULL,
  query_norm     TEXT UNIQUE,                     -- agrega repetições
  hits           INTEGER NOT NULL DEFAULT 1,      -- quantas vezes foi buscada sem resposta
  status         TEXT NOT NULL DEFAULT 'aberta'
                 CHECK (status IN ('aberta','em_producao','atendida','ignorada')),
  last_seen      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE unanswered_searches IS 'Buscas sem resultado — lacunas priorizadas para novos conteúdos.';

-- 8.3 Redirects (SEO: slugs antigos → novos, e URLs de campanha).
CREATE TABLE redirects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path    TEXT UNIQUE NOT NULL,              -- '/noticias/slug-antigo'
  to_path      TEXT NOT NULL,                     -- '/noticias/slug-novo'
  status_code  SMALLINT NOT NULL DEFAULT 301
               CHECK (status_code IN (301,302,307,308)),
  active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_redirects_from ON redirects(from_path);

-- 8.4 Leads de certificação (conversão — funil da formação 5R).
CREATE TABLE certification_leads (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT,
  email        TEXT NOT NULL,
  phone        TEXT,
  profession   TEXT,                              -- nutricionista, médico, etc.
  source       TEXT,                              -- origem (artigo/campanha)
  utm          JSONB NOT NULL DEFAULT '{}',       -- {source,medium,campaign...}
  consent      BOOLEAN NOT NULL DEFAULT FALSE,    -- LGPD: consentimento explícito
  status       TEXT NOT NULL DEFAULT 'novo'
               CHECK (status IN ('novo','contatado','qualificado','matriculado','descartado')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_leads_email  ON certification_leads(email);
CREATE INDEX idx_leads_status ON certification_leads(status);
COMMENT ON TABLE certification_leads IS 'Leads da certificação 5R (com consentimento LGPD).';

-- 8.5 Eventos de analytics (métricas de produto, sem PII).
CREATE TABLE analytics_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,                     -- 'view_article','open_glossary','cta_click'...
  path         TEXT,
  entity_id    UUID REFERENCES entities(id) ON DELETE SET NULL,
  article_id   UUID REFERENCES articles(id) ON DELETE SET NULL,
  props        JSONB NOT NULL DEFAULT '{}',
  session_hint TEXT,                              -- hash de sessão (não-PII)
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_analytics_name ON analytics_events(name);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);
COMMENT ON TABLE analytics_events IS 'Eventos de produto (agregados, sem dados pessoais).';

-- =====================================================================
-- 9. SEEDS MÍNIMOS — os 5 Rs (ordem canônica de lib/five-rs.ts)
--    Idempotente: reexecutar o schema não duplica.
-- =====================================================================
INSERT INTO five_r_categories (id, slug, code, name, english, color, tagline) VALUES
  (1,'remover','R·01','Remover','Remove','#131A45','Tirar o que atrapalha antes de repor o que falta.'),
  (2,'recolocar','R·02','Recolocar','Replace','#2B3990','Restaurar a função digestiva, não empurrar suplemento.'),
  (3,'reparar','R·03','Reparar','Repair','#4353B8','Barreira e mucosa — mecanismo plausível, sem promessa.'),
  (4,'reinocular','R·04','Reinocular','Reinoculate','#7C89D6','Microbiota com critério: cepa, dose, tempo e alvo.'),
  (5,'reequilibrar','R·05','Reequilibrar','Rebalance','#B9C1EA','Eixo intestino-cérebro, estilo de vida e manutenção.')
ON CONFLICT (id) DO NOTHING;

-- Tipos de estudo (espelha StudyType de lib/evidence.ts + pesos de hierarquia).
INSERT INTO study_types (slug, name, weight) VALUES
  ('revisao-sistematica','Revisão sistemática',100),
  ('meta-analise','Meta-análise',100),
  ('guideline','Diretriz (guideline)',95),
  ('consenso','Consenso',70),
  ('ensaio-clinico','Ensaio clínico',80),
  ('coorte','Estudo de coorte',50),
  ('observacional','Estudo observacional',30),
  ('pre-clinico','Estudo pré-clínico',15),
  ('mecanismo','Mecanismo',15),
  ('associacao','Associação',25),
  ('hipotese','Hipótese',10),
  ('artigo','Artigo (genérico)',20)
ON CONFLICT (slug) DO NOTHING;

-- Papéis básicos.
INSERT INTO roles (slug, name, permissions) VALUES
  ('admin','Administrador','["*"]'),
  ('editor','Editor','["queue:read","article:write","article:publish"]'),
  ('revisor','Revisor','["queue:read","evidence:sign","article:review"]'),
  ('leitor','Leitor','["public:read"]')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================================
-- FIM DO SCHEMA v1.0 — Protocolo 5R
-- O grafo está completo: entidades e os 5 Rs, estudos indexados por DOI,
-- avaliação de evidência com travas de proporcionalidade, artigos
-- versionados com revisão humana obrigatória, e o pipeline auditável
-- (fila, duplicatas, execuções, custo de IA e erros).
-- =====================================================================
