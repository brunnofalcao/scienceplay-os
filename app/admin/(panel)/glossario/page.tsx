import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EvidenceBadge, ConfidenceBadge } from "@/components/EvidenceBadge";
import { GLOSSARY } from "@/content/glossary";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";
import { getR } from "@/lib/five-rs";
import { getUnansweredSearches } from "@/lib/admin-data";

export default async function AdminGlossary() {
  const entries = [...GLOSSARY].sort((a, b) => a.name.localeCompare(b.name));
  const unanswered = await getUnansweredSearches();

  return (
    <>
      <AdminHeader
        title="Glossário"
        subtitle="Cadastrar entidades, sinônimos e classificação (R principal + secundários), revisar respostas e transformar buscas sem resposta em novos verbetes."
      />
      <div className="p-8">
        {/* Fila de termos sem resposta */}
        <section className="mb-8">
          <h2 className="mb-3 font-mono text-[12px] uppercase tracking-wide text-amber5r">Buscas sem resposta</h2>
          {unanswered.length === 0 ? (
            <div className="rounded-xl border border-line bg-white p-5 text-[14px] text-muted">
              Nenhuma busca sem resposta registrada {`(requer banco + tráfego real)`}. Buscas recorrentes
              aparecem aqui como candidatas a novos verbetes.
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="border-b border-line bg-mist/40 text-left font-mono text-[11px] uppercase tracking-wide text-muted">
                    <th className="px-4 py-3">Termo buscado</th>
                    <th className="px-4 py-3">Ocorrências</th>
                    <th className="px-4 py-3">Última</th>
                    <th className="px-4 py-3">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {unanswered.map((u) => (
                    <tr key={u.query} className="border-b border-line last:border-0">
                      <td className="px-4 py-3 font-medium">{u.query}</td>
                      <td className="px-4 py-3">{u.n}</td>
                      <td className="px-4 py-3 text-muted">{u.last ? new Date(u.last).toLocaleDateString("pt-BR") : "—"}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md border border-line px-2.5 py-1 text-[12px] text-navy">Criar verbete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Lista de verbetes */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-[12px] uppercase tracking-wide text-amber5r">Verbetes ({entries.length})</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-line bg-mist/40 text-left font-mono text-[11px] uppercase tracking-wide text-muted">
                  <th className="px-4 py-3">Termo</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">R principal</th>
                  <th className="px-4 py-3">Evidência</th>
                  <th className="px-4 py-3">Confiança</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => {
                  const r = e.rPrimary ? getR(e.rPrimary) : undefined;
                  return (
                    <tr key={e.slug} className="border-b border-line last:border-0">
                      <td className="px-4 py-3 font-medium">{e.name}</td>
                      <td className="px-4 py-3 text-muted">{ENTITY_TYPE_LABEL[e.type]}</td>
                      <td className="px-4 py-3">{r ? r.name : <span className="text-[#9A3B2E]">insuficiente</span>}</td>
                      <td className="px-4 py-3"><EvidenceBadge grade={e.evidence} showLabel={false} /></td>
                      <td className="px-4 py-3"><ConfidenceBadge confidence={e.confidence} /></td>
                      <td className="px-4 py-3"><StatusBadge status={e.status === "publicado" ? "publicado" : "em_revisao"} /></td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/glossario/${e.slug}`} className="text-[13px] font-medium text-navy hover:underline">Editar</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
