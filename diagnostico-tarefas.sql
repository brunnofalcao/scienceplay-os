-- ============================================================
-- DIAGNÓSTICO: Tarefas desaparecidas na Imersão Golden Naturaltech
-- ============================================================

-- 1. Ver TODAS as tarefas do evento Golden Naturaltech (incluindo possíveis órfãs)
SELECT t.id, t.title, t.phase_code, t.day_offset, t.due_date,
       t.assigned_to, t.task_status, t.done, t.area, t.priority,
       p.name as assigned_name,
       t.created_at
FROM public.tasks t
LEFT JOIN public.profiles p ON p.id = t.assigned_to
WHERE t.event_id = (
  SELECT id FROM public.events WHERE name ILIKE '%Golden%Natural%' LIMIT 1
)
ORDER BY t.phase_code, t.sort_order, t.created_at;

-- 2. Contar tarefas por fase para esse evento
SELECT
  COALESCE(t.phase_code, 'SEM FASE') as fase,
  count(*) as total,
  count(t.assigned_to) as delegadas,
  count(*) - count(t.assigned_to) as sem_responsavel
FROM public.tasks t
WHERE t.event_id = (
  SELECT id FROM public.events WHERE name ILIKE '%Golden%Natural%' LIMIT 1
)
GROUP BY t.phase_code
ORDER BY t.phase_code;

-- 3. Ver se há tarefas com phase_code NULL (pode ser o bug)
SELECT t.id, t.title, t.phase_code, t.day_offset, t.due_date, t.assigned_to,
       p.name as assigned_name
FROM public.tasks t
LEFT JOIN public.profiles p ON p.id = t.assigned_to
WHERE t.event_id = (
  SELECT id FROM public.events WHERE name ILIKE '%Golden%Natural%' LIMIT 1
)
  AND (t.phase_code IS NULL OR t.phase_code = '');

-- 4. Ver todas as tarefas delegadas (assigned) para este evento
SELECT t.id, t.title, t.phase_code, t.day_offset, t.due_date,
       p.name as delegado_para, t.task_status
FROM public.tasks t
LEFT JOIN public.profiles p ON p.id = t.assigned_to
WHERE t.event_id = (
  SELECT id FROM public.events WHERE name ILIKE '%Golden%Natural%' LIMIT 1
)
  AND t.assigned_to IS NOT NULL;

-- 5. Ver se houve deleção recente de tarefas (se audit log existir)
-- Se não tiver audit, verificar pelo total geral
SELECT e.name, count(t.id) as total_tarefas
FROM public.events e
LEFT JOIN public.tasks t ON t.event_id = e.id
WHERE e.type = 'imersao'
GROUP BY e.id, e.name
ORDER BY e.event_date;

-- 6. CORREÇÃO: Se tarefas existem mas com phase_code NULL, restaurar para F0
-- (DESCOMENTE PARA EXECUTAR)
-- UPDATE public.tasks
-- SET phase_code = 'F0'
-- WHERE event_id = (SELECT id FROM public.events WHERE name ILIKE '%Golden%Natural%' LIMIT 1)
--   AND phase_code IS NULL
--   AND day_offset IS NULL;
