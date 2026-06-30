-- DIAGNÓSTICO V2: Verificar evento e tarefas

-- 1. Qual é o evento Golden? (confirmar que existe)
SELECT id, name, type, event_date
FROM public.events
WHERE name ILIKE '%Golden%' OR name ILIKE '%Natural%'
ORDER BY event_date;

-- 2. Quantas tarefas cada evento de imersão tem?
SELECT e.name, e.type, count(t.id) as total_tarefas
FROM public.events e
LEFT JOIN public.tasks t ON t.event_id = e.id
GROUP BY e.id, e.name, e.type
ORDER BY e.event_date;

-- 3. Existem tarefas DELEGADAS para alguém chamado Jaqueline ou Brunno?
SELECT t.id, t.title, t.phase_code, t.event_id, e.name as evento,
       p.name as delegado_para
FROM public.tasks t
LEFT JOIN public.profiles p ON p.id = t.assigned_to
LEFT JOIN public.events e ON e.id = t.event_id
WHERE p.name ILIKE '%jaquel%' OR p.name ILIKE '%brunno%'
ORDER BY e.name, t.phase_code;

-- 4. Listar TODOS os membros cadastrados (profiles)
SELECT id, name, email, role FROM public.profiles ORDER BY name;
