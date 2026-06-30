-- ============================================================
-- SCIENCE PLAY OS v4 — SUPABASE SCHEMA
-- Execute no SQL Editor do Supabase (supabase.com/dashboard)
-- IMPORTANTE: Execute em ordem. Se ja tiver schema antigo,
-- faca backup e drop das tabelas antigas antes.
-- ============================================================

-- 0. EXTENSOES
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. PROFILES (vinculada ao auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text,
  role text not null default 'member' check (role in ('admin','member')),
  department text,
  avatar_url text,
  created_at timestamptz default now()
);

-- ============================================================
-- 2. EVENTS (eventos + produtos digitais)
-- ============================================================
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null check (type in ('congresso','imersao','mentoria','certificacao')),
  status text not null default 'planejamento' check (status in ('planejamento','ativo','execucao','pos-evento','encerrado')),
  event_date date,
  end_date date,
  description text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- ============================================================
-- 3. TASKS (tarefas por evento, com day_offset e fase)
-- ============================================================
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade not null,
  title text not null,
  department text,
  phase text,
  priority text default 'media' check (priority in ('alta','media','baixa')),
  due_date date,
  day_offset integer,
  assigned_to uuid references public.profiles(id),
  done boolean default false,
  completed_at timestamptz,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- 4. FINANCES (receitas e custos unificados)
-- ============================================================
create table public.finances (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade not null,
  type text not null check (type in ('receita','custo')),
  amount numeric(12,2) not null,
  category text,
  description text,
  date date,
  created_at timestamptz default now()
);

-- ============================================================
-- 5. FEEDS (mural/comunicacao do time)
-- ============================================================
create table public.feeds (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id),
  content text not null,
  type text default 'update' check (type in ('update','alerta','decisao','bloqueio','celebracao')),
  created_at timestamptz default now()
);

-- ============================================================
-- 6. TEMPLATES (modelos POP)
-- ============================================================
create table public.templates (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  event_type text not null check (event_type in ('congresso','imersao','mentoria','certificacao')),
  description text,
  created_at timestamptz default now()
);

-- ============================================================
-- 7. TEMPLATE_TASKS (tarefas modelo de cada template)
-- ============================================================
create table public.template_tasks (
  id uuid default uuid_generate_v4() primary key,
  template_id uuid references public.templates(id) on delete cascade not null,
  title text not null,
  phase text,
  day_offset integer,
  department text,
  priority text default 'media' check (priority in ('alta','media','baixa')),
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- 8. ACCESS_GROUPS (grupos customizaveis de acesso)
-- ============================================================
create table public.access_groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_at timestamptz default now()
);

-- ============================================================
-- 9. USER_ACCESS (permissao usuario <-> grupo/evento)
-- ============================================================
create table public.user_access (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  access_type text not null default 'all' check (access_type in ('all','group','event')),
  group_id uuid references public.access_groups(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.tasks enable row level security;
alter table public.finances enable row level security;
alter table public.feeds enable row level security;
alter table public.templates enable row level security;
alter table public.template_tasks enable row level security;
alter table public.access_groups enable row level security;
alter table public.user_access enable row level security;

-- Profiles
create policy "Users can read all profiles" on public.profiles for select using (auth.role() = 'authenticated');
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Allow insert profiles" on public.profiles for insert with check (true);

-- Events
create policy "Read events" on public.events for select using (auth.role() = 'authenticated');
create policy "Insert events" on public.events for insert with check (auth.role() = 'authenticated');
create policy "Update events" on public.events for update using (auth.role() = 'authenticated');
create policy "Delete events" on public.events for delete using (auth.role() = 'authenticated');

-- Tasks
create policy "Read tasks" on public.tasks for select using (auth.role() = 'authenticated');
create policy "Manage tasks" on public.tasks for insert with check (auth.role() = 'authenticated');
create policy "Update tasks" on public.tasks for update using (auth.role() = 'authenticated');
create policy "Delete tasks" on public.tasks for delete using (auth.role() = 'authenticated');

-- Finances
create policy "Read finances" on public.finances for select using (auth.role() = 'authenticated');
create policy "Manage finances" on public.finances for insert with check (auth.role() = 'authenticated');
create policy "Update finances" on public.finances for update using (auth.role() = 'authenticated');
create policy "Delete finances" on public.finances for delete using (auth.role() = 'authenticated');

-- Feeds
create policy "Read feeds" on public.feeds for select using (auth.role() = 'authenticated');
create policy "Insert feeds" on public.feeds for insert with check (auth.role() = 'authenticated');
create policy "Update feeds" on public.feeds for update using (auth.role() = 'authenticated');
create policy "Delete feeds" on public.feeds for delete using (auth.role() = 'authenticated');

-- Templates
create policy "Read templates" on public.templates for select using (auth.role() = 'authenticated');
create policy "Manage templates" on public.templates for insert with check (auth.role() = 'authenticated');
create policy "Update templates" on public.templates for update using (auth.role() = 'authenticated');
create policy "Delete templates" on public.templates for delete using (auth.role() = 'authenticated');

-- Template Tasks
create policy "Read template_tasks" on public.template_tasks for select using (auth.role() = 'authenticated');
create policy "Manage template_tasks" on public.template_tasks for insert with check (auth.role() = 'authenticated');
create policy "Update template_tasks" on public.template_tasks for update using (auth.role() = 'authenticated');
create policy "Delete template_tasks" on public.template_tasks for delete using (auth.role() = 'authenticated');

-- Access Groups
create policy "Read access_groups" on public.access_groups for select using (auth.role() = 'authenticated');
create policy "Manage access_groups" on public.access_groups for insert with check (auth.role() = 'authenticated');
create policy "Update access_groups" on public.access_groups for update using (auth.role() = 'authenticated');
create policy "Delete access_groups" on public.access_groups for delete using (auth.role() = 'authenticated');

-- User Access
create policy "Read user_access" on public.user_access for select using (auth.role() = 'authenticated');
create policy "Manage user_access" on public.user_access for insert with check (auth.role() = 'authenticated');
create policy "Update user_access" on public.user_access for update using (auth.role() = 'authenticated');
create policy "Delete user_access" on public.user_access for delete using (auth.role() = 'authenticated');

-- ============================================================
-- REALTIME (sync instantaneo)
-- ============================================================

alter publication supabase_realtime add table public.events;
alter publication supabase_realtime add table public.tasks;
alter publication supabase_realtime add table public.finances;
alter publication supabase_realtime add table public.feeds;

-- ============================================================
-- TRIGGER: criar perfil automaticamente apos signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'member')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- VIEWS UTEIS
-- ============================================================

-- DRE resumido por evento
create or replace view public.v_dre_summary as
select
  e.id as event_id,
  e.name as event_name,
  e.event_date,
  e.type,
  coalesce(r.total, 0) as receita_total,
  coalesce(c.total, 0) as custo_total,
  coalesce(r.total, 0) - coalesce(c.total, 0) as resultado,
  case when coalesce(r.total, 0) > 0
    then round(((coalesce(r.total, 0) - coalesce(c.total, 0)) / coalesce(r.total, 0)) * 100, 1)
    else 0 end as margem_pct
from public.events e
left join lateral (
  select sum(amount) as total from public.finances where event_id = e.id and type = 'receita'
) r on true
left join lateral (
  select sum(amount) as total from public.finances where event_id = e.id and type = 'custo'
) c on true;

-- Tasks pendentes com nomes
create or replace view public.v_tasks_pending as
select
  t.id, t.title, t.due_date, t.priority, t.department, t.phase, t.day_offset,
  e.name as event_name,
  p.name as assigned_name
from public.tasks t
join public.events e on e.id = t.event_id
left join public.profiles p on p.id = t.assigned_to
where t.done = false
order by t.due_date asc nulls last;

-- ============================================================
-- INDICES PARA PERFORMANCE
-- ============================================================

create index idx_tasks_event on public.tasks(event_id);
create index idx_tasks_assigned on public.tasks(assigned_to);
create index idx_tasks_done on public.tasks(done);
create index idx_finances_event on public.finances(event_id);
create index idx_finances_type on public.finances(type);
create index idx_feeds_event on public.feeds(event_id);
create index idx_feeds_created on public.feeds(created_at desc);
create index idx_template_tasks_template on public.template_tasks(template_id);
create index idx_user_access_user on public.user_access(user_id);
create index idx_events_status on public.events(status);
create index idx_events_type on public.events(type);
