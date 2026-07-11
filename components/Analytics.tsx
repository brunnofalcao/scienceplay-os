"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

// Carrega GTM/GA4 SOMENTE quando há consentimento E IDs reais configurados.
// Nunca injeta IDs fictícios (Briefing §13.1).
export function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    try {
      setConsent(localStorage.getItem("p5r_consent"));
    } catch {}
    function onConsent(e: Event) {
      setConsent((e as CustomEvent).detail);
    }
    window.addEventListener("p5r-consent", onConsent);
    return () => window.removeEventListener("p5r-consent", onConsent);
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      {SITE.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`}
        </Script>
      )}
      {SITE.ga4Id && !SITE.gtmId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.ga4Id}');`}
          </Script>
        </>
      )}
    </>
  );
}
