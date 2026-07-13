"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { GuideHubCard } from "./GuideHubCard";
import { useT } from "@/components/providers/LocaleProvider";
import { siteStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface GuideItem {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
}

interface GuideKnowledgeCategoryProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  guides: GuideItem[];
  index: number;
  className?: string;
}

/** Category panel — image cards in a responsive editorial grid */
export function GuideKnowledgeCategory({
  id,
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  guides,
  index,
  className,
}: GuideKnowledgeCategoryProps) {
  const t = useT();

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-[28px] bg-white",
        "shadow-[0_6px_40px_rgba(26,39,68,0.07)] ring-1 ring-black/[0.04]",
        className,
      )}
      aria-labelledby={`guide-hub-${id}`}
    >
      <div className="border-b border-foreground/[0.06] px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/[0.08] text-gold">
              <Icon className="h-5 w-5" strokeWidth={1.35} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <p className={cn(ds.eyebrowGold, "text-[11px]")}>{eyebrow}</p>
                <span className="text-xs text-foreground/40">
                  {guides.length} {t.common.guidesCount}
                </span>
              </div>
              <h2
                id={`guide-hub-${id}`}
                className="mt-2 font-serif text-[1.75rem] tracking-[-0.02em] text-navy md:text-[2rem]"
              >
                {title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/55">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <motion.ul
          className={cn(
            "grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3",
            guides.length === 1 && "max-w-md",
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-48px" }}
          variants={siteStagger}
        >
          {guides.map((guide, i) => (
            <li
              key={guide.slug}
              className={cn(
                guides.length % 3 === 1 &&
                  i === guides.length - 1 &&
                  guides.length > 1 &&
                  "sm:col-span-2 sm:max-w-md sm:justify-self-center lg:col-span-1 lg:max-w-none lg:justify-self-auto",
              )}
            >
              <GuideHubCard
                title={guide.title}
                description={guide.excerpt}
                image={guide.heroImage}
                href={`/guides/${guide.slug}`}
                readMinutes={i === 0 ? 7 : 5}
              />
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
