-- ============================================================
-- FIX COMPLETO: Tarefas + Template Mentoria F0/F1
-- Rodar no Supabase SQL Editor
-- ============================================================

-- ============================================================
-- PARTE 1: Corrigir phase_code NULL em TODAS as tarefas
-- ============================================================
UPDATE public.tasks
SET phase_code =
  CASE
    WHEN day_offset <= -90 THEN 'F0'
    WHEN day_offset <= -60 THEN 'F1'
    WHEN day_offset <= -30 THEN 'F2'
    WHEN day_offset <= -7 THEN 'F3'
    WHEN day_offset < 0 THEN 'F4'
    WHEN day_offset = 0 THEN 'F5'
    WHEN day_offset > 0 THEN 'F6'
  END
WHERE phase_code IS NULL AND day_offset IS NOT NULL;

-- Tarefas sem day_offset e sem phase_code → F0
UPDATE public.tasks
SET phase_code = 'F0'
WHERE phase_code IS NULL AND day_offset IS NULL;

-- ============================================================
-- PARTE 2: Adicionar tarefas F0 e F1 ao Template de Mentoria
-- ============================================================
DO $$
DECLARE
  v_template_id uuid;
BEGIN
  -- Encontrar template de Mentoria
  SELECT id INTO v_template_id FROM public.templates
  WHERE name ILIKE '%mentoria%'
  LIMIT 1;

  IF v_template_id IS NULL THEN
    RAISE NOTICE 'Template de Mentoria nao encontrado. Criando...';
    INSERT INTO public.templates (name, type, description)
    VALUES ('Mentoria / Imersão Golden', 'mentoria', 'Template operacional para imersões Golden e mentorias presenciais')
    RETURNING id INTO v_template_id;
  END IF;

  -- ====== F0: Fundação & Validação (D-120 → D-90) ======
  INSERT INTO public.template_tasks (template_id, title, phase_code, day_offset, area, priority, responsible_role, done_criteria, sort_order)
  VALUES
  (v_template_id, 'Definir conceito e tema da imersão', 'F0', -120, 'Estrategia & Comercial', 'critica', 'CEO / Diretor', 'Documento com conceito, tema e diferencial definidos', 1),
  (v_template_id, 'Definir público-alvo e perfil do participante', 'F0', -118, 'Estrategia & Comercial', 'critica', 'CEO / Head Comercial', 'Persona documentada com critérios claros', 2),
  (v_template_id, 'Pesquisar e pré-selecionar locais/venues', 'F0', -115, 'Logistica & Venue', 'alta', 'Head de Logística', 'Lista com 3+ opções e comparativo de custos', 3),
  (v_template_id, 'Definir data e duração do evento', 'F0', -112, 'Estrategia & Comercial', 'critica', 'CEO', 'Data confirmada e comunicada ao time', 4),
  (v_template_id, 'Montar orçamento preliminar (DRE estimado)', 'F0', -110, 'Estrategia & Comercial', 'alta', 'Financeiro', 'Planilha de custos e receitas projetadas', 5),
  (v_template_id, 'Definir estrutura de preços e lotes', 'F0', -108, 'Vendas & Atendimento', 'alta', 'Head Comercial', 'Tabela de preços por lote e condição de pagamento', 6),
  (v_template_id, 'Validar viabilidade com parceiros/sponsors', 'F0', -105, 'Estrategia & Comercial', 'media', 'CEO', 'Pelo menos 1 parceiro com interesse confirmado', 7),
  (v_template_id, 'Criar briefing criativo (identidade visual)', 'F0', -100, 'Producao AV & Conteudo', 'media', 'Head de Conteúdo', 'Briefing aprovado com referências visuais', 8),
  (v_template_id, 'Montar cronograma operacional macro', 'F0', -95, 'Operacao & Materiais', 'alta', 'Head de Operações', 'Cronograma com milestones e responsáveis', 9),
  (v_template_id, 'Reservar local/venue (contrato)', 'F0', -92, 'Logistica & Venue', 'critica', 'Head de Logística', 'Contrato assinado com venue', 10),

  -- ====== F1: Lançamento & Estruturação (D-90 → D-60) ======
  (v_template_id, 'Criar página de vendas / landing page', 'F1', -88, 'Marketing & Trafego', 'critica', 'Head de Marketing', 'LP no ar com formulário de inscrição ativo', 11),
  (v_template_id, 'Definir curadoria e convidados especiais', 'F1', -85, 'Curadoria & Palestrantes', 'alta', 'CEO / Curadoria', 'Lista de convidados confirmados', 12),
  (v_template_id, 'Montar estratégia de lançamento', 'F1', -85, 'Marketing & Trafego', 'critica', 'Head de Marketing', 'Plano de lançamento com canais e cronograma', 13),
  (v_template_id, 'Iniciar campanha de tráfego pago', 'F1', -82, 'Marketing & Trafego', 'alta', 'Gestor de Tráfego', 'Campanhas no ar com budget aprovado', 14),
  (v_template_id, 'Disparar comunicação para base (email/WhatsApp)', 'F1', -80, 'Marketing & Trafego', 'alta', 'Head de Marketing', 'Primeiro disparo realizado com métricas', 15),
  (v_template_id, 'Abrir vendas - Lote 1', 'F1', -80, 'Vendas & Atendimento', 'critica', 'Head Comercial', 'Primeiras vendas registradas', 16),
  (v_template_id, 'Contratar fornecedores principais (AV, coffee, etc)', 'F1', -75, 'Logistica & Venue', 'alta', 'Head de Logística', 'Contratos assinados com fornecedores-chave', 17),
  (v_template_id, 'Definir programação / agenda do evento', 'F1', -72, 'Curadoria & Palestrantes', 'alta', 'CEO / Curadoria', 'Grade horária aprovada', 18),
  (v_template_id, 'Produzir materiais visuais (posts, stories, ads)', 'F1', -70, 'Producao AV & Conteudo', 'media', 'Designer', 'Kit de materiais aprovado e entregue', 19),
  (v_template_id, 'Reservar hospedagem (equipe + convidados)', 'F1', -68, 'Logistica & Venue', 'media', 'Head de Logística', 'Reservas confirmadas', 20),
  (v_template_id, 'Configurar sistema de pagamento e checkout', 'F1', -65, 'Operacao & Materiais', 'alta', 'Tech / Operações', 'Checkout testado e funcional', 21),
  (v_template_id, 'Montar planilha de controle de inscritos', 'F1', -62, 'Operacao & Materiais', 'media', 'Operações', 'Planilha estruturada e atualizada', 22);

  RAISE NOTICE 'Adicionadas 22 tarefas F0/F1 ao template de Mentoria (id: %)', v_template_id;
END $$;

-- ============================================================
-- PARTE 3: Importar tarefas F0/F1 para TODOS os eventos Golden
-- que já existem (que foram criados com o template antigo)
-- ============================================================
DO $$
DECLARE
  v_template_id uuid;
  v_event record;
  v_count integer;
  v_new_task record;
BEGIN
  -- Encontrar template de Mentoria
  SELECT id INTO v_template_id FROM public.templates
  WHERE name ILIKE '%mentoria%'
  LIMIT 1;

  IF v_template_id IS NULL THEN
    RAISE NOTICE 'Template de Mentoria nao encontrado.';
    RETURN;
  END IF;

  -- Para cada evento Golden
  FOR v_event IN
    SELECT id, name, event_date FROM public.events
    WHERE name ILIKE '%Golden%'
  LOOP
    -- Verificar se já tem tarefas F0 ou F1
    SELECT count(*) INTO v_count FROM public.tasks
    WHERE event_id = v_event.id AND phase_code IN ('F0', 'F1');

    IF v_count = 0 THEN
      -- Importar apenas tarefas F0 e F1 do template
      INSERT INTO public.tasks (event_id, title, phase_code, day_offset, area, priority,
                                responsible_role, done_criteria, sort_order, done, task_status, due_date)
      SELECT v_event.id, tt.title, tt.phase_code, tt.day_offset, tt.area, tt.priority,
             tt.responsible_role, tt.done_criteria, tt.sort_order, false, 'pendente',
             CASE WHEN v_event.event_date IS NOT NULL AND tt.day_offset IS NOT NULL
                  THEN v_event.event_date + tt.day_offset
                  ELSE NULL END
      FROM public.template_tasks tt
      WHERE tt.template_id = v_template_id
        AND tt.phase_code IN ('F0', 'F1');

      RAISE NOTICE 'Importadas tarefas F0/F1 para: %', v_event.name;
    ELSE
      RAISE NOTICE '% ja tem % tarefas F0/F1. Pulando.', v_event.name, v_count;
    END IF;
  END LOOP;
END $$;

-- ============================================================
-- PARTE 4: Verificação final
-- ============================================================
SELECT e.name,
  count(t.id) as total,
  count(case when t.phase_code = 'F0' then 1 end) as f0,
  count(case when t.phase_code = 'F1' then 1 end) as f1,
  count(case when t.phase_code = 'F2' then 1 end) as f2,
  count(case when t.phase_code = 'F3' then 1 end) as f3,
  count(case when t.phase_code = 'F4' then 1 end) as f4,
  count(case when t.phase_code = 'F5' then 1 end) as f5,
  count(case when t.phase_code = 'F6' then 1 end) as f6
FROM public.events e
LEFT JOIN public.tasks t ON t.event_id = e.id
GROUP BY e.id, e.name
ORDER BY e.event_date;
