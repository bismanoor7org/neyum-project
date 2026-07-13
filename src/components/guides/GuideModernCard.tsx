"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

interface GuideModernCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon?: LucideIcon;
  featured?: boolean;
  readMinutes?: number;
  className?: string;
}

/** Guide card — uniform size, calm typography, no featured scale jump */
export function GuideModernCard({
  title,
  description,
  image,
  href,
  icon: Icon,
  featured = false,
  readMinutes = 5,
  className,
}: GuideModernCardProps) {
  const t = useT();

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-white",
        "shadow-[0_1px_12px_rgba(8,43,75,0.05)]",
        "ring-1 ring-black/[0.04]",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(8,43,75,0.08)]",
        featured && "ring-gold/30",
        className,
      )}
    >
      <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        {Icon && (
          <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-gold shadow-sm">
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </div>
        )}
        {featured && (
          <span className="absolute right-3 top-3 rounded-full bg-gold/95 px-2 py-0.5 text-[11px] font-medium text-navy">
            {t.common.featured}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-foreground/45">
          <span className="font-medium uppercase tracking-wide text-gold">
            {t.common.guide}
          </span>
          <span>·</span>
          <span>{readMinutes} {t.common.minRead}</span>
        </div>

        <h3 className="mt-2 text-center font-serif text-[17px] leading-snug text-navy transition-colors group-hover:text-gold">
          {title}
        </h3>

        <p className="mt-1.5 line-clamp-2 flex-1 text-center text-sm leading-relaxed text-foreground/60">
          {description}
        </p>

        <div className="mt-4 flex w-full items-center justify-center gap-2 border-t border-foreground/8 pt-3">
          <span className="text-xs font-medium text-navy">{t.common.readGuide}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-navy transition-colors group-hover:bg-gold group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
