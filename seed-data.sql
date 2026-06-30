-- ============================================================
-- SEED DATA — EVENTOS REAIS DA SCIENCE PLAY
-- Execute DEPOIS do schema principal
-- ============================================================

-- Nota: os UUIDs dos eventos são gerados aqui para vincular custos/receitas
-- Substitua 'ADMIN_USER_ID' pelo UUID do seu usuário admin no Supabase

-- ============================================================
-- EVENTOS
-- ============================================================

INSERT INTO public.events (id, name, type, date, city, venue, revenue_goal, status) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'Nutrição Brasil — Balneário Camboriú', 'congresso', '2026-03-29', 'Balneário Camboriú', 'Hilton Garden Inn', 120000, 'execucao'),
  ('e1000000-0000-0000-0000-000000000002', 'Nutrição Brasil — Belo Horizonte', 'congresso', '2026-05-16', 'Belo Horizonte', 'Auditório Supernova — Hotmart', 100000, 'pos-evento'),
  ('e1000000-0000-0000-0000-000000000003', 'PALESTRE•SE — Turma 14 Brasília', 'imersao', '2026-05-22', 'Brasília', NULL, 160000, 'pos-evento');

-- ============================================================
-- RECEITAS EXTRAS (Patrocínios)
-- ============================================================

INSERT INTO public.revenues (event_id, description, type, amount, status) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'Rousselot — Patrocínio', 'patrocinio', 20000, 'confirmado'),
  ('e1000000-0000-0000-0000-000000000001', 'Siam Pharma — Local e Audiovisual', 'permuta', 16500, 'confirmado'),
  ('e1000000-0000-0000-0000-000000000002', 'Rousselot — Patrocínio', 'patrocinio', 20000, 'recebido');

-- ============================================================
-- VENDAS — NUTRIÇÃO BRASIL BH (resumo por lote)
-- ============================================================

INSERT INTO public.sales (event_id, amount, platform_fee, net_amount, lot, sale_date, payment_status, buyer_name) VALUES
  ('e1000000-0000-0000-0000-000000000002', 44951.87, 2750.90, 42200.97, 'Pré-venda BH', '2026-01-27', 'aprovado', '99 ingressos - Pré-venda'),
  ('e1000000-0000-0000-0000-000000000002', 5175.86, 313.36, 4862.50, '1º Lote BH', '2026-01-28', 'aprovado', '8 ingressos - 1o Lote'),
  ('e1000000-0000-0000-0000-000000000002', 32379.14, 1955.23, 30423.91, 'Lote padrão', '2026-04-30', 'aprovado', '45 ingressos - Lote padrão');

-- VENDAS — NUTRIÇÃO BRASIL BC
INSERT INTO public.sales (event_id, amount, net_amount, lot, sale_date, payment_status, buyer_name) VALUES
  ('e1000000-0000-0000-0000-000000000001', 72685.60, 72685.60, 'Total ingressos', '2026-03-26', 'aprovado', 'Vendas até 26/03');

-- VENDAS — PALESTRE•SE T14 (individuais top)
INSERT INTO public.sales (event_id, amount, net_amount, sale_date, payment_status, buyer_name) VALUES
  ('e1000000-0000-0000-0000-000000000003', 15999.50, 15999.50, '2026-05-01', 'aprovado', 'Wiveslando'),
  ('e1000000-0000-0000-0000-000000000003', 15999.50, 15999.50, '2026-05-01', 'aprovado', 'Paola Neiva'),
  ('e1000000-0000-0000-0000-000000000003', 13000, 13000, '2026-04-15', 'aprovado', 'Leandra de Sá'),
  ('e1000000-0000-0000-0000-000000000003', 13000, 13000, '2026-04-15', 'aprovado', 'Alisson'),
  ('e1000000-0000-0000-0000-000000000003', 12000, 12000, '2026-04-20', 'aprovado', 'Gustavo Paiva'),
  ('e1000000-0000-0000-0000-000000000003', 12000, 12000, '2026-04-20', 'aprovado', 'Maria de Lourdes'),
  ('e1000000-0000-0000-0000-000000000003', 11000, 11000, '2026-04-20', 'aprovado', 'Pamela'),
  ('e1000000-0000-0000-0000-000000000003', 9426.58, 9426.58, '2026-04-25', 'aprovado', 'Bruno Teles'),
  ('e1000000-0000-0000-0000-000000000003', 9426.58, 9426.58, '2026-04-25', 'aprovado', 'Michelle Teles'),
  ('e1000000-0000-0000-0000-000000000003', 9000, 9000, '2026-04-10', 'aprovado', 'Jamila Vital'),
  ('e1000000-0000-0000-0000-000000000003', 9000, 9000, '2026-04-10', 'aprovado', 'Carolina Vasconcelos'),
  ('e1000000-0000-0000-0000-000000000003', 6120, 6120, '2026-04-28', 'aprovado', 'Patricia Carneiro Gomes'),
  ('e1000000-0000-0000-0000-000000000003', 4501, 4501, '2026-05-01', 'aprovado', 'Poliana'),
  ('e1000000-0000-0000-0000-000000000003', 4500, 4500, '2026-05-05', 'aprovado', 'Ana Vitória'),
  ('e1000000-0000-0000-0000-000000000003', 3600, 3600, '2026-05-10', 'aprovado', 'Thaís Padrão'),
  ('e1000000-0000-0000-0000-000000000003', 3600, 3600, '2026-05-10', 'aprovado', 'Kelvin Zago'),
  ('e1000000-0000-0000-0000-000000000003', 3600, 3600, '2026-05-10', 'aprovado', 'Kelen Coutinho'),
  ('e1000000-0000-0000-0000-000000000003', 3599.98, 3599.98, '2026-05-10', 'aprovado', 'Ísis Cristina');

-- ============================================================
-- CUSTOS — NUTRIÇÃO BRASIL BH (dados reais do DRE)
-- ============================================================

-- Pegar os IDs das categorias
-- (os nomes correspondem ao que foi inserido no schema)

INSERT INTO public.costs (event_id, category_id, description, person, amount, status) VALUES
  -- Pessoal
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Cachês / Palestrantes'), 'Pró-labore Henrique Freire', 'Henrique Freire', 1000, 'pago'),
  -- Hospedagem
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'H2 Platinum Lourdes (3 diárias)', 'Brunno Falcão', 743.55, 'pago'),
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hotel BH', 'Aline Zago', 533.01, 'pago'),
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'H2 Platinum Lourdes (1 diária)', 'Henrique Freire', 499.89, 'pago'),
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'H2 Platinum Lourdes (3 diárias)', 'Lorena Tomazett', 743.55, 'pago'),
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'H2 Platinum Lourdes (2 diárias)', 'Samira Lima', 969.14, 'pago'),
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'H2 Platinum Lourdes (3 diárias)', 'Jaqueline Borges', 830.76, 'pago'),
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'H2 Platinum Lourdes (3 diárias)', 'Yasmin Aguiar', 830.75, 'pago'),
  -- Alimentação
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Alimentação / Coffee Break'), 'Alimentação palestrantes e equipe', NULL, 849.72, 'pago'),
  -- Coffee Break
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Alimentação / Coffee Break'), 'Coffee Break e Serviço de Sala', NULL, 11295.25, 'pago'),
  -- Transporte Local
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Transporte Local'), 'Transporte local palestrantes', NULL, 2016.53, 'pago'),
  -- Passagem Aérea
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Passagens aéreas (milhas convertidas)', NULL, 2098.50, 'pago'),
  -- Estrutura
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Estrutura / Venue / Locação'), 'Estrutura e Operação Hotmart', NULL, 5930.52, 'pago'),
  -- Audiovisual Estrutura
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Audiovisual'), 'Gravasom (técnico áudio/vídeo/iluminação)', NULL, 2500, 'pago'),
  -- Audiovisual Mídias
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Audiovisual'), 'Israel (foto + video + social media)', NULL, 11230, 'pago'),
  -- Marketing
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Marketing / Tráfego Pago'), 'Tráfego Meta Ads (5 campanhas)', NULL, 14430.82, 'pago'),
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Marketing / Tráfego Pago'), 'WhatsApp (6 lotes, 6.966 envios)', NULL, 2145.57, 'pago'),
  -- Impostos
  ('e1000000-0000-0000-0000-000000000002', (SELECT id FROM cost_categories WHERE name = 'Impostos / Taxas Plataforma'), 'Taxa processamento Hotmart', NULL, 5019.49, 'pago');

-- ============================================================
-- CUSTOS — PALESTRE•SE T14 (dados reais do DRE)
-- ============================================================

INSERT INTO public.costs (event_id, category_id, description, supplier, amount, status) VALUES
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Estrutura / Venue / Locação'), 'Sala Imperial (montagem)', NULL, 4900, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Estrutura / Venue / Locação'), 'Sala Imperial (evento)', NULL, 16170, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Estrutura / Venue / Locação'), 'Sala de apoio', NULL, 2760, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Audiovisual'), 'Palco, painel e estrutura completa', NULL, 36200, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Audiovisual'), 'Gerador', NULL, 8500, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Audiovisual'), 'Vinhetas', NULL, 920, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Alimentação / Coffee Break'), 'Garrafas de café', NULL, 900, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Alimentação / Coffee Break'), 'Galão de água + filtro', NULL, 760, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Alimentação / Coffee Break'), 'Coffee break', NULL, 3610.02, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Alimentação / Coffee Break'), 'Água com gás', NULL, 101.40, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Equipe / Operação / Freelancers'), 'Alimentação Jaqueline + Yasmin', NULL, 480, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hotel Jaqueline + Yasmin', NULL, 600, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Equipe / Operação / Freelancers'), 'Fotógrafo', NULL, 4800, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Equipe / Operação / Freelancers'), 'Social mídia', NULL, 2000, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Transporte Local'), 'Corrida Marcílio', NULL, 87, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Papelaria / Credenciais'), 'Livro O Poder da Língua', NULL, 437.80, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Papelaria / Credenciais'), 'Tábua + caneta + marca texto + prisma', NULL, 729, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Papelaria / Credenciais'), 'Apostilas', NULL, 1664.55, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Papelaria / Credenciais'), 'Cordão credencial', NULL, 218, 'pago'),
  ('e1000000-0000-0000-0000-000000000003', (SELECT id FROM cost_categories WHERE name = 'Papelaria / Credenciais'), 'Placa de homenagem', NULL, 1680, 'pago');

-- ============================================================
-- CUSTOS — NUTRIÇÃO BRASIL BC (parcial — dados confirmados)
-- ============================================================

INSERT INTO public.costs (event_id, category_id, description, person, supplier, amount, status) VALUES
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Estrutura / Venue / Locação'), 'Diária sala + AV (Siam Pharma custeia)', NULL, 'Siam Pharma', 16500, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Estrutura / Venue / Locação'), 'Taxa de limpeza', NULL, NULL, 400, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Estrutura / Venue / Locação'), 'Internet 1Giga dedicado', NULL, NULL, 1000, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (3 diárias)', 'Brunno Falcão', 'Hilton', 1256.98, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (3 diárias Twin)', 'Jaqueline + Ingrid', 'Hilton', 1468.78, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (1 diária)', 'Bianca Andrade', 'Hilton', 423.31, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (1 diária)', 'Thiago Cabral', 'Hilton', 431.22, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (1 diária)', 'Henrique Freire', 'Hilton', 423.31, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (1 diária)', 'Braian Cordeiro', 'Hilton', 507, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (1 diária)', 'Victor Prieto', 'Hilton', 507, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Hospedagem'), 'Hilton Garden Inn (1 diária)', 'Mariana Singer', 'Hilton', 572.99, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Volta FLN→BSB', 'Brunno Falcão', 'LATAM', 528.86, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Volta FLN→BSB', 'Jaqueline Ribeiro', 'LATAM', 483.86, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Volta FLN→BSB', 'Ingrid Aguiar', 'LATAM', 483.86, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Ida CGH→NVT', 'Bianca Andrade', 'GOL', 222.11, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Volta NVT→CGH', 'Bianca Andrade', 'LATAM', 588.81, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Ida GYN→NVT', 'Thiago Cabral', 'Azul', 575.45, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Volta NVT→GYN', 'Thiago Cabral', 'GOL', 1060.81, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Ida+Volta BSB↔FLN', 'Henrique Freire', 'LATAM', 694.63, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Ida BSB→NVT (milhas)', 'Brunno Falcão', 'MaxMilhas', 392.57, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Passagens Aéreas'), 'Ida BSB→NVT (milhas)', 'Jaqueline Ribeiro', 'MaxMilhas', 392.57, 'pago'),
  ('e1000000-0000-0000-0000-000000000001', (SELECT id FROM cost_categories WHERE name = 'Alimentação / Coffee Break'), 'BAG Experience (Atacarejo Saudável)', NULL, 'BAG Experience', 4858.57, 'pago');
