"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  FileText,
  Map as MapIcon,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GuideTabsSection } from "@/components/ui/GuideTabs";
import { GuideFeaturedHero } from "@/components/guides/GuideFeaturedHero";
import { GuideKnowledgeCategory } from "@/components/guides/GuideKnowledgeCategory";
import { Container, Section } from "@/components/shared";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import {
  featuredGuideSlug,
  guideHubCategories,
  type GuideHubCategoryKey,
} from "@/lib/content/guide-hub";
import type { Guide } from "@/lib/content/types";
import { localizeGuide } from "@/lib/i18n/content";
import { siteEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

const categoryIcons: Record<GuideHubCategoryKey, LucideIcon> = {
  visaEntry: FileText,
  exploreFiji: MapIcon,
  travelPlanning: Compass,
  travelAdvice: Shield,
};

const categoryMetaKeys: Record<
  GuideHubCategoryKey,
  {
    titleKey:
      | "categoryVisaEntryTitle"
      | "categoryExploreFijiTitle"
      | "categoryTravelPlanningTitle"
      | "categoryTravelAdviceTitle";
    subKey:
      | "categoryVisaEntrySub"
      | "categoryExploreFijiSub"
      | "categoryTravelPlanningSub"
      | "categoryTravelAdviceSub";
  }
> = {
  visaEntry: {
    titleKey: "categoryVisaEntryTitle",
    subKey: "categoryVisaEntrySub",
  },
  exploreFiji: {
    titleKey: "categoryExploreFijiTitle",
    subKey: "categoryExploreFijiSub",
  },
  travelPlanning: {
    titleKey: "categoryTravelPlanningTitle",
    subKey: "categoryTravelPlanningSub",
  },
  travelAdvice: {
    titleKey: "categoryTravelAdviceTitle",
    subKey: "categoryTravelAdviceSub",
  },
};

const categoryAnchors: Record<GuideHubCategoryKey, string> = {
  visaEntry: "visa-entry",
  exploreFiji: "explore-fiji",
  travelPlanning: "travel-planning",
  travelAdvice: "travel-advice",
};

export function GuidesHubClient({ guides }: { guides: Guide[] }) {
  const t = useT();
  const { locale } = useLocale();

  const localizedGuides = useMemo(
    () => guides.map((g) => localizeGuide(g, locale)),
    [guides, locale],
  );

  const guideBySlug = useMemo(
    () => new Map(localizedGuides.map((g) => [g.slug, g])),
    [localizedGuides],
  );

  const featuredGuide = guideBySlug.get(featuredGuideSlug) ?? localizedGuides[0];

  const hubCategories = useMemo(
    () =>
      guideHubCategories.map((cat) => ({
        ...cat,
        guides: cat.slugs
          .map((slug) => guideBySlug.get(slug))
          .filter((g): g is NonNullable<typeof g> => Boolean(g)),
      })),
    [guideBySlug],
  );

  return (
    <PageLayout activeHref="/guides" stickyCta>
      <GuideTabsSection activeHref="/guides" />

      <Section compact className="pb-8 pt-5" decor={false}>
        <Container>
          <motion.header
            className="mx-auto max-w-5xl text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: siteEase }}
          >
            <p className={cn(ds.eyebrowGold, "text-[11px]")}>{t.pages.guidesEyebrow}</p>
            <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.75rem] md:text-[3.15rem]">
              {t.pages.guidesHero}
            </h1>
            <p className="mx-auto mt-5 text-[15px] leading-[1.8] text-foreground/58 sm:text-base md:whitespace-nowrap">
              {t.pages.guidesSubtitle}
            </p>
          </motion.header>

          {hubCategories.length > 0 && (
            <nav
              aria-label="Guide categories"
              className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2"
            >
              {hubCategories.map((cat) => {
                const meta = categoryMetaKeys[cat.key];
                return (
                  <a
                    key={cat.key}
                    href={`#${categoryAnchors[cat.key]}`}
                    className={cn(
                      "inline-flex items-center rounded-full border border-foreground/[0.08] bg-white px-4 py-2",
                      "text-xs font-medium text-navy/70 shadow-[0_2px_12px_rgba(26,39,68,0.04)]",
                      "transition-all duration-300 hover:border-gold/30 hover:text-gold",
                    )}
                  >
                    {t.guidesPage[meta.titleKey]}
                  </a>
                );
              })}
            </nav>
          )}
        </Container>
      </Section>

      <Section compact className="pb-20 pt-10 md:pt-12" decor={false}>
        <Container className="space-y-12 md:space-y-16">
          {featuredGuide && (
            <GuideFeaturedHero
              title={featuredGuide.title}
              description={featuredGuide.excerpt}
              href={`/guides/${featuredGuide.slug}`}
              image={featuredGuide.heroImage}
            />
          )}

          {hubCategories.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-2xl text-navy">{t.pages.noGuides}</p>
              <p className="mt-3 text-[15px] text-foreground/55">{t.pages.noGuidesHint}</p>
            </div>
          ) : (
            <div className="space-y-8 md:space-y-10">
              {hubCategories.map((cat, i) => {
                const meta = categoryMetaKeys[cat.key];
                return (
                  <GuideKnowledgeCategory
                    key={cat.key}
                    id={categoryAnchors[cat.key]}
                    eyebrow={String(i + 1).padStart(2, "0")}
                    title={t.guidesPage[meta.titleKey]}
                    subtitle={t.guidesPage[meta.subKey]}
                    icon={categoryIcons[cat.key]}
                    guides={cat.guides}
                    index={i}
                  />
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      <Section variant="navy" compact className="py-16 md:py-20" decor={false} reveal={false}>
        <Container className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
            {t.pages.guidesConcierge}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-[1.85rem] leading-tight tracking-[-0.02em] text-white sm:text-[2.25rem] md:text-[2.5rem]">
            {t.pages.guidesItineraryTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
            {t.pages.guidesItinerarySub}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy transition-all duration-300 hover:brightness-105"
          >
            {t.pages.guidesContactConcierge}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Container>
      </Section>
    </PageLayout>
  );
}
