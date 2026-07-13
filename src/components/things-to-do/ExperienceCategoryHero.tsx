"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ThingsToDoFilterKey } from "@/lib/content/things-to-do-categories";
import {
  CATEGORY_PAGE_CONFIG,
  getCategoryHeroImage,
} from "@/lib/content/things-to-do-category-page";
import { homeEase } from "@/components/home/home-motion";

interface ExperienceCategoryHeroProps {
  activeFilter: ThingsToDoFilterKey;
  indexMode?: boolean;
}

export function ExperienceCategoryHero({
  activeFilter,
}: ExperienceCategoryHeroProps) {
  const config = CATEGORY_PAGE_CONFIG[activeFilter];
  const heroImage = getCategoryHeroImage(activeFilter);

  return (
    <section className="relative min-h-[560px] overflow-hidden lg:min-h-[620px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: homeEase }}
          className="absolute inset-0"
        >
          <Image
            src={heroImage}
            alt={config.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="hero-cinematic-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/45 to-navy/15" />
    </section>
  );
}
