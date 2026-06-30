-- ============================================================
-- Science Play OS v5 — Migration
-- Adds operational command center columns, checkpoints system,
-- and updated views.
-- Safe to run multiple times (IF NOT EXISTS / DROP IF EXISTS).
-- ============================================================

-- ---------- 1. tasks — new columns ----------

ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS done_criteria text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS dependency text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS phase_code text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS area text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS task_status text NOT NULL DEFAULT 'pendente'
  CHECK (task_status IN ('pendente','em_andamento','concluida','bloqueada','atrasada'));
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS responsible_role text;

-- Update priority constraint to include 'critica'
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_priority_check;
ALTER TABLE public.tasks ADD CONSTRAINT tasks_priority_check
  CHECK (priority IN ('critica','alta','media','baixa'));


-- ---------- 2. template_tasks — new columns ----------

ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS done_criteria text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS dependency text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS phase_code text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS area text;
ALTER TABLE public.template_tasks ADD COLUMN IF NOT EXISTS responsible_role text;

-- Update priority constraint to include 'critica'
ALTER TABLE public.template_tasks DROP CONSTRAINT IF EXISTS template_tasks_priority_check;
ALTER TABLE public.template_tasks ADD CONSTRAINT template_tasks_priority_check
  CHECK (priority IN ('critica','alta','media','baixa'));


-- ---------- 3. events — KPI targets + template link ----------

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS target_inscricoes integer;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS target_receita numeric(12,2);
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS target_margem numeric(5,2);
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS target_nps integer;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS template_id uuid REFERENCES public.templates(id);


-- ---------- 4. checkpoints table (Go/No-Go) ----------

CREATE TABLE IF NOT EXISTS public.checkpoints (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  deadline_offset integer NOT NULL,          -- D-X relative to event_date
  criteria_go text NOT NULL,
  criteria_nogo text NOT NULL,
  decisor text,
  action_nogo text,
  status text DEFAULT 'pendente'
    CHECK (status IN ('pendente','go','nogo','adiado')),
  resolved_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.checkpoints ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoints' AND policyname = 'Read checkpoints'
  ) THEN
    CREATE POLICY "Read checkpoints" ON public.checkpoints
      FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoints' AND policyname = 'Manage checkpoints'
  ) THEN
    CREATE POLICY "Manage checkpoints" ON public.checkpoints
      FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoints' AND policyname = 'Update checkpoints'
  ) THEN
    CREATE POLICY "Update checkpoints" ON public.checkpoints
      FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoints' AND policyname = 'Delete checkpoints'
  ) THEN
    CREATE POLICY "Delete checkpoints" ON public.checkpoints
      FOR DELETE USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.checkpoints;

-- Index
CREATE INDEX IF NOT EXISTS idx_checkpoints_event ON public.checkpoints(event_id);


-- ---------- 5. checkpoint_templates table ----------

CREATE TABLE IF NOT EXISTS public.checkpoint_templates (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  template_id uuid REFERENCES public.templates(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  deadline_offset integer NOT NULL,
  criteria_go text NOT NULL,
  criteria_nogo text NOT NULL,
  decisor text,
  action_nogo text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.checkpoint_templates ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoint_templates' AND policyname = 'Read checkpoint_templates'
  ) THEN
    CREATE POLICY "Read checkpoint_templates" ON public.checkpoint_templates
      FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoint_templates' AND policyname = 'Manage checkpoint_templates'
  ) THEN
    CREATE POLICY "Manage checkpoint_templates" ON public.checkpoint_templates
      FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoint_templates' AND policyname = 'Update checkpoint_templates'
  ) THEN
    CREATE POLICY "Update checkpoint_templates" ON public.checkpoint_templates
      FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'checkpoint_templates' AND policyname = 'Delete checkpoint_templates'
  ) THEN
    CREATE POLICY "Delete checkpoint_templates" ON public.checkpoint_templates
      FOR DELETE USING (auth.role() = 'authenticated');
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_checkpoint_templates_template ON public.checkpoint_templates(template_id);


-- ---------- 6. Updated pending-tasks view ----------

DROP VIEW IF EXISTS public.v_tasks_pending;
CREATE OR REPLACE VIEW public.v_tasks_pending AS
SELECT
  t.id,
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
  e.name   AS event_name,
  e.event_date,
  p.name   AS assigned_name
FROM public.tasks t
JOIN public.events e ON e.id = t.event_id
LEFT JOIN public.profiles p ON p.id = t.assigned_to
WHERE t.done = false
ORDER BY t.due_date ASC NULLS LAST;


-- ============================================================
-- Migration v5 complete.
-- ============================================================
