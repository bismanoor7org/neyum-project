"use client";

import { useMemo, useState } from "react";
import {
  Bed,
  CreditCard,
  Globe,
  Plane,
  Shield,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ImageOverlayCard } from "@/components/cards/ImageOverlayCard";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { GuideTabsSection } from "@/components/ui/GuideTabs";
import { PreFooterTransition } from "@/components/layout/pre-footer";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

import type { FAQItem } from "@/lib/content/types";

const categoryKeys = [
  { key: "catPlanning", icon: Globe },
  { key: "catAccommodation", icon: Bed },
  { key: "catTransport", icon: Plane },
  { key: "catDestinations", icon: Globe },
  { key: "catSafety", icon: Shield },
  { key: "catCurrency", icon: CreditCard },
] as const;

const faqKeys = [
  "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13",
] as const;

const tagKeys = [
  "tagVisa", "tagWeather", "tagAccommodation", "tagTransport", "tagActivities", "tagSafety",
] as const;

const STATIC_FAQ_CATEGORIES: Record<(typeof categoryKeys)[number]["key"], readonly (typeof faqKeys)[number][]> = {
  catPlanning: ["q1", "q2", "q8", "q9", "q10", "q13"],
  catAccommodation: ["q6"],
  catTransport: ["q5", "q10"],
  catDestinations: ["q11"],
  catSafety: ["q4", "q6", "q7", "q8"],
  catCurrency: ["q3", "q12"],
};

const TAG_FAQ_KEYS: Record<(typeof tagKeys)[number], readonly (typeof faqKeys)[number][]> = {
  tagVisa: ["q1"],
  tagWeather: ["q9"],
  tagAccommodation: ["q6"],
  tagTransport: ["q5"],
  tagActivities: ["q2"],
  tagSafety: ["q4", "q7", "q8"],
};

export function FAQPageClient({ dbFaqs = [] }: { dbFaqs?: FAQItem[] }) {
  const t = useT();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = categoryKeys.map(({ key, icon }) => ({
    key,
    label: t.faq[key],
    icon,
  }));

  const faqItems = useMemo(
    () =>
      dbFaqs.length > 0
        ? dbFaqs
        : faqKeys.map((key) => ({
            id: key,
            question: t.faq[key],
            answer: t.faq[key.replace("q", "a") as keyof typeof t.faq] as string,
          })),
    [t, dbFaqs],
  );

  const filteredFaqs = useMemo(() => {
    if (dbFaqs.length > 0) {
      if (!activeCategory && !activeTag) return faqItems;
      const query = (activeTag ?? activeCategory ?? "").toLowerCase();
      return faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query),
      );
    }

    const categoryKey = categories.find((cat) => cat.label === activeCategory)?.key;
    const tagKey = tagKeys.find((key) => t.faq[key] === activeTag);
    const allowed = new Set<string>();

    if (categoryKey) {
      STATIC_FAQ_CATEGORIES[categoryKey].forEach((key) => allowed.add(key));
    }
    if (tagKey) {
      TAG_FAQ_KEYS[tagKey].forEach((key) => allowed.add(key));
    }
    if (!categoryKey && !tagKey) return faqItems;

    return faqItems.filter((item) => "id" in item && allowed.has(item.id as string));
  }, [activeCategory, activeTag, categories, dbFaqs.length, faqItems, t.faq]);

  const tags = tagKeys.map((key) => t.faq[key]);

  return (
    <PageLayout activeHref="/faq" navbarVariant="navy" stickyCta >
      <GuideTabsSection activeHref="/faq" />

      <section className="bg-cream pb-20 pt-5">
        <div className="mx-auto grid max-w-5xl gap-3 px-6 sm:grid-cols-3 lg:grid-cols-6 lg:px-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => {
                  setActiveTag(null);
                  setActiveCategory(isActive ? null : cat.label);
                }}
                className={cn(
                  "flex flex-col items-center rounded-2xl border px-5 py-7 text-center shadow-sm transition-all",
                  isActive
                    ? "border-gold/40 bg-gold/10 shadow-[var(--shadow-card)]"
                    : "border-foreground/6 bg-cream-muted hover:border-gold/25 hover:shadow-[var(--shadow-card)]",
                )}
              >
                <cat.icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
                <span className="mt-3 text-xs font-medium text-navy">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-3xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-foreground/45">{t.faq.popularTags}</span>
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setActiveCategory(null);
                    setActiveTag(isActive ? null : tag);
                  }}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    isActive
                      ? "border-gold bg-gold/15 font-medium text-navy"
                      : "border-gold/50 text-navy hover:bg-gold/10",
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <FAQAccordion items={filteredFaqs} columns={1} />
          </div>
          <div className="mt-8 text-center">
            <Button href="/guides" variant="outline-gold">
              {t.faq.browseGuides}
            </Button>
          </div>
        </div>
      </section>

      <PreFooterTransition className="pb-20 pt-16 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-[84rem] px-6 lg:px-10">
          <h2 className="mb-8 font-serif text-[2rem] leading-tight tracking-[-0.02em] text-white md:mb-10 md:text-[2.5rem]">
            {t.faq.exploreResources}
          </h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <ImageOverlayCard
              image={images.destination}
              title={t.faq.destGuidesTitle}
              description={t.faq.destGuidesDesc}
              cta={t.faq.exploreCta}
              href="/places-to-go"
              luxury
            />
            <ImageOverlayCard
              image={images.weather}
              title={t.faq.travelTipsTitle}
              description={t.faq.travelTipsDesc}
              cta={t.faq.exploreCta}
              href="/things-to-know"
              luxury
            />
            <ImageOverlayCard
              image={images.travelReq}
              title={t.faq.advisoriesTitle}
              description={t.faq.advisoriesDesc}
              cta={t.faq.exploreCta}
              href="/contact"
              luxury
            />
          </div>
        </div>
      </PreFooterTransition>
    </PageLayout>
  );
}
