"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Dispara o evento CertificationView ao abrir a página da certificação.
export function CertView() {
  useEffect(() => {
    track("CertificationView", { page: "certificacao" });
  }, []);
  return null;
}
