"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BadgePercent,
  Calendar,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { WorldExplorerMap } from "@/components/map/WorldExplorerMap";
import { ExperienceModernCard } from "@/components/experiences/ExperienceModernCard";
import { useT } from "@/components/providers/LocaleProvider";
import { Container } from "@/components/shared";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import type { Experience, FAQItem } from "@/lib/content/types";
import {
  enrichHighlights,
  getExperienceMapSlug,
  getGuestReviews,
  getWhyChooseReasons,
} from "@/lib/content/experience-detail-helpers";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const LUXURY_RADIUS = "rounded-[24px]";

/* ─── Booking Card ─── */

interface LuxuryBookingCardProps {
  priceFrom: string;
  fromLabel: string;
  perGuestLabel: string;
  bookHref: string;
  bookLabel: string;
  inquiryHref: string;
  inquiryLabel: string;
  rating: { score: string; count: number };
  reviewsLabel: string;
  availabilityLabel: string;
  dailyDeparturesLabel: string;
  verifiedReviewLabel: string;
  perks: string[];
  reviewSnippet: { name: string; origin: string; text: string; rating: number };
  className?: string;
}

export function LuxuryBookingCard({
  priceFrom,
  fromLabel,
  perGuestLabel,
  bookHref,
  bookLabel,
  inquiryHref,
  inquiryLabel,
  rating,
  reviewsLabel,
  availabilityLabel,
  dailyDeparturesLabel,
  verifiedReviewLabel,
  perks,
  reviewSnippet,
  className,
}: LuxuryBookingCardProps) {

  return (
    <aside className={cn("lg:sticky lg:top-28 lg:self-start", className)}>
      <div
        className={cn(
          LUXURY_RADIUS,
          "overflow-hidden border border-white/60 bg-white/75 p-7 shadow-[var(--shadow-widget)] backdrop-blur-2xl",
          "ring-1 ring-navy/[0.04]",
        )}
      >
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/45">
              {fromLabel}
            </p>
            <p className="mt-1 font-serif text-[2rem] leading-none tracking-tight text-navy">
              {priceFrom}
            </p>
            <p className="mt-1 text-xs text-foreground/50">{perGuestLabel}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/[0.08] px-3 py-1.5">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-sm font-semibold text-navy">{rating.score}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-navy/[0.06] bg-[var(--cream-alt)] px-4 py-3">
          <Calendar className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-semibold text-navy">{availabilityLabel}</p>
            <p className="text-[11px] text-foreground/55">{dailyDeparturesLabel}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <Link href={bookHref} className={cn(ds.btnBase, ds.btnGold, "w-full py-4 text-[15px]")}>
            {bookLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={inquiryHref}
            className={cn(
              ds.btnBase,
              "w-full border border-navy/10 bg-white/80 py-4 text-[15px] text-navy hover:border-gold/40 hover:bg-gold/[0.04]",
            )}
          >
            <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {inquiryLabel}
          </Link>
        </div>

        <ul className="mt-6 space-y-3 border-t border-navy/[0.06] pt-6">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground/65">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/[0.12]">
                <Check className="h-3 w-3 text-gold" strokeWidth={2.5} />
              </span>
              {perk}
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-navy/[0.05] bg-[var(--cream-alt)] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-navy">
            <BadgeCheck className="h-4 w-4 text-gold" />
            {verifiedReviewLabel}
          </div>
          <div className="mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: reviewSnippet.rating }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-foreground/70">
              &ldquo;{reviewSnippet.text.slice(0, 120)}…&rdquo;
            </p>
            <p className="mt-2 text-[11px] font-medium text-foreground/45">
              {reviewSnippet.name} · {reviewSnippet.origin}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-foreground/40">
            {rating.count.toLocaleString()} {reviewsLabel}
          </p>
        </div>
      </div>
    </aside>
  );
}

/* ─── Hero ─── */

interface LuxuryHeroProps {
  title: string;
  location: string;
  category: string;
  duration: string;
  ages: string;
  rating: { score: string; count: number };
  image: string;
  imageAlt: string;
  reviewsLabel: string;
  locationLabel: string;
  agesLabel: string;
}

export function LuxuryExperienceHero({
  title,
  location,
  category,
  duration,
  ages,
  rating,
  image,
  imageAlt,
  reviewsLabel,
  locationLabel,
  agesLabel,
}: LuxuryHeroProps) {
  const badges = [category, duration, ages];

  return (
    <section className="relative h-[70vh] min-h-[520px] max-h-[860px] overflow-hidden bg-navy-deep">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/35 to-navy-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/40 via-transparent to-navy-deep/40" />

      <Container className="relative z-10 flex h-full flex-col items-center justify-end pb-10 pt-32 text-center lg:pb-14 lg:pt-36">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                {rating.score}
                <span className="font-normal text-white/70">
                  ({rating.count.toLocaleString()} {reviewsLabel})
                </span>
              </span>
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-white/85 backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-[2.5rem] leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span>
                  <span className="text-white/50">{locationLabel}</span> {location}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
                {duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span>
                  <span className="text-white/50">{agesLabel}</span> {ages}
                </span>
              </span>
            </div>
          </motion.div>
      </Container>
    </section>
  );
}

/* ─── Content Sections ─── */

export function ExperienceOverview({
  eyebrow,
  title,
  overview,
}: {
  eyebrow: string;
  title: string;
  overview: string;
}) {
  return (
    <motion.section {...fadeUp} className="text-center">
      <p className="eyebrow-gold">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl tracking-tight text-navy md:text-4xl">{title}</h2>
      <span
        className="mx-auto mt-6 mb-8 block h-px w-20 bg-gradient-to-r from-gold to-gold/15"
        aria-hidden
      />
      <p className="mx-auto max-w-[750px] text-[17px] leading-[1.9] text-foreground/70">{overview}</p>
    </motion.section>
  );
}

export function ExperienceHighlightsGrid({
  title,
  highlights,
}: {
  title: string;
  highlights: string[];
}) {
  const items = enrichHighlights(highlights);

  return (
    <motion.section {...fadeUp}>
      <h2 className={cn(ds.headingSection, "mb-10 text-center")}>{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map(({ title: itemTitle, description, icon: Icon }) => (
          <div
            key={itemTitle}
            className={cn(
              LUXURY_RADIUS,
              "group border border-navy/[0.06] bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-500",
              "hover:-translate-y-0.5 hover:border-gold/25 hover:shadow-[var(--shadow-card-hover)]",
            )}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 bg-gold/[0.08] transition-colors group-hover:bg-gold/[0.14]">
              <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </span>
            <h3 className="mt-5 font-serif text-xl tracking-tight text-navy">{itemTitle}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/60">{description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export function ExperienceIncludedList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <motion.section {...fadeUp}>
      <h2 className={cn(ds.headingSection, "mb-8 text-center")}>{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              LUXURY_RADIUS,
              "flex items-center gap-4 border border-navy/[0.05] bg-[var(--cream-alt)] px-5 py-4",
            )}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gold/15">
              <Check className="h-4 w-4 text-gold" strokeWidth={2.5} />
            </span>
            <span className="text-[15px] font-medium text-navy/90">{item}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

type ItineraryDay = {
  day: number | string;
  label: string;
  title: string;
  body: string;
};

/** Parse strings like "Day 1: Arrival & welcome" into timeline rows. */
function formatItineraryDays(items: string[]): ItineraryDay[] {
  return items.map((item, index) => {
    const match = item.match(/^Day\s+([\d–—\-+]+)\s*[:\-–—]\s*(.+)$/i);
    if (match) {
      const dayRef = match[1];
      const rest = match[2].trim();
      const split = rest.indexOf(". ");
      const title = split > 0 ? rest.slice(0, split) : rest;
      const body = split > 0 ? rest.slice(split + 2) : "";
      const dayNum = parseInt(dayRef, 10);
      return {
        day: Number.isNaN(dayNum) ? dayRef : dayNum,
        label: `Day ${dayRef}`,
        title,
        body,
      };
    }
    return {
      day: index + 1,
      label: `Day ${index + 1}`,
      title: item,
      body: "",
    };
  });
}

export function ExperienceItineraryTimeline({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const days = formatItineraryDays(items);

  return (
    <motion.section {...fadeUp}>
      <h2 className={cn(ds.headingSection, "mb-10 text-center")}>{title}</h2>
      <ol className="relative space-y-0">
        {days.map((day, i) => {
          const isLast = i === days.length - 1;
          return (
            <li key={day.day} className="relative flex gap-6 pb-10 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-[23px] top-12 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/25 to-transparent"
                  aria-hidden
                />
              )}
              <span className="relative z-10 flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.15] to-white font-serif text-lg text-navy shadow-sm">
                {day.day}
              </span>
              <div
                className={cn(
                  LUXURY_RADIUS,
                  "min-w-0 flex-1 border border-navy/[0.06] bg-white p-6 shadow-[var(--shadow-card)]",
                )}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                  {day.label}
                </p>
                <p className="mt-2 font-serif text-xl text-navy">{day.title}</p>
                {day.body ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/65">{day.body}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </motion.section>
  );
}

function GalleryTile({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
}) {
  return (
    <div
      className={cn(
        LUXURY_RADIUS,
        "group relative overflow-hidden shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/10" />
    </div>
  );
}

/** Five-image editorial collage — tall hero left, bento grid right */
export function ExperiencePhotoGallery({
  title,
  subtitle,
  images: galleryImages,
  experienceTitle,
}: {
  title: string;
  subtitle: string;
  images: string[];
  experienceTitle: string;
}) {
  if (galleryImages.length < 2) return null;

  const [hero, wide, left, right, bottom] = galleryImages;

  return (
    <motion.section {...fadeUp} className="py-4 text-center">
      <div className="mx-auto mb-10 max-w-xl">
        <h2 className={cn(ds.headingSection)}>{title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/60">{subtitle}</p>
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-5">
        <GalleryTile
          src={hero}
          alt={`${experienceTitle} — gallery`}
          className="aspect-[4/5] shadow-[var(--shadow-editorial)] lg:aspect-auto lg:h-full lg:min-h-[480px]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        <div className="grid h-full min-h-0 grid-cols-2 grid-rows-[auto_1fr_auto] gap-3 sm:gap-4 lg:gap-5">
          {wide && (
            <GalleryTile
              src={wide}
              alt={`${experienceTitle} — 2`}
              className="col-span-2 aspect-[21/9]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          {left && (
            <GalleryTile
              src={left}
              alt={`${experienceTitle} — 3`}
              className="aspect-square min-h-0"
              sizes="25vw"
            />
          )}
          {right && (
            <GalleryTile
              src={right}
              alt={`${experienceTitle} — 4`}
              className="aspect-square min-h-0"
              sizes="25vw"
            />
          )}
          {bottom && (
            <GalleryTile
              src={bottom}
              alt={`${experienceTitle} — 5`}
              className="col-span-2 aspect-[21/9]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </motion.section>
  );
}

export function ExperienceMapSection({
  title,
  subtitle,
  location,
  mapSlug,
}: {
  title: string;
  subtitle: string;
  location: string;
  mapSlug: string;
}) {
  return (
    <motion.section {...fadeUp} className="text-center">
      <div className="mx-auto mb-8 max-w-xl">
        <h2 className={cn(ds.headingSection)}>{title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/60">{subtitle}</p>
        <span
          className={cn(
            LUXURY_RADIUS,
            "mt-5 inline-flex items-center gap-2 border border-navy/[0.08] bg-white px-4 py-2.5 text-sm text-navy shadow-sm",
          )}
        >
          <MapPin className="h-4 w-4 text-gold" />
          {location}
        </span>
      </div>
      <div
        id="experience-map"
        className={cn(
          LUXURY_RADIUS,
          "relative isolate overflow-hidden border border-navy/[0.06] shadow-[var(--shadow-card)]",
        )}
      >
        <WorldExplorerMap
          active={mapSlug}
          onSelect={() => {}}
          compact
          flyToActiveOnMount
          observeSectionId="experience-map"
          className="h-[min(400px,50vh)] min-h-[300px] w-full"
        />
      </div>
    </motion.section>
  );
}

export function ExperienceWhyChoose({
  title,
  subtitle,
  reasons,
}: {
  title: string;
  subtitle: string;
  reasons: ReturnType<typeof getWhyChooseReasons>;
}) {
  return (
    <motion.section
      {...fadeUp}
      className={cn(LUXURY_RADIUS, "border border-navy/[0.06] bg-[var(--cream-alt)] p-8 text-center lg:p-12")}
    >
      <div className="mx-auto mb-10 max-w-xl">
        <h2 className={cn(ds.headingSection)}>{title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/60">{subtitle}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {reasons.map(({ icon: Icon, title: reasonTitle, description }) => (
          <div
            key={reasonTitle}
            className={cn(
              LUXURY_RADIUS,
              "border border-white/80 bg-white p-6 shadow-[var(--shadow-card)]",
            )}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/[0.1]">
              <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 font-serif text-lg text-navy">{reasonTitle}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/60">{description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export function ExperienceGuestReviews({
  title,
  subtitle,
  reviews,
  reviewsLabel,
}: {
  title: string;
  subtitle: string;
  reviews: ReturnType<typeof getGuestReviews>;
  reviewsLabel: string;
}) {
  return (
    <motion.section {...fadeUp} className="text-center">
      <div className="mx-auto mb-10 max-w-xl">
        <h2 className={cn(ds.headingSection)}>{title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/60">{subtitle}</p>
      </div>
      <div className="grid gap-5 text-left lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className={cn(
              LUXURY_RADIUS,
              "flex flex-col border border-navy/[0.06] bg-white p-7 shadow-[var(--shadow-card)]",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-teal">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              )}
            </div>
            <p className="mt-5 flex-1 text-[15px] leading-[1.75] text-foreground/70">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-6 border-t border-navy/[0.06] pt-5">
              <p className="font-medium text-navy">{review.name}</p>
              <p className="text-xs text-foreground/50">
                {review.origin} · {review.date}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-foreground/45">
        {reviews[0]?.experienceTitle && (
          <>
            Based on {reviews.length}+ featured {reviewsLabel} for this experience
          </>
        )}
      </p>
    </motion.section>
  );
}

export function ExperienceFaqSection({
  title,
  faqs,
}: {
  title: string;
  faqs: FAQItem[];
}) {
  if (faqs.length === 0) return null;

  return (
    <motion.section {...fadeUp} className="mx-auto max-w-3xl text-center">
      <h2 className={cn(ds.headingSection, "mb-8 text-center")}>{title}</h2>
      <div className="text-left">
        <FAQAccordion items={faqs} columns={1} />
      </div>
    </motion.section>
  );
}

export function ExperienceRelatedGrid({
  title,
  items,
}: {
  title: string;
  items: {
    slug: string;
    title: string;
    image: string;
    location: string;
    duration: string;
    category: string;
    priceFrom: string;
    rating: { score: string; count: number };
  }[];
}) {
  if (items.length === 0) return null;

  return (
    <motion.section {...fadeUp}>
      <h2 className={cn(ds.headingSection, "mb-10 text-center")}>{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ExperienceModernCard
            key={item.slug}
            slug={item.slug}
            title={item.title}
            description={item.title}
            image={item.image}
            location={item.location}
            duration={item.duration}
            category={item.category}
            price={item.priceFrom}
            priceNote="From"
            rating={parseFloat(item.rating.score)}
            reviewCount={item.rating.count}
            ctaPrimary="viewDetails"
          />
        ))}
      </div>
    </motion.section>
  );
}

export function ExperienceMobileBookingBar({
  priceFrom,
  fromLabel,
  bookHref,
  bookLabel,
}: {
  priceFrom: string;
  fromLabel: string;
  bookHref: string;
  bookLabel: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/[0.08] bg-white/90 p-4 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/45">
            {fromLabel}
          </p>
          <p className="font-serif text-xl text-navy">{priceFrom}</p>
        </div>
        <Link href={bookHref} className={cn(ds.btnBase, ds.btnGold, "shrink-0 px-6")}>
          {bookLabel}
        </Link>
      </div>
    </div>
  );
}

export function ExperienceTrustBar() {
  const t = useT();
  const items = [
    { icon: ShieldCheck, label: t.detail.bestPriceGuarantee },
    { icon: BadgePercent, label: t.detail.freeCancellation },
    { icon: Tag, label: t.trustBar.conciergeDesc },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 border-b border-navy/[0.06] py-6">
      {items.map(({ icon: Icon, label }) => (
        <span key={label} className="inline-flex items-center gap-2 text-sm text-foreground/60">
          <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
          {label}
        </span>
      ))}
    </div>
  );
}
