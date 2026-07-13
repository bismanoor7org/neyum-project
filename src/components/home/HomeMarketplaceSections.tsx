"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DealModernCard } from "@/components/deals/DealModernCard";
import { HomeFaqConcierge } from "@/components/home/HomeFaqConcierge";
import { LuxuryEscapes } from "@/components/home/LuxuryEscapes";
import { homeEase } from "@/components/home/home-motion";
import { Container, Section, SectionHeader } from "@/components/shared";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { localizeDeal, localizeDestination } from "@/lib/i18n/content";
import { getDealsByCategory } from "@/lib/content/deals";
import type { Destination, FAQItem } from "@/lib/content/types";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { destinations as staticDestinations } from "@/lib/content/destinations";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

export function FeaturedDestinations({
  destinations: propDestinations,
  section,
}: {
  destinations?: Destination[];
  section?: { title?: string; subtitle?: string };
}) {
  const { locale } = useLocale();
  const t = useT();
  const source =
    propDestinations && propDestinations.length > 0 ? propDestinations : staticDestinations;
  const featured = source.slice(0, 4);
  if (featured.length === 0) return null;
  const [hero, ...rest] = featured;

  const heroLoc = localizeDestination(hero, locale);
  const title = section?.title ?? t.home.featuredTitle;
  const subtitle = section?.subtitle ?? t.home.featuredSubtitle;

  return (
    <Section variant="cream" reveal={false}>
      <Container>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          align="center"
          size="compact"
          action={{ label: `${t.common.allDestinations} →`, href: "/places-to-go" }}
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Link
              href={CMS_ROUTES.destinations.detail(hero.slug)}
              className="card-editorial group block h-full min-h-[480px] lg:min-h-[520px]"
            >
              <div className="relative h-full min-h-[480px] lg:min-h-[520px]">
                <Image
                  src={hero.cardImage}
                  alt={heroLoc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="gradient-card-overlay absolute inset-0" />
                <div className="absolute inset-0 bg-navy/10 transition-colors duration-500 group-hover:bg-navy/5" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-11">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                    {t.common.featured}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-white lg:text-[2.75rem]">
                    {heroLoc.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 lg:text-[15px]">
                    {heroLoc.tagline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-transform duration-300 group-hover:translate-x-1">
                    {t.common.explore} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {rest.map((d, i) => {
              const loc = localizeDestination(d, locale);
              return (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={CMS_ROUTES.destinations.detail(d.slug)}
                    className={cn(
                      ds.cardLuxuryInteractive,
                  "group flex h-full min-h-[132px] overflow-hidden rounded-3xl",
                    )}
                  >
                    <div className="relative w-[42%] shrink-0 overflow-hidden sm:w-[38%] lg:w-[44%]">
                      <Image
                        src={d.cardImage}
                        alt={loc.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        sizes="240px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/15" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-5 lg:p-6">
                      <h3 className="font-serif text-lg text-navy transition-colors group-hover:text-navy-light lg:text-xl">
                        {loc.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/55 lg:text-[13px]">
                        {loc.tagline}
                      </p>
                      <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-gold">
                        {t.common.explore} →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { LuxuryEscapes } from "@/components/home/LuxuryEscapes";

export function FAQPreview({
  items,
  section,
}: {
  items?: Array<FAQItem & { id?: string; category?: string | null }>;
  section?: { title?: string; subtitle?: string };
}) {
  return <HomeFaqConcierge items={items} section={section} />;
}

export { HomeFaqConcierge } from "@/components/home/HomeFaqConcierge";

export function HomeDealsPreview() {
  const { locale } = useLocale();
  const t = useT();
  const packages = getDealsByCategory("Package Deals")
    .slice(0, 4)
    .map((deal) => localizeDeal(deal, locale));

  return (
    <Section variant="cream" reveal={false}>
      <Container>
        <SectionHeader
          title={t.home.dealsTitle}
          subtitle={t.home.dealsSubtitle}
          align="center"
          size="compact"
          action={{ label: `${t.common.allDeals} →`, href: "/deals-and-offers/package-deals" }}
        />
        <ul className="grid list-none gap-6 lg:grid-cols-4 lg:gap-8">
          {packages.map((deal, i) => (
            <motion.li
              key={deal.slug}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: homeEase }}
            >
              <DealModernCard {...deal} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export { CustomerStories, TravelerTestimonials } from "@/components/home/TravelerTestimonials";
