import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { dataSource } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Painel editorial",
  robots: { index: false, follow: false },
};

// O middleware já protege /admin/*. Este layout envolve apenas as telas do painel.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell badge={dataSource()}>{children}</AdminShell>;
}
