"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { EmailField } from "@/components/shared/EmailField";
import { useLocale } from "@/components/providers/LocaleProvider";
import { siteReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CinematicNewsletterProps {
  title?: string;
  subtitle?: string;
  className?: string;
  /** When true, sits flush inside footer (no top radius) */
  embedded?: boolean;
}

/** Full-width cinematic newsletter — luxury travel closing moment */
export function CinematicNewsletter({
  title,
  subtitle,
  className,
  embedded = false,
}: CinematicNewsletterProps) {
  const { t } = useLocale();

  const resolvedTitle = title ?? t.footer.stayInspired;
  const resolvedSubtitle = subtitle ?? t.footer.newsletter;

  return (
    <section
      aria-label={resolvedTitle}
      className={cn(
        "relative isolate overflow-hidden",
        embedded ? "border-b border-white/[0.06]" : "",
        className,
      )}
    >
      <div className="relative bg-navy-deep">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 80% at 30% 50%, rgba(212,175,55,0.14) 0%, transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-[84rem] flex-col items-center justify-center px-6 py-16 text-center lg:px-10 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={siteReveal}
            className="mx-auto w-full max-w-3xl"
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-md sm:text-[11px]">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              Fiji Luxury Experiences
            </p>

            <h2 className="font-serif text-[2.25rem] leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
              {resolvedTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
              {resolvedSubtitle}
            </p>

            <div className="mx-auto mt-10 w-full max-w-lg">
              <EmailField
                variant="cinematic"
                className="border-white/25 bg-white/10 p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              />
              <p className="mt-4 text-xs tracking-wide text-white/45">
                {t.footer.newsletterFinePrint}
              </p>
            </div>
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
          aria-hidden
        />
      </div>
    </section>
  );
}
