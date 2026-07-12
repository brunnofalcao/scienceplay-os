import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { NewsActions } from "@/components/admin/NewsActions";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { getNewsQueue } from "@/lib/admin-data";

export default async function AdminNews() {
  const items = await getNewsQueue();

  return (
    <>
      <AdminHeader
        title="Notícias"
        subtitle="Fila editorial: criar, revisar, aprovar, publicar, despublicar e versionar. Publicação exige revisão humana."
      />
      <div className="p-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[14px] text-muted">{items.length} itens</p>
          <button className="btn-navy text-[13px] opacity-60" title="Disponível com banco configurado" disabled>
            + Nova pauta
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-line bg-mist/40 text-left font-mono text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Evidência</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((n) => (
                <tr key={n.slug} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/noticias/${n.slug}`} className="font-medium text-navy hover:underline">
                      {n.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={n.status} /></td>
                  <td className="px-4 py-3"><EvidenceBadge grade={n.evidence as any} showLabel={false} /></td>
                  <td className="px-4 py-3 text-muted">{n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("pt-BR") : "—"}</td>
                  <td className="px-4 py-3"><NewsActions slug={n.slug} status={n.status} source={n.source} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[12.5px] text-muted">
          O motor científico gera rascunhos com status <strong>em revisão</strong>. Nenhum conteúdo é
          publicado automaticamente — a aprovação é sempre humana.
        </p>
      </div>
    </>
  );
}
