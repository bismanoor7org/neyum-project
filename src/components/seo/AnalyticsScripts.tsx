import Script from "next/script";
import { getSiteSettings } from "@/server/services/cms-wp/content.service";

/**
 * Injects GA4 / Clarity from CMS settings (or env fallback).
 * Failures are silent so public pages never break.
 */
export async function AnalyticsScripts() {
  let gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_GA_ID?.trim() ||
    "";
  let clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim() || "";

  try {
    const settings = await getSiteSettings();
    const analytics = (settings.analytics ?? {}) as {
      gaId?: string;
      clarityId?: string;
    };
    if (analytics.gaId?.trim()) gaId = analytics.gaId.trim();
    if (analytics.clarityId?.trim()) clarityId = analytics.clarityId.trim();
  } catch {
    /* settings table may be unavailable locally */
  }

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });
          `}</Script>
        </>
      ) : null}
      {clarityId ? (
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `}</Script>
      ) : null}
    </>
  );
}
