-- ============================================================
-- MIGRATION V10 — Storage de documentos + lições de pós-mortem
-- ============================================================
-- 1. Bucket privado 'event-docs' para propostas/contratos/NFs do POP,
--    com policies por permissão (event.documents.view/edit).
-- 2. Tabela pop_lessons: lições aprendidas do pós-mortem que alimentam
--    novas versões do Template Mestre.
-- Idempotente.
-- ============================================================

-- 1. Bucket privado
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-docs', 'event-docs', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "eventdocs_read" ON storage.objects;
CREATE POLICY "eventdocs_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-docs' AND public.has_permission('event.documents.view'));
DROP POLICY IF EXISTS "eventdocs_insert" ON storage.objects;
CREATE POLICY "eventdocs_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'event-docs' AND public.has_permission('event.documents.edit'));
DROP POLICY IF EXISTS "eventdocs_delete" ON storage.objects;
CREATE POLICY "eventdocs_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'event-docs' AND public.has_permission('event.documents.edit'));

-- 2. Lições aprendidas (pós-mortem → evolução do POP)
CREATE TABLE IF NOT EXISTS public.pop_lessons (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  lesson text NOT NULL,
  proposal text,
  status text NOT NULL DEFAULT 'registrada',
  created_by uuid,
  created_at timestamptz DEFAULT now()
);
DO $$ BEGIN
  ALTER TABLE public.pop_lessons ADD CONSTRAINT pop_lessons_status_chk CHECK (status IN ('registrada','aprovada','aplicada','descartada'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.pop_lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rbac_read_pop_lessons" ON public.pop_lessons;
CREATE POLICY "rbac_read_pop_lessons" ON public.pop_lessons
  FOR SELECT USING (public.has_permission('pop.view'));
DROP POLICY IF EXISTS "rbac_write_pop_lessons" ON public.pop_lessons;
CREATE POLICY "rbac_write_pop_lessons" ON public.pop_lessons
  FOR ALL USING (public.has_permission('pop.edit') OR public.has_permission('pop.approve'))
  WITH CHECK (public.has_permission('pop.edit') OR public.has_permission('pop.approve'));
DROP POLICY IF EXISTS "rbac_delete_pop_lessons" ON public.pop_lessons;
CREATE POLICY "rbac_delete_pop_lessons" ON public.pop_lessons
  FOR DELETE USING (public.is_admin());
