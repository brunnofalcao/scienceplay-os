-- ============================================================
-- MIGRATION V8 — Coleções compartilhadas + backfill de datas
-- ============================================================
-- 1. Cria public.app_collections: armazenamento compartilhado (JSONB)
--    para os módulos que antes viviam em localStorage:
--    deals (Vendas), cs_students/cs_contacts/cs_tasks (CS),
--    dd_items (Due Diligence), fin_plans (Planos financeiros).
--    RLS por chave, espelhando o RBAC existente (has_permission).
-- 2. Habilita realtime para app_collections.
-- 3. finances: adiciona date_estimated e preenche date com a data
--    do evento nos lançamentos sem data (marcados como estimados).
-- ============================================================

-- 1. Tabela de coleções
CREATE TABLE IF NOT EXISTS public.app_collections (
  key text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now() NOT NULL,
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.app_collections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "rbac_read_app_collections" ON public.app_collections;
CREATE POLICY "rbac_read_app_collections" ON public.app_collections
  FOR SELECT USING (
    public.has_permission(
      CASE key
        WHEN 'deals' THEN 'vendas.view'
        WHEN 'cs_students' THEN 'cs.view'
        WHEN 'cs_contacts' THEN 'cs.view'
        WHEN 'cs_tasks' THEN 'cs.view'
        WHEN 'dd_items' THEN 'due_diligence.view'
        WHEN 'fin_plans' THEN 'finance.view'
        ELSE 'none.none'
      END
    )
  );

DROP POLICY IF EXISTS "rbac_insert_app_collections" ON public.app_collections;
CREATE POLICY "rbac_insert_app_collections" ON public.app_collections
  FOR INSERT WITH CHECK (
    public.has_permission(
      CASE key
        WHEN 'deals' THEN 'vendas.edit'
        WHEN 'cs_students' THEN 'cs.edit'
        WHEN 'cs_contacts' THEN 'cs.edit'
        WHEN 'cs_tasks' THEN 'cs.edit'
        WHEN 'dd_items' THEN 'due_diligence.edit'
        WHEN 'fin_plans' THEN 'finance.edit'
        ELSE 'none.none'
      END
    )
  );

DROP POLICY IF EXISTS "rbac_update_app_collections" ON public.app_collections;
CREATE POLICY "rbac_update_app_collections" ON public.app_collections
  FOR UPDATE USING (
    public.has_permission(
      CASE key
        WHEN 'deals' THEN 'vendas.edit'
        WHEN 'cs_students' THEN 'cs.edit'
        WHEN 'cs_contacts' THEN 'cs.edit'
        WHEN 'cs_tasks' THEN 'cs.edit'
        WHEN 'dd_items' THEN 'due_diligence.edit'
        WHEN 'fin_plans' THEN 'finance.edit'
        ELSE 'none.none'
      END
    )
  );

DROP POLICY IF EXISTS "rbac_delete_app_collections" ON public.app_collections;
CREATE POLICY "rbac_delete_app_collections" ON public.app_collections
  FOR DELETE USING (public.is_admin());

-- 2. Realtime
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.app_collections;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

-- 3. Backfill de datas em finances
ALTER TABLE public.finances ADD COLUMN IF NOT EXISTS date_estimated boolean DEFAULT false;

UPDATE public.finances f
SET date = e.event_date, date_estimated = true
FROM public.events e
WHERE f.event_id = e.id
  AND f.date IS NULL
  AND e.event_date IS NOT NULL;
