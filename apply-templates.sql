-- ============================================================
-- APLICAR TEMPLATES POP NOS EVENTOS EXISTENTES
-- Cada evento recebe as tarefas do template correspondente ao seu tipo
-- Execute no Supabase SQL Editor
-- ============================================================

-- Limpar tarefas existentes (só as auto-geradas, sem assigned_to)
delete from public.tasks where assigned_to is null;

-- Aplicar template de IMERSAO em todos os eventos tipo imersao
insert into public.tasks (event_id, title, department, phase, priority, day_offset, due_date, done)
select
  e.id,
  tt.title,
  tt.department,
  tt.phase,
  tt.priority,
  tt.day_offset,
  case when e.event_date is not null and tt.day_offset is not null
    then e.event_date + (tt.day_offset || ' days')::interval
    else null end,
  false
from public.events e
join public.templates t on t.event_type = e.type
join public.template_tasks tt on tt.template_id = t.id
where e.type = 'imersao';

-- Aplicar template de CONGRESSO
insert into public.tasks (event_id, title, department, phase, priority, day_offset, due_date, done)
select
  e.id,
  tt.title,
  tt.department,
  tt.phase,
  tt.priority,
  tt.day_offset,
  case when e.event_date is not null and tt.day_offset is not null
    then e.event_date + (tt.day_offset || ' days')::interval
    else null end,
  false
from public.events e
join public.templates t on t.event_type = e.type
join public.template_tasks tt on tt.template_id = t.id
where e.type = 'congresso';

-- Aplicar template de MENTORIA
insert into public.tasks (event_id, title, department, phase, priority, day_offset, due_date, done)
select
  e.id,
  tt.title,
  tt.department,
  tt.phase,
  tt.priority,
  tt.day_offset,
  case when e.event_date is not null and tt.day_offset is not null
    then e.event_date + (tt.day_offset || ' days')::interval
    else null end,
  false
from public.events e
join public.templates t on t.event_type = e.type
join public.template_tasks tt on tt.template_id = t.id
where e.type = 'mentoria';

-- Aplicar template de CERTIFICACAO
insert into public.tasks (event_id, title, department, phase, priority, day_offset, due_date, done)
select
  e.id,
  tt.title,
  tt.department,
  tt.phase,
  tt.priority,
  tt.day_offset,
  case when e.event_date is not null and tt.day_offset is not null
    then e.event_date + (tt.day_offset || ' days')::interval
    else null end,
  false
from public.events e
join public.templates t on t.event_type = e.type
join public.template_tasks tt on tt.template_id = t.id
where e.type = 'certificacao';

-- Verificar quantas tarefas foram criadas
select e.name, e.type, count(t.id) as total_tarefas
from public.events e
left join public.tasks t on t.event_id = e.id
group by e.id, e.name, e.type
order by e.type, e.name;
