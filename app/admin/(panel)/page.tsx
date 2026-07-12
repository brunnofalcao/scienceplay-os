import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminShell";
import { Stat } from "@/components/admin/Stat";
import { getDashboard } from "@/lib/admin-data";

export default async function Dashboard() {
  const m = await getDashboard();

  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="Visão geral da operação editorial, do motor científico e da certificação."
      />
      <div className="p-8">
        {m.source === "seed" && (
          <div className="mb-6 rounded-xl border border-amber5r/30 bg-amber5r/5 p-4 text-[13.5px] text-ink/80">
            <strong className="text-navy-deep">Modo demonstração (seed).</strong> As métricas abaixo derivam do
            conteúdo versionado. Configure <code className="font-mono text-[12px]">DATABASE_URL</code> e aplique{" "}
            <code className="font-mono text-[12px]">db/schema-5r.sql</code> para operar com dados reais (fila,
            leads, custos de IA, buscas).
          </div>
        )}

        {/* Notícias / pipeline */}
        <h2 className="mb-3 font-mono text-[12px] uppercase tracking-wide text-amber5r">Pipeline editorial</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Publicada hoje</p>
            {m.publishedToday ? (
              <Link href={`/noticias/${m.publishedToday.slug}`} className="mt-1.5 block text-[15px] font-medium text-navy hover:underline">
                {m.publishedToday.title}
              </Link>
            ) : (
              <p className="mt-1.5 text-[14px] text-muted">Nenhum estudo atingiu os critérios hoje.</p>
            )}
          </div>
          <Stat label="Na fila (revisão)" value={m.nextInQueue} hint="Aguardando revisão humana" tone={m.nextInQueue ? "warn" : "default"} />
          <Stat label="Pendentes" value={m.pending} hint="Itens no pipeline" />
          <Stat label="Possíveis duplicações" value={m.duplicateCandidates} tone={m.duplicateCandidates ? "warn" : "default"} />
        </div>

        {/* Motor / custos / erros */}
        <h2 className="mb-3 mt-8 font-mono text-[12px] uppercase tracking-wide text-amber5r">Motor científico</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Custo de IA (mês)" value={`US$ ${m.aiCostMonth.toFixed(2)}`} hint="Geração de conteúdo" />
          <Stat label="Erros de integração (7d)" value={m.integrationErrors} tone={m.integrationErrors ? "warn" : "good"} />
          <div className="rounded-xl border border-line bg-white p-5 lg:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Saúde dos cron jobs</p>
            <ul className="mt-2 space-y-1.5">
              {m.cronHealth.map((c) => (
                <li key={c.name} className="flex items-center justify-between text-[13.5px]">
                  <span>{c.name}</span>
                  <span className="text-muted">{c.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Volume por R */}
        <h2 className="mb-3 mt-8 font-mono text-[12px] uppercase tracking-wide text-amber5r">Volume por R (glossário)</h2>
        <div className="rounded-xl border border-line bg-white p-5">
          <div className="space-y-2.5">
            {m.volumeByR.map((r) => {
              const max = Math.max(...m.volumeByR.map((x) => x.count), 1);
              return (
                <div key={r.r} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-[13px] text-ink/80">{r.name}</span>
                  <div className="h-5 flex-1 overflow-hidden rounded bg-mist">
                    <div className="h-full rounded" style={{ width: `${(r.count / max) * 100}%`, backgroundColor: r.color }} />
                  </div>
                  <span className="w-8 text-right font-mono text-[13px] text-muted">{r.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Glossário / buscas / certificação */}
        <h2 className="mb-3 mt-8 font-mono text-[12px] uppercase tracking-wide text-amber5r">Conhecimento e conversão</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Termos no glossário" value={m.glossaryTerms} />
          <Stat label="Buscas sem resposta" value={m.unansweredSearches} hint="Candidatos a novos verbetes" tone={m.unansweredSearches ? "warn" : "default"} />
          <Stat label="Leads da certificação" value={m.leads} tone="good" />
          <Stat label="Cliques na certificação" value={m.certificationClicks} hint="Requer analytics conectado" />
        </div>

        {m.topSearches.length > 0 && (
          <div className="mt-4 rounded-xl border border-line bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Termos mais pesquisados</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {m.topSearches.map((t) => (
                <span key={t.query} className="tag">{t.query} · {t.n}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
