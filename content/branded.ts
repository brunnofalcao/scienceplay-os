// Branded Pages — hubs editoriais/científicos patrocinados por uma marca.
// NÃO é banner: é conteúdo educacional desenvolvido em parceria, sempre com
// identificação comercial clara e linguagem proporcional à evidência.
//
// Este arquivo é a FONTE DE VERDADE do template. Cada nova marca é uma nova
// entrada no array BRANDED — a página em app/(site)/branded/[slug] renderiza
// qualquer instância a partir deste modelo (futuramente pode vir de banco).
//
// Regras editoriais (ver /legal/publicidade-parcerias e /legal/aviso-medico):
// - Sem promessas terapêuticas não sustentadas.
// - Evidência A/B pode ser destacada quando a conexão é relevante e bem
//   apoiada; C/D serve para contexto/mecanismo/hipótese/pesquisa emergente,
//   SEMPRE com linguagem proporcional ("pesquisas iniciais investigam",
//   "possível conexão", "o mecanismo ainda está sendo estudado").

import type { EvidenceGrade, StudyType } from "@/lib/evidence";

// Intensidade da conexão de uma marca com uma etapa do Protocolo 5R.
export type ConnectionIntensity = "forte" | "moderada" | "fraca";

// Situação da parceria: uma página encerrada permanece no ar por transparência.
export type BrandedStatus = "ativo" | "encerrado";

// Nível de acesso de uma referência da biblioteca.
export type LibraryAccess = "aberto" | "resumo" | "pago";

// Tipo de conteúdo relacionado (links internos que já existem no portal).
export type RelatedType = "noticia" | "glossario" | "metodo" | "editorial";

// Tipo de CTA — define ícone/rótulo e semântica de rastreio.
export type CtaKind = "site" | "material" | "contato" | "produto";

// Tipos de infográfico que sabemos renderizar como CSS/SVG original (sem imagem).
export type InfographicKind =
  | "mecanismo" // fluxo com setas
  | "composicao" // barras de composição
  | "jornada" // linha do tempo/etapas
  | "conexao-5r" // mapa de conexão com os Rs
  | "mapa-evidencias"; // distribuição de evidência A–D

// Conexão da marca com uma das cinco etapas do Protocolo 5R.
export interface RConnection {
  r: string; // key de FIVE_RS (ex.: "reinocular")
  intensity: ConnectionIntensity;
  rationale: string; // por que a conexão existe — proporcional à evidência
}

// Referência da biblioteca científica da parceria.
export interface LibraryItem {
  label: string; // título/descrição curta da referência
  type: StudyType; // desenho do estudo (governa o teto de afirmação)
  year: number;
  grade: EvidenceGrade; // A/B destacáveis; C/D apenas para contexto
  note: string; // nota proporcional ao grau de evidência
  doi?: string; // opcional — não inventar DOIs reais
  url?: string;
  access: LibraryAccess;
}

// Infográfico como DADOS — a página desenha o visual em CSS/SVG.
export interface Infographic {
  title: string;
  caption: string;
  source: string;
  year: number;
  kind: InfographicKind;
  // Passos/segmentos genéricos usados pelo renderizador conforme o kind.
  steps?: string[]; // mecanismo / jornada
  segments?: { label: string; value: number }[]; // composicao / mapa-evidencias
}

// Link para conteúdo interno relacionado (deve existir no portal).
export interface RelatedContent {
  label: string;
  href: string;
  type: RelatedType;
}

// Chamada para ação da marca.
export interface Cta {
  label: string;
  href: string;
  kind: CtaKind;
}

// Modelo completo de uma Branded Page.
export interface BrandedPage {
  slug: string;
  brand: string; // nome da marca (grafia da marca)
  partner: string; // empresa responsável pela parceria
  partnershipLabel: string; // ex.: "Conteúdo desenvolvido em parceria com COREBIOME"
  status: BrandedStatus;
  updatedAt: string; // ISO date
  hero: {
    kicker: string;
    title: string;
    intro: string;
  };
  about: {
    what: string; // o que é a marca/ingrediente/conceito
    category: string; // categoria (ex.: "Simbiótico de microbiota")
    problem: string; // problema que endereça, em termos educacionais
    assets: string[]; // ativos/diferenciais declarados (genéricos)
    connectionToUniverse: string; // como se conecta ao universo 5R
  };
  rConnections: RConnection[];
  library: LibraryItem[];
  infographics: Infographic[];
  relatedContent: RelatedContent[];
  ctas: Cta[];
}

// ---- Instância: COREBIOME ---------------------------------------------------
// COREBIOME é uma MARCA-EXEMPLO fictícia para validar o template. As afirmações
// são genéricas/educacionais (conceito de marca focada em microbiota). Nenhum
// resultado clínico específico, DOI real ou aprovação regulatória é inventado.
const COREBIOME: BrandedPage = {
  slug: "corebiome",
  brand: "COREBIOME",
  partner: "COREBIOME Nutrição & Microbiota (marca-exemplo)",
  partnershipLabel: "Conteúdo desenvolvido em parceria com COREBIOME",
  status: "ativo",
  updatedAt: "2026-07-10",
  hero: {
    kicker: "Branded Page · Parceria científica",
    title: "COREBIOME: microbiota no centro do cuidado intestinal",
    intro:
      "Um hub editorial desenvolvido em parceria com a COREBIOME para explicar, com base em evidências e linguagem proporcional, como estratégias voltadas à microbiota se conectam ao Protocolo 5R. Conteúdo educacional — não substitui avaliação profissional nem indica conduta individual.",
  },
  about: {
    what: "A COREBIOME é uma marca-exemplo voltada à microbiota intestinal, com um conceito de simbiótico que combina fibras prebióticas com cepas probióticas estudadas.",
    category: "Simbiótico focado em microbiota (prebiótico + probiótico)",
    problem:
      "Desequilíbrios da microbiota e sintomas digestivos funcionais são multifatoriais. A proposta educacional aqui é organizar o que a ciência sustenta — e o que ainda é hipótese — em vez de prometer solução única.",
    assets: [
      "Fibras prebióticas fermentáveis com introdução titulada",
      "Cepas probióticas escolhidas por critério (cepa, dose e alvo)",
      "Enquadramento educacional alinhado ao método, sem promessa de cura",
    ],
    connectionToUniverse:
      "O tema microbiota dialoga sobretudo com a etapa Reinocular (R·04), mas toca também Reparar (R·03) e Reequilibrar (R·05). A COREBIOME entra como exemplo de categoria — a escolha, a dose e a indicação continuam sendo decisão profissional e individual.",
  },
  rConnections: [
    {
      r: "reinocular",
      intensity: "forte",
      rationale:
        "Prebióticos e probióticos são o núcleo da etapa Reinocular. Há evidência moderada a forte de que cepas específicas, em doses adequadas, modulam sintomas em contextos definidos — sempre por cepa, dose e alvo, nunca 'cápsula para todos'.",
    },
    {
      r: "reparar",
      intensity: "moderada",
      rationale:
        "Metabólitos da fermentação de fibras (como ácidos graxos de cadeia curta) são estudados por sua possível relação com a barreira intestinal. É um mecanismo plausível em investigação — não uma promessa de 'reparo' garantido.",
    },
    {
      r: "reequilibrar",
      intensity: "fraca",
      rationale:
        "Pesquisas iniciais investigam o eixo intestino-cérebro e a modulação da microbiota na manutenção do bem-estar. A relação ainda precisa ser confirmada e não deve ser lida como efeito clínico estabelecido.",
    },
  ],
  library: [
    {
      label: "Revisão sistemática sobre probióticos cepa-específicos em sintomas gastrointestinais funcionais",
      type: "revisao-sistematica",
      year: 2023,
      grade: "A",
      note: "Evidência forte para desfechos específicos quando a cepa e a dose são as estudadas. O efeito não é da categoria 'probiótico' em geral, e sim de cepas específicas em contextos definidos.",
      access: "resumo",
    },
    {
      label: "Ensaio clínico randomizado com fibra prebiótica fermentável e desfechos de tolerância digestiva",
      type: "ensaio-clinico",
      year: 2022,
      grade: "B",
      note: "Evidência moderada. Resultados favoráveis com introdução titulada; o benefício pode variar entre pessoas e não constitui recomendação definitiva.",
      access: "resumo",
    },
    {
      label: "Estudo observacional associando diversidade da microbiota a marcadores de bem-estar digestivo",
      type: "observacional",
      year: 2021,
      grade: "C",
      note: "Evidência limitada: sugere associação, não causa. Estudos observacionais como este indicam hipóteses que ainda precisam ser confirmadas por ensaios controlados.",
      access: "aberto",
    },
    {
      label: "Estudo pré-clínico sobre ácidos graxos de cadeia curta e integridade da barreira intestinal",
      type: "pre-clinico",
      year: 2020,
      grade: "D",
      note: "Evidência insuficiente para conclusão clínica. O mecanismo ainda está sendo estudado: resultados em modelo experimental não são prova de benefício em pessoas.",
      access: "resumo",
    },
    {
      label: "Diretriz de sociedade científica sobre uso criterioso de probióticos na prática clínica",
      type: "guideline",
      year: 2024,
      grade: "A",
      note: "Evidência forte de que a indicação deve ser cepa-específica e individualizada, com atenção a populações de risco. Reforça critério, não consumo indiscriminado.",
      access: "aberto",
    },
  ],
  infographics: [
    {
      title: "Como uma fibra prebiótica chega à microbiota",
      caption:
        "Fluxo educacional simplificado. Ilustra um mecanismo plausível em estudo — não representa um resultado clínico garantido.",
      source: "Elaboração Science Play em parceria com COREBIOME",
      year: 2026,
      kind: "mecanismo",
      steps: [
        "Ingestão da fibra prebiótica",
        "Passagem intacta pelo intestino delgado",
        "Fermentação pela microbiota no cólon",
        "Produção de metabólitos (ex.: ácidos graxos de cadeia curta)",
        "Possível interação com a barreira intestinal — em investigação",
      ],
    },
    {
      title: "Composição conceitual de um simbiótico",
      caption:
        "Proporções ilustrativas de um conceito de simbiótico. Valores educacionais, não uma formulação específica.",
      source: "Material educativo COREBIOME",
      year: 2026,
      kind: "composicao",
      segments: [
        { label: "Fibras prebióticas", value: 55 },
        { label: "Cepas probióticas", value: 30 },
        { label: "Matriz e excipientes", value: 15 },
      ],
    },
    {
      title: "Conexão com o Protocolo 5R",
      caption:
        "Intensidade educacional da relação do tema microbiota com cada etapa. Conexão forte não significa indicação individual.",
      source: "Curadoria editorial Science Play",
      year: 2026,
      kind: "conexao-5r",
      segments: [
        { label: "Reinocular", value: 90 },
        { label: "Reparar", value: 55 },
        { label: "Reequilibrar", value: 30 },
      ],
    },
    {
      title: "Distribuição da evidência desta biblioteca",
      caption:
        "Quantidade de referências por grau de evidência. A/B sustentam destaque; C/D entram apenas como contexto e hipótese.",
      source: "Curadoria editorial Science Play",
      year: 2026,
      kind: "mapa-evidencias",
      segments: [
        { label: "A — forte", value: 2 },
        { label: "B — moderada", value: 1 },
        { label: "C — limitada", value: 1 },
        { label: "D — insuficiente", value: 1 },
      ],
    },
  ],
  relatedContent: [
    { label: "Reinocular (R·04) — a etapa da microbiota", href: "/os-cinco-rs/reinocular", type: "metodo" },
    { label: "Glossário: Probiótico", href: "/glossario/probiotico", type: "glossario" },
    { label: "Glossário: Prebiótico", href: "/glossario/prebiotico", type: "glossario" },
    { label: "Glossário: Akkermansia", href: "/glossario/akkermansia", type: "glossario" },
    {
      label: "Notícia: como escolher a cepa certa de probiótico",
      href: "/noticias/probiotico-cepa-certa-intestino",
      type: "noticia",
    },
  ],
  ctas: [
    { label: "Conhecer a COREBIOME", href: "https://example.com/corebiome", kind: "site" },
    { label: "Baixar material educativo", href: "https://example.com/corebiome/material", kind: "material" },
    { label: "Falar com a marca", href: "https://example.com/corebiome/contato", kind: "contato" },
  ],
};

// Registro de todas as Branded Pages. Adicione novas marcas aqui.
export const BRANDED: BrandedPage[] = [COREBIOME];

// Helper de leitura por slug.
export function getBranded(slug: string): BrandedPage | undefined {
  return BRANDED.find((b) => b.slug === slug);
}
