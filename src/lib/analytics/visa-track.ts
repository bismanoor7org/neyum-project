export type VisaCheckerNavSource = "nav_link" | "nav_dropdown" | "nav_cta" | "mobile_nav" | "mobile_dropdown";

export type VisaCheckerNavEvent = {
  event: "visa_checker_nav_click";
  source: VisaCheckerNavSource;
  href: string;
  timestamp: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Analytics-ready — pushes to dataLayer and dispatches custom event for future integrations */
export function trackVisaCheckerNavClick(
  source: VisaCheckerNavSource,
  href: string = "/fiji-visa-checker",
): void {
  if (typeof window === "undefined") return;

  const payload: VisaCheckerNavEvent = {
    event: "visa_checker_nav_click",
    source,
    href,
    timestamp: Date.now(),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ ...payload });

  window.dispatchEvent(
    new CustomEvent("visa_checker_nav_click", { detail: payload }),
  );
}
