"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Sparkles, X } from "lucide-react";
import { getFijiGlobeDestination } from "@/lib/fiji-globe-data";
import { getDestination } from "@/lib/content/destinations";
import { useFijiGlobe } from "@/components/globe/FijiGlobeContext";
import { cn } from "@/lib/utils";

interface FijiDestinationPopupProps {
  className?: string;
}

export function FijiDestinationPopup({ className }: FijiDestinationPopupProps) {
  const { activeSlug, hoveredSlug, setHoveredSlug, compact } = useFijiGlobe();
  const slug = hoveredSlug ?? activeSlug;
  const dest = getFijiGlobeDestination(slug);
  if (!dest) return null;

  const show = hoveredSlug || (activeSlug && !compact);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={dest.slug}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto absolute z-20 overflow-hidden rounded-2xl border border-white/20 bg-navy/75 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
            compact
              ? "bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80"
              : "bottom-8 right-6 w-[min(100%,340px)] lg:w-[380px]",
            className,
          )}
        >
          <div className="relative h-36 overflow-hidden sm:h-40">
            <Image
              src={dest.image}
              alt={dest.title}
              fill
              className="object-cover"
              sizes="380px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
            {!compact && hoveredSlug && (
              <button
                type="button"
                onClick={() => setHoveredSlug(null)}
                className="absolute right-3 top-3 rounded-full bg-navy/60 p-1.5 text-white/70 backdrop-blur-sm transition-colors hover:text-white"
                aria-label="Close preview"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                {dest.tagline}
              </p>
              <h3 className="mt-0.5 font-serif text-xl text-white">{dest.title}</h3>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <p className="line-clamp-3 text-sm leading-relaxed text-white/75">
              {dest.overview}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {dest.highlights.slice(0, 3).map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-gold/25 bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
              <Calendar className="h-3.5 w-3.5 text-teal" />
              <span>Best time: {dest.bestTime}</span>
            </div>

            {dest.tours.length > 0 && (
              <div className="mt-3">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
                  <Sparkles className="h-3 w-3 text-gold" />
                  Tour packages
                </p>
                <ul className="mt-1.5 space-y-1">
                  {dest.tours.slice(0, 2).map((t) => (
                    <li key={t} className="text-xs text-white/70">
                      · {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href={
                getDestination(dest.slug)
                  ? `/places-to-go/${dest.slug}`
                  : "/explore-map"
              }
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-gold/90"
            >
              <MapPin className="h-4 w-4" />
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
