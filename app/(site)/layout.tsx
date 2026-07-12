import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

// Chrome do portal público (não se aplica ao /admin).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
      <ConsentBanner />
      <Analytics />
    </>
  );
}
