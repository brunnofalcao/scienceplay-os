// CERTIFICAÇÃO PROFISSIONAL 5R — apenas informações CONFIRMADAS pelos
// documentos oficiais (Ementa e Conteúdo / Ementa e Temas).
// REGRA (Briefing §7.6): não inventar números, professores, depoimentos,
// reconhecimento, garantia, carga horária, preço, prazo ou chancela.
// Itens ainda não definidos são marcados como "a confirmar" — nunca fabricados.

export const CERT = {
  name: "Certificação Profissional 5R",
  subtitle: "Intestino e Eixo Intestino-Cérebro",
  // Formato confirmado na ementa oficial.
  lessonFormat: "Aulas de 50 minutos, com tese, base científica, aplicação clínica, caso guiado e checklist.",
  // Carga horária da trilha core, conforme ementa ("14 aulas ≈ 11h40").
  coreLoad: "Trilha Nutrição (core): 14 aulas, aproximadamente 11h40",
  medLoad: "Trilha Medicina: +9 aulas adicionais de 50 minutos",
  // Público elegível (Briefing §6.2).
  eligible: [
    "Médicos",
    "Nutricionistas",
    "Nutricionistas esportivos",
    "Nutrólogos",
    "Enfermeiros",
    "Farmacêuticos",
    "Fisioterapeutas",
    "Profissionais de educação física",
    "Psicólogos",
    "Outros profissionais de saúde autorizados",
  ],
  // Itens NÃO confirmados — exibidos como pendentes, jamais inventados.
  pending: {
    price: "O investimento e as condições de parcelamento serão divulgados na abertura das inscrições.",
    faculty:
      "O corpo docente reúne especialistas em gastroenterologia, nutrição clínica, microbiota e eixo intestino-cérebro. A lista nominal de professores será publicada aqui após confirmação.",
    dates: "As datas da próxima turma serão anunciadas em breve.",
    certificate:
      "Ao concluir, o profissional recebe o título de Profissional Certificado 5R. Detalhes de emissão e validade serão informados na matrícula.",
  },
};

// TRILHA NUTRIÇÃO — CORE (14 aulas). Fonte: ementa oficial.
export const CORE_MODULES = [
  {
    block: "Fundamentos e método",
    lessons: [
      "O que é o Protocolo 5R (de verdade): escopo, limites, para quem serve",
      "Fisiologia GI aplicada ao consultório: motilidade, secreção, bile, absorção, microbiota e eixo cérebro-intestino",
    ],
  },
  {
    block: "R1 — Remover",
    lessons: [
      "Triagem clínica e segurança: sinais de alarme, quando interromper e encaminhar",
      "Remover dietético com método: gatilhos, eliminação estratégica e reintrodução (sem terrorismo alimentar)",
      "Remover infeccioso / inflamatório / iatrogênico: quando suspeitar e como não errar a mão",
    ],
  },
  {
    block: "R2 — Recolocar",
    lessons: [
      "Digestão e absorção (ácido, enzimas, bile, trânsito): sinais clínicos e conduta por hipótese",
      "Fibra, hidratação, rotina intestinal e micronutrientes críticos",
    ],
  },
  {
    block: "R3 — Reparar",
    lessons: [
      "Barreira intestinal, inflamação de baixo grau e hipersensibilidade: o que é verdade clínica",
      "Estratégias de reparo com melhor sinal clínico (e o que evitar)",
    ],
  },
  {
    block: "R4 — Reinocular",
    lessons: [
      "Microbiota aplicada: o que é plausível clinicamente vs marketing de disbiose",
      "Prebióticos, probióticos, simbióticos e pós-bióticos: decisão por sintoma e risco",
    ],
  },
  {
    block: "R5 — Reequilibrar",
    lessons: [
      "Eixo cérebro-intestino e dor visceral (sem psiquiatrizar o paciente)",
      "Estilo de vida que muda o intestino: sono, estresse, ritmo e movimento",
    ],
  },
  {
    block: "Integração e prática",
    lessons: [
      "Algoritmo 5R ponta a ponta: casos clínicos, checkpoints, falha terapêutica e co-gestão Nutrição↔Medicina",
    ],
  },
];

// TRILHA MEDICINA — +9 aulas. Fonte: ementa oficial.
export const MED_MODULES = [
  "Diagnóstico positivo em DGBI/IBS + encaixe do 5R na medicina baseada em risco",
  "Red flags e 'não IBS': quando o 5R NÃO é o primeiro passo",
  "Investigação racional: o que pedir, quando pedir e como interpretar (sem overtesting)",
  "Diarreia crônica e IBS-D: mecanismos, subtipos e escalonamento terapêutico",
  "Constipação crônica e IBS-C: trânsito lento vs dissinergia vs doença",
  "Dor visceral e neuromodulação: tratar dor do IBS sem estigma",
  "SIBO, dismotilidade e disbiose: evidência vs exagero",
  "Probióticos e microbiota: segurança, contraindicações e decisão clínica",
  "Governança clínica do 5R: padronização, prontuário, co-gestão e falha terapêutica",
];

// BÔNUS PREMIUM (aplicações por público). Fonte: ementa oficial.
export const BONUS_MODULES = [
  "Pediatria: dor abdominal funcional/IBS em crianças e limites do 5R",
  "Saúde da mulher: ciclo, gestação/pós-parto e sobreposições com sintomas GI",
  "Geriatria: constipação, polifarmácia, fragilidade e risco de iatrogenia",
  "Atletas: GI distress, tolerância alimentar, timing e prevenção",
];

// TRAVAS DE ESCOPO (linhas vermelhas do curso). Fonte: ementa oficial.
export const SCOPE_LIMITS = [
  "Não vender 'permeabilidade intestinal' como explicação universal",
  "Não transformar 'disbiose' em diagnóstico de conveniência",
  "Não usar exames controversos como pilar do método",
  "Não fazer restrição alimentar crônica sem reintrodução e sem métrica",
  "Não virar 'curso de suplemento': suplemento é ferramenta de terceira camada",
];

export const CERT_FAQS = [
  {
    q: "Para quem é a Certificação Profissional 5R?",
    a: "Para profissionais de saúde elegíveis — médicos, nutricionistas, nutrólogos, enfermeiros, farmacêuticos, fisioterapeutas, profissionais de educação física, psicólogos e outros autorizados — que querem aplicar o método com segurança clínica.",
  },
  {
    q: "É um curso ou uma certificação?",
    a: "É uma certificação profissional: além do conteúdo, o foco é padronizar a conduta clínica em cinco etapas. Quem conclui torna-se Profissional Certificado 5R.",
  },
  {
    q: "Preciso ser médico para participar?",
    a: "Não. A trilha core (Nutrição) atende profissionais de saúde elegíveis; a trilha Medicina aprofunda a conduta médica. O escopo de cada profissão é respeitado.",
  },
  {
    q: "Qual é o investimento?",
    a: "O valor e as condições de parcelamento serão divulgados na abertura das inscrições. Cadastre seu interesse para ser avisado.",
  },
  {
    q: "A certificação promete resultados garantidos?",
    a: "Não. O método enfatiza conduta reproduzível e segurança clínica, com travas explícitas contra promessas milagrosas e exames sem validação.",
  },
];
