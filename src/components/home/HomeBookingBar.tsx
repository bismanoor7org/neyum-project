"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { useT } from "@/components/providers/LocaleProvider";
import { homeEase } from "@/components/home/home-motion";
import { JourneyPlanner } from "@/components/home/JourneyPlanner";
import { cn } from "@/lib/utils";

type HomeBookingBarProps = {
  /** Standalone trip-planner page — no hero overlap offset */
  standalone?: boolean;
};

/** Concierge journey planner — unified luxury band */
export function HomeBookingBar({ standalone = false }: HomeBookingBarProps) {
  const t = useT();

  return (
    <section
      id="plan-your-journey"
      className={cn(
        "journey-section relative z-20 bg-cream pb-20 lg:pb-28",
        standalone ? "pt-24 lg:pt-32" : "-mt-20 pt-6 lg:-mt-28 lg:pt-8",
      )}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: homeEase }}
            className="font-serif text-[2rem] leading-[1.12] tracking-[-0.025em] text-navy sm:text-[2.35rem] lg:text-[2.65rem]"
          >
            {t.journeyPlanner.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.75, ease: homeEase }}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.75] text-foreground/55"
          >
            {t.journeyPlanner.subtitle}
          </motion.p>
        </div>

        <div className="relative mx-auto mt-10 max-w-3xl lg:mt-12">
          <JourneyPlanner />
        </div>
      </Container>
    </section>
  );
}
