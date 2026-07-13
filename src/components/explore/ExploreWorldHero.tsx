"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ExploreSearch } from "./ExploreSearch";
import { WORLD_COUNTRY_TOTAL } from "@/lib/content/world";

const WorldMapEngine = dynamic(
  () => import("@/components/map/WorldMapEngine").then((m) => m.WorldMapEngine),
  { ssr: false, loading: () => <MapSkeleton /> },
);

function MapSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-[#030a12] via-[#0a1e2e] to-[#030a12]" />
  );
}

interface ExploreWorldHeroProps {
  activeCountry: string;
  onSelectCountry: (slug: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
}

export function ExploreWorldHero({
  activeCountry,
  onSelectCountry,
  search,
  onSearchChange,
}: ExploreWorldHeroProps) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#030a12]">
      <div className="absolute inset-0">
        <WorldMapEngine
          active={activeCountry}
          onSelect={onSelectCountry}
          className="h-full"
          defaultZoom={1.8}
          flyToOnSelect
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-[#030a12]/95" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[84rem] flex-col justify-end px-6 pb-16 pt-32 lg:px-10 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
            Explore The World
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Discover every corner
            <br />
            <span className="text-gold">of our planet</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">
            An interactive 3D world map with {WORLD_COUNTRY_TOTAL}+ countries, major cities,
            luxury experiences, and curated travel intelligence — all in one cinematic platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="pointer-events-auto mt-8 max-w-xl"
        >
          <ExploreSearch value={search} onChange={onSearchChange} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="pointer-events-auto mt-8 flex flex-wrap gap-6"
        >
          {[
            { value: `${WORLD_COUNTRY_TOTAL}+`, label: "Countries" },
            { value: "7", label: "Continents" },
            { value: "500+", label: "Cities" },
            { value: "∞", label: "Possibilities" },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel-dark rounded-xl border-white/10 px-5 py-3">
              <p className="font-serif text-2xl text-gold">{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
