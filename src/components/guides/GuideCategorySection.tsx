"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Guide } from "@/lib/content/types";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { localizeGuide } from "@/lib/i18n/content";
import { GuideModernCard } from "./GuideModernCard";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface CategoryMeta {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  featuredSlug: string;
}

interface GuideCategorySectionProps {
  category: string;
  meta: CategoryMeta;
  guides: Guide[];
  iconMap: Record<string, LucideIcon>;
  index: number;
}

export function GuideCategorySection({
  category,
  meta,
  guides,
  iconMap,
  index,
}: GuideCategorySectionProps) {
  const t = useT();
  const { locale } = useLocale();
  const localizedGuides = guides.map((g) => localizeGuide(g, locale));
  const SectionIcon = meta.icon;
  const featured =
    localizedGuides.find((g) => g.slug === meta.featuredSlug) ?? localizedGuides[0];
  const rest = localizedGuides.filter((g) => g.slug !== featured.slug);
  const ordered = [featured, ...rest];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-xl border border-foreground/8 bg-white p-5 md:p-6"
      aria-labelledby={`guide-category-${category}`}
    >
      <div className="mb-5 flex flex-col gap-4 border-b border-foreground/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold/8 text-gold">
            <SectionIcon className="h-4 w-4" strokeWidth={1.35} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className={cn(ds.eyebrowGold, "text-[11px]")}>{category}</p>
              <span className="text-xs text-foreground/45">
                {guides.length} {t.common.guidesCount}
              </span>
            </div>
            <h2
              id={`guide-category-${category}`}
              className="mt-0.5 font-serif text-xl text-navy"
            >
              {meta.title}
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-foreground/55">
              {meta.subtitle}
            </p>
          </div>
        </div>
        <Link
          href={`/guides/${featured.slug}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/25 px-3.5 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-white"
        >
          {t.common.featured}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul
        className={cn(
          "grid list-none gap-4 sm:grid-cols-2",
          guides.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        )}
      >
        {ordered.map((guide, i) => (
          <li
            key={guide.slug}
            className={cn(
              guides.length % 3 === 1 &&
                i === guides.length - 1 &&
                "sm:col-span-2 sm:max-w-md sm:justify-self-center lg:col-span-1 lg:col-start-2 lg:max-w-none",
            )}
          >
            <GuideModernCard
              title={guide.title}
              description={guide.excerpt}
              image={guide.heroImage}
              href={`/guides/${guide.slug}`}
              icon={iconMap[guide.slug]}
              featured={i === 0}
              readMinutes={i === 0 ? 7 : 5}
            />
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
