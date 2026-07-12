import Link from "next/link";
import { Logo } from "./Logo";
import { SITE, NAV_FOOTER } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-navy-deep text-mist">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-mist/80">
            Portal científico de referência sobre o Protocolo 5R. Informação gratuita baseada em
            evidências para a população — e a Certificação Profissional 5R para quem cuida.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-mist/60">
            {SITE.legalName} · CNPJ {SITE.cnpj}
          </p>
        </div>

        <FooterCol title="Portal" links={NAV_FOOTER.portal} />
        <FooterCol title="Profissionais" links={NAV_FOOTER.professional} />
        <FooterCol title="Legal" links={NAV_FOOTER.legal} />
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[12.5px] text-mist/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Conteúdo educacional — não substitui
            avaliação, diagnóstico ou prescrição profissional.
          </p>
          <p className="font-mono uppercase tracking-[0.08em]">Ciência que vira conduta.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-amber5r">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[14px] text-mist/85 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
