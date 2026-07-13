"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Mountain,
  Palmtree,
  Play,
  Waves,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { VideoModal } from "@/components/shared/VideoModal";
import { homeEase, homeStagger, homeStaggerItem } from "@/components/home/home-motion";
import { useT } from "@/components/providers/LocaleProvider";
import {
  getStoryDestinationVideo,
  type StoryDestinationSlug,
} from "@/lib/videos";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const DESTINATIONS = [
  {
    slug: "yasawa" as const,
    title: "Yasawa Islands",
    image: images.storyYasawa,
    fact: "Volcanic ridges, blue lagoons & barefoot luxury",
    href: "/places-to-go/yasawa",
  },
  {
    slug: "mamanuca" as const,
    title: "Mamanuca Islands",
    image: images.storyMamanuca,
    fact: "Crystal waters, coral gardens & iconic resorts",
    href: "/places-to-go/mamanuca",
  },
  {
    slug: "nadi" as const,
    title: "Nadi",
    image: images.storyNadi,
    fact: "Gateway to paradise — marina & island hops",
    href: "/places-to-go/nadi",
  },
  {
    slug: "suva" as const,
    title: "Suva",
    image: images.storySuva,
    fact: "Capital culture, markets & colonial charm",
    href: "/places-to-go/suva",
  },
  {
    slug: "taveuni" as const,
    title: "Taveuni",
    image: images.storyTaveuni,
    fact: "Garden Island — waterfalls & rainbow reefs",
    href: "/places-to-go/taveuni",
  },
  {
    slug: "coral-coast" as const,
    title: "Coral Coast",
    image: images.storyCoralCoast,
    fact: "Golden beaches, villages & championship golf",
    href: "/places-to-go/coral-coast",
  },
] satisfies ReadonlyArray<{
  slug: StoryDestinationSlug;
  title: string;
  image: string;
  fact: string;
  href: string;
}>;

/** Premium cinematic Fiji storytelling — reference layout, brand palette */
export function FijiStoryExperience() {
  const t = useT();
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<StoryDestinationSlug>(
    DESTINATIONS[0].slug,
  );
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.02, 1]);

  const activeDest =
    DESTINATIONS.find((d) => d.slug === activeSlug) ?? DESTINATIONS[0];
  const activeVideo = getStoryDestinationVideo(activeSlug);

  const narrativeLines = [
    t.home.storyLine1,
    t.home.storyLine2,
    t.home.storyLine3,
    t.home.storyLine4,
  ];

  const features = [
    {
      icon: Mountain,
      title: t.home.storyFeature1Title,
      description: t.home.storyFeature1Desc,
    },
    {
      icon: Waves,
      title: t.home.storyFeature2Title,
      description: t.home.storyFeature2Desc,
    },
    {
      icon: Heart,
      title: t.home.storyFeature3Title,
      description: t.home.storyFeature3Desc,
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-cream py-20 lg:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(15,61,62,0.04) 0%, transparent 55%)",
          }}
          aria-hidden
        />
        <Palmtree
          className="pointer-events-none absolute right-8 top-16 h-32 w-32 text-navy/[0.04] lg:right-16 lg:h-48 lg:w-48"
          strokeWidth={0.75}
          aria-hidden
        />

        <Container className="relative z-[1]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            {/* Left — cinematic visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: homeEase }}
              className="relative"
            >
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_24px_64px_rgba(15,61,62,0.18)] ring-1 ring-navy/[0.1] sm:aspect-[5/6]"
              >
                <div className="absolute inset-0">
                  {DESTINATIONS.map((dest) => (
                    <Image
                      key={dest.slug}
                      src={dest.image}
                      alt={
                        dest.slug === activeSlug
                          ? `${dest.title} — ${t.home.storyImageAlt}`
                          : ""
                      }
                      fill
                      className={cn(
                        "object-cover transition-opacity duration-700 ease-out",
                        dest.slug === activeSlug
                          ? "z-[1] opacity-100"
                          : "z-0 opacity-0",
                      )}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={dest.slug === DESTINATIONS[0].slug}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-navy/60 via-navy/10 to-navy/15" />
                <div className="fiji-ocean-shimmer absolute inset-0 z-[2] opacity-60" aria-hidden />

                {/* Destination discovery rail — click to select */}
                <div className="absolute bottom-24 left-3 top-6 z-20 flex flex-col justify-center gap-2 sm:left-4 sm:gap-2.5">
                  {DESTINATIONS.map((dest, i) => {
                    const isActive = activeSlug === dest.slug;
                    return (
                      <motion.button
                        key={dest.slug}
                        type="button"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                        onClick={() => setActiveSlug(dest.slug)}
                        aria-pressed={isActive}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-full border py-1 pl-1 pr-3 text-left transition-all duration-300",
                          isActive
                            ? "border-gold/70 bg-navy/90 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md"
                            : "border-white/25 bg-navy/55 backdrop-blur-sm hover:border-gold/45 hover:bg-navy/70",
                        )}
                      >
                        <span
                          className={cn(
                            "relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 transition-all sm:h-10 sm:w-10",
                            isActive
                              ? "ring-gold/70"
                              : "ring-gold/30 group-hover:ring-gold/60",
                          )}
                        >
                          <Image
                            src={dest.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </span>
                        <span className="hidden text-[11px] font-semibold tracking-wide text-white sm:block">
                          {dest.title}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Active destination card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlug}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: homeEase }}
                    className="absolute right-4 top-1/2 z-20 max-w-[200px] -translate-y-1/2 rounded-2xl border border-white/30 bg-navy/90 p-4 shadow-[0_20px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:right-6"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                      {activeDest.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/90">
                      {activeDest.fact}
                    </p>
                    <Link
                      href={activeDest.href}
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-gold transition-all hover:gap-2"
                    >
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* Video CTA — plays active tab video */}
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="absolute bottom-5 left-5 z-20 flex max-w-[260px] items-center gap-3 rounded-2xl border border-white/25 bg-navy/90 px-4 py-3 text-left shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform hover:scale-[1.02]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy shadow-[0_6px_20px_rgba(212,175,55,0.55)]">
                    <Play className="ml-0.5 h-4 w-4 fill-navy text-navy" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">
                      {t.home.storyDiscoverVideo}
                    </span>
                    <span className="block text-xs text-white/85">
                      {activeVideo.theme}
                    </span>
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right — storytelling */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: homeEase }}
              className="lg:py-2"
            >
              <h2 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-navy md:text-5xl lg:text-[3.25rem]">
                {t.home.storyTitle}{" "}
                <span className="font-semibold text-gold">{t.home.storyTitleAccent}</span>
              </h2>

              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-navy/80">
                {t.home.storyDesc}
              </p>

              <motion.ul
                variants={homeStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="mt-6 space-y-2.5"
              >
                {narrativeLines.map((line) => (
                  <motion.li
                    key={line}
                    variants={homeStaggerItem}
                    className="flex items-center gap-2.5 text-[15px] font-semibold text-navy"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                    {line}
                  </motion.li>
                ))}
              </motion.ul>

              <Link
                href="/places-to-go"
                className={cn(
                  "mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300",
                  "border border-navy/20 bg-navy text-white",
                  "shadow-[0_8px_24px_rgba(15,61,62,0.28)] hover:border-navy/30 hover:shadow-[0_12px_32px_rgba(15,61,62,0.35)]",
                )}
              >
                {t.home.storyCta}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-12 grid gap-8 border-t border-navy/[0.14] pt-10 sm:grid-cols-3 sm:gap-0">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className={cn(
                      "px-0 sm:px-5",
                      index > 0 && "sm:border-l sm:border-gold/35",
                    )}
                  >
                    <feature.icon
                      className="h-6 w-6 text-gold"
                      strokeWidth={1.75}
                    />
                    <h3 className="mt-3 font-serif text-base font-semibold text-navy">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-navy/70">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <VideoModal
        key={activeSlug}
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={activeVideo.title}
        src={activeVideo.src}
        poster={activeVideo.poster}
      />
    </>
  );
}
