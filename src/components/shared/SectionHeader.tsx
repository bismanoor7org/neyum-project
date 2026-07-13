"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { siteReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

function HeaderDecoration() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <span className="h-px w-10 bg-gold/50" />
      <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
      <span className="h-px w-10 bg-gold/50" />
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  eyebrowVariant?: "gold" | "teal";
  action?: { label: string; href: string };
  align?: "center" | "split";
  decorated?: boolean;
  size?: "default" | "compact";
  theme?: "light" | "dark";
  className?: string;
  animate?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  eyebrowVariant = "gold",
  action,
  align = "center",
  decorated = false,
  size = "default",
  theme = "light",
  className,
  animate = true,
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  const headingClass = cn(
    size === "compact"
      ? "font-serif text-[2rem] leading-[1.1] tracking-[-0.025em] sm:text-[2.35rem] md:text-[3rem] md:leading-[1.08]"
      : ds.headingSection,
    isDark ? "text-white" : "text-navy",
  );
  const blockMb = size === "compact" ? "mb-11 lg:mb-14" : "mb-12 lg:mb-16";
  const subtitleClass = isDark
    ? "body-muted mt-5 max-w-xl text-white/70"
    : "body-muted mt-5 max-w-xl";

  const motionProps = animate
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-40px" },
        variants: siteReveal,
      }
    : {};

  if (align === "split") {
    return (
      <motion.div
        {...motionProps}
        className={cn(
          blockMb,
          "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
          className,
        )}
      >
        <div className="max-w-2xl">
          {eyebrow && (
            <p
              className={
                eyebrowVariant === "gold" ? ds.eyebrowGold : ds.eyebrowTeal
              }
            >
              {eyebrow}
            </p>
          )}
          <h2 className={cn(headingClass, eyebrow && "mt-2")}>{title}</h2>
          {decorated && <HeaderDecoration />}
          {subtitle && <p className={subtitleClass}>{subtitle}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="link-luxury pointer-events-auto relative z-30 shrink-0 whitespace-nowrap"
          >
            {action.label}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      {...motionProps}
      className={cn(blockMb, "text-center", className)}
    >
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <p
            className={cn(
              "mb-3.5",
              eyebrowVariant === "gold" ? ds.eyebrowGold : ds.eyebrowTeal,
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2 className={cn(headingClass, isDark && "text-white")}>{title}</h2>
        {decorated && (
          <div className="mt-5 flex justify-center">
            <HeaderDecoration />
          </div>
        )}
        {subtitle && (
          <p
            className={cn(
              "body-muted mx-auto mt-5 max-w-2xl text-pretty",
              isDark && "text-white/70",
            )}
          >
            {subtitle}
          </p>
        )}
        {action && (
          <div className="relative z-30 mt-7 flex justify-center">
            <Link href={action.href} className="link-luxury pointer-events-auto">
              {action.label}
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
