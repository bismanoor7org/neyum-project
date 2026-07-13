"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";
import { useT } from "@/components/providers/LocaleProvider";
import { HERO_VIDEO } from "@/lib/videos";
import { cn } from "@/lib/utils";

import type { HomeHeroConfig } from "@/server/services/public-content.service";

const revealEase = [0.22, 1, 0.36, 1] as const;

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: revealEase },
  },
};

/** Fullscreen cinematic hero — Fiji island aerial video + editorial copy + search */
export function HeroHome({ hero }: { hero?: HomeHeroConfig }) {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const markVideoReady = useCallback(() => setVideoReady(true), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      markVideoReady();
      video.play().catch(() => undefined);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback();
      return;
    }

    video.addEventListener("canplay", startPlayback, { once: true });
    return () => video.removeEventListener("canplay", startPlayback);
  }, [markVideoReady]);

  const { scrollY } = useScroll();
  const mediaScale = useTransform(scrollY, [0, 600], [1, 1.06]);
  const contentY = useTransform(scrollY, [0, 400], [0, 48]);
  const contentOpacity = useTransform(scrollY, [0, 320], [1, 0]);

  const title =
    hero?.titleAccent ??
    hero?.titleMain ??
    ("titleAccent" in t.hero && t.hero.titleAccent ? t.hero.titleAccent : t.hero.title);
  const subtitle = hero?.subtitle ?? t.hero.subtitle;
  const ctaHref = hero?.ctaHref ?? "/destinations";
  const ctaLabel =
    hero?.ctaLabel ??
    ("exploreDestinations" in t.hero && t.hero.exploreDestinations
      ? t.hero.exploreDestinations
      : t.hero.exploreExperiences);

  return (
    <section className="hero-home--light relative min-h-[100svh] overflow-hidden bg-navy-deep">
      <motion.div style={{ scale: mediaScale }} className="absolute inset-0 origin-center">
        <video
          ref={videoRef}
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-hidden
          onCanPlay={markVideoReady}
          className={cn(
            "hero-slide-video hero-home-image absolute inset-0 h-full min-h-full w-full min-w-full object-cover object-center transition-opacity duration-700",
            videoReady ? "opacity-100" : "opacity-0",
          )}
        />
      </motion.div>

      <div
        className="hero-cinematic-overlay hero-home-overlay hero-home-overlay-light pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-between px-6 pb-8 pt-28 sm:pb-10 lg:px-14 lg:pb-10 lg:pt-32"
      >
        <motion.div
          variants={contentVariants}
          initial="visible"
          animate="visible"
          className="hero-home-copy max-w-xl pt-4 sm:max-w-2xl sm:pt-8 lg:pt-10"
        >
          <motion.p variants={itemVariants} className="hero-eyebrow-luxury">
            {t.hero.eyebrow}
            <span className="hero-eyebrow-line" aria-hidden />
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero-title-display mt-5 lg:mt-6">
            <span className="hero-title-accent">{title}</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle-luxury mt-5 lg:mt-6">
            {subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 lg:mt-9">
            <Link href={ctaHref} className="hero-cta-discover">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-auto pt-10 sm:pt-12 lg:pt-14">
          <HeroSearchBar />
        </div>
      </motion.div>
    </section>
  );
}
