"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Palmtree, Wallet } from "lucide-react";
import type { VisaRecommendations } from "@/types/visa";

type VisaRecommendationsProps = {
  recommendations: VisaRecommendations;
  countryName: string;
};

export function VisaRecommendations({
  recommendations,
  countryName,
}: VisaRecommendationsProps) {
  const cards = [
    {
      icon: Calendar,
      title: "Recommended season",
      value: recommendations.bestSeason,
    },
    {
      icon: Palmtree,
      title: "Popular resorts",
      value: recommendations.popularResorts.join(" · "),
    },
    {
      icon: Wallet,
      title: "Average trip budget",
      value: recommendations.avgBudget,
    },
    {
      icon: MapPin,
      title: "Suggested itinerary",
      value: recommendations.suggestedItinerary,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45 }}
      className="rounded-3xl border border-foreground/8 bg-gradient-to-br from-cream via-white to-sand/30 p-6 shadow-[var(--shadow-card)] sm:p-8"
      aria-labelledby="visa-rec-heading"
    >
      <h3 id="visa-rec-heading" className="font-serif text-xl font-semibold text-navy">
        Smart recommendations for {countryName} travellers
      </h3>
      <p className="mt-2 text-sm text-foreground/60">
        Curated by our Fiji concierge — season, stays and budget guidance.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map(({ icon: Icon, title, value }, i) => (
          <motion.div
            key={title}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-foreground/6 bg-white/80 p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 text-gold">
              <Icon className="h-4 w-4" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground/45">
                {title}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed text-navy">{value}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
