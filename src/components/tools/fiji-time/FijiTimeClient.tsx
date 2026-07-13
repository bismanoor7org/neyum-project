"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { LiveClock } from "@/components/tools/world-time-weather/LiveClock";
import { ToolFaq } from "@/components/tools/world-time-weather/ToolFaq";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { FIJI_REGIONS, FIJI_TIME_FAQ, FIJI_TIMEZONE } from "@/lib/tools/fiji-time/constants";
import { formatTimezoneLabel } from "@/lib/tools/world-time-weather/format";
import { fijiTimeJsonLd } from "@/lib/tools/fiji-time/seo";
import { Clock } from "lucide-react";

export function FijiTimeClient() {
  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd data={fijiTimeJsonLd()} />

      <PageHero
        variant="plain"
        eyebrow="Travel Tools"
        title="Fiji Time Now"
        subtitle="Live Fiji Standard Time (Pacific/Fiji, UTC+12) for Suva, Nadi, and resort regions — updated every second."
        align="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: TOOLS_HREF },
          { label: "Fiji Time" },
        ]}
      />

      <Section variant="cream" id="fiji-live-time" reveal={false}>
        <div className={ds.containerNarrow}>
          <div className="card-luxury p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden />
              <p className={ds.eyebrowGold}>Fiji Standard Time</p>
            </div>
            <h2 className={cn(ds.headingCard, "mt-2 text-2xl md:text-3xl")}>
              {formatTimezoneLabel(FIJI_TIMEZONE)}
            </h2>
            <div className="mt-6">
              <LiveClock timezone={FIJI_TIMEZONE} showTimezone />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FIJI_REGIONS.map((region) => (
              <div
                key={region.city}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] px-5 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/50">
                  {region.city}
                </p>
                <p className="mt-1 text-xs text-foreground/45">{region.label}</p>
                <div className="mt-3">
                  <LiveClock
                    timezone={region.timezone}
                    timeClassName="font-serif text-2xl tracking-tight text-navy"
                    dateClassName="text-xs text-foreground/60"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="sand" id="faq" decor={false}>
        <div className={ds.containerNarrow}>
          <p className={ds.eyebrowGold}>FAQ</p>
          <h2 className={cn(ds.headingSection, "mt-2")}>Fiji Time</h2>
          <div className="mt-8 card-luxury p-6 md:p-8">
            <ToolFaq items={[...FIJI_TIME_FAQ]} />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
