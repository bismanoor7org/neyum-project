"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

interface ExperienceTourCardProps {
  title: string;
  location: string;
  image: string;
  href: string;
  badge: string;
  duration: string;
  ages: string;
  price?: string;
  featured?: boolean;
  className?: string;
}

/** Home — "Handpicked Tours & Experiences" card */
export function MasonryExperienceCard({
  title,
  location,
  image,
  href,
  badge,
  duration,
  ages: _ages,
  price,
  featured = false,
  className,
}: ExperienceTourCardProps) {
  const t = useT();

  return (
    <article
      className={cn("experience-tour-card group relative overflow-hidden rounded-[1.75rem]", className)}
    >
      <Link href={href} className="relative block h-full min-h-[inherit]">
        <Image
          src={image}
          alt={title}
          fill
          quality={92}
          className="object-cover brightness-[1.03] contrast-[1.04] saturate-[1.1]"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 42vw"
              : "(max-width: 1024px) 50vw, 18vw"
          }
        />

        <div className="experience-card-scrim absolute inset-0" />
        <div className="experience-card-scrim-side pointer-events-none absolute inset-0" aria-hidden />
        <div className="experience-card-glow pointer-events-none absolute inset-0" aria-hidden />

        <div className="absolute left-5 top-5 z-[2] flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]",
              featured
                ? "bg-gold text-navy-deep shadow-[0_4px_14px_rgba(var(--gold-rgb),0.34)]"
                : "border border-white/30 bg-navy-deep/70 text-white backdrop-blur-md",
            )}
          >
            {badge}
          </span>
        </div>

        {price && (
          <div className="absolute right-5 top-5 z-[2] rounded-2xl border border-gold/28 bg-navy-deep/88 px-4 py-2.5 text-right backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/60">
              {t.common.from}
            </p>
            <p className="font-serif text-xl leading-none text-gold">{price}</p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-navy-deep/95 via-navy-deep/55 to-transparent px-6 pb-6 pt-16 lg:px-8 lg:pb-8 lg:pt-20">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3
                className={cn(
                  "experience-card-title font-serif leading-[1.12] tracking-[-0.02em] text-white",
                  featured
                    ? "text-2xl sm:text-[2rem] lg:text-[2.25rem]"
                    : "text-lg sm:text-xl",
                )}
              >
                {title}
              </h3>

              <p className="experience-card-meta mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-white">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
                {location}
              </p>

              {duration ? (
                <div className="experience-card-meta mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[11px] font-semibold text-white/95">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/18 bg-navy-deep/55 px-2.5 py-1 backdrop-blur-sm">
                    <Clock className="h-3 w-3 text-gold" />
                    {duration}
                  </span>
                </div>
              ) : null}
            </div>

            <div
              className={cn(
                "experience-tour-cta flex shrink-0 items-center justify-center rounded-full",
                featured ? "h-12 w-12" : "h-11 w-11",
              )}
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
