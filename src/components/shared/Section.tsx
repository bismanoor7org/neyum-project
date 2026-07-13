"use client";

import { motion } from "framer-motion";
import { siteReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useDecorSide } from "@/components/shared/DecorProvider";
import { PalmTreeDecor } from "@/components/shared/PalmTreeDecor";
import type { DecorSide } from "@/lib/page-decor";

export type SectionVariant =
  | "cream"
  | "cream-compact"
  | "cream-alt"
  | "sand"
  | "ocean"
  | "coastal"
  | "navy"
  | "navy-deep"
  | "transparent";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** @deprecated use variant="cream-compact" */
  compact?: boolean;
  variant?: SectionVariant;
  id?: string;
  decor?: boolean;
  decorSide?: DecorSide;
  decorTone?: "light" | "dark";
  /** Scroll-reveal animation — off on home sections that animate internally */
  reveal?: boolean;
}

const variantClass: Record<SectionVariant, string> = {
  cream: "section-cream",
  "cream-compact": "section-cream-compact",
  "cream-alt": "section-sand",
  sand: "section-sand",
  ocean: "section-ocean",
  coastal: "section-coastal",
  navy: "section-navy",
  "navy-deep": "section-navy-deep",
  transparent: "py-16 lg:py-20",
};

/** Page section wrapper — uses globals.css section tokens */
export function Section({
  children,
  className,
  compact,
  variant,
  id,
  decor = true,
  decorSide,
  decorTone = "light",
  reveal = true,
}: SectionProps) {
  const resolvedVariant: SectionVariant =
    variant ?? (compact ? "cream-compact" : "cream");
  const autoSide = useDecorSide(decor && !decorSide);
  const side = decor ? (decorSide ?? autoSide) : null;
  const tone = decorTone ?? (resolvedVariant === "navy" ? "dark" : "light");

  const content = (
    <div className="relative z-[1]">{children}</div>
  );

  return (
    <section
      id={id}
      className={cn(
        variantClass[resolvedVariant],
        decor && resolvedVariant !== "navy" && "relative overflow-x-clip",
        className,
      )}
    >
      {side && <PalmTreeDecor side={side} tone={tone} />}
      {reveal ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          variants={siteReveal}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
    </section>
  );
}
