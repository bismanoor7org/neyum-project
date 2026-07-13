"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Headphones, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { siteReveal, siteStagger, siteStaggerItem } from "@/lib/motion";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface SupportGlassCardProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt?: string;
  className?: string;
}

/** Glassmorphism concierge support card — premium pre-footer */
export function SupportGlassCard({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  image,
  imageAlt = "Fiji island support",
  className,
}: SupportGlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.12]);

  return (
    <Container className={cn("relative", className)}>
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={siteReveal}
        className="group relative overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)] lg:rounded-[2.5rem]"
      >
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 origin-center">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 84rem" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy-deep/55 to-navy-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/20" />

        <div className="relative flex min-h-[min(420px,70vh)] flex-col lg:min-h-[380px] lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col justify-end p-8 sm:p-10 lg:justify-center lg:p-14">
            <motion.div variants={siteStagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div
                variants={siteStaggerItem}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold backdrop-blur-md"
              >
                <Headphones className="h-3.5 w-3.5" strokeWidth={1.5} />
                Concierge Support
              </motion.div>

              <motion.h2
                variants={siteStaggerItem}
                className="max-w-lg font-serif text-[2rem] leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.5rem] lg:text-[2.75rem]"
              >
                {title}
              </motion.h2>

              <motion.p
                variants={siteStaggerItem}
                className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base"
              >
                {subtitle}
              </motion.p>

              <motion.div variants={siteStaggerItem} className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={ctaHref}
                  className={cn(
                    ds.btnBase,
                    ds.btnGold,
                    "group/btn gap-2.5 px-9 py-4 text-[15px] shadow-[0_8px_32px_rgba(212,175,55,0.28)]",
                    "hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(212,175,55,0.38)] active:scale-[0.98]",
                  )}
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
                <span className="inline-flex items-center gap-2 text-sm text-white/55">
                  <MessageCircle className="h-4 w-4 text-gold/80" strokeWidth={1.5} />
                  24/7 response
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="pointer-events-none relative hidden w-[38%] lg:block">
            <div className="absolute inset-y-8 right-8 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <div className="absolute bottom-10 right-10 top-10 rounded-[1.75rem] border border-white/15 bg-white/[0.06] backdrop-blur-2xl" />
            <div className="absolute bottom-16 right-16 top-16 overflow-hidden rounded-[1.25rem] border border-white/10">
              <Image src={image} alt="" fill className="object-cover opacity-90" sizes="320px" />
              <div className="absolute inset-0 bg-navy-deep/25" />
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
