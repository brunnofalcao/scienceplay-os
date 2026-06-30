-- ============================================================
-- MIGRATION FIX — Execute no Supabase SQL Editor
-- Corrige: tipos de evento, constraint, e recarrega seed
-- ============================================================

-- 1. REMOVER CHECK CONSTRAINTS ANTIGOS E RECRIAR
-- Events
alter table public.events drop constraint if exists events_type_check;
alter table public.events add constraint events_type_check check (type in ('congresso','imersao','mentoria','certificacao'));

-- Templates
alter table public.templates drop constraint if exists templates_event_type_check;
alter table public.templates add constraint templates_event_type_check check (event_type in ('congresso','imersao','mentoria','certificacao'));

-- 2. LIMPAR E RECARREGAR TEMPLATES + TASKS
delete from public.template_tasks;
delete from public.templates;

-- Templates
insert into public.templates (id, name, event_type, description) values
('a1000000-0000-0000-0000-000000000001', 'POP Imersão', 'imersao', 'Procedimento padrão para imersões presenciais (Balneário, BH, Goiânia, Belém, POA)'),
('a1000000-0000-0000-0000-000000000002', 'POP Congresso', 'congresso', 'Procedimento padrão para congressos e exposições (Nutrição Brasil)'),
('a1000000-0000-0000-0000-000000000003', 'POP Mentoria', 'mentoria', 'Procedimento padrão para mentorias e encontros (Palestre-se, Golden, A Mesa)'),
('a1000000-0000-0000-0000-000000000005', 'POP Certificação', 'certificacao', 'Procedimento padrão para certificações internacionais (produto digital híbrido)');

-- Template Tasks — IMERSAO
insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
('a1000000-0000-0000-0000-000000000001', 'Definir data e cidade do evento', 'Planejamento', -120, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Pesquisar e visitar venues', 'Planejamento', -120, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Negociar e fechar contrato do venue', 'Planejamento', -110, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir grade de palestrantes/mentores', 'Planejamento', -110, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Confirmar palestrantes e cachês', 'Planejamento', -100, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir precificação e lotes', 'Planejamento', -100, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Criar página de vendas', 'Planejamento', -95, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Configurar checkout na plataforma', 'Planejamento', -95, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir meta de receita e orçamento', 'Planejamento', -90, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Montar cronograma de divulgação', 'Planejamento', -90, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Lançar lote 1 (early bird)', 'Pré-venda', -90, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Campanha de lançamento - email blast', 'Pré-venda', -90, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Posts abertura vendas (Stories + Feed)', 'Pré-venda', -89, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Ativar tráfego pago - campanha abertura', 'Pré-venda', -88, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Criar sequência de WhatsApp - base quente', 'Pré-venda', -88, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Gravar vídeo de vendas principal', 'Pré-venda', -85, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Criar criativos de tráfego (5 variações)', 'Pré-venda', -85, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Enviar convites para lista VIP', 'Pré-venda', -85, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Campanha de prova social / depoimentos', 'Pré-venda', -80, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Virada lote 1 para lote 2', 'Pré-venda', -75, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Email de urgência - fim lote 1', 'Pré-venda', -76, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Prospectar marcas para patrocínio', 'Pré-venda', -80, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Follow-up patrocinadores', 'Pré-venda', -70, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Fechar patrocínios confirmados', 'Pré-venda', -60, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Contratar audiovisual', 'Produção', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Reservar hospedagem palestrantes', 'Produção', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Comprar passagens aéreas palestrantes', 'Produção', -55, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Contratar coffee break / alimentação', 'Produção', -50, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Layout e decoração do espaço', 'Produção', -50, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Materiais gráficos (banner, backdrop, credenciais)', 'Produção', -45, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Encomendar impressos e papelaria', 'Produção', -40, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Contratar fotógrafo e videomaker', 'Produção', -40, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Montar roteiro minuto a minuto', 'Produção', -35, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Definir equipe operacional', 'Produção', -35, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Virada lote 2 para lote 3', 'Produção', -45, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Campanha escassez - últimas vagas', 'Produção', -40, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Contratar transporte local', 'Produção', -30, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Confirmar rider técnico palestrantes', 'Produção', -28, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Enviar briefing para palestrantes', 'Produção', -25, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Fechar lista inscritos e credenciais', 'Produção', -14, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Imprimir credenciais e kits', 'Produção', -14, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Campanha aquecimento final (stories diários)', 'Semana do Evento', -7, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Email confirmação + orientações participantes', 'Semana do Evento', -7, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'WhatsApp grupo participantes - boas vindas', 'Semana do Evento', -5, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Alinhamento final equipe (reunião geral)', 'Semana do Evento', -5, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Conferir entrega de materiais no venue', 'Semana do Evento', -3, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Fechar último lote / encerrar vendas', 'Semana do Evento', -3, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Montagem e passagem de som', 'Semana do Evento', -1, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Checklist final de operação', 'Semana do Evento', -1, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Abertura do credenciamento', 'Evento', 0, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Cobertura ao vivo (stories + reels)', 'Evento', 0, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Captar depoimentos dos participantes', 'Evento', 0, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Gestão de palco e timeline', 'Evento', 0, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Venda de upsell no evento', 'Evento', 0, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Email agradecimento + pesquisa NPS', 'Pós-evento', 1, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Entregar gravação/material de apoio', 'Pós-evento', 3, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Publicar depoimentos e resultados', 'Pós-evento', 5, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Editar e publicar vídeo recap', 'Pós-evento', 7, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000001', 'Fechar DRE do evento', 'Pós-evento', 14, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Pagar fornecedores pendentes', 'Pós-evento', 14, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Reunião de retrospectiva', 'Pós-evento', 10, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000001', 'Encerrar evento no sistema', 'Pós-evento', 30, 'financeiro', 'media');

-- Template Tasks — CONGRESSO
insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
('a1000000-0000-0000-0000-000000000002', 'Definir tema central e naming', 'Planejamento', -180, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Pesquisar e reservar centro de convenções', 'Planejamento', -180, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Fechar contrato do espaço', 'Planejamento', -170, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Montar curadoria (keynotes + painéis)', 'Planejamento', -160, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Confirmar keynote speakers', 'Planejamento', -150, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Definir estrutura área expositora', 'Planejamento', -150, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Criar pacotes de patrocínio/exposição', 'Planejamento', -150, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Prospectar patrocinadores master e gold', 'Planejamento', -140, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Definir precificação e lotes', 'Planejamento', -130, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Criar identidade visual', 'Planejamento', -130, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Criar site/landing page', 'Planejamento', -125, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Definir orçamento e meta', 'Planejamento', -120, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Lançamento oficial - lote 1', 'Pré-venda', -120, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Campanha lançamento multicanal', 'Pré-venda', -120, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Ativar tráfego pago - awareness', 'Pré-venda', -115, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Fechar primeiros patrocinadores', 'Pré-venda', -100, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Divulgar grade parcial speakers', 'Pré-venda', -100, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Virada lote 1 para lote 2', 'Pré-venda', -90, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Virada lote 2 para lote 3', 'Pré-venda', -60, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Fechar grade completa palestrantes', 'Pré-venda', -60, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Contratar produção audiovisual', 'Produção', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Cenografia e sinalização', 'Produção', -55, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Contratar catering', 'Produção', -50, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Reservar hotel palestrantes + equipe', 'Produção', -50, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Comprar passagens', 'Produção', -45, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Programação hora a hora (3 palcos)', 'Produção', -30, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Contratar equipe apoio (60+ pessoas)', 'Produção', -30, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Briefing expositores', 'Produção', -25, 'operacoes', 'media'),
('a1000000-0000-0000-0000-000000000002', 'Treinar equipe operacional', 'Produção', -14, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Montagem do espaço (3 dias antes)', 'Produção', -3, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Campanha final últimas vagas', 'Semana do Evento', -7, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Email orientações + mapa', 'Semana do Evento', -5, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Passagem de som e teste geral', 'Semana do Evento', -1, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Abertura credenciamento', 'Evento', 0, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Gestão multipalco', 'Evento', 0, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Cobertura mídia e social', 'Evento', 0, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Venda próxima edição + upsell', 'Evento', 0, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Email agradecimento + NPS', 'Pós-evento', 1, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Report para patrocinadores', 'Pós-evento', 7, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Fechar DRE completo', 'Pós-evento', 21, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Reunião pós-mortem equipe', 'Pós-evento', 14, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Pagar fornecedores', 'Pós-evento', 21, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000002', 'Encerrar no sistema', 'Pós-evento', 30, 'financeiro', 'media');

-- Template Tasks — MENTORIA
insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
('a1000000-0000-0000-0000-000000000003', 'Definir formato e duração', 'Planejamento', -60, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Definir local/espaço', 'Planejamento', -60, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Definir curadoria/convidados', 'Planejamento', -50, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Definir vagas e precificação', 'Planejamento', -50, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Criar página de vendas', 'Planejamento', -45, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Configurar checkout', 'Planejamento', -45, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Abrir vendas - comunicação base', 'Pré-venda', -45, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Envio individual - lista VIP', 'Pré-venda', -44, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Email sequência de lançamento', 'Pré-venda', -42, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Tráfego pago', 'Pré-venda', -40, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'WhatsApp follow-up', 'Pré-venda', -38, 'comercial', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Virada de lote / urgência', 'Pré-venda', -30, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Contato 1-a-1 leads quentes', 'Pré-venda', -25, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Encerrar vendas', 'Pré-venda', -7, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Confirmar reserva espaço/hotel', 'Produção', -30, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Contratar coffee/alimentação', 'Produção', -20, 'producao', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Preparar material apoio/apostila', 'Produção', -15, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Enviar orientações participantes', 'Semana do Evento', -7, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Confirmar presença de todos', 'Semana do Evento', -5, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Montar espaço e materiais', 'Semana do Evento', -1, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Executar encontro', 'Evento', 0, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Registrar presença e fotos', 'Evento', 0, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Captar depoimentos', 'Evento', 0, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Enviar agradecimento + material', 'Pós-evento', 1, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Publicar conteúdo pós', 'Pós-evento', 3, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000003', 'Fechar DRE', 'Pós-evento', 14, 'financeiro', 'alta'),
('a1000000-0000-0000-0000-000000000003', 'Encerrar no sistema', 'Pós-evento', 21, 'financeiro', 'media');

-- Template Tasks — CERTIFICACAO
insert into public.template_tasks (template_id, title, phase, day_offset, department, priority) values
('a1000000-0000-0000-0000-000000000005', 'Definir curadoria e módulos', 'Planejamento', -90, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Fechar corpo docente', 'Planejamento', -80, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Definir formato (online + presencial?)', 'Planejamento', -80, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Definir precificação e parcelamento', 'Planejamento', -75, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Criar página de vendas', 'Planejamento', -70, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Gravar VSL / vídeo de vendas', 'Planejamento', -65, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Configurar checkout e plataforma', 'Planejamento', -65, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Lançamento - campanha abertura', 'Pré-venda', -60, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Email sequência lançamento', 'Pré-venda', -58, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Tráfego pago - conversão', 'Pré-venda', -55, 'marketing', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'WhatsApp - base quente', 'Pré-venda', -55, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Virada de lote', 'Pré-venda', -40, 'comercial', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Campanha prova social', 'Pré-venda', -35, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Gravar módulos', 'Produção', -45, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Editar e subir aulas na plataforma', 'Produção', -30, 'conteudo', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Criar materiais apoio (PDFs, slides)', 'Produção', -25, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Configurar área de membros', 'Produção', -20, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Testar jornada do aluno', 'Produção', -14, 'producao', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Email boas-vindas + acesso', 'Evento', 0, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Suporte alunos primeiros dias', 'Evento', 3, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Monitorar engajamento e conclusão', 'Pós-evento', 30, 'conteudo', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Emitir certificados', 'Pós-evento', 60, 'operacoes', 'alta'),
('a1000000-0000-0000-0000-000000000005', 'Campanha renovação/upsell', 'Pós-evento', 45, 'marketing', 'media'),
('a1000000-0000-0000-0000-000000000005', 'Fechar DRE', 'Pós-evento', 60, 'financeiro', 'alta');

-- 3. CARREGAR EVENTOS DO PORTFOLIO
delete from public.events where created_by is null;

insert into public.events (name, type, status, description) values
('Imersão Balneário Camboriú', 'imersao', 'planejamento', 'Imersão presencial em Balneário Camboriú'),
('Imersão Belo Horizonte', 'imersao', 'planejamento', 'Imersão presencial em Belo Horizonte'),
('Imersão Goiânia', 'imersao', 'planejamento', 'Imersão presencial em Goiânia'),
('Imersão Belém', 'imersao', 'planejamento', 'Imersão presencial em Belém'),
('Imersão Porto Alegre', 'imersao', 'planejamento', 'Imersão presencial em Porto Alegre'),
('Nutrição Brasil', 'congresso', 'planejamento', 'Brasil - Congresso e Exposição de Nutrição'),
('Palestre-se', 'mentoria', 'planejamento', 'Programa de mentoria para comunicação e posicionamento'),
('Palestre-se ELITE', 'mentoria', 'planejamento', 'Versão avançada do Palestre-se para speakers de alto nível'),
('Imersão Golden', 'imersao', 'planejamento', 'Imersão exclusiva do grupo Golden'),
('Encontro A Mesa', 'mentoria', 'planejamento', 'Encontro exclusivo A Mesa'),
('Cert. Internacional Medicina Esportiva', 'certificacao', 'planejamento', 'Certificação internacional de medicina esportiva'),
('Cert. Internacional Nutrição Esportiva', 'certificacao', 'planejamento', 'Certificação internacional de nutrição esportiva'),
('Cert. Internacional Nutrição Clínica', 'certificacao', 'planejamento', 'Certificação internacional de nutrição clínica'),
('Cert. Internacional Personal Trainer', 'certificacao', 'planejamento', 'Certificação internacional para personal trainers');

-- 4. CARREGAR GRUPOS DE ACESSO
delete from public.access_groups;

insert into public.access_groups (name, description) values
('Imersões', 'Acesso a todas as imersões presenciais'),
('Certificações', 'Acesso a todas as certificações internacionais'),
('Mentorias', 'Acesso a Palestre-se, ELITE, Golden, A Mesa'),
('Equipe Core', 'Acesso total a todos os eventos e produtos');
