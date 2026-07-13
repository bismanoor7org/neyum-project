"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Headphones, ShieldCheck, Star } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { siteReveal, siteStagger, siteStaggerItem } from "@/lib/motion";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

const TRUST_ICONS = [Star, Headphones, ShieldCheck, Award] as const;

/** Final homepage conversion moment — luxury closing banner before the footer */
export function LuxuryCTA() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const trustStats = [
    { value: "4.9", label: t.luxuryCta.trust1 },
    { value: "24/7", label: t.luxuryCta.trust2 },
    { value: "100%", label: t.luxuryCta.trust3 },
    { value: "✓", label: t.luxuryCta.trust4 },
  ] as const;

  return (
    <section
      ref={sectionRef}
      aria-label={t.luxuryCta.title}
      className="relative isolate overflow-hidden bg-cream"
    >
      <div className="relative mx-auto max-w-[84rem] px-6 pb-10 pt-10 lg:px-10 lg:pb-14 lg:pt-14">
        <div className="relative min-h-[min(88vh,920px)] overflow-hidden rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.38),0_0_0_1px_rgba(197,164,78,0.16)] sm:rounded-[2.5rem] lg:min-h-[min(82vh,880px)]">
          <motion.div
            style={{ scale: bgScale, y: bgY }}
            className="absolute inset-0 origin-center will-change-transform"
          >
            <Image
              src={images.dealOverwater}
              alt="Luxury overwater villa in Fiji"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 84rem"
              priority={false}
            />
          </motion.div>

          <div className="absolute inset-0 bg-[#0a2228]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#0a2228]/40 to-[#0a2228]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(10,34,40,0.42),transparent_68%)]" />

          <div className="relative flex min-h-[inherit] flex-col items-center justify-center px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={siteReveal}
              className="mx-auto flex max-w-4xl flex-col items-center"
            >
              <p
                className={cn(
                  ds.heroEyebrow,
                  "mb-8 border-white/35 bg-white/14 text-[10px] tracking-[0.26em] sm:text-[11px]",
                )}
              >
                {t.luxuryCta.eyebrow}
              </p>

              <h2 className="font-serif text-[2.75rem] leading-[1.02] tracking-[-0.035em] text-white [text-shadow:0_2px_32px_rgba(10,34,40,0.6)] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
                {t.luxuryCta.title}
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/90 [text-shadow:0_1px_16px_rgba(10,34,40,0.45)] sm:mt-8 sm:text-lg md:text-xl md:leading-[1.7]">
                {t.luxuryCta.subtitle}
              </p>

              <motion.div
                variants={siteStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="mt-12 flex w-full flex-col items-stretch justify-center gap-4 sm:mt-14 sm:w-auto sm:flex-row sm:items-center"
              >
                <motion.div variants={siteStaggerItem}>
                  <Link
                    href="/contact"
                    className={cn(
                      ds.btnBase,
                      ds.btnGold,
                      "group w-full gap-2.5 px-12 py-4 text-[15px] ring-1 ring-white/25 sm:w-auto sm:min-w-[240px]",
                      "shadow-[0_8px_32px_rgba(212,175,55,0.32)] hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(212,175,55,0.45)] active:scale-[0.98]",
                    )}
                  >
                    {t.luxuryCta.primary}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
                <motion.div variants={siteStaggerItem}>
                  <Link
                    href="/things-to-do"
                    className={cn(
                      ds.btnBase,
                      ds.btnGhost,
                      "group w-full border-white/55 bg-white/12 px-12 py-4 text-[15px] text-white shadow-[0_4px_20px_rgba(10,34,40,0.3)] sm:w-auto sm:min-w-[240px]",
                      "hover:scale-[1.02] hover:border-white/70 hover:bg-white/18 active:scale-[0.98]",
                    )}
                  >
                    {t.luxuryCta.secondary}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={siteStagger}
              className="mt-16 w-full max-w-5xl sm:mt-20 lg:mt-24"
            >
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {trustStats.map((item, i) => {
                  const Icon = TRUST_ICONS[i];
                  return (
                    <motion.div
                      key={item.label}
                      variants={siteStaggerItem}
                      className={cn(
                        ds.heroStatCard,
                        "group flex flex-col items-center px-5 py-6 sm:px-7 sm:py-7",
                        "border-white/40 bg-navy-deep/58 shadow-[0_12px_40px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-[transform,background-color,border-color,box-shadow] duration-500",
                        "hover:-translate-y-1 hover:border-gold/55 hover:bg-navy-deep/68 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.16)]",
                      )}
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-gold/22 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:scale-105">
                        <Icon className="h-5 w-5 text-gold-light" strokeWidth={1.75} />
                      </div>
                      <p className="font-serif text-3xl tracking-[-0.02em] text-gold-light [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] sm:text-4xl">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] sm:text-xs sm:tracking-[0.2em]">
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div
            className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
