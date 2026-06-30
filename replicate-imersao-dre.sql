-- ============================================================
-- Replicar DRE de Balneário Camboriú para outras Imersões
-- + Atualizar dados existentes para usar o campo 'section'
-- ============================================================

-- 1. Primeiro: atualizar os itens de BC existentes para ter 'section' preenchido
UPDATE public.finances SET section = category WHERE section IS NULL AND category IS NOT NULL;

-- 2. Replicar itens de Balneário Camboriú para TODAS as imersões que ainda não têm DRE
DO $$
DECLARE
  v_bc_id uuid;
  v_target record;
  v_count integer;
  v_item record;
BEGIN
  -- Encontrar BC
  SELECT id INTO v_bc_id FROM public.events
  WHERE name ILIKE '%balneário%' OR name ILIKE '%camboriú%' OR name ILIKE '%BC%'
  LIMIT 1;

  IF v_bc_id IS NULL THEN
    RAISE NOTICE 'Evento BC nao encontrado.';
    RETURN;
  END IF;

  -- Para cada evento tipo imersão que NÃO é o BC e NÃO é NB Brasília
  FOR v_target IN
    SELECT id, name FROM public.events
    WHERE type = 'imersao'
      AND id != v_bc_id
      AND name NOT ILIKE '%bras%lia%'
  LOOP
    -- Verificar se já tem itens financeiros
    SELECT count(*) INTO v_count FROM public.finances WHERE event_id = v_target.id;

    IF v_count = 0 THEN
      -- Copiar todos os itens do BC como 'estimado'
      INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, notes, sort_order)
      SELECT v_target.id, f.type, f.section, f.category, f.description,
             f.quantity, f.unit_price, f.amount,
             'estimado', -- sempre estimado na réplica
             'Replicado de ' || (SELECT name FROM public.events WHERE id = v_bc_id),
             f.sort_order
      FROM public.finances f
      WHERE f.event_id = v_bc_id;

      RAISE NOTICE 'Replicado DRE de BC para: %', v_target.name;
    ELSE
      RAISE NOTICE 'Evento % ja tem % itens financeiros. Pulando.', v_target.name, v_count;
    END IF;
  END LOOP;
END $$;

-- 3. Verificar resultado
SELECT e.name, e.type,
  count(f.id) as total_itens,
  sum(case when f.type = 'receita' then f.amount else 0 end) as receita,
  sum(case when f.type = 'custo' then f.amount else 0 end) as custo
FROM public.events e
LEFT JOIN public.finances f ON f.event_id = e.id
WHERE e.type = 'imersao' OR e.name ILIKE '%imers%'
GROUP BY e.id, e.name, e.type
ORDER BY e.event_date;
