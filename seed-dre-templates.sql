-- ============================================================
-- DRE Templates — Imersão + Mentoria
-- Itens-padrão de orçamento que são criados automaticamente
-- ao vincular um template a um evento.
-- ============================================================

-- Limpar templates existentes (idempotente)
DELETE FROM public.finance_template_items WHERE template_id IN (
  'a0000000-0000-4000-8000-000000000001'::uuid,
  'b0000000-0000-4000-8000-000000000002'::uuid
);


-- ============================================================
-- TEMPLATE: IMERSÃO (Nutrição Brasil) — Combinado BC + BH
-- ID: a0000000-0000-4000-8000-000000000001
-- ============================================================

INSERT INTO public.finance_template_items
  (template_id, type, section, description, default_quantity, default_unit_price, default_amount, notes, sort_order)
VALUES
-- ---- CUSTOS: 1. Estrutura e Audiovisual ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Locação de sala/auditório (evento)', 1, 0, 0, 'Diárias do espaço principal', 100),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Sala de apoio / backstage', 1, 0, 0, '', 101),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Audiovisual (palco, painel, som, iluminação)', 1, 0, 0, 'Inclui telão, mesa de som, iluminação', 102),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Gerador', 1, 0, 0, '', 103),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Internet dedicada', 1, 0, 0, 'Link 1Giga', 104),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Taxa de limpeza', 1, 0, 0, '', 105),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Vinhetas', 1, 0, 0, '', 106),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Estrutura e Audiovisual', 'Gravação / Captação', 1, 0, 0, '', 107),

-- ---- CUSTOS: 2. Hospedagem ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Hospedagem', 'Hospedagem equipe', 1, 0, 0, 'Diárias de hotel da equipe', 200),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Hospedagem', 'Hospedagem palestrantes', 1, 0, 0, 'Diárias de hotel dos speakers', 201),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Hospedagem', 'Hospedagem convidados/parceiros', 1, 0, 0, '', 202),

-- ---- CUSTOS: 3. Aéreo e Transporte ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Aéreo e Transporte', 'Passagens aéreas equipe', 1, 0, 0, '', 300),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Aéreo e Transporte', 'Passagens aéreas palestrantes', 1, 0, 0, '', 301),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Aéreo e Transporte', 'Transporte local / Corridas', 1, 0, 0, 'Uber, transfers, etc.', 302),

-- ---- CUSTOS: 4. Coffee e Alimentação ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Coffee e Alimentação', 'Coffee break', 1, 0, 0, '', 400),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Coffee e Alimentação', 'Garrafas de café', 1, 0, 0, '', 401),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Coffee e Alimentação', 'Água (galão / garrafas)', 1, 0, 0, '', 402),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Coffee e Alimentação', 'Aluguel de filtro/bebedouro', 1, 0, 0, '', 403),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Coffee e Alimentação', 'Alimentação equipe e palestrantes', 1, 0, 0, '', 404),

-- ---- CUSTOS: 5. Equipe ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Equipe', 'Pró-labore', 1, 0, 0, '', 500),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Equipe', 'Fotógrafo', 1, 0, 0, '', 501),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Equipe', 'Social mídia / Cobertura', 1, 0, 0, '', 502),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Equipe', 'Videomaker / Cinegrafista', 1, 0, 0, '', 503),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Equipe', 'Equipe de apoio / Recepção', 1, 0, 0, '', 504),

-- ---- CUSTOS: 6. Marketing e Divulgação ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Marketing e Divulgação', 'Meta Ads (Facebook/Instagram)', 1, 0, 0, '', 600),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Marketing e Divulgação', 'Google Ads', 1, 0, 0, '', 601),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Marketing e Divulgação', 'WhatsApp marketing', 1, 0, 0, '', 602),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Marketing e Divulgação', 'Mídias Sociais (gestão)', 1, 0, 0, '', 603),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Marketing e Divulgação', 'Material gráfico / Design', 1, 0, 0, '', 604),

-- ---- CUSTOS: 7. Papelaria e Materiais ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Papelaria e Materiais', 'Apostilas / Material didático', 1, 0, 0, '', 700),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Papelaria e Materiais', 'Cordão credencial', 1, 0, 0, '', 701),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Papelaria e Materiais', 'Credencial impressa', 1, 0, 0, '', 702),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Papelaria e Materiais', 'Placa de homenagem', 1, 0, 0, '', 703),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Papelaria e Materiais', 'Impressões diversas', 1, 0, 0, 'Gráfica, cópias, etc.', 704),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Papelaria e Materiais', 'Material de escrita', 1, 0, 0, 'Canetas, lápis, marca-texto, borracha', 705),

-- ---- CUSTOS: 8. Taxas e Impostos ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Taxas e Impostos', 'Taxa da plataforma (Hotmart/outro)', 1, 0, 0, '', 800),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Taxas e Impostos', 'Impostos sobre receita', 1, 0, 0, '', 801),

-- ---- CUSTOS: 9. Palestrantes ----
('a0000000-0000-4000-8000-000000000001', 'custo', 'Palestrantes', 'Cachê palestrante 1', 1, 0, 0, '', 900),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Palestrantes', 'Cachê palestrante 2', 1, 0, 0, '', 901),
('a0000000-0000-4000-8000-000000000001', 'custo', 'Palestrantes', 'Cachê palestrante 3', 1, 0, 0, '', 902),

-- ---- RECEITAS: 10. Ingressos ----
('a0000000-0000-4000-8000-000000000001', 'receita', 'Ingressos', 'Pré-venda', 1, 0, 0, '', 1000),
('a0000000-0000-4000-8000-000000000001', 'receita', 'Ingressos', '1º Lote', 1, 0, 0, '', 1001),
('a0000000-0000-4000-8000-000000000001', 'receita', 'Ingressos', '2º Lote', 1, 0, 0, '', 1002),
('a0000000-0000-4000-8000-000000000001', 'receita', 'Ingressos', 'Lote padrão / Porta', 1, 0, 0, '', 1003),

-- ---- RECEITAS: 11. Patrocínio ----
('a0000000-0000-4000-8000-000000000001', 'receita', 'Patrocínio e Parcerias', 'Patrocinador 1', 1, 0, 0, '', 1100),
('a0000000-0000-4000-8000-000000000001', 'receita', 'Patrocínio e Parcerias', 'Patrocinador 2', 1, 0, 0, '', 1101),
('a0000000-0000-4000-8000-000000000001', 'receita', 'Patrocínio e Parcerias', 'Parceria / Permuta', 1, 0, 0, '', 1102),

-- ---- RECEITAS: 12. Upsell e Extras ----
('a0000000-0000-4000-8000-000000000001', 'receita', 'Upsell e Extras', 'Upgrade VIP / Experience', 1, 0, 0, '', 1200),
('a0000000-0000-4000-8000-000000000001', 'receita', 'Upsell e Extras', 'Venda de produtos no evento', 1, 0, 0, '', 1201);


-- ============================================================
-- TEMPLATE: MENTORIA (Palestre-se) — Baseado na Turma 14
-- ID: b0000000-0000-4000-8000-000000000002
-- ============================================================

INSERT INTO public.finance_template_items
  (template_id, type, section, description, default_quantity, default_unit_price, default_amount, notes, sort_order)
VALUES
-- ---- CUSTOS: 1. Estrutura, Locação e Audiovisual ----
('b0000000-0000-4000-8000-000000000002', 'custo', 'Estrutura e Audiovisual', 'Sala (montagem)', 1, 0, 0, '', 100),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Estrutura e Audiovisual', 'Sala (evento — diárias)', 1, 0, 0, '', 101),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Estrutura e Audiovisual', 'Sala de apoio', 1, 0, 0, '', 102),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Estrutura e Audiovisual', 'Audiovisual (palco, painel, estrutura)', 1, 0, 0, '', 103),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Estrutura e Audiovisual', 'Gerador', 1, 0, 0, '', 104),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Estrutura e Audiovisual', 'Vinhetas', 1, 0, 0, '', 105),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Estrutura e Audiovisual', 'Gravação', 1, 0, 0, 'Valor a definir', 106),

-- ---- CUSTOS: 2. Coffee, Água e Bebidas ----
('b0000000-0000-4000-8000-000000000002', 'custo', 'Coffee e Bebidas', 'Garrafas de café', 1, 0, 0, '', 200),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Coffee e Bebidas', 'Galão de água', 1, 0, 0, '', 201),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Coffee e Bebidas', 'Aluguel do filtro', 1, 0, 0, '', 202),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Coffee e Bebidas', 'Coffee break', 1, 0, 0, '', 203),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Coffee e Bebidas', 'Água com gás', 1, 0, 0, '', 204),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Coffee e Bebidas', 'Garrafa de água quente', 1, 0, 0, 'Valor a definir', 205),

-- ---- CUSTOS: 3. Equipe ----
('b0000000-0000-4000-8000-000000000002', 'custo', 'Equipe', 'Alimentação equipe (por pessoa)', 1, 0, 0, '', 300),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Equipe', 'Hospedagem equipe', 1, 0, 0, '', 301),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Equipe', 'Fotógrafo', 1, 0, 0, '', 302),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Equipe', 'Social mídia', 1, 0, 0, '', 303),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Equipe', 'Transporte interno / Corridas', 1, 0, 0, '', 304),

-- ---- CUSTOS: 4. Papelaria, Materiais e Credenciais ----
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Livro / Material especial', 1, 0, 0, 'Ex: Livro O Poder da Língua', 400),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Material de escrita', 1, 0, 0, 'Caneta, lápis, marca-texto, borracha, tábua', 401),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Prisma / Display de mesa', 1, 0, 0, '', 402),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Apostilas / Material didático', 1, 0, 0, '', 403),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Cordão credencial', 1, 0, 0, '', 404),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Credencial impressa', 1, 0, 0, '', 405),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Placa de homenagem (só placa)', 1, 0, 0, '', 406),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Placa de homenagem (placa + estojo)', 1, 0, 0, '', 407),
('b0000000-0000-4000-8000-000000000002', 'custo', 'Papelaria e Materiais', 'Impressões (fichas, cartas, atividades)', 1, 0, 0, '', 408),

-- ---- RECEITAS: 5. Inscrições ----
('b0000000-0000-4000-8000-000000000002', 'receita', 'Inscrições', 'Inscrições pagantes', 1, 0, 0, '', 1000),
('b0000000-0000-4000-8000-000000000002', 'receita', 'Inscrições', 'Cortesias (R$ 0)', 1, 0, 0, 'Apenas para contagem', 1001);


-- ============================================================
-- Verificação
-- ============================================================
SELECT
  t.name as template,
  COUNT(fi.id) as itens_dre,
  COUNT(CASE WHEN fi.type = 'custo' THEN 1 END) as custos,
  COUNT(CASE WHEN fi.type = 'receita' THEN 1 END) as receitas
FROM public.templates t
LEFT JOIN public.finance_template_items fi ON fi.template_id = t.id
GROUP BY t.id, t.name;
