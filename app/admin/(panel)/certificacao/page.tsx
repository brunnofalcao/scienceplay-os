import { AdminHeader } from "@/components/admin/AdminShell";
import { Stat } from "@/components/admin/Stat";
import { getLeads, dataSource } from "@/lib/admin-data";

export default async function AdminCert() {
  const leads = await getLeads();
  const source = dataSource();

  const byProfession = leads.reduce<Record<string, number>>((acc, l) => {
    const p = l.profissao || "—";
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <AdminHeader
        title="Certificação"
        subtitle="Leads de interesse, origem e eventos de conversão. Dados sensíveis não são armazenados além do necessário."
      />
      <div className="p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Leads" value={leads.length} tone="good" />
          <Stat label="Cliques no CTA" value="—" hint="Requer analytics conectado" />
          <Stat label="Checkout iniciado" value="—" hint="Requer checkout oficial" />
        </div>

        {source === "seed" && (
          <div className="mt-6 rounded-xl border border-amber5r/30 bg-amber5r/5 p-4 text-[13.5px] text-ink/80">
            Os leads são capturados pelo formulário da página de certificação e persistidos quando há
            <code className="mx-1 font-mono text-[12px]">DATABASE_URL</code>. Sem banco, o envio é registrado
            no log do servidor (nenhum dado pessoal fica no cliente).
          </div>
        )}

        {Object.keys(byProfession).length > 0 && (
          <div className="mt-6 rounded-xl border border-line bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Leads por profissão</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(byProfession).map(([p, n]) => (
                <span key={p} className="tag">{p} · {n}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-line bg-mist/40 text-left font-mono text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Profissão</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    Nenhum lead registrado ainda.
                  </td>
                </tr>
              ) : (
                leads.map((l, i) => (
                  <tr key={i} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium">{l.nome}</td>
                    <td className="px-4 py-3 text-muted">{l.email}</td>
                    <td className="px-4 py-3">{l.profissao}</td>
                    <td className="px-4 py-3 text-muted">{new Date(l.created_at).toLocaleDateString("pt-BR")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
