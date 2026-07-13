"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";
import { TRIP_PLANNER_HREF } from "@/lib/nav/trip-planner-nav";
import { cn } from "@/lib/utils";

type NavTripPlannerCtaProps = {
  className?: string;
};

export function NavTripPlannerCta({ className }: NavTripPlannerCtaProps) {
  const { t } = useLocale();

  return (
    <Link
      href={TRIP_PLANNER_HREF}
      className={cn(
        "fiji-nav-pill-btn fiji-nav-pill-btn--gold fiji-luxury-nav-plan-trip fiji-luxury-nav-plan-trip--editorial shrink-0 whitespace-nowrap",
        className,
      )}
    >
      {t.journeyPlanner.planCta}
    </Link>
  );
}
