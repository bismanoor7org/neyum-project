"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { homeSocialImages } from "@/lib/images";
import { siteEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

export type TravelerTestimonial = {
  id?: string;
  content: string;
  authorName: string;
  authorTitle?: string | null;
  authorImage?: string | null;
  location?: string | null;
  rating?: number;
  featured?: boolean;
  publishedAt?: Date | string | null;
};

const AUTO_ADVANCE_MS = 6500;
const TRANSITION = { duration: 0.62, ease: siteEase };

function formatTravelMonth(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(d);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(3);
      else if (window.matchMedia("(min-width: 768px)").matches) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function StarRow({
  rating,
  size = "sm",
  className,
}: {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const iconClass = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div
      className={cn("flex justify-center gap-0.5", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconClass,
            i < rating ? "fill-gold text-gold" : "fill-navy/10 text-navy/15",
          )}
        />
      ))}
    </div>
  );
}

type StoryItem = {
  id: string;
  quote: string;
  author: string;
  country: string;
  travelMonth: string | null;
  rating: number;
  image: string | null;
};

function TestimonialCard({
  item,
  isActive,
  reduceMotion = false,
  entranceDelay = 0,
}: {
  item: StoryItem;
  isActive?: boolean;
  reduceMotion?: boolean;
  entranceDelay?: number;
}) {
  const reveal = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: entranceDelay + delay, ease: siteEase },
        };

  return (
    <motion.article
      layout
      className={cn(
        "group relative flex h-full flex-col items-center px-4 py-8 text-center transition-[transform,box-shadow] duration-500 sm:px-6 sm:py-10",
        "rounded-3xl border border-navy/[0.05] bg-[var(--card-elevated)] shadow-[var(--shadow-card)]",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
        isActive && "ring-1 ring-gold/20",
      )}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.45, ease: siteEase }}
    >
      <motion.div
        className="relative mb-6 h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full shadow-[0_8px_24px_rgba(26,39,68,0.12)] ring-2 ring-gold/20 ring-offset-2 ring-offset-[var(--card-elevated)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-20 sm:w-20"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: entranceDelay, ease: siteEase }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.author}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-cream font-serif text-xl text-navy">
            {initials(item.author)}
          </span>
        )}
      </motion.div>

      <motion.span
        className="pointer-events-none font-serif text-5xl leading-none text-gold/35 select-none sm:text-6xl"
        aria-hidden
        {...reveal(0.1)}
      >
        &ldquo;
      </motion.span>

      <motion.p
        className="mt-2 max-w-[18rem] font-medium leading-snug text-navy sm:max-w-[20rem] sm:text-[17px] sm:leading-relaxed"
        {...reveal(0.18)}
      >
        {item.quote}
      </motion.p>

      <motion.span
        className="pointer-events-none -mt-3 font-serif text-5xl leading-none text-gold/35 select-none sm:text-6xl"
        aria-hidden
        {...reveal(0.26)}
      >
        &rdquo;
      </motion.span>

      <motion.p className="mt-4 text-sm text-foreground/50" {...reveal(0.34)}>
        — {item.author}
      </motion.p>

      {item.travelMonth ? (
        <motion.p className="mt-1 text-sm font-medium text-foreground/70" {...reveal(0.4)}>
          {item.travelMonth}
        </motion.p>
      ) : null}

      {item.country ? (
        <motion.p className="mt-1 text-xs text-foreground/45" {...reveal(0.46)}>
          {item.country}
        </motion.p>
      ) : null}

      <div className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <StarRow rating={item.rating} />
      </div>
    </motion.article>
  );
}

function TrustStrip() {
  const t = useT();

  const segments = [
    {
      key: "google",
      title: t.home.testimonials.googleRatingLabel,
      value: t.home.testimonials.googleRating,
      suffix: "/5",
      stars: 5,
    },
    {
      key: "verified",
      title: t.home.testimonials.verifiedSub,
      value: t.home.testimonials.verifiedCount,
      stars: null as number | null,
    },
    {
      key: "satisfaction",
      title: t.home.testimonials.satisfactionSub,
      value: t.home.testimonials.satisfaction,
      stars: null,
    },
    {
      key: "reviews",
      title: t.home.testimonials.reviewCountSub,
      value: t.home.testimonials.reviewCount,
      stars: 5,
      quote: t.home.testimonials.trustQuoteTwo,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: 0.12, ease: siteEase }}
      className="mx-auto mt-10 max-w-4xl rounded-full border border-navy/[0.08] bg-white px-4 py-4 shadow-[var(--shadow-card)] sm:mt-12 sm:px-6 sm:py-5"
    >
      <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-y-0">
        {segments.map((seg, i) => (
          <div
            key={seg.key}
            className={cn(
              "flex flex-col items-center justify-center px-2 text-center",
              i > 0 && "sm:border-l sm:border-navy/[0.08]",
              i === 2 && "border-l border-navy/[0.08] sm:border-l",
            )}
          >
            {seg.quote ? (
              <>
                <p className="text-[11px] font-medium leading-snug text-foreground/65 sm:text-xs">
                  {seg.quote}
                </p>
                <StarRow rating={seg.stars ?? 5} className="mt-2" />
              </>
            ) : (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                  {seg.title}
                </p>
                <p className="mt-1.5 font-serif text-xl text-navy sm:text-2xl">
                  {seg.value}
                  {seg.suffix ? (
                    <span className="text-base text-foreground/45">{seg.suffix}</span>
                  ) : null}
                </p>
                {seg.stars ? <StarRow rating={seg.stars} className="mt-2" /> : null}
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages.length > 0 ? pages : [[]];
}

export function TravelerTestimonials({
  testimonials,
  section,
}: {
  testimonials?: TravelerTestimonial[];
  section?: { title?: string; subtitle?: string };
}) {
  const t = useT();
  const reduceMotion = useReducedMotion();
  const visibleCount = useVisibleCount();
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const fallbackStories: StoryItem[] = [
    {
      id: "fallback-0",
      quote: t.home.story1Quote,
      author: t.home.story1Author,
      country: "Australia",
      travelMonth: "November 2025",
      rating: 5,
      image: homeSocialImages[0],
    },
    {
      id: "fallback-1",
      quote: t.home.story2Quote,
      author: t.home.story2Author,
      country: "Singapore",
      travelMonth: "August 2025",
      rating: 5,
      image: homeSocialImages[4],
    },
    {
      id: "fallback-2",
      quote: t.home.story3Quote,
      author: t.home.story3Author,
      country: "United Kingdom",
      travelMonth: "June 2025",
      rating: 5,
      image: homeSocialImages[8],
    },
  ];

  const stories: StoryItem[] = useMemo(() => {
    if (testimonials && testimonials.length > 0) {
      return testimonials.map((row, i) => ({
        id: row.id ?? `cms-${i}`,
        quote: row.content,
        author: row.authorName,
        country: row.location ?? "",
        travelMonth: formatTravelMonth(row.publishedAt),
        rating: Math.min(5, Math.max(1, row.rating ?? 5)),
        image: row.authorImage ?? null,
      }));
    }
    return fallbackStories;
  }, [testimonials, t]);

  const pages = useMemo(() => chunk(stories, visibleCount), [stories, visibleCount]);
  const pageCount = pages.length;
  const safePage = page % pageCount;
  const currentItems = pages[safePage] ?? [];

  const goTo = useCallback(
    (next: number) => {
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  const goNext = useCallback(() => goTo(safePage + 1), [goTo, safePage]);
  const goPrev = useCallback(() => goTo(safePage - 1), [goTo, safePage]);

  useEffect(() => {
    setPage(0);
  }, [visibleCount, stories.length]);

  useEffect(() => {
    if (reduceMotion || paused || pageCount <= 1) return;
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [goNext, pageCount, paused, reduceMotion, safePage]);

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 48 : -48,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -48 : 48,
    }),
  };

  const [direction, setDirection] = useState(0);

  const paginate = (next: number) => {
    setDirection(next > safePage ? 1 : -1);
    goTo(next);
  };

  return (
    <Section variant="cream" decor={false} reveal={false}>
      <Container>
        <SectionHeader
          title={section?.title ?? t.home.storiesTitle}
          subtitle={section?.subtitle ?? t.home.storiesSubtitle}
          align="center"
          size="compact"
        />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current;
            if (Math.abs(delta) > 48) {
              if (delta < 0) goNext();
              else goPrev();
            }
            touchStart.current = null;
          }}
        >
          {pageCount > 1 ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setDirection(-1);
                  goPrev();
                }}
                className="absolute left-0 top-1/2 z-10 hidden -translate-x-2 -translate-y-1/2 rounded-full border border-navy/10 bg-white/95 p-2.5 text-navy shadow-md transition-all hover:border-gold/40 hover:text-gold md:flex"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDirection(1);
                  goNext();
                }}
                className="absolute right-0 top-1/2 z-10 hidden translate-x-2 -translate-y-1/2 rounded-full border border-navy/10 bg-white/95 p-2.5 text-navy shadow-md transition-all hover:border-gold/40 hover:text-gold md:flex"
                aria-label="Next reviews"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}

          <div className="overflow-hidden px-0 md:px-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${safePage}-${visibleCount}`}
                custom={direction}
                variants={reduceMotion ? undefined : slideVariants}
                initial={reduceMotion ? false : "enter"}
                animate="center"
                exit={reduceMotion ? undefined : "exit"}
                transition={TRANSITION}
                className={cn(
                  "grid gap-6",
                  visibleCount === 3 && "lg:grid-cols-3",
                  visibleCount === 2 && "md:grid-cols-2",
                  visibleCount === 1 && "grid-cols-1",
                )}
              >
                {currentItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: reduceMotion ? 0 : i * 0.12,
                      duration: 0.62,
                      ease: siteEase,
                    }}
                  >
                    <TestimonialCard
                      item={item}
                      isActive={i === 0}
                      reduceMotion={!!reduceMotion}
                      entranceDelay={reduceMotion ? 0 : i * 0.12}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {pageCount > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex gap-2">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => paginate(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-400",
                      i === safePage ? "w-7 bg-gold" : "w-1.5 bg-navy/15 hover:bg-navy/25",
                    )}
                    aria-label={`Show review set ${i + 1}`}
                    aria-current={i === safePage}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease: siteEase }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <Link
            href="/contact?topic=reviews"
            className={cn(
              ds.btnBase,
              "inline-flex gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white",
              "transition-all duration-300 hover:bg-coral hover:shadow-[0_8px_28px_rgba(232,149,122,0.35)]",
            )}
          >
            {t.home.testimonials.viewAllReviews}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <TrustStrip />

        <p className="mt-6 text-center text-sm text-foreground/45">
          {t.home.testimonials.verifiedReview}
        </p>
      </Container>
    </Section>
  );
}

/** @deprecated Use TravelerTestimonials — kept for homepage dynamic import */
export const CustomerStories = TravelerTestimonials;
