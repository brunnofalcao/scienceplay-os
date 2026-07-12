import Link from "next/link";
import { GlossarySearch } from "@/components/GlossarySearch";

export function NotFoundContent() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="kicker">Erro 404</span>
      <h1 className="mt-3 text-[36px]">Não encontramos esta página</h1>
      <p className="prose-5r mt-3 text-center">
        O endereço pode ter mudado ou o conteúdo pode estar em revisão editorial. Tente pesquisar um termo
        no Glossário 5R ou volte ao início.
      </p>
      <div className="mt-6 w-full max-w-xl">
        <GlossarySearch size="md" />
      </div>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-navy">Voltar ao início</Link>
        <Link href="/glossario" className="btn-ghost">Abrir o glossário</Link>
      </div>
    </div>
  );
}
