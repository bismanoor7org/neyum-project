"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExperienceModernCard } from "@/components/experiences/ExperienceModernCard";
import { homeEase } from "@/components/home/home-motion";
import { Container, Section, SectionHeader } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { homeMarketplaceExperiences } from "@/lib/content/home-experiences";
import { cn } from "@/lib/utils";

export function ExperiencesGrid() {
  const t = useT();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = homeMarketplaceExperiences;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const scrollLeft = el.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  return (
    <Section variant="cream" decor={false} reveal={false}>
      <Container>
        <SectionHeader
          title={t.home.experiencesTitle}
          subtitle={t.home.experiencesSubtitle}
          align="center"
          size="compact"
          action={{ label: `${t.common.viewAllExperiences} →`, href: "/things-to-do" }}
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            "flex gap-5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory",
            "md:grid md:overflow-visible md:pb-0",
            "md:grid-cols-2 lg:grid-cols-4 lg:gap-6",
          )}
        >
          {items.map((exp, i) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: homeEase }}
              className={cn(
                "w-[min(88vw,320px)] shrink-0 snap-center",
                "md:w-auto md:shrink",
              )}
            >
              <ExperienceModernCard {...exp} />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-1.5 md:hidden">
          {items.map((exp, i) => (
            <span
              key={exp.slug}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-navy/15",
              )}
              aria-hidden
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
