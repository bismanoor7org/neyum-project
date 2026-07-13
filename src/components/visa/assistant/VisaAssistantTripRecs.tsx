"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Compass, Gem, Lightbulb, MapPin } from "lucide-react";
import type { TripRecommendation } from "@/types/visa-assistant";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";

type VisaAssistantTripRecsProps = {
  recommendations: TripRecommendation[];
  countryName: string;
};

const ICONS = {
  resort: Building2,
  island: MapPin,
  activity: Compass,
  package: Gem,
};

export function VisaAssistantTripRecs({
  recommendations,
  countryName,
}: VisaAssistantTripRecsProps) {
  return (
    <VisaGlassCard className="visa-card-pad h-full">
      <p className="visa-section-label">
        <Lightbulb className="h-3.5 w-3.5" aria-hidden />
        Travel Tips & Ideas
      </p>
      <p className="mt-2 text-sm text-foreground/55">
        Curated for {countryName} travellers based on budget, dates, and entry status.
      </p>

      <div className="mt-5 space-y-3">
        {recommendations.map((rec, i) => {
          const Icon = ICONS[rec.type];
          const inner = (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-[var(--border)] bg-gradient-to-br from-white to-cream/40 p-4 transition-all hover:border-gold/30 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/12 ring-1 ring-gold/15">
                  <Icon className="h-4 w-4 text-gold" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
                    {rec.type}
                  </p>
                  <h4 className="mt-0.5 font-medium text-navy transition-colors group-hover:text-gold">
                    {rec.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground/55">{rec.description}</p>
                  {rec.priceHint && (
                    <p className="mt-2 text-xs font-semibold text-gold">{rec.priceHint}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
          return rec.href ? (
            <Link key={`${rec.type}-${rec.title}`} href={rec.href} className="block">
              {inner}
            </Link>
          ) : (
            <div key={`${rec.type}-${rec.title}`}>{inner}</div>
          );
        })}
      </div>
    </VisaGlassCard>
  );
}
