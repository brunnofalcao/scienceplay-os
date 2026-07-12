import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/components/NotFoundContent";

// 404 global (rotas fora do grupo do portal). Inclui o chrome próprio, já que
// o layout raiz é mínimo.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
