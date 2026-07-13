"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import type { DestinationListingItem } from "@/lib/content/types";
import { localizeDestination } from "@/lib/i18n/content";
import { getDestinationCardAlt } from "@/lib/seo/destination-meta";
import { cn } from "@/lib/utils";

interface DestinationMarketplaceCardProps {
  destination: DestinationListingItem;
  href: string;
  className?: string;
}

export function DestinationMarketplaceCard({
  destination,
  href,
  className,
}: DestinationMarketplaceCardProps) {
  const t = useT();
  const { locale } = useLocale();
  const loc = localizeDestination(destination, locale);
  const { stats } = destination;
  const regionLabel =
    destination.region === "mainland" ? t.pages.mainland : t.pages.islands;

  const statItems = [
    { label: t.destinations.experiences, value: stats.experiences },
    { label: t.destinations.stays, value: stats.stays },
    { label: t.destinations.packages, value: stats.packages },
    { label: t.destinations.tours, value: stats.tours },
  ];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.625rem]",
        "border border-[var(--border)] bg-[var(--card-surface)]",
        "shadow-[0_4px_24px_rgba(8,43,75,0.05)]",
        "transition-[box-shadow,transform] duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(8,43,75,0.1)]",
        className,
      )}
    >
      <Link href={href} className="relative block aspect-[3/2] overflow-hidden">
        <Image
          src={destination.cardImage}
          alt={getDestinationCardAlt(destination.slug, loc.title)}
          fill
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 28vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />

        {stats.startingPrice && (
          <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/92 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-navy shadow-[0_8px_28px_rgba(8,43,75,0.14)] backdrop-blur-md">
            <span className="text-foreground/45">{t.common.from}</span>{" "}
            {stats.startingPrice}
          </span>
        )}

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/45 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
          <MapPin className="h-3 w-3 text-gold" strokeWidth={2} />
          {regionLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5 lg:px-5 lg:pb-5 lg:pt-6">
        <Link href={href} className="group/title">
          <h3 className="font-serif text-[1.375rem] leading-[1.15] tracking-[-0.02em] text-navy transition-colors duration-300 group-hover/title:text-navy-light lg:text-[1.5rem]">
            {loc.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.65] text-foreground/55">
          {loc.tagline}
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--foreground)_4%,var(--card-surface))]">
          <div className="grid grid-cols-4 divide-x divide-[var(--border)]">
            {statItems.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center px-1 py-3 text-center"
              >
                <span className="text-[13px] font-semibold tabular-nums leading-none text-foreground">
                  {value}
                </span>
                <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.13em] text-foreground/50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={href}
          className={cn(
            "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-4 py-2.5",
            "text-[13px] font-semibold tracking-[0.02em] text-white",
            "transition-all duration-300 ease-out",
            "hover:bg-navy-light hover:shadow-[0_10px_28px_rgba(8,43,75,0.22)]",
            "active:scale-[0.985]",
          )}
        >
          {t.pages.exploreDestination.replace(/\s*→\s*$/, "").trim()}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>
    </article>
  );
}

/** Compact stat chips for destination hero */
export function DestinationHeroStats({
  stats,
  className,
}: {
  stats: DestinationListingItem["stats"];
  className?: string;
}) {
  const t = useT();

  const items = [
    { label: t.destinations.experiences, value: stats.experiences },
    { label: t.destinations.stays, value: stats.stays },
    { label: t.destinations.transport, value: stats.transport },
  ];

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm"
        >
          <MapPin className="h-3.5 w-3.5 text-gold" />
          <strong className="font-semibold text-white">{item.value}</strong>
          <span className="text-white/70">{item.label}</span>
        </span>
      ))}
    </div>
  );
}
