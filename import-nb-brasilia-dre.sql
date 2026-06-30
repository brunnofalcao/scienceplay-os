-- ============================================================
-- NB Brasília — Importação DRE Detalhado (Previsão)
-- Todas as linhas extraídas do PDF "Nutrição Brasil 2025"
-- payment_status = 'estimado' (previsão do evento)
-- ============================================================
-- Primeiro: identificar o event_id do NB Brasília
-- Se o nome exato for diferente, ajustar o WHERE abaixo.

DO $$
DECLARE
  v_event_id uuid;
BEGIN
  SELECT id INTO v_event_id FROM public.events WHERE name ILIKE '%Nutri%Bras%lia%' LIMIT 1;
  IF v_event_id IS NULL THEN
    RAISE NOTICE 'Evento NB Brasilia nao encontrado. Abortando.';
    RETURN;
  END IF;

  -- Limpar itens antigos que ainda são 'estimado' para reimportar
  DELETE FROM public.finances WHERE event_id = v_event_id AND payment_status = 'estimado';

  -- ============================================================
  -- CUSTOS — Estrutura e Papelaria
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Adriana Torres', 0, 0, 150, 'estimado', 10),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Alberto Zagatto', 0, 0, 150, 'estimado', 20),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Alisson Gonçalves', 0, 0, 100, 'estimado', 30),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Comissão Pix', 0, 0, 700, 'estimado', 40),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Corina Biazzi', 0, 0, 100, 'estimado', 50),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Gisele Mattei', 0, 0, 700, 'estimado', 60),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Kátia Maciel', 0, 0, 150, 'estimado', 70),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Kenne Rojas', 0, 0, 150, 'estimado', 80),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Ceres Feres', 0, 0, 100, 'estimado', 90),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Caneca Mix', 0, 0, 100, 'estimado', 100),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Dental Flex', 0, 0, 150, 'estimado', 110),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Sarah Cardoso', 1, 150, 150, 'estimado', 120),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Eric Café', 1, 150, 150, 'estimado', 130),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Fernando Linhares', 0, 0, 12050, 'estimado', 140),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Flavio Rodrigues', 0, 0, 100, 'estimado', 150),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Gabriela Barbosa', 0, 0, 200, 'estimado', 160),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Denise Santos', 0, 0, 700, 'estimado', 170),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Gustavo Menezes', 0, 0, 100, 'estimado', 180),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Gustavo Baroni', 0, 0, 200, 'estimado', 190),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Daniela Pires', 0, 0, 100, 'estimado', 200),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Brunno Falcao', 0, 0, 190, 'estimado', 210),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Adesivos / Toquete', 0, 0, 150, 'estimado', 220),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Hazel Blanche', 0, 0, 100, 'estimado', 230),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Hélio Cavalcanti', 0, 0, 100, 'estimado', 240),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Isac Neto', 0, 0, 150, 'estimado', 250),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Juliana Bertozzo', 0, 0, 150, 'estimado', 260),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Chris Paiva', 0, 0, 100, 'estimado', 270),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Vivi Borges', 0, 0, 100, 'estimado', 280),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Cadu do Panto', 0, 0, 100, 'estimado', 290),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Carol Guilherme', 0, 0, 150, 'estimado', 300),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Bruna Carneiro', 0, 0, 150, 'estimado', 310),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Renata Jucoski', 0, 0, 150, 'estimado', 320),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Renato Galvão', 0, 0, 150, 'estimado', 330),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Vagner Liberato', 1, 88.11, 88, 'estimado', 340),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Vivian Cristine', 0, 0, 100, 'estimado', 350),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Vitor Mateus', 1, 171.73, 172, 'estimado', 360),
  (v_event_id, 'custo', 'Estrutura e Papelaria', 'Estrutura e Papelaria', 'Logo Torta', 1, 0, 100, 'estimado', 370);

  -- ============================================================
  -- CUSTOS — Equipe
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Brunno Falcão', 0, 0, 750, 'estimado', 500),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Soares Rodrigues', 0, 0, 500, 'estimado', 510),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Augusto Bidola', 0, 0, 500, 'estimado', 520),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Priscila Araujo', 0, 0, 700, 'estimado', 530),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Paulo Murizan', 0, 0, 700, 'estimado', 540),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Márcio Rodrigues', 0, 0, 500, 'estimado', 550),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Rafael Cardoso', 0, 0, 500, 'estimado', 560),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Lorena Conceição', 0, 0, 500, 'estimado', 570),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Mateus Monteiro', 0, 0, 500, 'estimado', 580),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Logradoura Eventos', 0, 0, 700, 'estimado', 590),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Comunicação Visual', 0, 0, 500, 'estimado', 600),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Papelaria 2 x 1', 0, 0, 700, 'estimado', 610),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Papelaria 2 x 1 (2)', 0, 0, 700, 'estimado', 620),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'César Maia', 0, 0, 700, 'estimado', 630),
  (v_event_id, 'custo', 'Equipe', 'Equipe', 'Mark Torres', 0, 0, 500, 'estimado', 640);

  -- ============================================================
  -- CUSTOS — Palestrantes
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Palestrantes', 'Palestrantes', 'Farmácia Ana', 1, 162633.05, 162633.05, 'estimado', 700);

  -- ============================================================
  -- CUSTOS — Alimentação e Bebidas
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Alimentação e Bebidas', 'Alimentação e Bebidas', 'Sala Online', 0, 0, 0, 'estimado', 800),
  (v_event_id, 'custo', 'Alimentação e Bebidas', 'Alimentação e Bebidas', 'Sala Gourmet / Cozinha e Estação (Redd)', 1, 24219.60, 123419.60, 'estimado', 810),
  (v_event_id, 'custo', 'Alimentação e Bebidas', 'Alimentação e Bebidas', 'Buffet Corredor de Bus', 1, 1000, 1000, 'estimado', 820),
  (v_event_id, 'custo', 'Alimentação e Bebidas', 'Alimentação e Bebidas', 'Buffet Diretoria', 0, 0, 0, 'estimado', 830),
  (v_event_id, 'custo', 'Alimentação e Bebidas', 'Alimentação e Bebidas', 'Parcerias (Barra do Fioco + Fazenda Malange + Mais Pura + Tia Sonia + Mumu)', 0, 0, 0, 'estimado', 840);

  -- ============================================================
  -- CUSTOS — Custos para Montagem/Desmontagem
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'Crachás', 1, 1000, 1000, 'estimado', 900),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'MAQUETES', 9, 800, 1800, 'estimado', 910),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'DISPLAY PHARMA', 9, 500, 1500, 'estimado', 920),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'BRINDES', 9, 500, 4500, 'estimado', 930),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'TALVEGA', 9, 500, 4500, 'estimado', 940),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'FARMÁCIA REFERENCIAL', 9, 500, 4500, 'estimado', 950),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'AMOSTRA', 9, 500, 1500, 'estimado', 960),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'PERIÓDICOS', 9, 500, 1500, 'estimado', 970),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'BIODIVERSIDADE', 9, 500, 1500, 'estimado', 980),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'PRATOS NUTRITIVOS', 20, 1000, 13000, 'estimado', 990),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'MANTA (Parceiro)', 0, 0, 0, 'estimado', 1000),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'PRO-LAZER', 24, 500, 12000, 'estimado', 1010),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'ADORNO LÓGOS', 4, 500, 2000, 'estimado', 1020),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'ESCULTURAS/TOCOS', 1, 500, 1500, 'estimado', 1030),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'PLANT ORGÂNICO', 0, 0, 0, 'estimado', 1040),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'Comunicação visual — envelopamento', 1, 13685.07, 13685, 'estimado', 1050),
  (v_event_id, 'custo', 'Montagem e Desmontagem', 'Montagem e Desmontagem', 'Comunicação visual — eventos', 1, 17916, 17916, 'estimado', 1060);

  -- ============================================================
  -- CUSTOS — Arrecadação / Patrocinadores (montagem de stands)
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'AGRONEGÓCIO', 0, 0, 50000, 'estimado', 1100),
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'FARMACÊUTICO', 1, 80000, 80000, 'estimado', 1110),
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'ALIMENTOS', 0, 0, 100000, 'estimado', 1120),
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'SUPLEMENTAÇÃO', 0, 0, 171111, 'estimado', 1130),
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'NUTRACÊUTICA', 0, 0, 145000, 'estimado', 1140),
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'EQUIPAMENTO HEALTH', 0, 0, 8000, 'estimado', 1150),
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'SERVIÇO SAÚDE', 0, 0, 50000, 'estimado', 1160),
  (v_event_id, 'custo', 'Montadora / Stands', 'Montadora / Stands', 'MESA REDONDA', 1, 150000, 150000, 'estimado', 1170);

  -- ============================================================
  -- CUSTOS — Equipe de Evento / Credenciamento
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Segurança', 1, 0, 1880, 'estimado', 1200),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'NTP - Ponto Médico', 1, 0, 260, 'estimado', 1210),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Brigadista (AMICALUBE)', 0, 0, 3980, 'estimado', 1220),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Limpeza (AMICALUBE)', 10, 0, 0, 'estimado', 1230),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Carregador', 0, 0, 750, 'estimado', 1240),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Recepcionista Credenciamento (Sorriha Flexa)', 7, 260, 1750, 'estimado', 1250),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Recepcionista Credenciamento (Simone)', 7, 260, 1750, 'estimado', 1260),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Recepcionista Evento (Sorriha Flexa)', 3, 260, 780, 'estimado', 1270),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Recepcionista Evento (Claudio)', 3, 350, 1000, 'estimado', 1280),
  (v_event_id, 'custo', 'Equipe Evento', 'Equipe Evento', 'Equipe montagem de rota', 9, 390, 1300, 'estimado', 1290);

  -- ============================================================
  -- CUSTOS — Hospedagem
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Evento (Espaço Maria)', 1, 0, 2350, 'estimado', 1300),
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Jantar (Espaço Maria)', 0, 0, 0, 'estimado', 1310),
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Vitrines para montagem', 0, 0, 0, 'estimado', 1320),
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Jantar pré-evento (Espaço Maria)', 0, 0, 0, 'estimado', 1330),
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Coroas de flores', 0, 0, 9.52, 'estimado', 1340),
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Aéreo de poda (Prata Fria)', 1, 0, 1715.82, 'estimado', 1350),
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Aéreo de poda (Prata Fria 2)', 1, 0, 1541.06, 'estimado', 1360),
  (v_event_id, 'custo', 'Hospedagem', 'Hospedagem', 'Comunicação/cenografia VIP (montadora articulador)', 0, 0, 0, 'estimado', 1370);

  -- ============================================================
  -- CUSTOS — Audiovisual e Produção
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Audiovisual e Produção', 'Audiovisual e Produção', 'Som e Iluminação', 0, 0, 50000, 'estimado', 1400),
  (v_event_id, 'custo', 'Audiovisual e Produção', 'Audiovisual e Produção', 'Painel LED', 0, 0, 45000, 'estimado', 1410),
  (v_event_id, 'custo', 'Audiovisual e Produção', 'Audiovisual e Produção', 'Gravação e Transmissão', 0, 0, 35000, 'estimado', 1420),
  (v_event_id, 'custo', 'Audiovisual e Produção', 'Audiovisual e Produção', 'Fotografia', 0, 0, 5000, 'estimado', 1430),
  (v_event_id, 'custo', 'Audiovisual e Produção', 'Audiovisual e Produção', 'Vinhetas e Motion', 0, 0, 8000, 'estimado', 1440),
  (v_event_id, 'custo', 'Audiovisual e Produção', 'Audiovisual e Produção', 'Gerador', 0, 0, 15000, 'estimado', 1450),
  (v_event_id, 'custo', 'Audiovisual e Produção', 'Audiovisual e Produção', 'Internet dedicada', 0, 0, 5000, 'estimado', 1460);

  -- ============================================================
  -- CUSTOS — Taxas e Impostos
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'custo', 'Taxas e Impostos', 'Taxas e Impostos', 'Comissão plataforma ingressos', 0, 0, 15000, 'estimado', 1500),
  (v_event_id, 'custo', 'Taxas e Impostos', 'Taxas e Impostos', 'Impostos sobre faturamento', 0, 0, 30000, 'estimado', 1510);

  -- ============================================================
  -- RECEITAS — Inscrições
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'receita', 'Inscrições', 'Inscrições', 'Inscrições presencial', 1100, 269.64, 269636, 'estimado', 2000),
  (v_event_id, 'receita', 'Inscrições', 'Inscrições', 'Cortesias', 60, 0, 0, 'estimado', 2010),
  (v_event_id, 'receita', 'Inscrições', 'Inscrições', 'Cortesias Expo', 50, 0, 0, 'estimado', 2020),
  (v_event_id, 'receita', 'Inscrições', 'Inscrições', 'Inscrições Online', 0, 0, 0, 'estimado', 2030);

  -- ============================================================
  -- RECEITAS — Patrocínio
  -- ============================================================
  INSERT INTO public.finances (event_id, type, section, category, description, quantity, unit_price, amount, payment_status, sort_order) VALUES
  (v_event_id, 'receita', 'Patrocínio', 'Patrocínio', 'Receita Comercial/Estimada', 0, 0, 922833, 'estimado', 2100),
  (v_event_id, 'receita', 'Patrocínio', 'Patrocínio', 'Arrecadação Expo / Área Técnica', 0, 0, 170431, 'estimado', 2110);

  RAISE NOTICE 'NB Brasilia — % itens importados com sucesso',
    (SELECT count(*) FROM public.finances WHERE event_id = v_event_id AND payment_status = 'estimado');
END $$;
