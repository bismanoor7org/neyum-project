"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/components/providers/LocaleProvider";
import type { ThingsToDoExperience } from "@/lib/content/things-to-do-categories";
import type { FeaturedHighlight } from "@/lib/content/things-to-do-category-page";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";
import { homeEase } from "@/components/home/home-motion";

const highlightIcons = [Clock, MapPin, Sparkles, Users];

interface ExperienceFeaturedBlockProps {
  experience: ThingsToDoExperience;
  highlights: FeaturedHighlight[];
}

export function ExperienceFeaturedBlock({
  experience,
  highlights,
}: ExperienceFeaturedBlockProps) {
  const t = useT();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: homeEase }}
      className={cn(
        "experience-featured-block relative overflow-hidden rounded-3xl lg:flex",
        ds.radiusCard,
      )}
    >
      <div className="pointer-events-none absolute -right-16 top-8 z-0 hidden h-64 w-64 opacity-[0.04] lg:block">
        <svg viewBox="0 0 200 200" className="h-full w-full text-navy" aria-hidden>
          <path
            fill="currentColor"
            d="M100 20 C60 40 30 80 40 120 C50 160 80 180 100 180 C120 180 150 160 160 120 C170 80 140 40 100 20Z"
          />
        </svg>
      </div>

      <div className="relative min-h-[340px] flex-1 lg:min-h-[480px]">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-navy/10" />
      </div>

      <div className="relative flex flex-1 flex-col justify-center bg-white p-8 lg:p-12 xl:p-14">
        <p className={ds.eyebrowGold}>{t.pages.featuredExperience}</p>
        <h2 className={cn(ds.headingSection, "mt-3 max-w-md")}>{experience.title}</h2>
        <p className={cn("mt-5 max-w-lg text-[15px] leading-relaxed", ds.body)}>
          {experience.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
          {highlights.map((item, i) => {
            const Icon = highlightIcons[i % highlightIcons.length]!;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-navy/[0.06] bg-white/70 px-4 py-3.5 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-foreground/45">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-navy">{item.value}</p>
              </div>
            );
          })}
        </div>

        <Button
          href={experience.href}
          variant="navy"
          className="mt-10 w-fit gap-2"
        >
          {t.pages.exploreThisExperience}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
