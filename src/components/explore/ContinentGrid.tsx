"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { continents } from "@/lib/content/world/continents";
import type { ContinentSlug } from "@/lib/content/world/types";
import { cn } from "@/lib/utils";

interface ContinentGridProps {
  active?: ContinentSlug | null;
  onSelect: (slug: ContinentSlug | null) => void;
}

export function ContinentGrid({ active, onSelect }: ContinentGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 lg:gap-4">
      {continents.map((c, i) => {
        const selected = active === c.slug;
        return (
          <motion.button
            key={c.slug}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            onClick={() => onSelect(selected ? null : c.slug)}
            className={cn(
              "group relative aspect-[4/5] overflow-hidden rounded-xl border text-left transition-all duration-400",
              selected
                ? "border-gold/60 ring-2 ring-gold/30"
                : "border-white/15 hover:border-gold/40",
            )}
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="160px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-navy/10" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-serif text-sm text-white lg:text-base">{c.name}</p>
              <p className="mt-0.5 text-[10px] text-white/60">{c.countryCount} countries</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export function ContinentCardLink({ slug }: { slug: ContinentSlug }) {
  const c = continents.find((x) => x.slug === slug);
  if (!c) return null;
  return (
    <Link
      href={`/explore?continent=${slug}`}
      className="group relative block aspect-[16/9] overflow-hidden rounded-2xl border border-white/15"
    >
      <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{c.countryCount} countries</p>
        <h3 className="mt-1 font-serif text-3xl text-white">{c.name}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/75">{c.tagline}</p>
      </div>
    </Link>
  );
}
