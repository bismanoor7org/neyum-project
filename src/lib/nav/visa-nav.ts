import type { LucideIcon } from "lucide-react";

/** Fiji Visa Checker — navbar routes & dropdown items */

export const AI_VISA_ASSISTANT_HREF = "/ai-fiji-visa-assistant" as const;

export const VISA_NAV_ROUTES = [AI_VISA_ASSISTANT_HREF] as const;

export type VisaNavItemKey = "aiVisaAssistant";

export type VisaNavItem = {
  labelKey: VisaNavItemKey;
  descriptionKey: `${VisaNavItemKey}Desc`;
  href: string;
  icon: LucideIcon | "ai-badge";
};

/** Rich dropdown — title, subtitle, chevron (matches luxury nav mockup) */
export const VISA_NAV_DROPDOWN: VisaNavItem[] = [
  {
    labelKey: "aiVisaAssistant",
    descriptionKey: "aiVisaAssistantDesc",
    href: AI_VISA_ASSISTANT_HREF,
    icon: "ai-badge",
  },
];

export function isVisaCheckerRoute(path: string): boolean {
  return (
    path.startsWith("/fiji-visa-for-") ||
    path === AI_VISA_ASSISTANT_HREF
  );
}
