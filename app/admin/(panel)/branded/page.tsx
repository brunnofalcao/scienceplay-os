import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminShell";
import { Stat } from "@/components/admin/Stat";
import { BRANDED } from "@/content/branded";

// Painel de Branded Pages. Lista as parcerias versionadas em content/branded.ts
// e reserva o espaço das métricas (dependem de analytics/banco).
export default function AdminBranded() {
  return (
    <>
      <AdminHeader
        title="Branded Pages"
        subtitle="Hubs editoriais patrocinados, criados a partir de um template único. Cada marca é uma entrada de dados."
      />
      <div className="p-8">
        {/* Métricas — placeholder até haver analytics/banco conectado. */}
        <h2 className="mb-3 font-mono text-[12px] uppercase tracking-wide text-amber5r">Métricas (agregado)</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Visualizações" value="—" hint="Requer analytics/banco" />
          <Stat label="Cliques em CTA" value="—" hint="Evento BrandedCTAClick" />
          <Stat label="Downloads" value="—" hint="Requer analytics/banco" />
          <Stat label="Leads" value="—" hint="Requer formulário/banco" />
        </div>

        <div className="mt-6 rounded-xl border border-amber5r/30 bg-amber5r/5 p-4 text-[13.5px] text-ink/80">
          <strong className="text-navy-deep">Como criar uma nova Branded Page.</strong> Adicione uma entrada ao
          array <code className="mx-1 font-mono text-[12px]">BRANDED</code> em{" "}
          <code className="font-mono text-[12px]">content/branded.ts</code> (ou, futuramente, ao banco). A página
          é gerada automaticamente em <code className="mx-1 font-mono text-[12px]">/branded/&#123;slug&#125;</code>{" "}
          a partir do mesmo template — não há código novo por marca.
        </div>

        {/* Lista de páginas */}
        <h2 className="mb-3 mt-8 font-mono text-[12px] uppercase tracking-wide text-amber5r">
          Páginas publicadas ({BRANDED.length})
        </h2>
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-line bg-mist/40 text-left font-mono text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Atualizada</th>
                <th className="px-4 py-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {BRANDED.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    Nenhuma Branded Page cadastrada.
                  </td>
                </tr>
              ) : (
                BRANDED.map((b) => (
                  <tr key={b.slug} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium text-navy-deep">{b.brand}</td>
                    <td className="px-4 py-3 text-muted">{b.partner}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-[13px]"
                        style={{ color: b.status === "ativo" ? "#1F5C3D" : "#9A3B2E" }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: b.status === "ativo" ? "#1F5C3D" : "#9A3B2E" }}
                        />
                        {b.status === "ativo" ? "Ativo" : "Encerrado"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(b.updatedAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/branded/${b.slug}`}
                        target="_blank"
                        className="text-navy hover:underline"
                      >
                        Ver página ↗
                      </Link>
                    </td>
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
