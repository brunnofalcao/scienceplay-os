-- ============================================================
-- SCIENCE PLAY OS v4 — SEED DATA
-- Execute DEPOIS do schema-v4.sql
-- ============================================================

-- ============================================================
-- TEMPLATES POP
-- ============================================================

-- Template: Imersao
insert into public.templates (id, name, event_type, description) values
('a1000000-0000-0000-0000-000000000001', 'POP Imersao', 'imersao', 'Procedimento padrao para imersoes presenciais (Balneario, BH, Goiania, Belem, POA)');

-- Template: Congresso
insert into public.templates (id, name, event_type, description) values
('a1000000-0000-0000-0000-000000000002', 'POP Congresso', 'congresso', 'Procedimento padrao para congressos e exposicoes (Nutricao Brasil)');

-- Template: Mentoria
insert into public.templates (id, name, event_type, description) values
('a1000000-0000-0000-0000-000000000003', 'POP Mentoria', 'mentoria', 'Procedimento padrao para mentorias e encontros (Palestre-se, Golden, A Mesa)');

-- (Workshop removido — tipos validos: imersao, congresso, mentoria, certificacao)

-- Template: Certificacao
insert into public.templates (id, name, event_type, description) values
('a1000000-0000-0000-0000-000000000005', 'POP Certificacao', 'certificacao', 'Procedimento padrao para certificacoes internacionais (produto digital hibrido)');

-- ============================================================
-- TEMPLATE TASKS — IMERSAO (95 tarefas)
-- ============================================================

insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
-- Fase: Planejamento (D-120 a D-90)
('a1000000-0000-0000-0000-000000000001', 'Definir data e cidade do evento', 'Planejamento', -120, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Pesquisar e visitar venues (hotel/espaco)', 'Planejamento', -120, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Negociar e fechar contrato do venue', 'Planejamento', -110, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir grade de palestrantes/mentores', 'Planejamento', -110, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Confirmar palestrantes e cachês', 'Planejamento', -100, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir precificacao e lotes', 'Planejamento', -100, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Criar pagina de vendas', 'Planejamento', -95, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Configurar checkout na plataforma', 'Planejamento', -95, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir meta de receita e orcamento', 'Planejamento', -90, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Montar cronograma de divulgacao', 'Planejamento', -90, 'marketing', 'alta'),
-- Fase: Pre-venda (D-90 a D-60)
('a1000000-0000-0000-0000-000000000001', 'Lancar lote 1 (early bird)', 'Pre-venda', -90, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Campanha de lancamento - email blast', 'Pre-venda', -90, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Posts de abertura de vendas (Stories + Feed)', 'Pre-venda', -89, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Ativar trafego pago - campanha de abertura', 'Pre-venda', -88, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Criar sequencia de WhatsApp - base quente', 'Pre-venda', -88, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Gravar video de vendas principal', 'Pre-venda', -85, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Criar criativos de trafego (5 variacoes)', 'Pre-venda', -85, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Enviar convites para lista VIP', 'Pre-venda', -85, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Follow-up email dia 3', 'Pre-venda', -87, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Follow-up email dia 7', 'Pre-venda', -83, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Monitorar metricas - relatorio semanal', 'Pre-venda', -83, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Campanha de prova social / depoimentos', 'Pre-venda', -80, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Virada lote 1 para lote 2', 'Pre-venda', -75, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Email de urgencia - fim lote 1', 'Pre-venda', -76, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Campanha trafego pago - lote 2', 'Pre-venda', -74, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Apresentar patrocinio - prospectar marcas', 'Pre-venda', -80, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Follow-up patrocinadores', 'Pre-venda', -70, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Fechar patrocinios confirmados', 'Pre-venda', -60, 'comercial', 'alta'),
-- Fase: Producao (D-60 a D-14)
('a1000000-0000-0000-0000-000000000001', 'Contratar audiovisual (som, luz, telas)', 'Producao', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Reservar hospedagem palestrantes', 'Producao', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Comprar passagens aereas palestrantes', 'Producao', -55, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Contratar coffee break / alimentacao', 'Producao', -50, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Definir layout e decoracao do espaco', 'Producao', -50, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Criar materiais graficos (banner, backdrop, credenciais)', 'Producao', -45, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Encomendar impressos e papelaria', 'Producao', -40, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Contratar fotografo e videomaker', 'Producao', -40, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Montar roteiro do evento (minuto a minuto)', 'Producao', -35, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir equipe operacional (recepcionistas, apoio)', 'Producao', -35, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Virada lote 2 para lote 3 (ultimos)', 'Producao', -45, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Campanha de escassez - ultimas vagas', 'Producao', -40, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Contratar transporte local (transfer, van)', 'Producao', -30, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Confirmar rider tecnico dos palestrantes', 'Producao', -28, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Enviar briefing para palestrantes', 'Producao', -25, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Teste de plataforma de transmissao (se hibrido)', 'Producao', -20, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Fechar lista de inscritos e credenciais', 'Producao', -14, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Imprimir credenciais e kits', 'Producao', -14, 'operacoes', 'media'),
-- Fase: Semana do Evento (D-7 a D-1)
('a1000000-0000-0000-0000-000000000001', 'Campanha de aquecimento final (stories diarios)', 'Semana do Evento', -7, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Email de confirmacao + orientacoes participantes', 'Semana do Evento', -7, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'WhatsApp grupo participantes - boas vindas', 'Semana do Evento', -5, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Alinhamento final com equipe (reuniao geral)', 'Semana do Evento', -5, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Conferir entrega de materiais no venue', 'Semana do Evento', -3, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Montagem e passagem de som', 'Semana do Evento', -1, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Checklist final de operacao', 'Semana do Evento', -1, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Fechar ultimo lote / encerrar vendas', 'Semana do Evento', -3, 'comercial', 'alta'),
-- Fase: Dia do Evento (D0)
('a1000000-0000-0000-0000-000000000001', 'Abertura do credenciamento', 'Evento', 0, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Cobertura ao vivo (stories + reels)', 'Evento', 0, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Captar depoimentos dos participantes', 'Evento', 0, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Gestao de palco e timeline', 'Evento', 0, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Suporte ao participante (duvidas, wifi, etc)', 'Evento', 0, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Venda de upsell no evento (proxima edicao)', 'Evento', 0, 'comercial', 'alta'),
-- Fase: Pos-evento (D+1 a D+30)
('a1000000-0000-0000-0000-000000000001', 'Email de agradecimento + pesquisa NPS', 'Pos-evento', 1, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Entregar gravacao/material de apoio', 'Pos-evento', 3, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Editar e publicar video recap', 'Pos-evento', 7, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Publicar depoimentos e resultados', 'Pos-evento', 5, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Campanha de remarketing - proxima edicao', 'Pos-evento', 7, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Fechar DRE do evento (todas as notas)', 'Pos-evento', 14, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Pagar fornecedores pendentes', 'Pos-evento', 14, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Reuniao de retrospectiva com equipe', 'Pos-evento', 10, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Documentar aprendizados e melhorias', 'Pos-evento', 14, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Encerrar evento no sistema', 'Pos-evento', 30, 'financeiro', 'media');

-- ============================================================
-- TEMPLATE TASKS — CONGRESSO (85 tarefas)
-- ============================================================

insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
-- Planejamento (D-180 a D-120)
('a1000000-0000-0000-0000-000000000002', 'Definir tema central e naming do congresso', 'Planejamento', -180, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Pesquisar e reservar centro de convencoes', 'Planejamento', -180, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Fechar contrato do espaco', 'Planejamento', -170, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Montar curadoria (keynotes + paineis)', 'Planejamento', -160, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Confirmar keynote speakers internacionais', 'Planejamento', -150, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Definir estrutura de area expositora', 'Planejamento', -150, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Criar pacotes de patrocinio/exposicao', 'Planejamento', -150, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Prospectar patrocinadores master e gold', 'Planejamento', -140, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Definir precificacao de ingressos e lotes', 'Planejamento', -130, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Criar identidade visual do congresso', 'Planejamento', -130, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Criar site/landing page do congresso', 'Planejamento', -125, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Definir orcamento geral e meta', 'Planejamento', -120, 'financeiro', 'alta'),
-- Pre-venda (D-120 a D-60)
('a1000000-0000-0000-0000-000000000002', 'Lancamento oficial - lote 1', 'Pre-venda', -120, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Campanha de lancamento multicanal', 'Pre-venda', -120, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Ativar trafego pago - awareness', 'Pre-venda', -115, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Campanha email marketing semanal', 'Pre-venda', -110, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Fechar primeiros patrocinadores', 'Pre-venda', -100, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Divulgar grade parcial de speakers', 'Pre-venda', -100, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Virada lote 1 para lote 2', 'Pre-venda', -90, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Campanha de urgencia - fim lote 1', 'Pre-venda', -91, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Parcerias com associacoes e universidades', 'Pre-venda', -90, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Virada lote 2 para lote 3', 'Pre-venda', -60, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Fechar grade completa de palestrantes', 'Pre-venda', -60, 'conteudo', 'alta'),
-- Producao (D-60 a D-14)
('a1000000-0000-0000-0000-000000000002', 'Contratar producao audiovisual completa', 'Producao', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Planejar cenografia e sinalizacao', 'Producao', -55, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Contratar catering (coffee + almoco)', 'Producao', -50, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Reservar hotel bloco palestrantes + equipe', 'Producao', -50, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Comprar passagens palestrantes e equipe', 'Producao', -45, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Definir app/plataforma do participante', 'Producao', -45, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Produzir materiais impressos e sinalizacao', 'Producao', -35, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Montar programacao hora a hora (3 palcos)', 'Producao', -30, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Contratar equipe de apoio (60+ pessoas)', 'Producao', -30, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Briefing expositores (montagem, regras)', 'Producao', -25, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Treinar equipe operacional', 'Producao', -14, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Montagem do espaco (3 dias antes)', 'Producao', -3, 'producao', 'alta'),
-- Semana do Evento
('a1000000-0000-0000-0000-000000000002', 'Campanha final de vendas - ultimas vagas', 'Semana do Evento', -7, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Email orientacoes + mapa do evento', 'Semana do Evento', -5, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Passagem de som e teste geral', 'Semana do Evento', -1, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Alinhamento geral equipe (war room)', 'Semana do Evento', -1, 'operacoes', 'alta'),
-- Evento
('a1000000-0000-0000-0000-000000000002', 'Abertura credenciamento', 'Evento', 0, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Gestao multipalco', 'Evento', 0, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Cobertura de midia e social', 'Evento', 0, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Networking facilitado + ativacoes', 'Evento', 0, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Venda proxima edicao + upsell', 'Evento', 0, 'comercial', 'alta'),
-- Pos-evento
('a1000000-0000-0000-0000-000000000002', 'Email agradecimento + NPS', 'Pos-evento', 1, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Report para patrocinadores', 'Pos-evento', 7, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Publicar recap e highlights', 'Pos-evento', 10, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Fechar DRE completo', 'Pos-evento', 21, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Reuniao pos-mortem equipe', 'Pos-evento', 14, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Pagar todos os fornecedores', 'Pos-evento', 21, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Encerrar evento no sistema', 'Pos-evento', 30, 'financeiro', 'media');

-- ============================================================
-- TEMPLATE TASKS — MENTORIA (50 tarefas)
-- ============================================================

insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
('a1000000-0000-0000-0000-000000000003', 'Definir formato e duracao do encontro', 'Planejamento', -60, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Definir local/espaco', 'Planejamento', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Definir curadoria/convidados', 'Planejamento', -50, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Definir vagas e precificacao', 'Planejamento', -50, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Criar pagina de vendas', 'Planejamento', -45, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Configurar checkout', 'Planejamento', -45, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Abrir vendas - comunicacao base', 'Pre-venda', -45, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Envio individual - lista VIP', 'Pre-venda', -44, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Email sequencia de lancamento', 'Pre-venda', -42, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Campanha trafego pago', 'Pre-venda', -40, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'WhatsApp de follow-up', 'Pre-venda', -38, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Virada de lote / urgencia', 'Pre-venda', -30, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Contato 1-a-1 com leads quentes', 'Pre-venda', -25, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Encerrar vendas', 'Pre-venda', -7, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Confirmar reserva espaco/hotel', 'Producao', -30, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Reservar hospedagem mentorados (se imersivo)', 'Producao', -25, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Contratar coffee/alimentacao', 'Producao', -20, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Preparar material de apoio/apostila', 'Producao', -15, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Enviar orientacoes aos participantes', 'Semana do Evento', -7, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Confirmar presenca de todos', 'Semana do Evento', -5, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Montar espaco e materiais', 'Semana do Evento', -1, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Executar encontro', 'Evento', 0, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Registrar presenca e fotos', 'Evento', 0, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Captar depoimentos', 'Evento', 0, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Enviar agradecimento + material', 'Pos-evento', 1, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Publicar conteudo pos', 'Pos-evento', 3, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Fechar DRE', 'Pos-evento', 14, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Encerrar no sistema', 'Pos-evento', 21, 'financeiro', 'media');

-- (Workshop tasks removidas — tipo nao existe mais)

-- ============================================================
-- TEMPLATE TASKS — CERTIFICACAO (40 tarefas)
-- ============================================================

insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
('a1000000-0000-0000-0000-000000000005', 'Definir curadoria e modulos', 'Planejamento', -90, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Fechar corpo docente', 'Planejamento', -80, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Definir formato (online + presencial?)', 'Planejamento', -80, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Definir precificacao e parcelamento', 'Planejamento', -75, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Criar pagina de vendas', 'Planejamento', -70, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Gravar VSL / video de vendas', 'Planejamento', -65, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Configurar checkout e plataforma', 'Planejamento', -65, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Lancamento - campanha de abertura', 'Pre-venda', -60, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Email sequencia de lancamento', 'Pre-venda', -58, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Trafego pago - conversao', 'Pre-venda', -55, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'WhatsApp - base quente', 'Pre-venda', -55, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Virada de lote', 'Pre-venda', -40, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Campanha de prova social', 'Pre-venda', -35, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Gravar modulos (producao de conteudo)', 'Producao', -45, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Editar e subir aulas na plataforma', 'Producao', -30, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Criar materiais de apoio (PDFs, slides)', 'Producao', -25, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Configurar area de membros', 'Producao', -20, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Testar jornada do aluno', 'Producao', -14, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Email de boas-vindas + acesso', 'Evento', 0, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Suporte alunos primeiros dias', 'Evento', 3, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Encontro ao vivo inaugural (se presencial)', 'Evento', 7, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Monitorar engajamento e conclusao', 'Pos-evento', 30, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Emitir certificados', 'Pos-evento', 60, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Campanha de renovacao/upsell', 'Pos-evento', 45, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Fechar DRE', 'Pos-evento', 60, 'financeiro', 'alta');

-- ============================================================
-- EVENTOS PRE-CADASTRADOS (Portfolio Science Play)
-- ============================================================

insert into public.events (name, type, status, description) values
-- Imersoes
('Imersao Balneario Camboriu', 'imersao', 'planejamento', 'Imersao presencial em Balneario Camboriu'),
('Imersao Belo Horizonte', 'imersao', 'planejamento', 'Imersao presencial em Belo Horizonte'),
('Imersao Goiania', 'imersao', 'planejamento', 'Imersao presencial em Goiania'),
('Imersao Belem', 'imersao', 'planejamento', 'Imersao presencial em Belem'),
('Imersao Porto Alegre', 'imersao', 'planejamento', 'Imersao presencial em Porto Alegre'),
-- Congresso
('Nutricao Brasil', 'congresso', 'planejamento', 'Brasil - Congresso e Exposicao de Nutricao'),
-- Mentorias e Encontros
('Palestre-se', 'mentoria', 'planejamento', 'Programa de mentoria para comunicacao e posicionamento'),
('Palestre-se ELITE', 'mentoria', 'planejamento', 'Versao avancada do Palestre-se para speakers de alto nivel'),
('Imersao Golden', 'imersao', 'planejamento', 'Imersao exclusiva do grupo Golden'),
('Encontro A Mesa', 'mentoria', 'planejamento', 'Encontro exclusivo A Mesa'),
-- Certificacoes (produtos digitais)
('Certificacao Internacional de Medicina Esportiva', 'certificacao', 'planejamento', 'Certificacao internacional focada em medicina esportiva'),
('Certificacao Internacional de Nutricao Esportiva', 'certificacao', 'planejamento', 'Certificacao internacional focada em nutricao esportiva'),
('Certificacao Internacional de Nutricao Clinica', 'certificacao', 'planejamento', 'Certificacao internacional focada em nutricao clinica'),
('Certificacao Internacional de Personal Trainer', 'certificacao', 'planejamento', 'Certificacao internacional para personal trainers');

-- ============================================================
-- GRUPOS DE ACESSO PRE-DEFINIDOS
-- ============================================================

insert into public.access_groups (name, description) values
('Imersoes', 'Acesso a todas as imersoes presenciais'),
('Certificacoes', 'Acesso a todas as certificacoes internacionais'),
('Mentorias', 'Acesso a Palestre-se, ELITE, Golden, A Mesa'),
('Equipe Core', 'Acesso total a todos os eventos e produtos');
