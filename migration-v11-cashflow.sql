-- ============================================================
-- MIGRATION V11 — Módulo de Caixa (contas a pagar/receber)
-- ============================================================
-- Modelo consolidado por padrão (uma conta 'Caixa Consolidado'), mas a
-- tabela suporta múltiplas contas se no futuro quiser separar por banco.
-- Reusa as permissões finance.view / finance.edit (RBAC existente).
-- Distinção importante: `finances` é o DRE (competência/reconhecimento);
-- este módulo é FLUXO DE CAIXA (movimento real de dinheiro no tempo).
-- Idempotente.
-- ============================================================

-- 1. Contas de caixa (saldo inicial dá o lastro do Runway)
CREATE TABLE IF NOT EXISTS public.cash_accounts (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL DEFAULT 'Caixa Consolidado',
  opening_balance numeric(14,2) NOT NULL DEFAULT 0,
  opening_date date,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Contas a pagar
CREATE TABLE IF NOT EXISTS public.payables (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  account_id uuid REFERENCES public.cash_accounts(id) ON DELETE SET NULL,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE SET NULL,
  description text NOT NULL,
  category text,
  amount numeric(14,2) NOT NULL,
  due_date date,
  paid_date date,
  status text NOT NULL DEFAULT 'a_pagar',
  notes text,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);
DO $$ BEGIN
  ALTER TABLE public.payables ADD CONSTRAINT payables_status_chk CHECK (status IN ('previsto','a_pagar','pago','cancelado'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS idx_payables_status ON public.payables(status);
CREATE INDEX IF NOT EXISTS idx_payables_event ON public.payables(event_id);

-- 3. Contas a receber
CREATE TABLE IF NOT EXISTS public.receivables (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  account_id uuid REFERENCES public.cash_accounts(id) ON DELETE SET NULL,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  payer text,
  description text NOT NULL,
  category text,
  amount numeric(14,2) NOT NULL,
  due_date date,
  received_date date,
  status text NOT NULL DEFAULT 'a_receber',
  notes text,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);
DO $$ BEGIN
  ALTER TABLE public.receivables ADD CONSTRAINT receivables_status_chk CHECK (status IN ('previsto','a_receber','recebido','cancelado'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS idx_receivables_status ON public.receivables(status);
CREATE INDEX IF NOT EXISTS idx_receivables_event ON public.receivables(event_id);

-- 4. RLS (reusa finance.view / finance.edit)
ALTER TABLE public.cash_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receivables ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['cash_accounts','payables','receivables'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "rbac_read_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_read_%s" ON public.%I FOR SELECT USING (public.has_permission(''finance.view''))', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "rbac_write_%s" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "rbac_write_%s" ON public.%I FOR ALL USING (public.has_permission(''finance.edit'')) WITH CHECK (public.has_permission(''finance.edit''))', t, t);
  END LOOP;
END $$;

-- 5. Realtime
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cash_accounts; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.payables; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.receivables; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
