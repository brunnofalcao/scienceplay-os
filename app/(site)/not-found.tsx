import { NotFoundContent } from "@/components/NotFoundContent";

// 404 para páginas do portal (glossário, notícias, Rs, legais). O chrome
// (Header/Footer) vem do layout do grupo (site).
export default function SiteNotFound() {
  return <NotFoundContent />;
}
