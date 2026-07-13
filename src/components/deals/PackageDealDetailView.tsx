"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin, Moon, Star } from "lucide-react";
import {
  ContentBlock,
  DetailHero,
  InquiryCTA,
  RelatedCards,
} from "@/components/marketplace/DetailSections";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import {
  deriveDealIncludes,
  formatDealDuration,
  getDealBookBefore,
  getDealInclusionBadges,
  getDealPackageTags,
  getDealTravelDates,
  getDealTrustTags,
  getDealUrgencyLabel,
  getDealValueBlock,
  packageDealHref,
  resolvePackageDetail,
  withPackageDealDefaults,
} from "@/lib/content/deal-helpers";
import type { DealPackageTag, FijiDeal } from "@/lib/content/deals";
import { getRelatedPackageDeals } from "@/lib/content/deals";
import { localizeDeal } from "@/lib/i18n/content";
import { Container, Section } from "@/components/shared";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

function mergeFaqs(deal: FijiDeal) {
  const detailFaqs = deal.packageDetail?.faqs ?? [];
  return detailFaqs.length > 0 ? detailFaqs : [];
}

export function PackageDealDetailView({ deal }: { deal: FijiDeal }) {
  const { locale } = useLocale();
  const t = useT();
  const pkg = withPackageDealDefaults(localizeDeal(deal, locale));
  const detail = resolvePackageDetail(pkg);
  const inclusions = deriveDealIncludes(pkg);
  const exclusions = detail.exclusions ?? [];
  const highlights = detail.highlights ?? [];
  const faqs = mergeFaqs(pkg);
  const inclusionBadges = getDealInclusionBadges(pkg);
  const trustTags = getDealTrustTags(pkg);
  const packageTags = getDealPackageTags(pkg);
  const travelDates = getDealTravelDates(pkg);
  const bookBefore = getDealBookBefore(pkg);
  const duration = formatDealDuration(pkg);
  const valueBlock = getDealValueBlock(pkg);
  const urgencyText = getDealUrgencyLabel(pkg, {
    bookBefore: (date) => t.deals.card.bookBefore.replace("{date}", date),
    limitedTime: t.deals.card.limitedTime,
    limitedAvailability: t.deals.card.limitedAvailability,
    mostPopular: t.deals.card.mostPopular,
    popularThisWeek: t.deals.card.popularThisWeek,
    trendingPackage: t.deals.card.trendingPackage,
    packagesRemaining: (n) => t.deals.card.packagesRemaining.replace("{n}", String(n)),
  });
  const related = getRelatedPackageDeals(pkg.slug).map((d) => {
    const loc = localizeDeal(d, locale);
    return {
      title: loc.title,
      href: packageDealHref(loc.slug),
      image: loc.image,
    };
  });

  const meta = [
    {
      label: t.deals.packageDetail.destination,
      value: pkg.destination ?? pkg.location,
    },
    ...(pkg.resortName
      ? [{ label: t.deals.packageDetail.resortName, value: pkg.resortName }]
      : []),
    ...(duration
      ? [{ label: t.deals.packageDetail.duration, value: duration }]
      : []),
    ...(travelDates
      ? [{ label: t.deals.packageDetail.travelDates, value: travelDates }]
      : []),
    ...(bookBefore
      ? [{ label: t.deals.packageDetail.bookBefore, value: bookBefore }]
      : []),
  ];

  return (
    <>
      <DetailHero
        title={pkg.title}
        tagline={t.deals.eyebrow}
        image={pkg.image}
        imageAlt={pkg.title}
        breadcrumb={[
          { label: t.common.home, href: "/" },
          { label: t.deals.breadcrumb, href: "/deals-and-offers/package-deals" },
          { label: pkg.title, href: packageDealHref(pkg.slug) },
        ]}
        meta={meta}
        cta={{
          label: t.deals.packageDetail.enquirePackage,
          href: `/contact?package=${pkg.slug}&intent=book`,
        }}
      />

      <Section compact>
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-gold/10 to-gold/5 px-6 py-5 text-center">
            {pkg.rating ? (
              <div className="flex items-center gap-2 text-navy">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-semibold">{pkg.rating.toFixed(1)}</span>
                {pkg.reviewCount ? (
                  <span className="text-sm text-foreground/60">
                    ({pkg.reviewCount.toLocaleString()} {t.deals.card.reviews})
                  </span>
                ) : null}
              </div>
            ) : null}
            {trustTags.map((tag) => (
              <span key={tag} className="text-sm font-medium text-navy">
                {t.deals.card.trust[tag]}
              </span>
            ))}
            {duration ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-foreground/65">
                <Moon className="h-3.5 w-3.5 text-gold" />
                {duration}
              </span>
            ) : null}
            {urgencyText ? (
              <span className="rounded-full border border-coral/25 bg-coral/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral">
                {urgencyText}
              </span>
            ) : null}
          </div>

          {packageTags.length > 0 ? (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {packageTags.map((tag: DealPackageTag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-navy"
                >
                  {t.deals.card.packageTags[tag]}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {inclusionBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-navy/80 shadow-sm"
              >
                {t.deals.card.inclusions[badge]}
              </span>
            ))}
            {pkg.freeCancellation ? (
              <span className="rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-navy/80 shadow-sm">
                {t.deals.card.freeCancellation}
              </span>
            ) : null}
            {pkg.instantConfirmation ? (
              <span className="rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-navy/80 shadow-sm">
                {t.deals.card.instantConfirmation}
              </span>
            ) : null}
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-4">
            <div className="w-full min-w-[200px] max-w-[260px] flex-1 rounded-2xl border border-navy/[0.06] bg-white p-4 shadow-sm sm:w-auto">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/45">
                {t.deals.packageDetail.destination}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                {pkg.destination ?? pkg.location}
              </p>
            </div>
            {pkg.resortName ? (
              <div className="w-full min-w-[200px] max-w-[260px] flex-1 rounded-2xl border border-navy/[0.06] bg-white p-4 shadow-sm sm:w-auto">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/45">
                  {t.deals.packageDetail.resortName}
                </p>
                <p className="mt-1 text-sm font-medium text-navy">{pkg.resortName}</p>
              </div>
            ) : null}
            {travelDates ? (
              <div className="w-full min-w-[200px] max-w-[260px] flex-1 rounded-2xl border border-navy/[0.06] bg-white p-4 shadow-sm sm:w-auto">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/45">
                  {t.deals.packageDetail.travelDates}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  {travelDates}
                </p>
              </div>
            ) : null}
            {bookBefore ? (
              <div className="w-full min-w-[200px] max-w-[260px] flex-1 rounded-2xl border border-navy/[0.06] bg-white p-4 shadow-sm sm:w-auto">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/45">
                  {t.deals.packageDetail.bookBefore}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  {bookBefore}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow-gold">{t.deals.packageDetail.overview}</p>
              <h2 className={cn(ds.headingSection, "mt-2 mb-5")}>{pkg.title}</h2>
              <p className="text-[15px] leading-[1.85] text-foreground/70">
                {detail.overview ?? pkg.description}
              </p>
              {valueBlock ? (
                <div className="mt-6 space-y-3 rounded-2xl border border-gold/15 bg-gold/[0.06] px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/45">
                    {t.deals.packageDetail.valueBlock}
                  </p>
                  {valueBlock.bonusValue ? (
                    <p className="text-sm font-semibold text-navy">{valueBlock.bonusValue}</p>
                  ) : null}
                  {valueBlock.resortCredit ? (
                    <p className="text-sm font-semibold text-navy">{valueBlock.resortCredit}</p>
                  ) : null}
                  {valueBlock.includedTours?.length ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
                        {t.deals.card.includedTours}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {valueBlock.includedTours.map((item) => (
                          <li key={item} className="text-sm text-foreground/65">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {valueBlock.includedExperiences?.length ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
                        {t.deals.card.includedExperiences}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {valueBlock.includedExperiences.map((item) => (
                          <li key={item} className="text-sm text-foreground/65">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {valueBlock.includedTransportation?.length ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
                        {t.deals.card.includedTransportation}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {valueBlock.includedTransportation.map((item) => (
                          <li key={item} className="text-sm text-foreground/65">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            {highlights.length > 0 ? (
              <ContentBlock title={t.deals.packageDetail.highlights} items={highlights} />
            ) : null}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {inclusions.length > 0 ? (
              <ContentBlock title={t.deals.packageDetail.inclusions} items={inclusions} />
            ) : null}
            {exclusions.length > 0 ? (
              <ContentBlock title={t.deals.packageDetail.exclusions} items={exclusions} />
            ) : null}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {detail.roomTypes && detail.roomTypes.length > 0 ? (
              <ContentBlock title={t.deals.packageDetail.roomTypes} items={detail.roomTypes} />
            ) : null}
            {detail.activities && detail.activities.length > 0 ? (
              <ContentBlock title={t.deals.packageDetail.activities} items={detail.activities} />
            ) : null}
            {detail.transportation && detail.transportation.length > 0 ? (
              <ContentBlock
                title={t.deals.packageDetail.transportation}
                items={detail.transportation}
              />
            ) : null}
          </div>

          <div className="mx-auto mt-14 max-w-md rounded-2xl border border-navy/[0.06] bg-[var(--card-elevated)] px-6 py-6 text-center shadow-[var(--shadow-card)] sm:max-w-lg sm:px-8 sm:py-7">
            <div className="flex flex-col items-center gap-5">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/45">
                  {t.deals.card.startingPrice}
                </span>
                <p className="mt-1 font-serif text-3xl text-coral sm:text-4xl">{pkg.price}</p>
                {pkg.priceNote ? (
                  <p className="mt-1 text-sm text-foreground/55">{pkg.priceNote}</p>
                ) : null}
                {pkg.originalPrice ? (
                  <p className="mt-1 text-sm text-foreground/40 line-through">{pkg.originalPrice}</p>
                ) : null}
                {pkg.discountLabel ? (
                  <span className="mt-2 inline-block rounded-full bg-coral/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-coral">
                    {pkg.discountLabel}
                  </span>
                ) : null}
              </div>
              <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                <Link
                  href={`/contact?package=${pkg.slug}&intent=book`}
                  className={cn(ds.btnBase, ds.btnGold, "inline-flex gap-2 px-8")}
                >
                  {t.deals.packageDetail.bookPackage}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contact?package=${pkg.slug}&intent=availability`}
                  className={cn(ds.btnBase, ds.btnGhost, "border-navy/15 px-8 text-navy")}
                >
                  {t.deals.card.checkAvailability}
                </Link>
              </div>
            </div>
          </div>

          {faqs.length > 0 ? (
            <div className="mt-20">
              <h2 className={cn(ds.headingSection, "mb-8")}>{t.common.faqs}</h2>
              <FAQAccordion items={faqs} columns={1} />
            </div>
          ) : null}

          <div className="mt-20">
            <RelatedCards title={t.deals.packageDetail.related} items={related} />
          </div>

          <div className="mt-20">
            <InquiryCTA
              title={t.deals.packageDetail.enquirePackage}
              subtitle={t.detail.readyToPlanSub}
              bookHref={`/contact?package=${pkg.slug}&intent=book`}
              bookLabel={t.deals.packageDetail.bookPackage}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
