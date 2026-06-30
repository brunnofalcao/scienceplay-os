-- ============================================================
-- Science Play OS v5 — Seed: Template "Imersão Nutrição Brasil"
-- 81 tasks + 6 Go/No-Go checkpoint templates.
-- Safe to re-run: deletes existing template with same name first.
-- ============================================================

BEGIN;

-- ---------- Clean up existing template ----------

DELETE FROM public.checkpoint_templates
WHERE template_id IN (SELECT id FROM public.templates WHERE name = 'Imersão Nutrição Brasil');

DELETE FROM public.template_tasks
WHERE template_id IN (SELECT id FROM public.templates WHERE name = 'Imersão Nutrição Brasil');

DELETE FROM public.templates WHERE name = 'Imersão Nutrição Brasil';


-- ---------- Create template ----------

INSERT INTO public.templates (id, name, event_type, description)
VALUES (
  'a0000000-0000-4000-8000-000000000001',
  'Imersão Nutrição Brasil',
  'imersao',
  'Template operacional completo para Imersão Nutrição Brasil — 81 tarefas em 7 fases (F0–F6) com critérios de entrega, dependências e checkpoints Go/No-Go.'
);


-- ============================================================
-- PHASE F0 — Fundação & Validação (D-120 a D-90) — 9 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('a0000000-0000-4000-8000-000000000001',
 'Validar praça e calendário regional',
 'Fundação & Validação', 'F0', -120,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Mapeamento completo da praça-alvo para a edição.',
 'Mapeamento de eventos concorrentes + feriados + saturação Hotmart concluído',
 'Produtor Executivo', 'critica', NULL, 1),

('a0000000-0000-4000-8000-000000000001',
 'Definir tese da edição (tema/posicionamento)',
 'Fundação & Validação', 'F0', -120,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Definição da tese central que guiará toda a comunicação.',
 'Headline + subheadline + 3 pilares de conteúdo aprovados pelo CEO',
 'CEO + Produtor', 'critica', NULL, 2),

('a0000000-0000-4000-8000-000000000001',
 'Definir line-up âncora (3 nomes)',
 'Fundação & Validação', 'F0', -120,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Seleção e pré-confirmação dos palestrantes principais.',
 'Pré-confirmação verbal dos 3 palestrantes âncora + acordo de data',
 'Curador (CEO)', 'critica', 'Tese da edição', 3),

('a0000000-0000-4000-8000-000000000001',
 'Modelar DRE projetado da edição',
 'Fundação & Validação', 'F0', -110,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Projeção financeira com cenários para decisão Go/No-Go.',
 'Planilha com 3 cenários (pessimista/base/otimista) + breakeven calculado',
 'Produtor Executivo', 'critica', 'Tese definida', 4),

('a0000000-0000-4000-8000-000000000001',
 'Cotar 3 venues + 2 hotéis na praça',
 'Fundação & Validação', 'F0', -110,
 'Logística & Venue', 'Logística & Venue',
 'Cotação comparativa de locais e hospedagem.',
 'Tabela comparativa com diária, AV incluso, coffee, capacidade',
 'Produtor Executivo', 'alta', NULL, 5),

('a0000000-0000-4000-8000-000000000001',
 'Aprovar venue + assinar contrato',
 'Fundação & Validação', 'F0', -100,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Decisão e fechamento do local do evento.',
 'Contrato assinado + sinal pago (mín. 30%) + sala confirmada',
 'CEO + Produtor', 'critica', 'Cotação venues', 6),

('a0000000-0000-4000-8000-000000000001',
 'Definir estrutura de lotes e preços',
 'Fundação & Validação', 'F0', -100,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Definição da estratégia de precificação por lotes.',
 'Pré-venda, 1º lote, 2º lote, padrão — preços e datas de virada',
 'Produtor + CEO', 'critica', 'DRE projetado', 7),

('a0000000-0000-4000-8000-000000000001',
 'Criar produto na Hotmart',
 'Fundação & Validação', 'F0', -95,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Configuração completa do produto de venda.',
 'Página, checkout, lotes, integração com RD Station ativada',
 'Comercial / Operações', 'critica', 'Lotes definidos', 8),

('a0000000-0000-4000-8000-000000000001',
 'Briefing de identidade visual da edição',
 'Fundação & Validação', 'F0', -95,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Criação da identidade visual alinhada à marca Science Play.',
 'Arte-chave + paleta + tipografia aprovadas (mantendo brand Science Play)',
 'Design', 'alta', 'Tese da edição', 9);


-- ============================================================
-- PHASE F1 — Lançamento & Estruturação (D-90 a D-60) — 14 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('a0000000-0000-4000-8000-000000000001',
 'Lançar pré-venda (Hotmart)',
 'Lançamento & Estruturação', 'F1', -90,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Abertura oficial de vendas do evento.',
 'Página no ar + tráfego ativo + primeira venda registrada',
 'Comercial + Tráfego', 'critica', 'Hotmart configurado', 10),

('a0000000-0000-4000-8000-000000000001',
 'Subir campanha Pré-Venda no Meta',
 'Lançamento & Estruturação', 'F1', -90,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Ativação de tráfego pago para fase de pré-venda.',
 'Campanha ativa + budget definido + criativos aprovados + Pixel OK',
 'Tráfego', 'critica', 'Pré-venda no ar', 11),

('a0000000-0000-4000-8000-000000000001',
 'Enviar convites formais aos palestrantes',
 'Lançamento & Estruturação', 'F1', -90,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Formalização dos convites com detalhes do evento.',
 'Convite enviado por WhatsApp + email com one-pager do evento',
 'Curador', 'critica', 'Line-up definido', 12),

('a0000000-0000-4000-8000-000000000001',
 'Confirmar palestrantes (assinatura termo)',
 'Lançamento & Estruturação', 'F1', -85,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Confirmação jurídica e temática dos palestrantes.',
 'Termo de palestrante assinado + tema de palestra aprovado',
 'Curador + Jurídico', 'critica', 'Convites enviados', 13),

('a0000000-0000-4000-8000-000000000001',
 'Prospectar patrocinadores (target list)',
 'Lançamento & Estruturação', 'F1', -85,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Construção da lista de marcas-alvo para patrocínio.',
 'Lista de 20 marcas-alvo com contato + proposta de cota base',
 'Comercial Patrocínio', 'critica', 'Tese aprovada', 14),

('a0000000-0000-4000-8000-000000000001',
 'Apresentar proposta a patrocinador âncora',
 'Lançamento & Estruturação', 'F1', -80,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Abordagem comercial ao principal patrocinador.',
 'Apresentação enviada + reunião agendada com decisor',
 'CEO + Comercial', 'critica', 'Target list', 15),

('a0000000-0000-4000-8000-000000000001',
 'Fechar passagens aéreas dos palestrantes',
 'Lançamento & Estruturação', 'F1', -75,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Emissão de bilhetes aéreos para todos palestrantes.',
 'Bilhetes emitidos (preferir milhas) + localizadores salvos',
 'Logística', 'critica', 'Palestrantes confirmados', 16),

('a0000000-0000-4000-8000-000000000001',
 'Bloquear hospedagem dos palestrantes',
 'Lançamento & Estruturação', 'F1', -75,
 'Logística & Venue', 'Logística & Venue',
 'Reserva de hotel para palestrantes.',
 'Reservas no hotel 4★+ com check-in D-1 e check-out D+1',
 'Logística', 'critica', 'Passagens emitidas', 17),

('a0000000-0000-4000-8000-000000000001',
 'Briefing de copy + criativos por palestrante',
 'Lançamento & Estruturação', 'F1', -70,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Preparação de materiais individuais de divulgação.',
 'Card individual + bio + tema de cada palestrante aprovado',
 'Marketing + Curador', 'alta', 'Palestrantes confirmados', 18),

('a0000000-0000-4000-8000-000000000001',
 'Cotar coffee break + serviço de sala',
 'Lançamento & Estruturação', 'F1', -70,
 'Operação & Materiais', 'Operação & Materiais',
 'Cotação de alimentação e serviços no venue.',
 '3 cotações com cardápio + assinatura do contrato',
 'Produtor Executivo', 'critica', 'Venue confirmado', 19),

('a0000000-0000-4000-8000-000000000001',
 'Cotar e contratar AV técnico (som/luz/vídeo)',
 'Lançamento & Estruturação', 'F1', -65,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Contratação de equipe audiovisual.',
 'Contrato assinado + 50% pago + plano de teste D-1 acordado',
 'Produtor Executivo', 'critica', 'Venue confirmado', 20),

('a0000000-0000-4000-8000-000000000001',
 'Contratar pacote foto+vídeo+social media',
 'Lançamento & Estruturação', 'F1', -65,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Contratação de cobertura audiovisual e social media.',
 'Pacote único contratado (foto + videomaker + 15 reels)',
 'Marketing', 'alta', NULL, 21),

('a0000000-0000-4000-8000-000000000001',
 'Fechar 1ª cota de patrocínio (âncora)',
 'Lançamento & Estruturação', 'F1', -60,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Fechamento do patrocinador principal.',
 'Contrato assinado + 50% pago + ativações definidas',
 'Comercial Patrocínio', 'critica', 'Proposta apresentada', 22),

('a0000000-0000-4000-8000-000000000001',
 'Definir plano de mídia completo (Meta + WhatsApp)',
 'Lançamento & Estruturação', 'F1', -60,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Planejamento integrado de tráfego pago e orgânico.',
 'Plano com fases + budget total + metas de CPL por fase',
 'Tráfego + CEO', 'critica', 'Pré-venda rodando', 23);


-- ============================================================
-- PHASE F2 — Aquecimento & Escala (D-60 a D-30) — 12 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('a0000000-0000-4000-8000-000000000001',
 'Virar 1º lote oficial',
 'Aquecimento & Escala', 'F2', -60,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Transição da pré-venda para o primeiro lote.',
 'Lote atualizado na Hotmart + email + WhatsApp para base',
 'Comercial + Marketing', 'critica', 'Plano de mídia', 24),

('a0000000-0000-4000-8000-000000000001',
 'Lançar campanha Conversão no Meta',
 'Aquecimento & Escala', 'F2', -55,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Campanha focada em conversão com criativos de palestrantes.',
 'Campanha ativa + budget escalado + criativos com palestrantes',
 'Tráfego', 'critica', 'Criativos aprovados', 25),

('a0000000-0000-4000-8000-000000000001',
 'Disparo WhatsApp para base segmentada',
 'Aquecimento & Escala', 'F2', -55,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Comunicação direta com leads qualificados.',
 'Lista segmentada + mensagem enviada + custo por lead controlado',
 'Marketing + Comercial', 'alta', 'Base segmentada', 26),

('a0000000-0000-4000-8000-000000000001',
 'Definir kit congressista',
 'Aquecimento & Escala', 'F2', -50,
 'Operação & Materiais', 'Operação & Materiais',
 'Definição dos itens que compõem o kit do participante.',
 'Sacola + caneta + bloco + brinde de patrocinador + credencial',
 'Produtor Executivo', 'alta', 'Patrocínio fechado', 27),

('a0000000-0000-4000-8000-000000000001',
 'Cotar e fechar backdrop + letra caixa',
 'Aquecimento & Escala', 'F2', -45,
 'Operação & Materiais', 'Operação & Materiais',
 'Produção de materiais de cenografia.',
 'Backdrop + letra caixa cotados e contratados',
 'Produtor + Design', 'alta', 'Identidade visual', 28),

('a0000000-0000-4000-8000-000000000001',
 'Coletar materiais dos palestrantes',
 'Aquecimento & Escala', 'F2', -45,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Coleta de foto, bio, slides e roteiro.',
 'Foto HD + bio oficial + slides (template Science Play) + roteiro',
 'Curador', 'alta', 'Palestrantes confirmados', 29),

('a0000000-0000-4000-8000-000000000001',
 'Encomendar credenciais (palestrantes + staff)',
 'Aquecimento & Escala', 'F2', -40,
 'Operação & Materiais', 'Operação & Materiais',
 'Produção de credenciais e pulseiras.',
 'Credenciais impressas + pulseiras de credenciamento',
 'Produtor', 'media', 'Identidade visual', 30),

('a0000000-0000-4000-8000-000000000001',
 'Configurar fluxos de email pós-compra (RD)',
 'Aquecimento & Escala', 'F2', -40,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Automação de emails de confirmação e aquecimento.',
 'Email de confirmação + 5 emails de aquecimento automatizados',
 'Marketing Ops', 'alta', 'Hotmart configurado', 31),

('a0000000-0000-4000-8000-000000000001',
 'Fechar 2ª cota de patrocínio',
 'Aquecimento & Escala', 'F2', -35,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Fechamento de patrocínio adicional.',
 'Segundo contrato assinado OU cotas menores equivalentes',
 'Comercial Patrocínio', 'alta', '1ª cota fechada', 32),

('a0000000-0000-4000-8000-000000000001',
 'Cotar van/transfer + transporte interno',
 'Aquecimento & Escala', 'F2', -35,
 'Logística & Venue', 'Logística & Venue',
 'Contratação de transporte para palestrantes e equipe.',
 'Locadora contratada + roteiro de transfer',
 'Logística', 'alta', 'Hospedagem confirmada', 33),

('a0000000-0000-4000-8000-000000000001',
 'Virar 2º lote',
 'Aquecimento & Escala', 'F2', -30,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Transição para segundo lote com senso de urgência.',
 'Lote atualizado + comunicação de urgência enviada',
 'Comercial + Marketing', 'critica', 'Inscrições ≥ 70', 34),

('a0000000-0000-4000-8000-000000000001',
 'DRE provisório D-30 (checkpoint)',
 'Aquecimento & Escala', 'F2', -30,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Atualização financeira para checkpoint de viabilidade.',
 'Receita + custos + margem projetada atualizada',
 'Financeiro / Produtor', 'critica', 'Vendas em andamento', 35);


-- ============================================================
-- PHASE F3 — Reta Final & Produção (D-30 a D-7) — 12 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('a0000000-0000-4000-8000-000000000001',
 'Escalar budget Meta (fase Reta Final)',
 'Reta Final & Produção', 'F3', -28,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Aumento agressivo de investimento em tráfego.',
 'Budget diário aumentado 3x–5x + CPL < R$15',
 'Tráfego', 'critica', 'Lote padrão ativo', 36),

('a0000000-0000-4000-8000-000000000001',
 'Imprimir/produzir backdrop e materiais',
 'Reta Final & Produção', 'F3', -25,
 'Operação & Materiais', 'Operação & Materiais',
 'Produção física dos materiais de cenografia.',
 'Backdrop pronto + letra caixa + sacolas entregues',
 'Produtor Executivo', 'alta', 'Artes aprovadas', 37),

('a0000000-0000-4000-8000-000000000001',
 'Briefing detalhado com equipe AV',
 'Reta Final & Produção', 'F3', -21,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Alinhamento técnico completo com equipe audiovisual.',
 'Cronograma técnico + lista de mics + back-up definido',
 'Produtor + AV', 'critica', 'AV contratado', 38),

('a0000000-0000-4000-8000-000000000001',
 'Confirmar logística individual c/ palestrantes',
 'Reta Final & Produção', 'F3', -21,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Confirmação final de toda logística por palestrante.',
 'Passagem + hotel + transfer + horário confirmados',
 'Curador + Logística', 'critica', 'Passagens emitidas', 39),

('a0000000-0000-4000-8000-000000000001',
 'Disparo de campanha últimas vagas WhatsApp',
 'Reta Final & Produção', 'F3', -18,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Comunicação de urgência para leads quentes.',
 'Lista de leads quentes → mensagem de urgência',
 'Marketing + Comercial', 'critica', 'Plano de mídia', 40),

('a0000000-0000-4000-8000-000000000001',
 'Checkpoint D-15: viabilidade financeira',
 'Reta Final & Produção', 'F3', -15,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Ponto de decisão Go/No-Go formal.',
 'DRE atualizado + decisão Go/No-Go ratificada pelo CEO',
 'CEO + Produtor + Financeiro', 'critica', 'DRE atualizado', 41),

('a0000000-0000-4000-8000-000000000001',
 'Confirmar serviço de sala',
 'Reta Final & Produção', 'F3', -15,
 'Logística & Venue', 'Logística & Venue',
 'Confirmação final do serviço de sala com fornecedor.',
 'Confirmação por escrito do fornecedor com horários + quantidades',
 'Produtor', 'alta', 'Venue contratado', 42),

('a0000000-0000-4000-8000-000000000001',
 'Subir campanha Reta Final Meta',
 'Reta Final & Produção', 'F3', -14,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Campanha exclusiva para os últimos 14 dias.',
 'Campanha exclusiva últimos 14 dias com urgência',
 'Tráfego', 'critica', 'Campanha conversão', 43),

('a0000000-0000-4000-8000-000000000001',
 'Manutenção elétrica e limpeza do venue',
 'Reta Final & Produção', 'F3', -12,
 'Operação & Materiais', 'Operação & Materiais',
 'Preparação técnica do espaço.',
 'Fornecedores contratados + boleto agendado',
 'Produtor', 'alta', 'Venue contratado', 44),

('a0000000-0000-4000-8000-000000000001',
 'Receber slides finais dos palestrantes',
 'Reta Final & Produção', 'F3', -10,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Coleta e revisão dos slides definitivos.',
 'Slides em PPT/Keynote no template oficial + revisados',
 'Curador', 'critica', 'Briefing palestrantes', 45),

('a0000000-0000-4000-8000-000000000001',
 'Disparar emails de aquecimento (D-10/D-7/D-3)',
 'Reta Final & Produção', 'F3', -10,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Sequência de aquecimento para inscritos confirmados.',
 'Sequência ativa + open rate monitorado',
 'Marketing Ops', 'alta', 'Fluxo configurado', 46),

('a0000000-0000-4000-8000-000000000001',
 'Alugar locker/depósito',
 'Reta Final & Produção', 'F3', -8,
 'Operação & Materiais', 'Operação & Materiais',
 'Espaço de armazenamento próximo ao venue.',
 'Espaço contratado próximo ao venue',
 'Produtor', 'media', 'Materiais prontos', 47);


-- ============================================================
-- PHASE F4 — Montagem & Preparação (D-7 a D-1) — 13 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('a0000000-0000-4000-8000-000000000001',
 'DRE provisório D-7',
 'Montagem & Preparação', 'F4', -7,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Última projeção financeira antes do evento.',
 'Margem real projetada ≥ 15%',
 'Financeiro / Produtor', 'critica', 'Vendas em andamento', 48),

('a0000000-0000-4000-8000-000000000001',
 'Lista oficial de inscritos consolidada',
 'Montagem & Preparação', 'F4', -7,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Consolidação da lista final de participantes.',
 'Planilha com nome, CPF, email, lote, valor, profissão',
 'Comercial / Operações', 'critica', NULL, 49),

('a0000000-0000-4000-8000-000000000001',
 'Imprimir crachás dos inscritos',
 'Montagem & Preparação', 'F4', -6,
 'Operação & Materiais', 'Operação & Materiais',
 'Impressão de crachás com margem de segurança.',
 'Crachás impressos por lote alfabético + reserva 20% extras',
 'Produtor + Design', 'critica', 'Lista de inscritos', 50),

('a0000000-0000-4000-8000-000000000001',
 'Confirmar coffee break (assinatura final)',
 'Montagem & Preparação', 'F4', -5,
 'Logística & Venue', 'Logística & Venue',
 'Fechamento final do serviço de alimentação.',
 'Cardápio fechado + quantidade ajustada + 50% pago',
 'Produtor', 'critica', 'Lista de inscritos', 51),

('a0000000-0000-4000-8000-000000000001',
 'Montar kits congressista (sacola pronta)',
 'Montagem & Preparação', 'F4', -5,
 'Operação & Materiais', 'Operação & Materiais',
 'Montagem física dos kits de boas-vindas.',
 'Kits montados com sacola + materiais + brindes',
 'Produtor + Staff', 'alta', 'Kit definido', 52),

('a0000000-0000-4000-8000-000000000001',
 'Reunião de alinhamento com equipe AV',
 'Montagem & Preparação', 'F4', -4,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Alinhamento final do roteiro técnico.',
 'Roteiro técnico final + cues de palco + músicas definidas',
 'Produtor + AV', 'alta', 'Slides recebidos', 53),

('a0000000-0000-4000-8000-000000000001',
 'Disparo último email + último WhatsApp',
 'Montagem & Preparação', 'F4', -3,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Comunicação final com informações práticas.',
 'Mensagem com info prática (horário, endereço, dress code)',
 'Marketing', 'alta', 'Lista consolidada', 54),

('a0000000-0000-4000-8000-000000000001',
 'Briefing final com palestrantes (call)',
 'Montagem & Preparação', 'F4', -3,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Última chamada de alinhamento com palestrantes.',
 'Call de 30min revisando horários + dinâmica + interações',
 'Curador + Produtor', 'critica', 'Slides recebidos', 55),

('a0000000-0000-4000-8000-000000000001',
 'Check-in da equipe Science Play na praça',
 'Montagem & Preparação', 'F4', -2,
 'Logística & Venue', 'Logística & Venue',
 'Chegada e instalação da equipe no destino.',
 'Equipe hospedada no hotel oficial + equipamentos conferidos',
 'Logística', 'critica', 'Hospedagem reservada', 56),

('a0000000-0000-4000-8000-000000000001',
 'Montagem do venue (08h–18h)',
 'Montagem & Preparação', 'F4', -1,
 'Logística & Venue', 'Logística & Venue',
 'Montagem completa do espaço do evento.',
 'Backdrop + letra caixa + AV + sala aprovados pelo Produtor',
 'Produtor + Staff + AV', 'critica', 'Materiais no venue', 57),

('a0000000-0000-4000-8000-000000000001',
 'Passagem de som e teste técnico completo',
 'Montagem & Preparação', 'F4', -1,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Teste completo de toda infraestrutura técnica.',
 'Som, mic, projeção, gravação, internet 1Gb testados e OK',
 'AV + Produtor', 'critica', 'AV montado', 58),

('a0000000-0000-4000-8000-000000000001',
 'Recepção dos palestrantes',
 'Montagem & Preparação', 'F4', -1,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Recepção VIP dos palestrantes na cidade.',
 'Transfer aeroporto → hotel + jantar + credencial entregue',
 'Curador + Logística', 'alta', 'Transfers contratados', 59),

('a0000000-0000-4000-8000-000000000001',
 'Briefing geral de staff',
 'Montagem & Preparação', 'F4', -1,
 'Operação & Materiais', 'Operação & Materiais',
 'Alinhamento final com toda equipe operacional.',
 'Toda equipe presente + funções distribuídas + ensaio geral',
 'Produtor Executivo', 'critica', 'Equipe contratada', 60);


-- ============================================================
-- PHASE F5 — Execução (D-Day) — 9 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('a0000000-0000-4000-8000-000000000001',
 'Abertura de credenciamento (07h)',
 'Execução', 'F5', 0,
 'Operação & Materiais', 'Operação & Materiais',
 'Início do credenciamento dos participantes.',
 '3 recepcionistas + crachás organizados + fila funcional',
 'Produtor + Recepção', 'critica', 'Crachás impressos', 61),

('a0000000-0000-4000-8000-000000000001',
 'Início da gravação + transmissão social',
 'Execução', 'F5', 0,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Início da captação audiovisual e transmissão social.',
 'Captação principal + 2 câmeras + social media OK',
 'AV + Social Media', 'critica', 'AV testado', 62),

('a0000000-0000-4000-8000-000000000001',
 'Gestão de palco (cumprimento de horário)',
 'Execução', 'F5', 0,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Controle de tempo e fluxo das palestras.',
 'Cada palestra dentro do tempo previsto (±5min)',
 'Curador + Produtor', 'critica', 'Briefing palestrantes', 63),

('a0000000-0000-4000-8000-000000000001',
 'Ativação de patrocinadores no palco',
 'Execução', 'F5', 0,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Execução das ativações contratadas no palco.',
 'Cada patrocinador ativado conforme contrato',
 'Comercial + Produtor', 'critica', 'Contratos patrocínio', 64),

('a0000000-0000-4000-8000-000000000001',
 'Coffee break (manhã + tarde)',
 'Execução', 'F5', 0,
 'Operação & Materiais', 'Operação & Materiais',
 'Serviço de alimentação nos intervalos.',
 'Coffee servido nos intervalos sem atraso',
 'Produtor + Fornecedor', 'alta', 'Coffee contratado', 65),

('a0000000-0000-4000-8000-000000000001',
 'Captação de leads + upsell em palco',
 'Execução', 'F5', 0,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Geração de leads e ofertas durante o evento.',
 'QR code + formulário + lista de interessados',
 'Marketing + Comercial', 'alta', NULL, 66),

('a0000000-0000-4000-8000-000000000001',
 'Cobertura social media ao vivo',
 'Execução', 'F5', 0,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Publicação em tempo real nas redes sociais.',
 'Stories + Reels + mínimo 15 publicações ao vivo',
 'Social Media', 'alta', 'Pacote contratado', 67),

('a0000000-0000-4000-8000-000000000001',
 'Aplicar pesquisa NPS no final do evento',
 'Execução', 'F5', 0,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Coleta de feedback imediato dos participantes.',
 'Form NPS + 3 perguntas abertas enviado a 100% inscritos',
 'Marketing', 'critica', 'Form criado', 68),

('a0000000-0000-4000-8000-000000000001',
 'Encerramento + foto oficial',
 'Execução', 'F5', 0,
 'Curadoria & Palestrantes', 'Curadoria & Palestrantes',
 'Encerramento formal do evento.',
 'Foto oficial com palestrantes + agradecimento de palco',
 'Curador + Produtor', 'alta', NULL, 69);


-- ============================================================
-- PHASE F6 — Pós-evento & Fechamento (D+1 a D+30) — 12 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('a0000000-0000-4000-8000-000000000001',
 'Desmontagem + devolução de materiais',
 'Pós-evento & Fechamento', 'F6', 1,
 'Logística & Venue', 'Logística & Venue',
 'Desmontagem do evento e devolução de itens.',
 'Backdrop e materiais devolvidos + locker desocupado',
 'Produtor + Staff', 'alta', NULL, 70),

('a0000000-0000-4000-8000-000000000001',
 'Check-out + transfer palestrantes',
 'Pós-evento & Fechamento', 'F6', 1,
 'Logística & Venue', 'Logística & Venue',
 'Logística de saída dos palestrantes.',
 'Todos palestrantes embarcados + reembolsos documentados',
 'Logística', 'alta', NULL, 71),

('a0000000-0000-4000-8000-000000000001',
 'Reunião de retrospectiva (post-mortem)',
 'Pós-evento & Fechamento', 'F6', 2,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Análise completa do evento com toda equipe.',
 'Call 90min com toda equipe + ata registrada',
 'Produtor Executivo', 'critica', NULL, 72),

('a0000000-0000-4000-8000-000000000001',
 'Email + WhatsApp agradecimento aos inscritos',
 'Pós-evento & Fechamento', 'F6', 3,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Comunicação de agradecimento e engajamento pós-evento.',
 'Mensagem com fotos prévias + teaser próxima edição',
 'Marketing', 'alta', NULL, 73),

('a0000000-0000-4000-8000-000000000001',
 'Entrega de fotos oficiais',
 'Pós-evento & Fechamento', 'F6', 5,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Recebimento e publicação do banco de fotos.',
 'Banco de fotos selecionadas entregue + galeria pública',
 'Fotógrafo', 'alta', NULL, 74),

('a0000000-0000-4000-8000-000000000001',
 'Entrega de reels e cobertura',
 'Pós-evento & Fechamento', 'F6', 7,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Recebimento de todo material de vídeo editado.',
 '15 reels editados + cobertura completa entregues',
 'Social Media', 'alta', NULL, 75),

('a0000000-0000-4000-8000-000000000001',
 'DRE final do evento',
 'Pós-evento & Fechamento', 'F6', 7,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Fechamento financeiro definitivo do evento.',
 'Todos custos contabilizados + margem real calculada + comparativo cenários',
 'Financeiro / Produtor', 'critica', 'Reembolsos quitados', 76),

('a0000000-0000-4000-8000-000000000001',
 'Publicação de aftermovie/reels',
 'Pós-evento & Fechamento', 'F6', 10,
 'Marketing & Tráfego', 'Marketing & Tráfego',
 'Publicação do aftermovie e reels nas redes.',
 'Aftermovie e 10+ reels publicados nos perfis Science Play',
 'Marketing', 'alta', 'Fotos e vídeos entregues', 77),

('a0000000-0000-4000-8000-000000000001',
 'Enviar relatório ao patrocinador',
 'Pós-evento & Fechamento', 'F6', 14,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Report completo de entregáveis para patrocinadores.',
 'Report com entregáveis + métricas + fotos + NPS',
 'Comercial Patrocínio', 'critica', 'DRE final', 78),

('a0000000-0000-4000-8000-000000000001',
 'Abrir pré-venda da próxima edição',
 'Pós-evento & Fechamento', 'F6', 14,
 'Vendas & Atendimento', 'Vendas & Atendimento',
 'Aproveitamento do momentum para próxima edição.',
 'Página no ar com early-bird + disparo para base do evento',
 'Comercial', 'alta', 'Post-mortem concluído', 79),

('a0000000-0000-4000-8000-000000000001',
 'Renovação de patrocínio para próxima edição',
 'Pós-evento & Fechamento', 'F6', 21,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Início do ciclo de renovação com patrocinadores.',
 'Proposta enviada + reunião agendada',
 'Comercial Patrocínio', 'alta', 'Relatório entregue', 80),

('a0000000-0000-4000-8000-000000000001',
 'Atualizar playbook operacional',
 'Pós-evento & Fechamento', 'F6', 30,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Incorporação de aprendizados ao playbook.',
 'Melhorias registradas + novos benchmarks atualizados',
 'Produtor Executivo', 'alta', 'Post-mortem', 81);


-- ============================================================
-- GO/NO-GO CHECKPOINT TEMPLATES (6 checkpoints)
-- ============================================================

INSERT INTO public.checkpoint_templates (template_id, name, deadline_offset, criteria_go, criteria_nogo, decisor, action_nogo) VALUES

('a0000000-0000-4000-8000-000000000001',
 'Pré-venda lançada',
 -90,
 '≥30 inscrições nos primeiros 7 dias',
 '<15 inscrições',
 'Produtor Executivo',
 'Refazer copy + reabrir tráfego'),

('a0000000-0000-4000-8000-000000000001',
 'Patrocínio âncora',
 -60,
 '≥1 cota fechada (mín R$15k)',
 'Nenhuma cota',
 'CEO Science Play',
 'Reduzir escopo de produção em 20%'),

('a0000000-0000-4000-8000-000000000001',
 'Venue contratado',
 -60,
 'Contrato assinado + 50% pago',
 'Sem venue confirmado',
 'Produtor Executivo',
 'Adiar edição em 30 dias'),

('a0000000-0000-4000-8000-000000000001',
 'Inscrições parciais',
 -30,
 '≥70 inscrições',
 '<50 inscrições',
 'Produtor Executivo',
 'Acionar plano de tráfego de emergência'),

('a0000000-0000-4000-8000-000000000001',
 'Inscrições finais',
 -15,
 '≥110 inscrições',
 '<90 inscrições',
 'CEO + Produtor',
 'Reavaliar viabilidade financeira'),

('a0000000-0000-4000-8000-000000000001',
 'DRE provisório',
 -7,
 'Margem projetada ≥15%',
 'Margem <10%',
 'CFO / Financeiro',
 'Cortar linhas de custo evitáveis');


COMMIT;

-- ============================================================
-- Seed complete: 81 tasks + 6 checkpoints for "Imersão Nutrição Brasil"
-- ============================================================
