"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useT } from "@/components/providers/LocaleProvider";
import { siteEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface GuideFeaturedHeroProps {
  title: string;
  description: string;
  href: string;
  image: string;
  readMinutes?: number;
  className?: string;
}

/** Featured guide — cinematic split layout with editorial hover */
export function GuideFeaturedHero({
  title,
  description,
  href,
  image,
  readMinutes = 7,
  className,
}: GuideFeaturedHeroProps) {
  const t = useT();

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: siteEase }}
      className={cn(
        "overflow-hidden rounded-[28px] bg-white",
        "shadow-[0_8px_44px_rgba(26,39,68,0.08)] ring-1 ring-black/[0.04]",
        className,
      )}
    >
      <Link
        href={href}
        className={cn(
          "group grid lg:min-h-[360px] lg:grid-cols-2 lg:items-stretch",
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:min-h-[360px]">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/20 via-transparent to-transparent lg:from-navy/30" />
        </div>

        <div className="flex flex-col justify-center px-7 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-14 xl:px-14">
          <p className={cn(ds.eyebrowGold, "text-[11px]")}>
            {t.guidesPage.featuredLabel}
          </p>
          <h2 className="mt-4 font-serif text-[1.85rem] leading-[1.12] tracking-[-0.02em] text-navy sm:text-[2.15rem] lg:text-[2.35rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-foreground/58 sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-navy-light">
              {t.common.readGuide}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </span>
            <span className="text-xs text-foreground/40">
              {readMinutes} {t.common.minRead}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
