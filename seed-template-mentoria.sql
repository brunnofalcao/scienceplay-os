-- ============================================================
-- Science Play OS v5 — Seed: Template "Mentoria / Imersão Premium"
-- 50 tasks + 4 Go/No-Go checkpoint templates.
-- Safe to re-run: deletes existing template with same name first.
-- ============================================================

BEGIN;

-- ---------- Clean up existing template ----------

DELETE FROM public.checkpoint_templates
WHERE template_id IN (SELECT id FROM public.templates WHERE name = 'Mentoria / Imersão Premium');

DELETE FROM public.template_tasks
WHERE template_id IN (SELECT id FROM public.templates WHERE name = 'Mentoria / Imersão Premium');

DELETE FROM public.templates WHERE name = 'Mentoria / Imersão Premium';


-- ---------- Create template ----------

INSERT INTO public.templates (id, name, event_type, description)
VALUES (
  'b0000000-0000-4000-8000-000000000002',
  'Mentoria / Imersão Premium',
  'mentoria',
  'Template operacional para mentorias e imersões premium (Golden, Palestre-se, A Mesa) — 50 tarefas em 6 fases (F0–F5) com critérios de entrega, dependências e checkpoints Go/No-Go. Grupos de 20-50 pessoas, 1-2 dias, foco em experiência e transformação.'
);


-- ============================================================
-- PHASE F0 — Fundação (D-90 a D-60) — 7 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('b0000000-0000-4000-8000-000000000002',
 'Definir conceito e posicionamento da edição',
 'Fundação', 'F0', -90,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Definição do tema central, formato e promessa principal da mentoria/imersão.',
 'Tema + formato + promessa principal aprovados pelo CEO',
 'CEO', 'critica', NULL, 1),

('b0000000-0000-4000-8000-000000000002',
 'Definir mentores/palestrantes (3-6 nomes)',
 'Fundação', 'F0', -90,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Seleção e pré-confirmação dos mentores que conduzirão a experiência.',
 'Confirmação verbal dos mentores + temas definidos',
 'CEO', 'critica', NULL, 2),

('b0000000-0000-4000-8000-000000000002',
 'Modelar DRE projetado',
 'Fundação', 'F0', -85,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Projeção financeira com cenários para decisão de viabilidade.',
 '3 cenários (pessimista/base/otimista) + breakeven + ticket médio definido',
 'Produtor', 'critica', 'Conceito definido', 3),

('b0000000-0000-4000-8000-000000000002',
 'Cotar e reservar venue premium',
 'Fundação', 'F0', -80,
 'Logística & Venue', 'Logística & Venue',
 'Cotação e fechamento de espaço íntimo e premium (hotel, espaço privado).',
 'Contrato assinado + sinal pago + layout confirmado',
 'Produtor', 'critica', NULL, 4),

('b0000000-0000-4000-8000-000000000002',
 'Cotar e reservar hospedagem (mentores + equipe)',
 'Fundação', 'F0', -80,
 'Logística & Venue', 'Logística & Venue',
 'Reserva de hospedagem com upgrade para mentores.',
 'Reservas confirmadas + upgrade para mentores garantido',
 'Logística', 'alta', NULL, 5),

('b0000000-0000-4000-8000-000000000002',
 'Definir estrutura de preço e condições',
 'Fundação', 'F0', -75,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Definição de pricing premium, parcelamento e early-bird.',
 'Pricing + parcelamento + early-bird definidos e aprovados',
 'CEO + Produtor', 'critica', 'DRE projetado', 6),

('b0000000-0000-4000-8000-000000000002',
 'Criar página de vendas + checkout',
 'Fundação', 'F0', -70,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Página de vendas premium com checkout funcional.',
 'Página no ar + checkout testado + pixel instalado',
 'Comercial', 'critica', 'Pricing definido', 7);


-- ============================================================
-- PHASE F1 — Lançamento & Comercial (D-60 a D-30) — 10 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('b0000000-0000-4000-8000-000000000002',
 'Lançar vendas (early-bird)',
 'Lançamento & Comercial', 'F1', -60,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Abertura oficial de vendas com condição especial early-bird.',
 'Primeira venda registrada + campanha ativa',
 'Comercial + CEO', 'critica', 'Página no ar', 8),

('b0000000-0000-4000-8000-000000000002',
 'Enviar convites formais + termo aos mentores',
 'Lançamento & Comercial', 'F1', -60,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Formalização dos convites com termos e detalhes do evento.',
 'Termos assinados + temas confirmados + bio recebida',
 'Curador', 'critica', 'Mentores definidos', 9),

('b0000000-0000-4000-8000-000000000002',
 'Disparo WhatsApp para base qualificada',
 'Lançamento & Comercial', 'F1', -55,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Comunicação direta para lista segmentada de leads premium.',
 'Lista segmentada enviada + respostas monitoradas',
 'Marketing', 'critica', 'Vendas abertas', 10),

('b0000000-0000-4000-8000-000000000002',
 'Campanha de email (sequência 5 emails)',
 'Lançamento & Comercial', 'F1', -50,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Sequência automatizada de emails para nutrição e conversão.',
 'Sequência ativa + open rate monitorado',
 'Marketing', 'alta', 'Vendas abertas', 11),

('b0000000-0000-4000-8000-000000000002',
 'Fechar passagens aéreas dos mentores',
 'Lançamento & Comercial', 'F1', -45,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Emissão de bilhetes aéreos para mentores confirmados.',
 'Bilhetes emitidos + localizadores salvos',
 'Logística', 'critica', 'Termos assinados', 12),

('b0000000-0000-4000-8000-000000000002',
 'Definir kit do participante (premium)',
 'Lançamento & Comercial', 'F1', -45,
 'Operação & Experiência', 'Operação & Experiência',
 'Definição dos itens premium que compõem o kit do participante.',
 'Itens definidos + fornecedores cotados + prazo de entrega OK',
 'Produtor', 'alta', NULL, 13),

('b0000000-0000-4000-8000-000000000002',
 'Contratar foto + vídeo + social media',
 'Lançamento & Comercial', 'F1', -40,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Contratação de equipe de cobertura audiovisual.',
 'Pacote contratado + briefing enviado',
 'Marketing', 'alta', NULL, 14),

('b0000000-0000-4000-8000-000000000002',
 'Checkpoint D-35: viabilidade',
 'Lançamento & Comercial', 'F1', -35,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Ponto de decisão Go/No-Go baseado em inscrições e DRE.',
 'Inscrições ≥ 50% da meta + DRE atualizado',
 'CEO + Produtor', 'critica', 'Vendas em andamento', 15),

('b0000000-0000-4000-8000-000000000002',
 'Campanha últimas vagas (urgência)',
 'Lançamento & Comercial', 'F1', -30,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Disparo de urgência para preencher vagas remanescentes.',
 'Disparo WhatsApp + email + stories com countdown',
 'Marketing', 'critica', NULL, 16),

('b0000000-0000-4000-8000-000000000002',
 'Definir cardápio premium (coffee + almoço/jantar)',
 'Lançamento & Comercial', 'F1', -30,
 'Operação & Experiência', 'Operação & Experiência',
 'Fechamento de cardápio premium com fornecedor.',
 'Cardápio aprovado + contrato com fornecedor assinado',
 'Produtor', 'critica', 'Venue confirmado', 17);


-- ============================================================
-- PHASE F2 — Preparação (D-30 a D-7) — 10 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('b0000000-0000-4000-8000-000000000002',
 'Briefing de ambientação do espaço',
 'Preparação', 'F2', -28,
 'Operação & Experiência', 'Operação & Experiência',
 'Definição do layout, decoração, flores, aromas e ambientação premium.',
 'Layout + decoração + flores + aromas definidos e aprovados',
 'Produtor', 'alta', 'Venue confirmado', 18),

('b0000000-0000-4000-8000-000000000002',
 'Coletar materiais dos mentores',
 'Preparação', 'F2', -25,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Coleta de slides, bio HD, foto e roteiro de cada mentor.',
 'Slides + bio HD + foto + roteiro recebidos de todos mentores',
 'Curador', 'alta', 'Termos assinados', 19),

('b0000000-0000-4000-8000-000000000002',
 'Produzir materiais (credenciais, backdrop, kits)',
 'Preparação', 'F2', -21,
 'Operação & Experiência', 'Operação & Experiência',
 'Produção de materiais físicos personalizados.',
 'Materiais em produção + prazo de entrega confirmado',
 'Produtor', 'alta', NULL, 20),

('b0000000-0000-4000-8000-000000000002',
 'Lista oficial de inscritos consolidada',
 'Preparação', 'F2', -21,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Consolidação da lista final de participantes com dados completos.',
 'Planilha com dados completos de cada participante',
 'Comercial', 'critica', NULL, 21),

('b0000000-0000-4000-8000-000000000002',
 'DRE provisório D-15',
 'Preparação', 'F2', -15,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Atualização financeira com receita e custos reais.',
 'Receita + custos + margem real projetada atualizada',
 'Financeiro', 'critica', NULL, 22),

('b0000000-0000-4000-8000-000000000002',
 'Confirmar logística individual com mentores',
 'Preparação', 'F2', -14,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Confirmação final de toda logística por mentor.',
 'Voo + hotel + transfer + horário de palco confirmados',
 'Curador + Logística', 'critica', 'Passagens emitidas', 23),

('b0000000-0000-4000-8000-000000000002',
 'Briefing com equipe AV',
 'Preparação', 'F2', -12,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Alinhamento técnico com equipe audiovisual.',
 'Cronograma técnico + equipamentos + backup definidos',
 'Produtor + AV', 'alta', NULL, 24),

('b0000000-0000-4000-8000-000000000002',
 'Receber slides/materiais finais dos mentores',
 'Preparação', 'F2', -10,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Coleta e revisão dos slides definitivos no template oficial.',
 'Slides no template oficial + revisados e aprovados',
 'Curador', 'critica', NULL, 25),

('b0000000-0000-4000-8000-000000000002',
 'Disparar email logístico (endereço, horário, dress code)',
 'Preparação', 'F2', -10,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Comunicação com informações práticas para participantes.',
 'Email enviado + open rate monitorado',
 'Marketing', 'alta', 'Lista consolidada', 26),

('b0000000-0000-4000-8000-000000000002',
 'Encomendar brindes/presentes personalizados',
 'Preparação', 'F2', -8,
 'Operação & Experiência', 'Operação & Experiência',
 'Encomenda de brindes premium personalizados para participantes.',
 'Produção confirmada + entrega até D-2 garantida',
 'Produtor', 'media', NULL, 27);


-- ============================================================
-- PHASE F3 — Montagem (D-7 a D-1) — 9 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('b0000000-0000-4000-8000-000000000002',
 'DRE provisório D-7',
 'Montagem', 'F3', -7,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Última projeção financeira antes do evento.',
 'Margem projetada ≥ 20%',
 'Financeiro', 'critica', NULL, 28),

('b0000000-0000-4000-8000-000000000002',
 'Imprimir credenciais + materiais personalizados',
 'Montagem', 'F3', -6,
 'Operação & Experiência', 'Operação & Experiência',
 'Impressão de crachás com nome e credenciais personalizadas.',
 'Crachás com nome + credenciais por nome prontas e conferidas',
 'Produtor + Design', 'critica', 'Lista consolidada', 29),

('b0000000-0000-4000-8000-000000000002',
 'Montar kits premium (sacola + materiais)',
 'Montagem', 'F3', -5,
 'Operação & Experiência', 'Operação & Experiência',
 'Montagem física dos kits premium de boas-vindas.',
 'Kits montados com todos os itens + conferidos individualmente',
 'Produtor', 'alta', 'Kit definido', 30),

('b0000000-0000-4000-8000-000000000002',
 'Briefing final com mentores (call/WhatsApp)',
 'Montagem', 'F3', -3,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Última chamada de alinhamento com todos mentores.',
 'Horários + dinâmica + expectativas alinhadas com cada mentor',
 'Curador', 'critica', 'Slides recebidos', 31),

('b0000000-0000-4000-8000-000000000002',
 'Disparar mensagem final (WhatsApp + email)',
 'Montagem', 'F3', -2,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Comunicação final com informações práticas e expectativas.',
 'Mensagem com info prática + mapa + expectativas enviada',
 'Marketing', 'alta', NULL, 32),

('b0000000-0000-4000-8000-000000000002',
 'Check-in da equipe na praça',
 'Montagem', 'F3', -2,
 'Logística & Venue', 'Logística & Venue',
 'Chegada e instalação da equipe no destino.',
 'Equipe no hotel + materiais conferidos + checklists OK',
 'Logística', 'critica', NULL, 33),

('b0000000-0000-4000-8000-000000000002',
 'Montagem do venue + ambientação',
 'Montagem', 'F3', -1,
 'Logística & Venue', 'Logística & Venue',
 'Montagem completa do espaço com ambientação premium.',
 'Espaço montado + decorado + AV testado + aprovado pelo Produtor',
 'Produtor + Staff', 'critica', NULL, 34),

('b0000000-0000-4000-8000-000000000002',
 'Teste técnico completo (som, projeção, gravação)',
 'Montagem', 'F3', -1,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Teste completo de toda infraestrutura técnica.',
 'Todos equipamentos testados + backup OK',
 'AV + Produtor', 'critica', 'AV montado', 35),

('b0000000-0000-4000-8000-000000000002',
 'Recepção dos mentores + jantar/welcome',
 'Montagem', 'F3', -1,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Recepção VIP dos mentores com jantar de boas-vindas.',
 'Mentores recepcionados + credenciais entregues + jantar realizado',
 'Curador + Logística', 'alta', 'Transfers contratados', 36);


-- ============================================================
-- PHASE F4 — Execução (D-Day) — 6 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('b0000000-0000-4000-8000-000000000002',
 'Abertura + recepção dos participantes',
 'Execução', 'F4', 0,
 'Operação & Experiência', 'Operação & Experiência',
 'Recepção premium com credenciais e welcome drink.',
 'Recepção premium realizada + credenciais entregues + welcome drink servido',
 'Produtor + Staff', 'critica', 'Credenciais prontas', 37),

('b0000000-0000-4000-8000-000000000002',
 'Gestão de palco e cronograma',
 'Execução', 'F4', 0,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Controle de tempo e fluxo das palestras/mentorias.',
 'Palestras/mentorias no tempo + transições suaves entre mentores',
 'Curador + Produtor', 'critica', 'Briefing mentores', 38),

('b0000000-0000-4000-8000-000000000002',
 'Captação audiovisual + social media ao vivo',
 'Execução', 'F4', 0,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Gravação profissional e cobertura social media em tempo real.',
 'Gravação + stories + reels em tempo real publicados',
 'AV + Social Media', 'alta', 'AV testado', 39),

('b0000000-0000-4000-8000-000000000002',
 'Coffee + almoço/jantar premium',
 'Execução', 'F4', 0,
 'Operação & Experiência', 'Operação & Experiência',
 'Serviço de alimentação premium nos horários previstos.',
 'Refeições servidas no padrão premium + timing correto',
 'Produtor + Fornecedor', 'critica', 'Cardápio contratado', 40),

('b0000000-0000-4000-8000-000000000002',
 'Captação de depoimentos + NPS',
 'Execução', 'F4', 0,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Coleta de depoimentos gravados e pesquisa NPS.',
 'Formulário NPS enviado + depoimentos em vídeo gravados',
 'Marketing', 'alta', NULL, 41),

('b0000000-0000-4000-8000-000000000002',
 'Encerramento + foto oficial + entrega de certificados',
 'Execução', 'F4', 0,
 'Curadoria & Mentores', 'Curadoria & Mentores',
 'Encerramento formal com foto coletiva e certificados.',
 'Foto coletiva realizada + certificados entregues + agradecimento',
 'Curador', 'alta', NULL, 42);


-- ============================================================
-- PHASE F5 — Pós-evento & Fechamento (D+1 a D+30) — 8 tasks
-- ============================================================

INSERT INTO public.template_tasks (template_id, title, phase, phase_code, day_offset, area, department, description, done_criteria, responsible_role, priority, dependency, sort_order) VALUES

('b0000000-0000-4000-8000-000000000002',
 'Desmontagem + check-out equipe e mentores',
 'Pós-evento & Fechamento', 'F5', 1,
 'Logística & Venue', 'Logística & Venue',
 'Desmontagem do espaço e logística de saída.',
 'Espaço devolvido + materiais guardados + mentores embarcados',
 'Produtor + Staff', 'alta', NULL, 43),

('b0000000-0000-4000-8000-000000000002',
 'Reunião de retrospectiva (post-mortem)',
 'Pós-evento & Fechamento', 'F5', 2,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Análise completa do evento com equipe.',
 'Call com equipe completa + ata registrada',
 'Produtor', 'critica', NULL, 44),

('b0000000-0000-4000-8000-000000000002',
 'Email/WhatsApp de agradecimento + fotos',
 'Pós-evento & Fechamento', 'F5', 3,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Comunicação de agradecimento com fotos prévias e depoimentos.',
 'Mensagem enviada com fotos prévias + depoimentos',
 'Marketing', 'alta', NULL, 45),

('b0000000-0000-4000-8000-000000000002',
 'Entrega de fotos oficiais',
 'Pós-evento & Fechamento', 'F5', 5,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Recebimento e entrega da galeria de fotos selecionadas.',
 'Galeria selecionada entregue aos participantes',
 'Fotógrafo', 'alta', NULL, 46),

('b0000000-0000-4000-8000-000000000002',
 'Entrega de vídeo/reels/aftermovie',
 'Pós-evento & Fechamento', 'F5', 7,
 'Produção AV & Conteúdo', 'Produção AV & Conteúdo',
 'Recebimento de vídeos editados e aftermovie.',
 'Vídeos editados + publicados nas redes',
 'Social Media', 'alta', NULL, 47),

('b0000000-0000-4000-8000-000000000002',
 'DRE final do evento',
 'Pós-evento & Fechamento', 'F5', 7,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Fechamento financeiro definitivo do evento.',
 'Todos custos contabilizados + receita final + margem calculada',
 'Financeiro', 'critica', 'Reembolsos quitados', 48),

('b0000000-0000-4000-8000-000000000002',
 'Abrir inscrições para próxima edição/turma',
 'Pós-evento & Fechamento', 'F5', 14,
 'Marketing & Vendas', 'Marketing & Vendas',
 'Aproveitamento do momentum para próxima edição.',
 'Página de pré-inscrição no ar + disparo para participantes',
 'Comercial', 'alta', 'Post-mortem concluído', 49),

('b0000000-0000-4000-8000-000000000002',
 'Atualizar playbook operacional da mentoria',
 'Pós-evento & Fechamento', 'F5', 21,
 'Estratégia & Comercial', 'Estratégia & Comercial',
 'Incorporação de aprendizados e benchmarks ao playbook.',
 'Melhorias registradas + benchmarks atualizados',
 'Produtor', 'alta', 'Post-mortem', 50);


-- ============================================================
-- GO/NO-GO CHECKPOINT TEMPLATES (4 checkpoints)
-- ============================================================

INSERT INTO public.checkpoint_templates (template_id, name, deadline_offset, criteria_go, criteria_nogo, decisor, action_nogo) VALUES

('b0000000-0000-4000-8000-000000000002',
 'Vendas abertas',
 -60,
 '≥5 inscrições na 1ª semana',
 '0 inscrições na 1ª semana',
 'CEO',
 'Reformular oferta e reposicionar comunicação'),

('b0000000-0000-4000-8000-000000000002',
 'Viabilidade',
 -35,
 '≥50% da meta de inscrições',
 '<30% da meta de inscrições',
 'CEO + Produtor',
 'Acionar plano de urgência (WhatsApp + convites diretos)'),

('b0000000-0000-4000-8000-000000000002',
 'DRE provisório',
 -15,
 'Margem projetada ≥20%',
 'Margem projetada <12%',
 'CEO',
 'Cortar custos não essenciais e renegociar fornecedores'),

('b0000000-0000-4000-8000-000000000002',
 'Confirmação final',
 -7,
 'Margem ≥18% + mentores confirmados',
 'Margem <10% ou mentor ausente sem substituto',
 'CEO',
 'Replanejar escopo ou cancelar edição');


COMMIT;

-- ============================================================
-- Seed complete: 50 tasks + 4 checkpoints for "Mentoria / Imersão Premium"
-- ============================================================
