"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Globe2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { images } from "@/lib/images";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { cn } from "@/lib/utils";

type Breadcrumb = { label: string; href?: string };

type VisaAssistantHeroProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  compact?: boolean;
  breadcrumbs?: Breadcrumb[];
};

const STATS = [
  { icon: Globe2, label: "200+ nationalities" },
  { icon: ShieldCheck, label: "Real-time eligibility" },
  { icon: Zap, label: "Instant AI analysis" },
] as const;

const HERO_IMAGE = images.guideVisa;
const HERO_FALLBACK = images.travelReq;

const DEFAULT_BREADCRUMBS: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: TOOLS_HREF },
  { label: "AI Visa Assistant" },
];

export function VisaAssistantHero({
  title = "Fiji Immigration Intelligence",
  subtitle = "Premium AI-powered visa analysis — eligibility scoring, personalised document checklists, smart timelines, and instant answers for luxury Fiji journeys.",
  children,
  compact = true,
  breadcrumbs = DEFAULT_BREADCRUMBS,
}: VisaAssistantHeroProps) {
  const [imgSrc, setImgSrc] = useState(HERO_IMAGE);
  const split = Boolean(children);

  return (
    <section
      className={cn(
        "visa-ai-hero",
        compact && "visa-ai-hero--compact",
        split && "visa-ai-hero--split",
      )}
      aria-label="AI Fiji Visa Assistant"
    >
      <div className="visa-ai-hero__media" aria-hidden>
        <img
          src={imgSrc}
          alt=""
          className="visa-ai-hero__image"
          fetchPriority="high"
          onError={() => setImgSrc((s) => (s === HERO_FALLBACK ? s : HERO_FALLBACK))}
        />
        <div className="visa-ai-hero__overlay" />
        <div className="visa-ai-hero__glow visa-ai-hero__glow--gold" />
        <div className="visa-ai-hero__glow visa-ai-hero__glow--teal" />
      </div>

      <div className="visa-ai-hero__inner">
        <div className={cn("visa-ai-hero__grid", split && "visa-ai-hero__grid--split")}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="visa-ai-hero__copy"
          >
            {breadcrumbs.length > 0 && (
              <nav className="visa-ai-hero__breadcrumbs" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, i) => (
                  <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-white/25">/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-gold">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white/72">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            <span className="visa-ai-badge">
              <span className="visa-ai-badge__dot" aria-hidden />
              <Brain className="h-3.5 w-3.5 text-gold" aria-hidden />
              AI Visa Intelligence
              <Sparkles className="h-3 w-3 text-gold/80" aria-hidden />
            </span>

            <h1 className="visa-ai-hero__title">{title}</h1>
            <p className="visa-ai-hero__subtitle">{subtitle}</p>

            <div className="visa-ai-hero__stats">
              {STATS.map(({ icon: Icon, label }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="visa-ai-stat"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" aria-hidden />
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="visa-ai-hero__form visa-intake-glass visa-glass-card"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
