"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { useT } from "@/components/providers/LocaleProvider";
import { GUIDE_TABS } from "@/lib/constants";
import type { Messages } from "@/lib/i18n/en";
import { cn } from "@/lib/utils";

const GUIDE_TAB_KEYS: Record<string, keyof Messages["guideTabs"]> = {
  "/guides": "travelGuides",
  "/events": "events",
  "/itineraries": "itineraries",
  "/things-to-know": "thingsToKnow",
  "/faq": "faq",
};

type GuideAccent = "gold" | "navy" | "teal";

interface GuideTabsProps {
  activeHref: string;
  accent?: GuideAccent;
  compact?: boolean;
  /** When true, renders only the rail — for use inside GuideTabsSection with secondary filters */
  embedded?: boolean;
}

const filterRailScroll =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const compactPill =
  "gap-1.5 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm";

const activeTabStyles = {
  gold: "bg-gold text-navy shadow-[0_2px_12px_rgba(212,175,55,0.28)]",
  navy: "bg-navy text-white shadow-[0_2px_12px_rgba(15,47,53,0.18)]",
  teal: "bg-teal text-white shadow-[0_2px_12px_rgba(26,74,82,0.2)]",
};

const inactiveTabStyles = {
  gold: "text-navy/60 hover:bg-navy/[0.04] hover:text-navy",
  navy: "text-navy/60 hover:bg-navy/[0.04] hover:text-navy",
  teal: "text-navy/60 hover:bg-navy/[0.04] hover:text-navy",
};

export function GuideTabs({
  activeHref,
  accent = "gold",
  compact,
  embedded,
}: GuideTabsProps) {
  const t = useT();

  const rail = (
    <div
      className={cn(
        "guide-tabs-rail relative inline-flex max-w-full overflow-x-auto rounded-full border border-foreground/[0.08] bg-cream-muted/90 p-1 shadow-[0_2px_16px_rgba(15,47,53,0.04)] backdrop-blur-sm",
        filterRailScroll,
        compact ? "gap-0.5" : "gap-1",
      )}
      role="tablist"
      aria-label="Guide sections"
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        aria-hidden
      />

      {GUIDE_TABS.map((tab) => {
        const isActive = activeHref === tab.href;
        const labelKey = GUIDE_TAB_KEYS[tab.href];

        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            scroll={false}
            className={cn(
              "group relative z-[1] inline-flex shrink-0 touch-manipulation items-center rounded-full font-medium transition-all duration-300",
              compact ? compactPill : "gap-2 px-4 py-2.5 text-sm",
              isActive ? activeTabStyles[accent] : inactiveTabStyles[accent],
            )}
          >
            <span className="whitespace-nowrap">
              {labelKey ? t.guideTabs[labelKey] : tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );

  if (embedded) return rail;

  return <div className="flex justify-center">{rail}</div>;
}

interface GuideSecondaryFilterRailProps<T extends string = string> {
  items: readonly T[];
  active: T;
  onSelect: (label: T) => void;
  ariaLabel: string;
  accent?: GuideAccent;
}

const secondaryActiveStyles: Record<GuideAccent, string> = {
  gold: "font-medium text-navy after:bg-gold",
  navy: "font-medium text-navy after:bg-navy",
  teal: "font-medium text-navy after:bg-teal",
};

const secondaryInactiveStyles: Record<GuideAccent, string> = {
  gold: "font-normal text-navy/45 hover:text-navy/70",
  navy: "font-normal text-navy/45 hover:text-navy/70",
  teal: "font-normal text-navy/45 hover:text-navy/70",
};

/** Secondary category row — underline tabs, visually subordinate to primary GuideTabs rail */
export function GuideSecondaryFilterRail<T extends string = string>({
  items,
  active,
  onSelect,
  ariaLabel,
  accent = "gold",
}: GuideSecondaryFilterRailProps<T>) {
  return (
    <div
      className={cn(
        "guide-secondary-rail inline-flex max-w-full gap-0.5 overflow-x-auto sm:gap-1",
        filterRailScroll,
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((label) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(label)}
            className={cn(
              "relative inline-flex shrink-0 touch-manipulation items-center px-3 py-1.5 text-xs transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-opacity after:duration-300 sm:px-4 sm:text-sm",
              isActive
                ? cn(secondaryActiveStyles[accent], "after:opacity-100")
                : cn(secondaryInactiveStyles[accent], "after:opacity-0"),
            )}
          >
            <span className="whitespace-nowrap">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

interface GuideTabsSectionProps extends Pick<GuideTabsProps, "activeHref" | "accent"> {
  /** Optional secondary filter row — shares width and center with primary tabs */
  secondary?: ReactNode;
}

/** Standard filter-tab band — identical on Guides, Events, Itineraries, Things to Know, FAQ */
export function GuideTabsSection({
  activeHref,
  accent = "gold",
  secondary,
}: GuideTabsSectionProps) {
  return (
    <section
      className={cn(
        "relative z-30 bg-white py-3 shadow-[inset_0_-1px_0_rgba(15,47,53,0.06)]",
        !secondary &&
          "sticky top-[var(--fiji-nav-height,52px)] z-40 shadow-[0_1px_0_rgba(15,47,53,0.06),0_4px_16px_rgba(8,43,75,0.04)]",
      )}
    >
      <Container>
        {secondary ? (
          <div className="mx-auto flex w-full max-w-full flex-col items-center gap-2.5 overflow-hidden pb-0.5">
            <GuideTabs
              activeHref={activeHref}
              accent={accent}
              compact
              embedded
            />
            {secondary}
          </div>
        ) : (
          <GuideTabs activeHref={activeHref} accent={accent} compact />
        )}
      </Container>
    </section>
  );
}
