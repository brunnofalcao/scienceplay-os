-- ============================================================
-- IMPORTAR DRE DOS 3 EVENTOS (Planilhas Excel)
-- Execute no Supabase SQL Editor
-- IMPORTANTE: Primeiro identifique os IDs dos eventos abaixo
-- ============================================================

-- 1. Descobrir IDs dos eventos
-- SELECT id, name FROM public.events WHERE name ILIKE '%nutri%' OR name ILIKE '%palestre%';

-- ============================================================
-- NUTRIÇÃO BRASIL — BALNEÁRIO CAMBORIÚ
-- Receita Total: R$ 109.185,60
-- Custos Detalhados: R$ ~34.579 (estimado das linhas)
-- ============================================================

-- Substitua 'EVENT_ID_NB_BC' pelo UUID real do evento
DO $$
DECLARE
  ev_id uuid;
BEGIN
  SELECT id INTO ev_id FROM public.events WHERE name ILIKE '%balneário%' OR name ILIKE '%camboriú%' OR name ILIKE '%BC%' LIMIT 1;
  IF ev_id IS NULL THEN
    RAISE NOTICE 'Evento NB BC não encontrado. Criando...';
    INSERT INTO public.events (name, type, status, event_date, description)
    VALUES ('Nutrição Brasil — Balneário Camboriú', 'congresso', 'pos-evento', '2026-03-26', 'Evento Nutrição Brasil em Balneário Camboriú - Março 2026')
    RETURNING id INTO ev_id;
  END IF;

  -- Limpar finances anteriores deste evento (caso re-importe)
  DELETE FROM public.finances WHERE event_id = ev_id;

  -- RECEITAS
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'receita', 72685.60, 'Ingressos', 'Ingressos — Total vendido', '2026-03-26'),
  (ev_id, 'receita', 20000.00, 'Patrocínio', 'Rousselot — Patrocínio', '2026-03-26'),
  (ev_id, 'receita', 16500.00, 'Patrocínio', 'Siam Pharma — Local e Audiovisual', '2026-03-26');

  -- CUSTOS — Espaço/Venue
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 16500.00, 'Espaço / Venue', 'Diária da sala e audiovisual', '2026-03-26'),
  (ev_id, 'custo', 400.00, 'Espaço / Venue', 'Diária da taxa de limpeza', '2026-03-26'),
  (ev_id, 'custo', 1000.00, 'Espaço / Venue', 'Link Internet 1Giga dedicado', '2026-03-26');

  -- CUSTOS — Hospedagem
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 1256.98, 'Hospedagem', 'Brunno Falcão (3 diárias)', '2026-03-26'),
  (ev_id, 'custo', 1468.78, 'Hospedagem', 'Jaqueline + Ingrid (3 diárias)', '2026-03-26'),
  (ev_id, 'custo', 423.31, 'Hospedagem', 'Bianca Andrade (1 diária)', '2026-03-26'),
  (ev_id, 'custo', 431.22, 'Hospedagem', 'Thiago Cabral (1 diária)', '2026-03-26'),
  (ev_id, 'custo', 423.31, 'Hospedagem', 'Henrique Freire (1 diária)', '2026-03-26'),
  (ev_id, 'custo', 507.00, 'Hospedagem', 'Braian Cordeiro', '2026-03-26'),
  (ev_id, 'custo', 507.00, 'Hospedagem', 'Victor Prieto', '2026-03-26'),
  (ev_id, 'custo', 572.99, 'Hospedagem', 'Mariana Singer', '2026-03-26');

  -- CUSTOS — Aéreo
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 528.86, 'Aéreo', 'Brunno Falcão — Volta FLN→BSB', '2026-03-26'),
  (ev_id, 'custo', 483.86, 'Aéreo', 'Jaqueline Ribeiro — Volta FLN→BSB', '2026-03-26'),
  (ev_id, 'custo', 483.86, 'Aéreo', 'Ingrid Aguiar — Volta FLN→BSB', '2026-03-26'),
  (ev_id, 'custo', 222.11, 'Aéreo', 'Bianca Andrade — Ida CGH→NVT', '2026-03-26'),
  (ev_id, 'custo', 588.81, 'Aéreo', 'Bianca Andrade — Volta NVT→CGH', '2026-03-26'),
  (ev_id, 'custo', 575.45, 'Aéreo', 'Thiago Cabral — Ida GYN→NVT', '2026-03-26'),
  (ev_id, 'custo', 1060.81, 'Aéreo', 'Thiago Cabral — Volta NVT→GYN', '2026-03-26'),
  (ev_id, 'custo', 694.63, 'Aéreo', 'Henrique Freire — Ida+Volta BSB↔FLN', '2026-03-26'),
  (ev_id, 'custo', 392.57, 'Aéreo', 'Brunno Falcão — Ida BSB→NVT (prejuízo milhas)', '2026-03-26'),
  (ev_id, 'custo', 392.57, 'Aéreo', 'Jaqueline Ribeiro — Ida BSB→NVT (prejuízo milhas)', '2026-03-26');

  -- CUSTOS — Transporte
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 507.00, 'Transporte', 'Braian Cordeiro — transporte interno', '2026-03-26');

  -- CUSTOS — Alimentação
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 4858.57, 'Alimentação', 'Alimentos BAG Experience (Atacarejo Saudável)', '2026-03-26');

  RAISE NOTICE 'NB BC importado com sucesso! Event ID: %', ev_id;
END;
$$;

-- ============================================================
-- NUTRIÇÃO BRASIL — BELO HORIZONTE 2026
-- Receita Bruta: R$ 102.506,87
-- Custos Totais: R$ 58.647,57
-- Resultado: R$ 38.839,81 (Margem 37.9%)
-- ============================================================

DO $$
DECLARE
  ev_id uuid;
BEGIN
  SELECT id INTO ev_id FROM public.events WHERE name ILIKE '%belo horizonte%' OR name ILIKE '%BH%' LIMIT 1;
  IF ev_id IS NULL THEN
    INSERT INTO public.events (name, type, status, event_date, description)
    VALUES ('Nutrição Brasil — Belo Horizonte', 'congresso', 'pos-evento', '2026-05-16', 'Auditório Supernova — Hotmart | 16 de maio de 2026')
    RETURNING id INTO ev_id;
  END IF;

  DELETE FROM public.finances WHERE event_id = ev_id;

  -- RECEITAS
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'receita', 44951.87, 'Ingressos', 'Vendas Hotmart — Pré-venda BH (99 ingressos)', '2026-05-16'),
  (ev_id, 'receita', 5175.86, 'Ingressos', 'Vendas Hotmart — 1º Lote BH (8 ingressos)', '2026-05-16'),
  (ev_id, 'receita', 32379.14, 'Ingressos', 'Vendas Hotmart — Lote padrão (45 ingressos)', '2026-05-16'),
  (ev_id, 'receita', 20000.00, 'Patrocínio', 'Patrocínio — Rousselot', '2026-05-16');

  -- CUSTOS
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 5019.49, 'Taxa Plataforma', 'Taxa de processamento Hotmart', '2026-05-16'),
  (ev_id, 'custo', 1000.00, 'Pessoal', 'Pessoal (Pró-Labore)', '2026-05-16'),
  (ev_id, 'custo', 5150.65, 'Hospedagem', 'Hospedagem palestrantes e equipe', '2026-05-16'),
  (ev_id, 'custo', 849.72, 'Alimentação', 'Alimentação — Palestrantes e Equipe', '2026-05-16'),
  (ev_id, 'custo', 11295.25, 'Coffee Break', 'Coffee Break e Serviço de Sala', '2026-05-16'),
  (ev_id, 'custo', 2016.53, 'Transporte', 'Transporte Local', '2026-05-16'),
  (ev_id, 'custo', 2098.50, 'Aéreo', 'Passagem Aérea', '2026-05-16'),
  (ev_id, 'custo', 5930.52, 'Estrutura', 'Estrutura e Operação', '2026-05-16'),
  (ev_id, 'custo', 2500.00, 'Audiovisual', 'Audiovisual — Estrutura do Evento', '2026-05-16'),
  (ev_id, 'custo', 11230.00, 'Audiovisual', 'Audiovisual — Mídias Sociais', '2026-05-16'),
  (ev_id, 'custo', 16576.40, 'Marketing', 'Marketing e Divulgação (Meta Ads + WhatsApp)', '2026-05-16');

  RAISE NOTICE 'NB BH importado com sucesso! Event ID: %', ev_id;
END;
$$;

-- ============================================================
-- PALESTRE•SE® — TURMA 14 BRASÍLIA
-- Receita Bruta: R$ 159.373,14
-- Despesas: R$ 89.937,37
-- Resultado: R$ 69.435,77 (Margem 43.6%)
-- ============================================================

DO $$
DECLARE
  ev_id uuid;
BEGIN
  SELECT id INTO ev_id FROM public.events WHERE (name ILIKE '%palestre%' AND (name ILIKE '%14%' OR name ILIKE '%brasília%' OR name ILIKE '%brasilia%')) LIMIT 1;
  IF ev_id IS NULL THEN
    SELECT id INTO ev_id FROM public.events WHERE name ILIKE '%palestre-se%' AND type = 'mentoria' LIMIT 1;
  END IF;
  IF ev_id IS NULL THEN
    INSERT INTO public.events (name, type, status, event_date, end_date, description)
    VALUES ('Palestre-se — Turma 14 Brasília', 'mentoria', 'pos-evento', '2026-05-22', '2026-05-24', 'Turma 14 — Brasília-DF | 22 a 24 de maio')
    RETURNING id INTO ev_id;
  END IF;

  DELETE FROM public.finances WHERE event_id = ev_id;

  -- RECEITA
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'receita', 159373.14, 'Inscrições', 'RECEITA BRUTA — 23 inscritos (18 pagantes, 5 cortesias)', '2026-05-22');

  -- CUSTOS — Estrutura e Audiovisual
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 4900.00, 'Estrutura', 'Sala Imperial (montagem)', '2026-05-22'),
  (ev_id, 'custo', 16170.00, 'Estrutura', 'Sala Imperial (evento)', '2026-05-22'),
  (ev_id, 'custo', 2760.00, 'Estrutura', 'Sala de apoio', '2026-05-22'),
  (ev_id, 'custo', 36200.00, 'Audiovisual', 'Audiovisual (palco, painel e estrutura completa)', '2026-05-22'),
  (ev_id, 'custo', 8500.00, 'Audiovisual', 'Gerador', '2026-05-22'),
  (ev_id, 'custo', 920.00, 'Audiovisual', 'Vinhetas', '2026-05-22');

  -- CUSTOS — Coffee e Bebidas
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 900.00, 'Coffee Break', 'Garrafas de café', '2026-05-22'),
  (ev_id, 'custo', 160.00, 'Bebidas', 'Galão de água', '2026-05-22'),
  (ev_id, 'custo', 600.00, 'Bebidas', 'Aluguel do filtro', '2026-05-22'),
  (ev_id, 'custo', 3610.02, 'Coffee Break', 'Coffee break', '2026-05-22'),
  (ev_id, 'custo', 101.40, 'Bebidas', 'Água com gás', '2026-05-22');

  -- CUSTOS — Equipe
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 240.00, 'Alimentação', 'Alimentação Jaqueline Borges', '2026-05-22'),
  (ev_id, 'custo', 240.00, 'Alimentação', 'Alimentação Yasmin Aguiar', '2026-05-22'),
  (ev_id, 'custo', 600.00, 'Hospedagem', 'Hotel Jaqueline + Yasmin', '2026-05-22'),
  (ev_id, 'custo', 4800.00, 'Mídia', 'Fotógrafo', '2026-05-22'),
  (ev_id, 'custo', 2000.00, 'Mídia', 'Social mídia', '2026-05-22'),
  (ev_id, 'custo', 87.00, 'Transporte', 'Corrida Marcílio', '2026-05-22');

  -- CUSTOS — Materiais e Credenciais
  INSERT INTO public.finances (event_id, type, amount, category, description, date) VALUES
  (ev_id, 'custo', 437.80, 'Material', 'Livro O Poder da Língua', '2026-05-22'),
  (ev_id, 'custo', 65.00, 'Material', 'Tábua', '2026-05-22'),
  (ev_id, 'custo', 49.00, 'Material', 'Caneta permanente', '2026-05-22'),
  (ev_id, 'custo', 450.00, 'Material', 'Marca texto Stabilo', '2026-05-22'),
  (ev_id, 'custo', 165.00, 'Material', 'Prisma', '2026-05-22'),
  (ev_id, 'custo', 1664.55, 'Material Didático', 'Apostilas', '2026-05-22'),
  (ev_id, 'custo', 218.00, 'Credencial', 'Cordão credencial', '2026-05-22'),
  (ev_id, 'custo', 1680.00, 'Homenagem', 'Placa de homenagem (somente placa)', '2026-05-22'),
  (ev_id, 'custo', 1650.00, 'Homenagem', 'Placa de homenagem (placa + estojo)', '2026-05-22'),
  (ev_id, 'custo', 330.00, 'Credencial', 'Credencial', '2026-05-22'),
  (ev_id, 'custo', 150.00, 'Impressões', 'Impressões atividades', '2026-05-22'),
  (ev_id, 'custo', 245.00, 'Impressões', 'Impressões prisma e cópia das atividades', '2026-05-22'),
  (ev_id, 'custo', 21.00, 'Material', 'Lápis', '2026-05-22'),
  (ev_id, 'custo', 23.60, 'Material', 'Borracha', '2026-05-22');

  RAISE NOTICE 'PALESTRE-SE T14 BSB importado com sucesso! Event ID: %', ev_id;
END;
$$;

-- ============================================================
-- VERIFICAÇÃO — Execute para confirmar
-- ============================================================
SELECT
  e.name,
  COUNT(f.id) as lancamentos,
  COALESCE(SUM(CASE WHEN f.type='receita' THEN f.amount ELSE 0 END), 0) as receita,
  COALESCE(SUM(CASE WHEN f.type='custo' THEN f.amount ELSE 0 END), 0) as custos,
  COALESCE(SUM(CASE WHEN f.type='receita' THEN f.amount ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN f.type='custo' THEN f.amount ELSE 0 END), 0) as resultado
FROM public.events e
LEFT JOIN public.finances f ON f.event_id = e.id
GROUP BY e.id, e.name
HAVING COUNT(f.id) > 0
ORDER BY receita DESC;
