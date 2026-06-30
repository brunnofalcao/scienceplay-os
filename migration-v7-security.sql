-- ============================================================
-- MIGRATION V7 — SECURITY HARDENING (P0)
-- Science Play OS V2
-- Data: 2026-06-30
-- Autor: Claude (via Brunno Falcao)
-- ============================================================
--
-- O QUE ESTA MIGRATION FAZ:
-- 1. Corrige views v_tasks_pending e v_dre_summary (SECURITY INVOKER)
-- 2. Expande profiles.role para suportar 23 roles
-- 3. Cria tabela role_permissions com mapa completo de permissoes
-- 4. Cria funcoes SQL: get_my_role(), has_permission(), is_admin()
-- 5. Cria tabela audit_logs com funcao log_action()
-- 6. Substitui TODAS as 46 policies genericas por RBAC-based policies
-- 7. Revoga grants excessivos de anon em views
--
-- COMO APLICAR:
-- Execute no SQL Editor do Supabase (Dashboard > SQL Editor)
-- Ou via psql: psql -h db.vapsolcgnrnfmddcikca.supabase.co -U postgres -f migration-v7-security.sql
--
-- REVERSAO:
-- Nao ha rollback automatico. Em caso de problema, restaurar backup do Supabase.
-- ============================================================

-- ============================================================
-- PARTE 1: FIX VIEWS
-- ============================================================

DROP VIEW IF EXISTS public.v_tasks_pending;
CREATE VIEW public.v_tasks_pending
WITH (security_invoker = true)
AS
SELECT t.id,
    t.title,
    t.due_date,
    t.priority,
    t.department,
    t.phase,
    t.day_offset,
    t.area,
    t.phase_code,
    t.task_status,
    t.dependency,
    t.responsible_role,
    e.name AS event_name,
    e.event_date,
    p.name AS assigned_name
FROM tasks t
JOIN events e ON e.id = t.event_id
LEFT JOIN profiles p ON p.id = t.assigned_to
WHERE t.done = false
ORDER BY t.due_date;

DROP VIEW IF EXISTS public.v_dre_summary;
CREATE VIEW public.v_dre_summary
WITH (security_invoker = true)
AS
SELECT e.id AS event_id,
    e.name AS event_name,
    e.event_date,
    e.type,
    COALESCE(r.total, 0::numeric) AS receita_estimada,
    COALESCE(c.total, 0::numeric) AS custo_estimado,
    (COALESCE(r.total, 0::numeric) - COALESCE(c.total, 0::numeric)) AS resultado_estimado,
    COALESCE(r_pago.total, 0::numeric) AS receita_oficial,
    COALESCE(c_pago.total, 0::numeric) AS custo_oficial,
    (COALESCE(r_pago.total, 0::numeric) - COALESCE(c_pago.total, 0::numeric)) AS resultado_oficial,
    CASE
        WHEN COALESCE(r.total, 0::numeric) > 0::numeric
        THEN round(((COALESCE(r.total, 0::numeric) - COALESCE(c.total, 0::numeric)) / COALESCE(r.total, 0::numeric)) * 100::numeric, 1)
        ELSE 0::numeric
    END AS margem_estimada,
    CASE
        WHEN COALESCE(r_pago.total, 0::numeric) > 0::numeric
        THEN round(((COALESCE(r_pago.total, 0::numeric) - COALESCE(c_pago.total, 0::numeric)) / COALESCE(r_pago.total, 0::numeric)) * 100::numeric, 1)
        ELSE 0::numeric
    END AS margem_oficial
FROM events e
LEFT JOIN LATERAL (
    SELECT sum(finances.amount) AS total
    FROM finances
    WHERE finances.event_id = e.id AND finances.type = 'receita'
) r ON true
LEFT JOIN LATERAL (
    SELECT sum(finances.amount) AS total
    FROM finances
    WHERE finances.event_id = e.id AND finances.type = 'custo'
) c ON true
LEFT JOIN LATERAL (
    SELECT sum(finances.amount) AS total
    FROM finances
    WHERE finances.event_id = e.id AND finances.type = 'receita' AND finances.payment_status = 'pago'
) r_pago ON true
LEFT JOIN LATERAL (
    SELECT sum(finances.amount) AS total
    FROM finances
    WHERE finances.event_id = e.id AND finances.type = 'custo' AND finances.payment_status = 'pago'
) c_pago ON true;

-- Revogar grants excessivos (executar DEPOIS do CREATE)
REVOKE ALL ON public.v_tasks_pending FROM anon;
REVOKE ALL ON public.v_dre_summary FROM anon;
REVOKE ALL ON public.v_tasks_pending FROM authenticated;
REVOKE ALL ON public.v_dre_summary FROM authenticated;
GRANT SELECT ON public.v_tasks_pending TO authenticated;
GRANT SELECT ON public.v_dre_summary TO authenticated;

-- ============================================================
-- PARTE 2: EXPANDIR ROLES
-- ============================================================

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (
  role = ANY (ARRAY[
    'super_admin', 'ceo', 'partner', 'director',
    'finance_admin', 'finance_operator',
    'commercial_manager', 'sales_operator',
    'cs_manager', 'cs_operator',
    'ops_manager', 'ops_operator',
    'marketing_manager', 'marketing_operator',
    'event_manager', 'event_operator',
    'content_manager', 'support_operator',
    'viewer', 'external_auditor',
    'admin', 'member'
  ]::text[])
);

-- ============================================================
-- PARTE 3: TABELA ROLE_PERMISSIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.role_permissions (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  role_name text NOT NULL,
  permission_code text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(role_name, permission_code)
);

ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Read role_permissions" ON public.role_permissions
  FOR SELECT USING (auth.role() = 'authenticated');

INSERT INTO public.role_permissions (role_name, permission_code) VALUES
  ('super_admin', '*'),
  ('ceo', 'dashboard.view'), ('ceo', 'dashboard.ceo'), ('ceo', 'finance.view'), ('ceo', 'finance.edit'),
  ('ceo', 'dre.view'), ('ceo', 'dre.edit'), ('ceo', 'ma.view'), ('ceo', 'ma.edit'),
  ('ceo', 'due_diligence.view'), ('ceo', 'due_diligence.edit'), ('ceo', 'cs.view'), ('ceo', 'cs.edit'),
  ('ceo', 'events.view'), ('ceo', 'events.edit'), ('ceo', 'events.delete'),
  ('ceo', 'vendas.view'), ('ceo', 'vendas.edit'), ('ceo', 'team.view'), ('ceo', 'team.invite'),
  ('ceo', 'team.edit'), ('ceo', 'templates.view'), ('ceo', 'templates.edit'),
  ('ceo', 'reports.view'), ('ceo', 'reports.export'), ('ceo', 'settings.view'), ('ceo', 'audit.view'),
  ('partner', 'dashboard.view'), ('partner', 'dashboard.ceo'), ('partner', 'finance.view'),
  ('partner', 'dre.view'), ('partner', 'ma.view'), ('partner', 'due_diligence.view'),
  ('partner', 'cs.view'), ('partner', 'events.view'), ('partner', 'vendas.view'),
  ('partner', 'team.view'), ('partner', 'reports.view'), ('partner', 'reports.export'),
  ('director', 'dashboard.view'), ('director', 'dashboard.ceo'), ('director', 'finance.view'),
  ('director', 'dre.view'), ('director', 'ma.view'), ('director', 'cs.view'),
  ('director', 'events.view'), ('director', 'events.edit'), ('director', 'vendas.view'),
  ('director', 'vendas.edit'), ('director', 'team.view'), ('director', 'reports.view'), ('director', 'reports.export'),
  ('finance_admin', 'dashboard.view'), ('finance_admin', 'finance.view'), ('finance_admin', 'finance.edit'),
  ('finance_admin', 'dre.view'), ('finance_admin', 'dre.edit'), ('finance_admin', 'reports.view'),
  ('finance_admin', 'reports.export'), ('finance_admin', 'ma.view'), ('finance_admin', 'due_diligence.view'),
  ('finance_operator', 'dashboard.view'), ('finance_operator', 'finance.view'), ('finance_operator', 'dre.view'),
  ('commercial_manager', 'dashboard.view'), ('commercial_manager', 'vendas.view'), ('commercial_manager', 'vendas.edit'),
  ('commercial_manager', 'cs.view'), ('commercial_manager', 'cs.edit'), ('commercial_manager', 'events.view'),
  ('commercial_manager', 'reports.view'),
  ('sales_operator', 'dashboard.view'), ('sales_operator', 'vendas.view'), ('sales_operator', 'vendas.edit'),
  ('sales_operator', 'events.view'),
  ('cs_manager', 'dashboard.view'), ('cs_manager', 'cs.view'), ('cs_manager', 'cs.edit'),
  ('cs_manager', 'events.view'), ('cs_manager', 'reports.view'),
  ('cs_operator', 'dashboard.view'), ('cs_operator', 'cs.view'), ('cs_operator', 'cs.edit'),
  ('ops_manager', 'dashboard.view'), ('ops_manager', 'events.view'), ('ops_manager', 'events.edit'),
  ('ops_manager', 'templates.view'), ('ops_manager', 'templates.edit'), ('ops_manager', 'team.view'),
  ('ops_manager', 'reports.view'),
  ('ops_operator', 'dashboard.view'), ('ops_operator', 'events.view'), ('ops_operator', 'templates.view'),
  ('marketing_manager', 'dashboard.view'), ('marketing_manager', 'events.view'), ('marketing_manager', 'events.edit'),
  ('marketing_manager', 'reports.view'),
  ('marketing_operator', 'dashboard.view'), ('marketing_operator', 'events.view'),
  ('event_manager', 'dashboard.view'), ('event_manager', 'events.view'), ('event_manager', 'events.edit'),
  ('event_manager', 'templates.view'), ('event_manager', 'templates.edit'),
  ('event_operator', 'dashboard.view'), ('event_operator', 'events.view'), ('event_operator', 'templates.view'),
  ('content_manager', 'dashboard.view'), ('content_manager', 'events.view'),
  ('support_operator', 'dashboard.view'), ('support_operator', 'cs.view'),
  ('viewer', 'dashboard.view'),
  ('external_auditor', 'dashboard.view'), ('external_auditor', 'finance.view'), ('external_auditor', 'dre.view'),
  ('external_auditor', 'ma.view'), ('external_auditor', 'due_diligence.view'), ('external_auditor', 'reports.view'),
  ('admin', '*'),
  ('member', 'dashboard.view'), ('member', 'events.view')
ON CONFLICT (role_name, permission_code) DO NOTHING;

REVOKE ALL ON public.role_permissions FROM anon;
GRANT SELECT ON public.role_permissions TO authenticated;

-- ============================================================
-- PARTE 4: FUNCOES SQL RBAC
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT COALESCE((SELECT role FROM public.profiles WHERE id = auth.uid()), 'viewer'); $$;

CREATE OR REPLACE FUNCTION public.has_permission(permission_code text)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.role_permissions rp
    WHERE rp.role_name = public.get_my_role()
    AND (rp.permission_code = permission_code OR rp.permission_code = '*')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT public.get_my_role() IN ('super_admin', 'ceo', 'admin'); $$;

REVOKE ALL ON FUNCTION public.get_my_role() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated;
REVOKE ALL ON FUNCTION public.has_permission(text) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_permission(text) TO authenticated;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ============================================================
-- PARTE 5: TABELA AUDIT_LOGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  user_email text,
  user_role text,
  action text NOT NULL,
  table_name text,
  record_id text,
  old_data jsonb,
  new_data jsonb,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Read audit_logs" ON public.audit_logs
  FOR SELECT USING (
    public.get_my_role() IN ('super_admin', 'ceo', 'admin', 'external_auditor')
    OR public.has_permission('audit.view')
  );

CREATE POLICY "Insert audit_logs" ON public.audit_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON public.audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record_id ON public.audit_logs(record_id);

REVOKE ALL ON public.audit_logs FROM anon;
REVOKE ALL ON public.audit_logs FROM authenticated;
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;

CREATE OR REPLACE FUNCTION public.log_action(
  p_action text,
  p_table_name text DEFAULT NULL,
  p_record_id text DEFAULT NULL,
  p_old_data jsonb DEFAULT NULL,
  p_new_data jsonb DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'
)
RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_log_id uuid;
  v_user_email text;
  v_user_role text;
BEGIN
  SELECT email INTO v_user_email FROM auth.users WHERE id = auth.uid();
  SELECT role INTO v_user_role FROM public.profiles WHERE id = auth.uid();
  INSERT INTO public.audit_logs (user_id, user_email, user_role, action, table_name, record_id, old_data, new_data, metadata)
  VALUES (auth.uid(), v_user_email, v_user_role, p_action, p_table_name, p_record_id, p_old_data, p_new_data, p_metadata)
  RETURNING id INTO v_log_id;
  RETURN v_log_id;
END;
$$;

REVOKE ALL ON FUNCTION public.log_action(text, text, text, jsonb, jsonb, jsonb) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.log_action(text, text, text, jsonb, jsonb, jsonb) TO authenticated;

-- ============================================================
-- PARTE 6: SUBSTITUIR POLICIES GENERICAS
-- ============================================================

-- EVENTS
DROP POLICY IF EXISTS "Read events" ON public.events;
DROP POLICY IF EXISTS "Insert events" ON public.events;
DROP POLICY IF EXISTS "Update events" ON public.events;
DROP POLICY IF EXISTS "Delete events" ON public.events;
CREATE POLICY "rbac_read_events" ON public.events FOR SELECT USING (public.has_permission('events.view'));
CREATE POLICY "rbac_insert_events" ON public.events FOR INSERT WITH CHECK (public.has_permission('events.edit'));
CREATE POLICY "rbac_update_events" ON public.events FOR UPDATE USING (public.has_permission('events.edit'));
CREATE POLICY "rbac_delete_events" ON public.events FOR DELETE USING (public.has_permission('events.delete') OR public.is_admin());

-- TASKS
DROP POLICY IF EXISTS "Read tasks" ON public.tasks;
DROP POLICY IF EXISTS "Manage tasks" ON public.tasks;
DROP POLICY IF EXISTS "Update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Delete tasks" ON public.tasks;
CREATE POLICY "rbac_read_tasks" ON public.tasks FOR SELECT USING (public.has_permission('events.view'));
CREATE POLICY "rbac_insert_tasks" ON public.tasks FOR INSERT WITH CHECK (public.has_permission('events.edit'));
CREATE POLICY "rbac_update_tasks" ON public.tasks FOR UPDATE USING (public.has_permission('events.edit') OR assigned_to = auth.uid());
CREATE POLICY "rbac_delete_tasks" ON public.tasks FOR DELETE USING (public.has_permission('events.edit') OR public.is_admin());

-- FINANCES
DROP POLICY IF EXISTS "Read finances" ON public.finances;
DROP POLICY IF EXISTS "Manage finances" ON public.finances;
DROP POLICY IF EXISTS "Update finances" ON public.finances;
DROP POLICY IF EXISTS "Delete finances" ON public.finances;
CREATE POLICY "rbac_read_finances" ON public.finances FOR SELECT USING (public.has_permission('finance.view'));
CREATE POLICY "rbac_insert_finances" ON public.finances FOR INSERT WITH CHECK (public.has_permission('finance.edit'));
CREATE POLICY "rbac_update_finances" ON public.finances FOR UPDATE USING (public.has_permission('finance.edit'));
CREATE POLICY "rbac_delete_finances" ON public.finances FOR DELETE USING (public.is_admin());

-- TEMPLATES
DROP POLICY IF EXISTS "Read templates" ON public.templates;
DROP POLICY IF EXISTS "Manage templates" ON public.templates;
DROP POLICY IF EXISTS "Update templates" ON public.templates;
DROP POLICY IF EXISTS "Delete templates" ON public.templates;
CREATE POLICY "rbac_read_templates" ON public.templates FOR SELECT USING (public.has_permission('templates.view'));
CREATE POLICY "rbac_insert_templates" ON public.templates FOR INSERT WITH CHECK (public.has_permission('templates.edit'));
CREATE POLICY "rbac_update_templates" ON public.templates FOR UPDATE USING (public.has_permission('templates.edit'));
CREATE POLICY "rbac_delete_templates" ON public.templates FOR DELETE USING (public.is_admin());

-- TEMPLATE_TASKS
DROP POLICY IF EXISTS "Read template_tasks" ON public.template_tasks;
DROP POLICY IF EXISTS "Manage template_tasks" ON public.template_tasks;
DROP POLICY IF EXISTS "Update template_tasks" ON public.template_tasks;
DROP POLICY IF EXISTS "Delete template_tasks" ON public.template_tasks;
CREATE POLICY "rbac_read_template_tasks" ON public.template_tasks FOR SELECT USING (public.has_permission('templates.view'));
CREATE POLICY "rbac_insert_template_tasks" ON public.template_tasks FOR INSERT WITH CHECK (public.has_permission('templates.edit'));
CREATE POLICY "rbac_update_template_tasks" ON public.template_tasks FOR UPDATE USING (public.has_permission('templates.edit'));
CREATE POLICY "rbac_delete_template_tasks" ON public.template_tasks FOR DELETE USING (public.has_permission('templates.edit'));

-- FINANCE_TEMPLATE_ITEMS
DROP POLICY IF EXISTS "Read finance_template_items" ON public.finance_template_items;
DROP POLICY IF EXISTS "Manage finance_template_items" ON public.finance_template_items;
DROP POLICY IF EXISTS "Update finance_template_items" ON public.finance_template_items;
DROP POLICY IF EXISTS "Delete finance_template_items" ON public.finance_template_items;
CREATE POLICY "rbac_read_finance_template_items" ON public.finance_template_items FOR SELECT USING (public.has_permission('finance.view'));
CREATE POLICY "rbac_insert_finance_template_items" ON public.finance_template_items FOR INSERT WITH CHECK (public.has_permission('finance.edit'));
CREATE POLICY "rbac_update_finance_template_items" ON public.finance_template_items FOR UPDATE USING (public.has_permission('finance.edit'));
CREATE POLICY "rbac_delete_finance_template_items" ON public.finance_template_items FOR DELETE USING (public.is_admin());

-- FEEDS
DROP POLICY IF EXISTS "Read feeds" ON public.feeds;
DROP POLICY IF EXISTS "Insert feeds" ON public.feeds;
DROP POLICY IF EXISTS "Update feeds" ON public.feeds;
DROP POLICY IF EXISTS "Delete feeds" ON public.feeds;
CREATE POLICY "rbac_read_feeds" ON public.feeds FOR SELECT USING (public.has_permission('dashboard.view'));
CREATE POLICY "rbac_insert_feeds" ON public.feeds FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "rbac_update_feeds" ON public.feeds FOR UPDATE USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "rbac_delete_feeds" ON public.feeds FOR DELETE USING (user_id = auth.uid() OR public.is_admin());

-- CHECKPOINTS
DROP POLICY IF EXISTS "Read checkpoints" ON public.checkpoints;
DROP POLICY IF EXISTS "Manage checkpoints" ON public.checkpoints;
DROP POLICY IF EXISTS "Update checkpoints" ON public.checkpoints;
DROP POLICY IF EXISTS "Delete checkpoints" ON public.checkpoints;
CREATE POLICY "rbac_read_checkpoints" ON public.checkpoints FOR SELECT USING (public.has_permission('events.view'));
CREATE POLICY "rbac_insert_checkpoints" ON public.checkpoints FOR INSERT WITH CHECK (public.has_permission('events.edit'));
CREATE POLICY "rbac_update_checkpoints" ON public.checkpoints FOR UPDATE USING (public.has_permission('events.edit'));
CREATE POLICY "rbac_delete_checkpoints" ON public.checkpoints FOR DELETE USING (public.is_admin());

-- CHECKPOINT_TEMPLATES
DROP POLICY IF EXISTS "Read checkpoint_templates" ON public.checkpoint_templates;
DROP POLICY IF EXISTS "Manage checkpoint_templates" ON public.checkpoint_templates;
DROP POLICY IF EXISTS "Update checkpoint_templates" ON public.checkpoint_templates;
DROP POLICY IF EXISTS "Delete checkpoint_templates" ON public.checkpoint_templates;
CREATE POLICY "rbac_read_checkpoint_templates" ON public.checkpoint_templates FOR SELECT USING (public.has_permission('templates.view'));
CREATE POLICY "rbac_insert_checkpoint_templates" ON public.checkpoint_templates FOR INSERT WITH CHECK (public.has_permission('templates.edit'));
CREATE POLICY "rbac_update_checkpoint_templates" ON public.checkpoint_templates FOR UPDATE USING (public.has_permission('templates.edit'));
CREATE POLICY "rbac_delete_checkpoint_templates" ON public.checkpoint_templates FOR DELETE USING (public.has_permission('templates.edit'));

-- PROFILES
DROP POLICY IF EXISTS "Users can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow insert profiles" ON public.profiles;
CREATE POLICY "rbac_read_profiles" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "rbac_update_own_profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "rbac_admin_update_profiles" ON public.profiles FOR UPDATE USING (public.is_admin());
CREATE POLICY "rbac_insert_profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- ACCESS_GROUPS
DROP POLICY IF EXISTS "Read access_groups" ON public.access_groups;
DROP POLICY IF EXISTS "Manage access_groups" ON public.access_groups;
DROP POLICY IF EXISTS "Update access_groups" ON public.access_groups;
DROP POLICY IF EXISTS "Delete access_groups" ON public.access_groups;
CREATE POLICY "rbac_read_access_groups" ON public.access_groups FOR SELECT USING (public.has_permission('team.view') OR public.is_admin());
CREATE POLICY "rbac_insert_access_groups" ON public.access_groups FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "rbac_update_access_groups" ON public.access_groups FOR UPDATE USING (public.is_admin());
CREATE POLICY "rbac_delete_access_groups" ON public.access_groups FOR DELETE USING (public.is_admin());

-- USER_ACCESS
DROP POLICY IF EXISTS "Read user_access" ON public.user_access;
DROP POLICY IF EXISTS "Manage user_access" ON public.user_access;
DROP POLICY IF EXISTS "Update user_access" ON public.user_access;
DROP POLICY IF EXISTS "Delete user_access" ON public.user_access;
CREATE POLICY "rbac_read_user_access" ON public.user_access FOR SELECT USING (user_id = auth.uid() OR public.has_permission('team.view') OR public.is_admin());
CREATE POLICY "rbac_insert_user_access" ON public.user_access FOR INSERT WITH CHECK (public.has_permission('team.invite') OR public.is_admin());
CREATE POLICY "rbac_update_user_access" ON public.user_access FOR UPDATE USING (public.has_permission('team.edit') OR public.is_admin());
CREATE POLICY "rbac_delete_user_access" ON public.user_access FOR DELETE USING (public.is_admin());

-- ============================================================
-- FIM DA MIGRATION V7
-- ============================================================
