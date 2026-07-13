"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

interface GuidePlanCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  href: string;
  readMinutes?: number;
  featured?: boolean;
  className?: string;
}

/** Home — editorial guide card (left-aligned, equal rhythm) */
export function GuidePlanCard({
  icon: Icon,
  title,
  description,
  image,
  href,
  readMinutes = 5,
  featured = false,
  className,
}: GuidePlanCardProps) {
  const t = useT();

  if (featured) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-3xl bg-[var(--card-elevated)]",
          "shadow-[var(--shadow-card)] ring-1 ring-navy/[0.05]",
          "transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] hover:ring-gold/25",
          "lg:min-h-[280px] lg:flex-row",
          className,
        )}
      >
        <span
          className="absolute left-0 top-0 z-10 h-full w-1 bg-gradient-to-b from-gold via-gold/70 to-gold/30 lg:w-1.5"
          aria-hidden
        />

        <div className="relative aspect-[16/9] shrink-0 overflow-hidden lg:aspect-auto lg:w-[44%] lg:min-h-[280px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 44vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-transparent lg:bg-gradient-to-r lg:from-navy/30 lg:to-transparent" />
          <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gold shadow-md backdrop-blur-sm">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.25} />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-6 py-7 text-left lg:px-10 lg:py-9">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-semibold tracking-wide text-navy">
              {t.common.startHere}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/45">
              {t.common.guide} · {readMinutes} {t.common.minRead}
            </span>
          </div>

          <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.02em] text-navy transition-colors group-hover:text-navy-light lg:text-[1.75rem]">
            {title}
          </h3>

          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-foreground/65">
            {description}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all group-hover:gap-3">
            {t.common.readGuide}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl bg-[var(--card-elevated)] text-left",
        "shadow-[var(--shadow-card)] ring-1 ring-navy/[0.05]",
        "transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] hover:ring-gold/18",
        className,
      )}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gold shadow-sm backdrop-blur-sm">
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.25} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          {t.common.guide} · {readMinutes} {t.common.minRead}
        </p>

        <h3 className="mt-2.5 font-serif text-lg leading-snug tracking-[-0.01em] text-navy transition-colors group-hover:text-navy-light">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-foreground/60">
          {description}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-colors group-hover:text-gold">
          {t.common.readGuide}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
