"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Shield, Tag } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  DealModernCard,
  DealsTrustStrip,
} from "@/components/deals/DealModernCard";
import { Container, PageHero, Section, SectionHeader } from "@/components/shared";
import { InquiryCTA } from "@/components/marketplace/DetailSections";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { localizeDeal } from "@/lib/i18n/content";
import {
  dealCategories,
  dealCategorySlugs,
  deals,
  getDealsByCategory,
  type DealCategory,
} from "@/lib/content/deals";
import { cn } from "@/lib/utils";

const sectionGap = "space-y-10 md:space-y-12";

interface DealsHubProps {
  activeCategory: DealCategory;
}

export function DealsHub({ activeCategory }: DealsHubProps) {
  const { locale } = useLocale();
  const t = useT();
  const filtered = useMemo(
    () => getDealsByCategory(activeCategory).map((d) => localizeDeal(d, locale)),
    [activeCategory, locale],
  );

  return (
    <PageLayout activeHref="/deals-and-offers" stickyCta >
      <PageHero
        variant="plain"
        align="center"
        eyebrow={t.deals.eyebrow}
        title={t.deals.title}
        subtitle={t.deals.subtitle}
        breadcrumbs={[
          { label: t.common.home, href: "/" },
          { label: t.deals.breadcrumb, href: "/deals-and-offers/package-deals" },
          { label: activeCategory },
        ]}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-foreground/70">
          <span className="flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-gold" />
            {deals.length} {t.deals.curatedOffers}
          </span>
          <span className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-gold" />
            {t.deals.bestPrice}
          </span>
        </div>
      </PageHero>

      <section className="border-b border-foreground/10 bg-white py-4">
        <Container className="flex flex-wrap justify-center gap-2">
          {dealCategories.map((label) => {
            const slug = dealCategorySlugs[label];
            const isActive = label === activeCategory;
            return (
              <Link
                key={label}
                href={`/deals-and-offers/${slug}`}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm",
                  isActive
                    ? "bg-gold text-navy shadow-sm"
                    : "border border-gold/40 text-gold hover:bg-gold/10",
                )}
              >
                {label}
              </Link>
            );
          })}
        </Container>
      </section>

      <Section compact className="pb-16 pt-8" decor={false}>
        <Container className={sectionGap}>
          <DealsTrustStrip />

          <p className="text-center text-sm text-foreground/55">
            {filtered.length}{" "}
            {filtered.length === 1 ? t.deals.offer : t.deals.offers} {t.deals.offersIn}{" "}
            <span className="font-medium text-navy">{activeCategory}</span>
          </p>

          <ul className="grid list-none grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
            {filtered.map((deal) => (
              <li key={deal.slug} className="h-full">
                <DealModernCard {...deal} />
              </li>
            ))}
          </ul>

          <SectionHeader
            eyebrow={t.deals.whyBookEyebrow}
            eyebrowVariant="gold"
            title={t.deals.whyBookTitle}
            subtitle={t.deals.whyBookSub}
            size="compact"
            action={{ label: t.deals.travelGuides, href: "/guides" }}
          />

          <InquiryCTA
            compact
            title={t.deals.customPackageTitle}
            subtitle={t.deals.customPackageSub}
          />
        </Container>
      </Section>
    </PageLayout>
  );
}
