-- ============================================================
-- Science Play OS v5 — Apply Templates to Existing Events
--
-- This script applies the correct template to each event based
-- on its type, but ONLY if the event has fewer than 10 tasks
-- (i.e., hasn't been populated yet or was partially seeded).
--
-- Template mapping:
--   mentoria  → "Mentoria / Imersão Premium"  (b0000000-0000-4000-8000-000000000002)
--   imersao   → "Imersão Nutrição Brasil"      (a0000000-0000-4000-8000-000000000001)
--   congresso → "Imersão Nutrição Brasil"      (a0000000-0000-4000-8000-000000000001)
--
-- Safe to re-run: only inserts into events with <10 tasks and
-- <1 checkpoint. Uses event_date + day_offset to calculate due_date.
-- ============================================================

BEGIN;


-- ============================================================
-- 1. MENTORIA EVENTS → Mentoria / Imersão Premium template
-- ============================================================

-- 1a. Insert tasks from template into mentoria events with <10 tasks
INSERT INTO public.tasks (
  event_id, title, description, department, phase, phase_code,
  area, priority, day_offset, done_criteria, dependency,
  responsible_role, task_status, done, sort_order, due_date
)
SELECT
  e.id,
  tt.title, tt.description, tt.department, tt.phase, tt.phase_code,
  tt.area, tt.priority, tt.day_offset,
  tt.done_criteria, tt.dependency, tt.responsible_role,
  'pendente', false, tt.sort_order,
  e.event_date + (tt.day_offset || ' days')::interval
FROM public.template_tasks tt
CROSS JOIN public.events e
WHERE tt.template_id = 'b0000000-0000-4000-8000-000000000002'
  AND e.type = 'mentoria'
  AND (SELECT count(*) FROM public.tasks WHERE event_id = e.id) < 10;

-- 1b. Insert checkpoints for mentoria events with 0 checkpoints
INSERT INTO public.checkpoints (
  event_id, name, deadline_offset, criteria_go, criteria_nogo,
  decisor, action_nogo, status
)
SELECT
  e.id,
  ct.name, ct.deadline_offset, ct.criteria_go, ct.criteria_nogo,
  ct.decisor, ct.action_nogo,
  'pendente'
FROM public.checkpoint_templates ct
CROSS JOIN public.events e
WHERE ct.template_id = 'b0000000-0000-4000-8000-000000000002'
  AND e.type = 'mentoria'
  AND (SELECT count(*) FROM public.checkpoints WHERE event_id = e.id) = 0;

-- 1c. Link mentoria events to their template
UPDATE public.events
SET template_id = 'b0000000-0000-4000-8000-000000000002'
WHERE type = 'mentoria'
  AND template_id IS NULL;


-- ============================================================
-- 2. IMERSÃO EVENTS → Imersão Nutrição Brasil template
-- ============================================================

-- 2a. Insert tasks from template into imersao events with <10 tasks
INSERT INTO public.tasks (
  event_id, title, description, department, phase, phase_code,
  area, priority, day_offset, done_criteria, dependency,
  responsible_role, task_status, done, sort_order, due_date
)
SELECT
  e.id,
  tt.title, tt.description, tt.department, tt.phase, tt.phase_code,
  tt.area, tt.priority, tt.day_offset,
  tt.done_criteria, tt.dependency, tt.responsible_role,
  'pendente', false, tt.sort_order,
  e.event_date + (tt.day_offset || ' days')::interval
FROM public.template_tasks tt
CROSS JOIN public.events e
WHERE tt.template_id = 'a0000000-0000-4000-8000-000000000001'
  AND e.type = 'imersao'
  AND (SELECT count(*) FROM public.tasks WHERE event_id = e.id) < 10;

-- 2b. Insert checkpoints for imersao events with 0 checkpoints
INSERT INTO public.checkpoints (
  event_id, name, deadline_offset, criteria_go, criteria_nogo,
  decisor, action_nogo, status
)
SELECT
  e.id,
  ct.name, ct.deadline_offset, ct.criteria_go, ct.criteria_nogo,
  ct.decisor, ct.action_nogo,
  'pendente'
FROM public.checkpoint_templates ct
CROSS JOIN public.events e
WHERE ct.template_id = 'a0000000-0000-4000-8000-000000000001'
  AND e.type = 'imersao'
  AND (SELECT count(*) FROM public.checkpoints WHERE event_id = e.id) = 0;

-- 2c. Link imersao events to their template
UPDATE public.events
SET template_id = 'a0000000-0000-4000-8000-000000000001'
WHERE type = 'imersao'
  AND template_id IS NULL;


-- ============================================================
-- 3. CONGRESSO EVENTS → Imersão Nutrição Brasil template
--    (congresso uses the same operational structure as imersão)
-- ============================================================

-- 3a. Insert tasks from template into congresso events with <10 tasks
INSERT INTO public.tasks (
  event_id, title, description, department, phase, phase_code,
  area, priority, day_offset, done_criteria, dependency,
  responsible_role, task_status, done, sort_order, due_date
)
SELECT
  e.id,
  tt.title, tt.description, tt.department, tt.phase, tt.phase_code,
  tt.area, tt.priority, tt.day_offset,
  tt.done_criteria, tt.dependency, tt.responsible_role,
  'pendente', false, tt.sort_order,
  e.event_date + (tt.day_offset || ' days')::interval
FROM public.template_tasks tt
CROSS JOIN public.events e
WHERE tt.template_id = 'a0000000-0000-4000-8000-000000000001'
  AND e.type = 'congresso'
  AND (SELECT count(*) FROM public.tasks WHERE event_id = e.id) < 10;

-- 3b. Insert checkpoints for congresso events with 0 checkpoints
INSERT INTO public.checkpoints (
  event_id, name, deadline_offset, criteria_go, criteria_nogo,
  decisor, action_nogo, status
)
SELECT
  e.id,
  ct.name, ct.deadline_offset, ct.criteria_go, ct.criteria_nogo,
  ct.decisor, ct.action_nogo,
  'pendente'
FROM public.checkpoint_templates ct
CROSS JOIN public.events e
WHERE ct.template_id = 'a0000000-0000-4000-8000-000000000001'
  AND e.type = 'congresso'
  AND (SELECT count(*) FROM public.checkpoints WHERE event_id = e.id) = 0;

-- 3c. Link congresso events to their template (uses imersão template)
UPDATE public.events
SET template_id = 'a0000000-0000-4000-8000-000000000001'
WHERE type = 'congresso'
  AND template_id IS NULL;


COMMIT;

-- ============================================================
-- Apply complete.
-- Events with <10 tasks now have full task sets from their template.
-- Events with 0 checkpoints now have Go/No-Go checkpoints.
-- All events are linked to their template via template_id.
--
-- due_date calculation: event_date + day_offset
--   day_offset is negative for pre-event tasks (e.g., -90 = 90 days before)
--   day_offset is positive for post-event tasks (e.g., +7 = 7 days after)
--   day_offset = 0 for D-Day tasks
-- ============================================================
