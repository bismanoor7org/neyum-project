"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import type {
  ExperienceCommercialTag,
  ExperienceCtaVariant,
  HomeMarketplaceExperience,
} from "@/lib/content/home-experiences";
import { experienceDetailHref } from "@/lib/content/home-experiences";
import { cn } from "@/lib/utils";

export type ExperienceModernCardProps = Pick<
  HomeMarketplaceExperience,
  | "slug"
  | "title"
  | "description"
  | "image"
  | "location"
  | "duration"
  | "category"
  | "price"
  | "priceNote"
  | "rating"
  | "reviewCount"
  | "verifiedSupplier"
  | "originalPrice"
  | "discountLabel"
  | "commercialTags"
  | "highlight"
  | "ctaPrimary"
  | "ctaSecondary"
> & {
  className?: string;
};

function experienceHref(slug: string, cta?: ExperienceCtaVariant) {
  if (cta === "viewDetails") return experienceDetailHref(slug);
  return `/contact?experience=${slug}&intent=book`;
}

function highlightLabel(tag: ExperienceCommercialTag, t: ReturnType<typeof useT>) {
  return t.experiences.card.tags[tag];
}

function ctaLabel(variant: ExperienceCtaVariant | undefined, t: ReturnType<typeof useT>) {
  if (variant === "bookNow") return t.experiences.card.bookNow;
  return t.experiences.card.viewDetails;
}

export function ExperienceModernCard({
  slug,
  title,
  description,
  image,
  location,
  duration,
  category,
  price,
  priceNote,
  rating,
  commercialTags,
  highlight,
  ctaPrimary = "bookNow",
  ctaSecondary = "viewDetails",
  className,
}: ExperienceModernCardProps) {
  const t = useT();
  const resolvedPriceNote = priceNote ?? t.common.perPerson;
  const highlightText = highlight ? highlightLabel(highlight, t) : null;
  const bodyTag = !highlight && commercialTags?.[0] ? commercialTags[0] : null;
  const detailHref = experienceDetailHref(slug);
  const primaryCta = ctaPrimary ?? "bookNow";
  const secondaryCta =
    ctaSecondary && ctaSecondary !== primaryCta ? ctaSecondary : undefined;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/[0.05] bg-[var(--card-elevated)]",
        "shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-500",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      <Link href={detailHref} className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 85vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-navy/10" />
        <span className="absolute left-4 top-4 rounded-full bg-gold/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-navy shadow-sm">
          {category}
        </span>
        {highlightText ? (
          <span className="absolute right-4 top-4 max-w-[48%] rounded-full border border-white/25 bg-navy/88 px-3 py-1 text-end text-[9px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
            {highlightText}
          </span>
        ) : null}
      </Link>

      {duration ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-navy/[0.05] bg-cream/40 px-5 py-2.5 text-[11px] font-medium text-foreground/60">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-gold" strokeWidth={2} />
            {duration}
          </span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        {rating ? (
          <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-foreground/55">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span className="font-semibold text-navy">{rating.toFixed(1)}</span>
            </span>
          </div>
        ) : null}

        <Link href={detailHref} className="block">
          <h3 className="font-serif text-lg leading-snug text-navy transition-colors group-hover:text-navy-light">
            {title}
          </h3>
        </Link>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-foreground/55">
          <MapPin className="h-3 w-3 shrink-0 text-gold" />
          {location}
        </p>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-foreground/60">
          {description}
        </p>

        {bodyTag ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-navy/8 bg-cream/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-navy/75">
              {highlightLabel(bodyTag, t)}
            </span>
          </div>
        ) : null}

        <div className="mt-5 border-t border-navy/[0.06] pt-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/45">
                {t.common.from}
              </span>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
                <p className="font-serif text-2xl leading-none text-coral">{price}</p>
              </div>
              <span className="mt-1 block text-[11px] text-foreground/45">{resolvedPriceNote}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href={experienceHref(slug, primaryCta)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-white transition-all duration-300 hover:bg-coral hover:shadow-[0_6px_20px_rgba(232,149,122,0.35)]"
            >
              {ctaLabel(primaryCta, t)}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {secondaryCta ? (
              <Link
                href={experienceHref(slug, secondaryCta)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-navy/15 bg-white px-4 py-2.5 text-center text-xs font-semibold text-navy transition-colors hover:border-gold/40 hover:text-gold"
              >
                {ctaLabel(secondaryCta, t)}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
