"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Check, Lightbulb, Truck } from "lucide-react";
import {
  InquiryCTA,
  RelatedCards,
} from "@/components/marketplace/DetailSections";
import { DestinationMapPanel } from "@/components/destinations/DestinationMapPanel";
import { ExperienceModernCard } from "@/components/experiences/ExperienceModernCard";
import { DealModernCard } from "@/components/deals/DealModernCard";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { Container, Section, SectionHeader } from "@/components/shared";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import type {
  Destination,
  DestinationMarketplaceData,
} from "@/lib/content/types";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import {
  DESTINATION_PACKAGES_GRID_CLASS,
  DESTINATION_PAGE_LIMITS,
} from "@/lib/destinations/detail-page";
import { getDealBySlug } from "@/lib/content/deals";
import { fillPackageDeals } from "@/lib/content/destination-marketplace-fill";
import { localizeDeal, localizeDestination } from "@/lib/i18n/content";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function DestinationDetailView({
  destination: raw,
  marketplace,
  relatedDestinations,
}: {
  destination: Destination;
  marketplace: DestinationMarketplaceData;
  relatedDestinations: Destination[];
}) {
  const t = useT();
  const { locale } = useLocale();
  const destination = localizeDestination(raw, locale);
  const destinationCardImage = destination.cardImage || destination.heroImage;

  const related = relatedDestinations.map((d) => {
    const loc = localizeDestination(d, locale);
    return {
      title: loc.title,
      href: CMS_ROUTES.destinations.detail(d.slug),
      image: d.cardImage || d.heroImage || destinationCardImage,
    };
  });
  const showcaseStays = marketplace.stays.slice(0, DESTINATION_PAGE_LIMITS.stays);

  return (
    <>
      {/* Overview */}
      <Section compact>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={cn(ds.headingSection, "mb-6")}>{destination.title}</h2>
            <p className="text-[15px] leading-[1.85] text-foreground/70">
              {destination.description ?? destination.overview}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {destination.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-gold/25 bg-gold/8 px-4 py-1.5 text-xs font-semibold text-navy"
                >
                  {h}
                </span>
              ))}
            </div>

            {destinationCardImage && (
              <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)] ring-1 ring-black/[0.05]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={destinationCardImage}
                    alt={`${destination.title} overview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42rem"
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Top Experiences */}
      <MarketplaceSection
        title={t.destinations.topExperiences}
        subtitle={t.destinations.topExperiencesSub}
        actionHref={CMS_ROUTES.tours.index}
        actionLabel={t.destinations.viewAll}
        empty={marketplace.experiences.length === 0}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketplace.experiences.slice(0, DESTINATION_PAGE_LIMITS.experiences).map((exp) => (
            <ExperienceModernCard
              key={exp.slug}
              slug={exp.slug}
              title={exp.title}
              description={exp.title}
              image={exp.image || destinationCardImage}
              location={exp.location}
              duration={exp.duration}
              category={exp.category}
              price={exp.priceFrom}
              priceNote={t.common.from}
              rating={4.9}
              reviewCount={120}
              ctaPrimary="viewDetails"
            />
          ))}
        </div>
      </MarketplaceSection>

      {/* Featured Tours */}
      <MarketplaceSection
        variant="cream"
        title={t.destinations.featuredTours}
        subtitle={t.destinations.featuredToursSub}
        actionHref={CMS_ROUTES.tours.index}
        actionLabel={t.destinations.viewAll}
        empty={marketplace.tours.length === 0}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {marketplace.tours.slice(0, DESTINATION_PAGE_LIMITS.tours).map((tour) => (
            <Link
              key={tour.slug}
              href={tour.href}
              className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-[var(--shadow-card)] ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/15">
                <Image
                  src={tour.image || destinationCardImage}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="112px"
                />
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold">{tour.category}</p>
                <h3 className="mt-1 font-serif text-lg text-navy group-hover:text-gold">{tour.title}</h3>
                <p className="mt-1 text-xs text-foreground/55">{tour.duration}</p>
                <p className="mt-2 text-sm font-semibold text-navy">
                  {t.common.from} {tour.priceFrom}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </MarketplaceSection>

      {/* Luxury Resorts & Stays */}
      <MarketplaceSection
        title={t.destinations.luxuryStays}
        subtitle={t.destinations.luxuryStaysSub}
        actionHref="/places-to-stay"
        actionLabel={t.destinations.viewAll}
        empty={showcaseStays.length === 0}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseStays.map((stay) => (
            <Link
              key={stay.slug}
              href={stay.href}
              className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={stay.image || destinationCardImage}
                  alt={stay.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="33vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy">
                  {stay.stars}★
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-gold">{stay.location}</p>
                <h3 className="mt-1 font-serif text-lg text-navy">{stay.title}</h3>
                <p className="mt-3 text-sm font-semibold text-navy">
                  {t.common.from} {stay.priceFrom} {t.detail.perNight}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </MarketplaceSection>

      {/* Packages */}
      <MarketplaceSection
        variant="cream"
        title={t.destinations.packages}
        subtitle={t.pages.destinationsMarketplaceSubtitle}
        actionHref="/deals-and-offers/package-deals"
        actionLabel={t.destinations.viewAll}
        empty={marketplace.packages.length === 0}
      >
        <div className={DESTINATION_PACKAGES_GRID_CLASS}>
          {marketplace.packages.slice(0, DESTINATION_PAGE_LIMITS.packages).map((pkg) => {
            const deal =
              getDealBySlug(pkg.slug) ??
              fillPackageDeals.find((d) => d.slug === pkg.slug);
            const loc = deal ? localizeDeal(deal, locale) : null;
            return (
              <DealModernCard
                key={pkg.slug}
                variant="destination"
                className="h-full"
                slug={pkg.slug}
                title={loc?.title ?? pkg.title}
                description={loc?.description ?? deal?.description ?? ""}
                image={loc?.image ?? (pkg.image || destinationCardImage)}
                location={destination.title}
                price={loc?.price ?? pkg.price}
                category="Package Deals"
              />
            );
          })}
        </div>
      </MarketplaceSection>

      {/* Transportation */}
      <MarketplaceSection
        title={t.destinations.transportOptions}
        subtitle={t.destinations.transportOptionsSub}
        actionHref="/contact?intent=transport"
        actionLabel={t.destinations.bookEnquire}
        empty={marketplace.transport.length === 0}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {marketplace.transport.map((item) => (
            <TransportCard key={item.title} {...item} />
          ))}
        </div>
      </MarketplaceSection>

      {/* Island Transfers */}
      <MarketplaceSection
        variant="cream"
        title={t.destinations.islandTransfers}
        subtitle={t.destinations.islandTransfersSub}
        actionHref="/contact?intent=transfer"
        actionLabel={t.destinations.bookEnquire}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {marketplace.transfers.map((item) => (
            <TransportCard key={item.title} {...item} />
          ))}
        </div>
      </MarketplaceSection>

      {/* Interactive Map */}
      <Section compact>
        <Container>
          <SectionHeader
            title={destination.title}
            subtitle={t.detail.interactiveMapNote}
            align="center"
            size="compact"
          />
          <DestinationMapPanel activeSlug={raw.slug} className="mt-8" />
        </Container>
      </Section>

      {/* Best Time + Travel Tips */}
      <Section variant="cream-compact">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-foreground/6 bg-white p-8 shadow-[var(--shadow-card)]">
              <div className="mb-4 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gold" />
                <h2 className={ds.headingCard}>{t.destinations.bestTimeToVisit}</h2>
              </div>
              <p className="text-sm leading-relaxed text-foreground/70">
                {destination.bestTimeToVisit || destination.weather}
              </p>
            </div>
            <div className="rounded-2xl border border-foreground/6 bg-white p-8 shadow-[var(--shadow-card)]">
              <div className="mb-4 flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-gold" />
                <h2 className={ds.headingCard}>{t.destinations.travelTips}</h2>
              </div>
              <ul className="space-y-3">
                {(destination.travelTips?.length
                  ? destination.travelTips
                  : destination.transport.slice(0, 4)
                ).map((tip) => (
                  <li key={tip} className="flex gap-3 text-sm text-foreground/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      {destination.faqs.length > 0 && (
        <Section compact>
          <Container>
            <h2 className={cn(ds.headingSection, "mb-8 text-center")}>{t.common.faqs}</h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion items={destination.faqs} columns={1} />
            </div>
          </Container>
        </Section>
      )}

      {/* Related Destinations */}
      {related.length > 0 && (
        <Section variant="cream-compact">
          <Container>
            <RelatedCards title={t.detail.relatedDestinations} items={related} centered />
          </Container>
        </Section>
      )}

      <Section compact>
        <Container>
          <InquiryCTA />
        </Container>
      </Section>
    </>
  );
}

function MarketplaceSection({
  eyebrow,
  title,
  subtitle,
  actionHref,
  actionLabel,
  children,
  variant,
  empty = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  actionHref: string;
  actionLabel: string;
  children: React.ReactNode;
  variant?: "cream";
  empty?: boolean;
}) {
  const t = useT();

  return (
    <Section compact variant={variant}>
      <Container>
        <div className="mx-auto mb-8 max-w-3xl text-center">
          {eyebrow && <p className="eyebrow-gold">{eyebrow}</p>}
          <h2 className={cn(ds.headingSection, eyebrow ? "mt-2" : undefined)}>{title}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-foreground/60">{subtitle}</p>
          <Link
            href={actionHref}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold"
          >
            {actionLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {empty ? (
          <p className="rounded-2xl border border-dashed border-foreground/15 bg-white/50 px-6 py-12 text-center text-sm text-foreground/55">
            {t.destinations.noListings}{" "}
            <Link href="/contact" className="font-semibold text-navy underline-offset-2 hover:underline">
              {t.destinations.planWithConcierge}
            </Link>
          </p>
        ) : (
          children
        )}
      </Container>
    </Section>
  );
}

function TransportCard({
  title,
  description,
  href,
}: {
  title: string;
  description?: string;
  href: string;
}) {
  const t = useT();

  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-2xl border border-foreground/6 bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:border-gold/30 hover:shadow-lg"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
        <Truck className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg text-navy group-hover:text-gold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-foreground/60">{description}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy">
          {t.destinations.bookEnquire}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
