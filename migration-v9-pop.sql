-- ============================================================
-- MIGRATION V9 — POP OPERACIONAL POR EVENTO (Fase 1) · DDL
-- ============================================================
-- Camadas: templates.template_kind = 'master' | 'overlay' | 'legacy'
-- Overlay referencia o mestre via parent_template_id e sobrescreve
-- atividades pelo mesmo task_key na geração da instância.
-- Idempotente: pode ser executada novamente sem corromper dados.
-- ============================================================

-- ---------- 1. TEMPLATES: camadas e versionamento ----------
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS template_kind text NOT NULL DEFAULT 'legacy';
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS parent_template_id uuid REFERENCES public.templates(id);
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS venue_id uuid;
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1;
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'publicado';
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS changelog text;
DO $$ BEGIN
  ALTER TABLE public.templates ADD CONSTRAINT templates_kind_chk CHECK (template_kind IN ('legacy','master','overlay'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE public.templates ADD CONSTRAINT templates_status_chk CHECK (status IN ('rascunho','em_revisao','publicado','arquivado'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ---------- 2. MÓDULOS DO POP ----------
CREATE TABLE IF NOT EXISTS public.pop_modules (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  template_id uuid NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
  module_key text NOT NULL,
  name text NOT NULL,
  objective text,
  sort_order integer DEFAULT 0,
  UNIQUE (template_id, module_key)
);

-- ---------- 3. TEMPLATE_TASKS: campos POP ----------
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS module_key text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS task_key text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS objective text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS task_type text DEFAULT 'obrigatoria';
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS conditional_parent_key text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS condition_value text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS criticality text DEFAULT 'normal';
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS evidence_required boolean DEFAULT false;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS finance_category text;
DO $$ BEGIN
  ALTER TABLE public.template_tasks ADD CONSTRAINT template_tasks_type_chk CHECK (task_type IN ('obrigatoria','opcional','condicional'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE UNIQUE INDEX IF NOT EXISTS uq_template_tasks_key ON public.template_tasks(template_id, task_key) WHERE task_key IS NOT NULL;

-- ---------- 4. TASKS: campos POP na instância ----------
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS module_key text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS task_key text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS objective text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS task_type text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS applicability text DEFAULT 'aplicavel';
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS conditional_parent_key text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS condition_value text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS criticality text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS pop_status text DEFAULT 'nao_iniciada';
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS source_layer text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS template_version integer;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS due_locked boolean DEFAULT false;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS decision_value text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS decision_reason text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS decision_by uuid;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS supplier_id uuid;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS cost_planned numeric(12,2);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS cost_quoted numeric(12,2);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS cost_approved numeric(12,2);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS cost_contracted numeric(12,2);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS cost_actual numeric(12,2);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS cost_paid numeric(12,2);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS finance_category text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS finance_id uuid;
DO $$ BEGIN
  ALTER TABLE public.tasks ADD CONSTRAINT tasks_pop_status_chk CHECK (pop_status IS NULL OR pop_status IN
    ('nao_iniciada','planejamento','cotacao','aguardando_fornecedor','aguardando_aprovacao','contratada','em_execucao','bloqueada','concluida','nao_aplicavel','cancelada'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE public.tasks ADD CONSTRAINT tasks_applicability_chk CHECK (applicability IS NULL OR applicability IN ('aplicavel','nao_aplicavel'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE UNIQUE INDEX IF NOT EXISTS uq_tasks_event_key ON public.tasks(event_id, task_key) WHERE task_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tasks_module ON public.tasks(event_id, module_key);

-- ---------- 5. VENUES ----------
CREATE TABLE IF NOT EXISTS public.venues (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  city text,
  state text,
  address text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- ---------- 6. FORNECEDORES ----------
CREATE TABLE IF NOT EXISTS public.suppliers (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  legal_name text,
  document text,
  phone text,
  email text,
  website text,
  contact_name text,
  active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_suppliers_name ON public.suppliers (lower(name));

CREATE TABLE IF NOT EXISTS public.supplier_categories (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.supplier_category_links (
  supplier_id uuid NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.supplier_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (supplier_id, category_id)
);

CREATE TABLE IF NOT EXISTS public.venue_suppliers (
  venue_id uuid NOT NULL REFERENCES public.venues(id) ON DELETE CASCADE,
  supplier_id uuid NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  credential_status text DEFAULT 'credenciado',
  credential_start date,
  credential_end date,
  notes text,
  PRIMARY KEY (venue_id, supplier_id)
);

CREATE TABLE IF NOT EXISTS public.event_suppliers (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  supplier_id uuid NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  module_key text,
  task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  negotiation_status text DEFAULT 'prospeccao',
  selected boolean DEFAULT false,
  contract_status text,
  performance_score integer,
  notes text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_event_suppliers_event ON public.event_suppliers(event_id);

CREATE TABLE IF NOT EXISTS public.supplier_quotes (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  supplier_id uuid NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  quoted_value numeric(12,2),
  valid_until date,
  payment_terms text,
  file_url text,
  status text DEFAULT 'recebida',
  created_at timestamptz DEFAULT now()
);

-- ---------- 7. DOCUMENTOS (por link, Fase 1) e DEPENDÊNCIAS ----------
CREATE TABLE IF NOT EXISTS public.task_documents (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE,
  doc_type text,
  name text NOT NULL,
  url text NOT NULL,
  uploaded_by uuid,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_task_documents_task ON public.task_documents(task_id);

CREATE TABLE IF NOT EXISTS public.task_dependencies (
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  depends_on_task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, depends_on_task_id)
);

-- ---------- 8. RLS ----------
ALTER TABLE public.pop_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_category_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_dependencies ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['pop_modules'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "rbac_read_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_read_%s" ON public.%I FOR SELECT USING (public.has_permission(''pop.view'') OR public.has_permission(''templates.view''))', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "rbac_write_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_write_%s" ON public.%I FOR ALL USING (public.has_permission(''pop.templates.manage'') OR public.has_permission(''templates.edit'')) WITH CHECK (public.has_permission(''pop.templates.manage'') OR public.has_permission(''templates.edit''))', t, t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['venues','suppliers','supplier_categories','supplier_category_links','venue_suppliers'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "rbac_read_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_read_%s" ON public.%I FOR SELECT USING (public.has_permission(''suppliers.view''))', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "rbac_write_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_write_%s" ON public.%I FOR ALL USING (public.has_permission(''suppliers.edit'')) WITH CHECK (public.has_permission(''suppliers.edit''))', t, t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['event_suppliers','supplier_quotes'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "rbac_read_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_read_%s" ON public.%I FOR SELECT USING (public.has_permission(''suppliers.view'') OR public.has_permission(''pop.view''))', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "rbac_write_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_write_%s" ON public.%I FOR ALL USING (public.has_permission(''suppliers.edit'') OR public.has_permission(''pop.edit'')) WITH CHECK (public.has_permission(''suppliers.edit'') OR public.has_permission(''pop.edit''))', t, t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['task_documents','task_dependencies'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "rbac_read_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_read_%s" ON public.%I FOR SELECT USING (public.has_permission(''pop.view'') OR public.has_permission(''events.view''))', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "rbac_write_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_write_%s" ON public.%I FOR ALL USING (public.has_permission(''pop.edit'') OR public.has_permission(''events.edit'')) WITH CHECK (public.has_permission(''pop.edit'') OR public.has_permission(''events.edit''))', t, t);
  END LOOP;
END $$;

-- ---------- 9. PERMISSÕES RBAC ----------
INSERT INTO public.role_permissions (role_name, permission_code)
SELECT r.role_name, p.code
FROM (VALUES ('ceo'), ('admin')) AS r(role_name)
CROSS JOIN (VALUES
  ('pop.view'),('pop.edit'),('pop.assign'),('pop.complete'),('pop.approve'),('pop.templates.manage'),
  ('suppliers.view'),('suppliers.edit'),('suppliers.financial.view'),('suppliers.contracts.view'),('suppliers.evaluate'),
  ('event.documents.view'),('event.documents.edit')
) AS p(code)
WHERE NOT EXISTS (SELECT 1 FROM public.role_permissions rp WHERE rp.role_name = r.role_name AND rp.permission_code = p.code);

INSERT INTO public.role_permissions (role_name, permission_code)
SELECT 'director', p.code FROM (VALUES
  ('pop.view'),('pop.edit'),('pop.assign'),('pop.complete'),('pop.approve'),
  ('suppliers.view'),('suppliers.edit'),('suppliers.contracts.view'),('suppliers.evaluate'),
  ('event.documents.view'),('event.documents.edit')
) AS p(code)
WHERE NOT EXISTS (SELECT 1 FROM public.role_permissions rp WHERE rp.role_name='director' AND rp.permission_code=p.code);

INSERT INTO public.role_permissions (role_name, permission_code)
SELECT 'partner', p.code FROM (VALUES ('pop.view'),('suppliers.view'),('event.documents.view')) AS p(code)
WHERE NOT EXISTS (SELECT 1 FROM public.role_permissions rp WHERE rp.role_name='partner' AND rp.permission_code=p.code);

INSERT INTO public.role_permissions (role_name, permission_code)
SELECT 'member', p.code FROM (VALUES ('pop.view'),('pop.complete'),('event.documents.view')) AS p(code)
WHERE NOT EXISTS (SELECT 1 FROM public.role_permissions rp WHERE rp.role_name='member' AND rp.permission_code=p.code);

-- ---------- 10. REALTIME ----------
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.suppliers;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.event_suppliers;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.task_documents;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
