-- ============================================================
-- Science Play OS v6 — DRE Detalhado
-- Adiciona estrutura de orçamento item-a-item com status
-- (estimado / orcado / pago) e templates de DRE.
-- Idempotente — pode rodar múltiplas vezes.
-- ============================================================

-- ---------- 1. finances — novas colunas ----------

ALTER TABLE public.finances ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'estimado'
  CHECK (payment_status IN ('estimado','orcado','pago'));

ALTER TABLE public.finances ADD COLUMN IF NOT EXISTS section text;
ALTER TABLE public.finances ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1;
ALTER TABLE public.finances ADD COLUMN IF NOT EXISTS unit_price numeric(12,2);
ALTER TABLE public.finances ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE public.finances ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;


-- ---------- 2. finance_template_items ----------

CREATE TABLE IF NOT EXISTS public.finance_template_items (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  template_id uuid REFERENCES public.templates(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('receita','custo')),
  section text NOT NULL,
  description text NOT NULL,
  default_quantity integer DEFAULT 1,
  default_unit_price numeric(12,2) DEFAULT 0,
  default_amount numeric(12,2) DEFAULT 0,
  notes text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.finance_template_items ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'finance_template_items' AND policyname = 'Read finance_template_items'
  ) THEN
    CREATE POLICY "Read finance_template_items" ON public.finance_template_items
      FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'finance_template_items' AND policyname = 'Manage finance_template_items'
  ) THEN
    CREATE POLICY "Manage finance_template_items" ON public.finance_template_items
      FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'finance_template_items' AND policyname = 'Update finance_template_items'
  ) THEN
    CREATE POLICY "Update finance_template_items" ON public.finance_template_items
      FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'finance_template_items' AND policyname = 'Delete finance_template_items'
  ) THEN
    CREATE POLICY "Delete finance_template_items" ON public.finance_template_items
      FOR DELETE USING (auth.role() = 'authenticated');
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_finance_template_items_template ON public.finance_template_items(template_id);


-- ---------- 3. Atualizar view DRE ----------

DROP VIEW IF EXISTS public.v_dre_summary;
CREATE OR REPLACE VIEW public.v_dre_summary AS
SELECT
  e.id as event_id,
  e.name as event_name,
  e.event_date,
  e.type,
  -- Totais estimados (tudo)
  coalesce(r.total, 0) as receita_estimada,
  coalesce(c.total, 0) as custo_estimado,
  coalesce(r.total, 0) - coalesce(c.total, 0) as resultado_estimado,
  -- Totais oficiais (só pago)
  coalesce(r_pago.total, 0) as receita_oficial,
  coalesce(c_pago.total, 0) as custo_oficial,
  coalesce(r_pago.total, 0) - coalesce(c_pago.total, 0) as resultado_oficial,
  -- Margem
  case when coalesce(r.total, 0) > 0
    then round(((coalesce(r.total, 0) - coalesce(c.total, 0)) / coalesce(r.total, 0)) * 100, 1)
    else 0 end as margem_estimada,
  case when coalesce(r_pago.total, 0) > 0
    then round(((coalesce(r_pago.total, 0) - coalesce(c_pago.total, 0)) / coalesce(r_pago.total, 0)) * 100, 1)
    else 0 end as margem_oficial
FROM public.events e
LEFT JOIN lateral (
  SELECT sum(amount) as total FROM public.finances WHERE event_id = e.id AND type = 'receita'
) r ON true
LEFT JOIN lateral (
  SELECT sum(amount) as total FROM public.finances WHERE event_id = e.id AND type = 'custo'
) c ON true
LEFT JOIN lateral (
  SELECT sum(amount) as total FROM public.finances WHERE event_id = e.id AND type = 'receita' AND payment_status = 'pago'
) r_pago ON true
LEFT JOIN lateral (
  SELECT sum(amount) as total FROM public.finances WHERE event_id = e.id AND type = 'custo' AND payment_status = 'pago'
) c_pago ON true;


-- ---------- 4. Índices ----------

CREATE INDEX IF NOT EXISTS idx_finances_section ON public.finances(section);
CREATE INDEX IF NOT EXISTS idx_finances_payment_status ON public.finances(payment_status);


-- ---------- 5. Atualizar dados existentes (setar payment_status = 'pago' em tudo que já existe) ----------

UPDATE public.finances SET payment_status = 'pago' WHERE payment_status = 'estimado' AND amount > 0;


-- ============================================================
-- Migration v6 DRE completa.
-- ============================================================
