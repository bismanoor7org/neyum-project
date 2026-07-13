"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { EventModernCard } from "@/components/events/EventModernCard";
import {
  GuideSecondaryFilterRail,
  GuideTabsSection,
} from "@/components/ui/GuideTabs";
import { Container, Section, SectionHeader } from "@/components/shared";
import { InquiryCTA } from "@/components/marketplace/DetailSections";
import { useT } from "@/components/providers/LocaleProvider";
import {
  eventCategories,
  events,
  type EventCategoryFilter,
} from "@/lib/content/events";
import { siteEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

export default function EventsPage() {
  const t = useT();
  const [activeCategory, setActiveCategory] =
    useState<EventCategoryFilter>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return events;
    return events.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageLayout activeHref="/events" stickyCta >
      <GuideTabsSection
        activeHref="/events"
        secondary={
          <GuideSecondaryFilterRail
            items={eventCategories}
            active={activeCategory}
            onSelect={setActiveCategory}
            ariaLabel={t.events.filterType}
          />
        }
      />

      <Section compact className="pb-16 pt-8 md:pt-10" decor={false} reveal={false}>
        <Container className="space-y-8 md:space-y-10">
          <motion.header
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: siteEase }}
          >
            <p className={cn(ds.eyebrowGold, "text-[11px]")}>{t.events.eyebrow}</p>
            <h1 className="mt-3 font-serif text-[2rem] leading-[1.1] tracking-[-0.03em] text-navy sm:text-[2.35rem]">
              {t.seo.events.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground/65 sm:text-base">
              {t.events.subtitle}
            </p>
          </motion.header>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-foreground/15 bg-cream-muted/80 px-6 py-12 text-center">
              <p className="font-serif text-lg text-navy">{t.events.empty}</p>
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className={cn(ds.linkGold, "mt-3 inline-block text-sm")}
              >
                {t.events.showAll}
              </button>
            </div>
          ) : (
            <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event) => (
                <li key={event.slug}>
                  <EventModernCard
                    title={event.title}
                    description={event.description}
                    image={event.image}
                    location={event.location}
                    day={event.day}
                    month={event.month}
                    year={event.year}
                    category={event.category}
                    href="/contact"
                    featured={event.featured}
                  />
                </li>
              ))}
            </ul>
          )}

          <SectionHeader
            eyebrow={t.events.planEyebrow}
            eyebrowVariant="gold"
            title={t.events.planTitle}
            subtitle={t.events.planSub}
            align="center"
            size="compact"
            action={{ label: t.deals.travelGuides, href: "/guides" }}
          />

          <InquiryCTA
            compact
            title={t.events.attendingTitle}
            subtitle={t.events.attendingSub}
          />
        </Container>
      </Section>
    </PageLayout>
  );
}
