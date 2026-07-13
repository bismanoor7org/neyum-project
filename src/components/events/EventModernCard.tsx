"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventModernCardProps {
  title: string;
  description: string;
  image: string;
  location: string;
  day: string;
  month: string;
  year: string;
  category: string;
  href?: string;
  featured?: boolean;
  className?: string;
}

export function EventModernCard({
  title,
  description,
  image,
  location,
  day,
  month,
  year,
  category,
  href = "/contact",
  featured = false,
  className,
}: EventModernCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-white",
        "shadow-[0_1px_12px_rgba(8,43,75,0.05)] ring-1 ring-black/[0.04]",
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
        <span className="absolute left-3 top-3 rounded-full bg-gold/95 px-2.5 py-0.5 text-[11px] font-medium text-navy">
          {category}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white/95 px-2.5 py-1.5 shadow-sm">
          <Calendar className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
          <span className="text-xs font-medium text-navy">
            {day} {month} {year}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-[17px] leading-snug text-navy transition-colors group-hover:text-gold">
          {title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-foreground/50">
          <MapPin className="h-3 w-3 shrink-0" />
          {location}
        </p>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-foreground/60">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-foreground/8 pt-3">
          <span className="text-xs font-medium text-navy">Enquire</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-navy transition-colors group-hover:bg-gold group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
