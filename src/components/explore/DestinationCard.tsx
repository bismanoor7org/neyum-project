"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { WorldCountry } from "@/lib/content/world/types";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  country: WorldCountry;
  index?: number;
  variant?: "default" | "compact" | "featured";
}

export function DestinationCard({
  country,
  index = 0,
  variant = "default",
}: DestinationCardProps) {
  const compact = variant === "compact";
  const featured = variant === "featured";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/explore/${country.slug}`}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_20px_60px_rgba(15,61,62,0.12)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_28px_80px_rgba(15,61,62,0.18)]",
          featured ? "aspect-[4/5]" : compact ? "aspect-[3/2]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={country.cardImage}
          alt={country.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? "400px" : "320px"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              {country.flag}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/90">
              {country.continent.replace("-", " ")}
            </p>
          </div>
          <h3
            className={cn(
              "mt-1 font-serif text-white",
              featured ? "text-2xl" : compact ? "text-lg" : "text-xl",
            )}
          >
            {country.name}
          </h3>
          {!compact && (
            <p className="mt-1 line-clamp-2 text-sm text-white/70">{country.tagline}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {country.travelStyles.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium capitalize text-white/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
