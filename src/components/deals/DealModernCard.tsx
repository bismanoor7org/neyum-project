"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  CalendarCheck,
  Clock,
  Headphones,
  MapPin,
  Moon,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import type { DealInclusionKind, DealPackageTag, FijiDeal } from "@/lib/content/deals";
import {
  formatDealDuration,
  getDealBookBefore,
  getDealCardDisplayBadges,
  getDealCardValueItems,
  getDealPackageTags,
  getDealTravelDates,
  getDealUrgencyLabel,
  packageDealHref,
} from "@/lib/content/deal-helpers";
import { cn } from "@/lib/utils";

export type DealModernCardProps = Pick<
  FijiDeal,
  | "slug"
  | "title"
  | "description"
  | "image"
  | "location"
  | "destination"
  | "resortName"
  | "duration"
  | "travelDates"
  | "bookBeforeDate"
  | "price"
  | "priceNote"
  | "category"
  | "featured"
  | "nights"
  | "transfersIncluded"
  | "flightsIncluded"
  | "freeCancellation"
  | "instantConfirmation"
  | "travelWindow"
  | "urgency"
  | "bookBefore"
  | "spotsLeft"
  | "packageTags"
  | "verifiedSupplier"
  | "rating"
  | "reviewCount"
  | "originalPrice"
  | "discountLabel"
  | "resortCredit"
  | "bonusValue"
  | "valueBlock"
  | "complimentaryActivities"
  | "complimentaryTransfers"
  | "freeExcursions"
  | "breakfastIncluded"
  | "allInclusive"
  | "kidsStayFree"
  | "kidsEatFree"
  | "familyPackage"
  | "honeymoonPackage"
  | "luxuryCollection"
  | "trustTags"
  | "ctaPrimary"
  | "ctaSecondary"
> & {
  href?: string;
  className?: string;
  /** Slim card for destination detail pages — image, title, location, price, CTAs */
  variant?: "full" | "destination";
};

const dealCardBtnBase =
  "inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-center text-[11px] font-semibold tracking-wide transition-all duration-300 sm:text-xs";

const dealCardBtnPrimary = cn(
  dealCardBtnBase,
  "bg-[#0F3B3E] text-white hover:bg-[#0c3235] hover:shadow-[0_8px_22px_rgba(15,59,62,0.28)]",
);

const dealCardBtnSecondary = cn(
  dealCardBtnBase,
  "border border-[rgba(201,168,106,0.28)] bg-white text-[#0F3B3E] hover:border-[#C9A86A] hover:bg-[#F8F6F2] hover:shadow-[0_4px_14px_rgba(201,168,106,0.14)]",
);

function dealCardPrimaryHref(slug: string) {
  return packageDealHref(slug);
}

function dealCardSecondaryHref(slug: string) {
  return `/contact?package=${slug}&intent=availability`;
}

function inclusionLabel(kind: DealInclusionKind, t: ReturnType<typeof useT>) {
  return t.deals.card.inclusions[kind];
}

function packageTagLabel(tag: DealPackageTag, t: ReturnType<typeof useT>) {
  return t.deals.card.packageTags[tag];
}

const dealCardTagClass =
  "inline-flex items-center rounded-md bg-[rgba(15,59,62,0.05)] px-2.5 py-1 text-[11px] font-medium leading-none text-[#0F3B3E]/72";

export function DealModernCard(props: DealModernCardProps) {
  const {
    slug,
    title,
    description,
    image,
    location,
    price,
    priceNote,
    category,
    href = "/contact",
    featured = false,
    className,
    variant = "full",
    nights,
    transfersIncluded,
    flightsIncluded,
    urgency,
    bookBefore,
    bookBeforeDate,
    spotsLeft,
    rating,
    reviewCount,
    originalPrice,
    discountLabel,
  } = props;

  const t = useT();
  const deal = props as FijiDeal;
  const isDestination = variant === "destination";
  const resolvedPriceNote = priceNote ?? t.common.perPerson;
  const durationText = formatDealDuration(deal);
  const travelDatesText = getDealTravelDates(deal);
  const bookBeforeText = getDealBookBefore(deal);
  const urgencyText = getDealUrgencyLabel(deal, {
    bookBefore: (date) => t.deals.card.bookBefore.replace("{date}", date),
    limitedTime: t.deals.card.limitedTime,
    limitedAvailability: t.deals.card.limitedAvailability,
    mostPopular: t.deals.card.mostPopular,
    popularThisWeek: t.deals.card.popularThisWeek,
    trendingPackage: t.deals.card.trendingPackage,
    packagesRemaining: (n) => t.deals.card.packagesRemaining.replace("{n}", String(n)),
  });
  const allPackageTags = getDealPackageTags(deal).filter(
    (tag) => !(deal.urgency === "limitedTime" && tag === "limitedTimeOffer"),
  );
  const imageUsesPackageTag = !urgencyText && !featured && allPackageTags.length > 0;
  const displayBadges = getDealCardDisplayBadges(deal, {
    excludePackageTags: imageUsesPackageTag ? [allPackageTags[0]] : undefined,
  });
  const valueItems = getDealCardValueItems(deal);
  const displayDestination = deal.destination ?? location;
  const hasBookingMeta = durationText || transfersIncluded || flightsIncluded || travelDatesText;
  const detailHref = packageDealHref(slug);
  const promoBadge = isDestination
    ? category
    : urgencyText ??
      (featured ? t.common.featured : null) ??
      (allPackageTags[0] ? packageTagLabel(allPackageTags[0], t) : category);
  const bodyBadges = displayBadges;
  const showBookBeforeInline = bookBeforeText && deal.urgency !== "bookBefore";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(201,168,106,0.18)] bg-[var(--card-elevated)]",
        "shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-500",
        "hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(15,59,62,0.1)]",
        featured && "ring-1 ring-[rgba(201,168,106,0.28)]",
        className,
      )}
    >
      <Link
        href={href || detailHref}
        className="relative block aspect-[10/3] w-full shrink-0 overflow-hidden sm:aspect-[3/1]"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B3E]/35 via-transparent to-[#0F3B3E]/8" />
        {promoBadge ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#0F3B3E]/88 px-2.5 py-0.5 text-[9px] font-medium tracking-[0.08em] text-white/95 backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px]">
            {promoBadge}
          </span>
        ) : null}
      </Link>

      {!isDestination && hasBookingMeta ? (
        <div className="flex flex-col justify-center border-b border-[rgba(201,168,106,0.1)] bg-[#FAF9F7]/70 px-4 py-2 text-[10px] font-normal leading-relaxed text-[#0F3B3E]/55">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {durationText ? (
              <span className="inline-flex items-center gap-1.5">
                <Moon className="h-3 w-3 text-[#C9A86A]/80" strokeWidth={1.75} />
                {durationText}
              </span>
            ) : null}
            {transfersIncluded ? (
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-[#C9A86A]/80" strokeWidth={1.75} />
                {t.deals.card.transferIncluded}
              </span>
            ) : null}
            {flightsIncluded ? (
              <span className="inline-flex items-center gap-1.5">
                <Plane className="h-3 w-3 text-[#C9A86A]/80" strokeWidth={1.75} />
                {t.deals.card.flightsIncluded}
              </span>
            ) : null}
            {travelDatesText ? (
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <Calendar className="h-3 w-3 shrink-0 text-[#C9A86A]/80" strokeWidth={1.75} />
                <span className="line-clamp-2">{travelDatesText}</span>
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col items-center p-4 text-center sm:p-4.5 lg:p-5">
        {!isDestination && (bodyBadges.length > 0 || rating) ? (
          <div className="mb-2.5 flex w-full flex-wrap items-center justify-center gap-1.5 sm:mb-3">
            {bodyBadges.map((badge) => (
              <span key={`${badge.kind}-${badge.value}`} className={dealCardTagClass}>
                {badge.kind === "package"
                  ? packageTagLabel(badge.value, t)
                  : inclusionLabel(badge.value, t)}
              </span>
            ))}
            {rating ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-[#0F3B3E]/48">
                <Star className="h-3 w-3 fill-[#C9A86A]/75 text-[#C9A86A]/75" />
                <span className="font-medium text-[#0F3B3E]/62">{rating.toFixed(1)}</span>
                {reviewCount ? (
                  <span className="text-[#0F3B3E]/42">
                    ({reviewCount.toLocaleString()})
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
        ) : null}

        <Link href={href || detailHref} className="block w-full">
          <h3 className="line-clamp-2 font-serif text-lg font-semibold leading-[1.28] tracking-tight text-[#0F3B3E] transition-colors group-hover:text-[#0F3B3E]/90 sm:text-[1.35rem]">
            {title}
          </h3>
          {!isDestination && deal.resortName ? (
            <p className="mt-1 line-clamp-1 text-[10px] font-normal leading-relaxed text-[#0F3B3E]/48">
              {deal.resortName}
            </p>
          ) : null}
        </Link>

        <p
          className={cn(
            "flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] leading-relaxed text-[#0F3B3E]/48",
            isDestination ? "mt-3" : "mt-2",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3 shrink-0 text-[#C9A86A]/70" />
            {displayDestination}
          </span>
          {!isDestination && showBookBeforeInline ? (
            <>
              <span className="text-[#0F3B3E]/18" aria-hidden>
                ·
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#C9A86A]/70" />
                {t.deals.card.bookBefore.replace("{date}", bookBeforeText)}
              </span>
            </>
          ) : null}
        </p>

        {!isDestination && description ? (
          <p className="mt-2 line-clamp-1 text-[13px] leading-[1.5] text-[#0F3B3E]/68 sm:mt-2.5 sm:text-sm">
            {description}
          </p>
        ) : null}

        {!isDestination && valueItems.length > 0 ? (
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] leading-relaxed text-[#0F3B3E]/55">
            {valueItems[0].kind === "bonus" ? (
              <Award className="h-3.5 w-3.5 shrink-0 text-[#C9A86A]/80" />
            ) : valueItems[0].kind === "credit" ? (
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#C9A86A]/80" />
            ) : valueItems[0].kind === "transport" ? (
              <Plane className="h-3.5 w-3.5 shrink-0 text-[#C9A86A]/80" />
            ) : (
              <Tag className="h-3.5 w-3.5 shrink-0 text-[#C9A86A]/80" />
            )}
            <span className="line-clamp-1">{valueItems[0].text}</span>
          </p>
        ) : null}

        <div className="mt-auto w-full border-t border-[rgba(201,168,106,0.1)] pt-3.5">
          <div className="text-center">
            <span className="text-[9px] font-medium tracking-[0.1em] text-[#0F3B3E]/40">
              {t.deals.card.startingPrice}
            </span>
            <div className="mt-1 flex flex-wrap items-baseline justify-center gap-2">
              <p className="font-serif text-[1.7rem] font-semibold leading-none text-[#0F3B3E] sm:text-2xl">{price}</p>
              {!isDestination && discountLabel ? (
                <span className="rounded-md bg-[rgba(201,168,106,0.12)] px-1.5 py-0.5 text-[9px] font-medium text-[#0F3B3E]/72">
                  {discountLabel}
                </span>
              ) : null}
            </div>
            <span className="mt-1 block text-[10px] text-[#0F3B3E]/42">{resolvedPriceNote}</span>
            {!isDestination && originalPrice ? (
              <span className="mt-0.5 block text-[10px] text-[#0F3B3E]/36 line-through">
                {originalPrice}
              </span>
            ) : null}
          </div>

          <div className="mt-3 grid w-full grid-cols-1 gap-2">
            <Link href={dealCardPrimaryHref(slug)} className={dealCardBtnPrimary}>
              <span>{t.deals.card.viewPackage}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </Link>
            <Link href={dealCardSecondaryHref(slug)} className={dealCardBtnSecondary}>
              <span>{t.deals.card.checkAvailability}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Trust strip — matches homepage ExclusiveDeals value props */
export function DealsTrustStrip() {
  const t = useT();
  const items = [
    { icon: Tag, label: t.deals.trustBestPrice },
    { icon: Award, label: t.deals.trustMemberRates },
    { icon: CalendarCheck, label: t.deals.trustFlexible },
    { icon: Headphones, label: t.deals.trustConcierge },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-navy/[0.06] bg-[var(--card-surface)] p-4 shadow-[var(--shadow-card)] sm:grid-cols-4 sm:gap-4 sm:p-5">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 text-center text-xs text-foreground/65 sm:flex-row sm:text-sm"
        >
          <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
          {label}
        </div>
      ))}
    </div>
  );
}
