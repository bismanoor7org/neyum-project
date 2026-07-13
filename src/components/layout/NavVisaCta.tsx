"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";
import { trackVisaCheckerNavClick } from "@/lib/analytics/visa-track";
import { AI_VISA_ASSISTANT_HREF } from "@/lib/nav/visa-nav";
import { cn } from "@/lib/utils";

type NavVisaCtaProps = {
  className?: string;
};

export function NavVisaCta({ className }: NavVisaCtaProps) {
  const { t } = useLocale();

  return (
    <Link
      href={AI_VISA_ASSISTANT_HREF}
      onClick={() => trackVisaCheckerNavClick("nav_cta", AI_VISA_ASSISTANT_HREF)}
      className={cn("fiji-nav-pill-btn fiji-nav-pill-btn--gold shrink-0 whitespace-nowrap", className)}
    >
      {t.nav.checkVisa}
    </Link>
  );
}
