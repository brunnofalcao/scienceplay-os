import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminShell";
import { GlossaryEditForm } from "@/components/admin/GlossaryEditForm";
import { getEntry } from "@/lib/search";
import { ENTITY_TYPE_LABEL } from "@/lib/glossary-types";

export default async function EditEntry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  return (
    <>
      <AdminHeader title={`Editar: ${entry.name}`} subtitle={`${ENTITY_TYPE_LABEL[entry.type]} · última revisão ${new Date(entry.lastReviewed).toLocaleDateString("pt-BR")}`} />
      <div className="p-8">
        <div className="mb-5 flex gap-3 text-[13px]">
          <Link href="/admin/glossario" className="text-navy hover:underline">← Voltar ao glossário</Link>
          <Link href={`/glossario/${entry.slug}`} className="text-navy hover:underline">Ver no portal ↗</Link>
        </div>
        <GlossaryEditForm entry={entry} />
      </div>
    </>
  );
}
