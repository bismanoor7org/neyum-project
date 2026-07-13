"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { homeEase } from "@/components/home/home-motion";

interface ExperiencePremiumCtaProps {
  title: string;
  subtitle: string;
}

export function ExperiencePremiumCta({ title, subtitle }: ExperiencePremiumCtaProps) {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-navy lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: homeEase }}
        className="relative mx-auto max-w-3xl px-6 text-center lg:px-10"
      >
        <h2 className="font-serif text-3xl tracking-tight md:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-foreground-muted lg:text-[15px]">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="gold" className="min-w-[200px] gap-2">
            Plan Your Journey
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link
            href="/contact"
            className="flex w-full max-w-md items-center rounded-full border border-navy/10 bg-white/80 p-1 shadow-sm transition-colors hover:bg-white sm:w-auto sm:min-w-[320px] dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            <span className="flex-1 px-5 py-3 text-left text-sm font-medium text-foreground-secondary">
              Speak with our Fiji concierge
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
