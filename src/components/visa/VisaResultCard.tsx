"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Globe, Stamp, Timer } from "lucide-react";
import { flagUrl } from "@/data/visa/countries";
import type { VisaRequirement } from "@/types/visa";
import { VISA_STATUS_LABELS } from "@/types/visa";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<
  VisaRequirement["status"],
  { badge: string; glow: string; accent: string }
> = {
  visa_free: {
    badge: "bg-emerald-500/12 text-emerald-800 border-emerald-400/30",
    glow: "from-emerald-400/20",
    accent: "text-emerald-600",
  },
  visa_on_arrival: {
    badge: "bg-sky-500/12 text-sky-900 border-sky-400/30",
    glow: "from-sky-400/20",
    accent: "text-sky-600",
  },
  evisa: {
    badge: "bg-violet-500/12 text-violet-900 border-violet-400/30",
    glow: "from-violet-400/20",
    accent: "text-violet-600",
  },
  visa_required: {
    badge: "bg-amber-500/12 text-amber-900 border-amber-400/30",
    glow: "from-amber-400/20",
    accent: "text-amber-600",
  },
};

type VisaResultCardProps = {
  requirement: VisaRequirement;
};

export function VisaResultCard({ requirement }: VisaResultCardProps) {
  const { country, status } = requirement;
  const styles = STATUS_STYLES[status];

  const rows = [
    { icon: Timer, label: "Allowed stay", value: requirement.allowedStay },
    { icon: Clock, label: "Processing", value: requirement.processingTime },
    { icon: Stamp, label: "Entry type", value: requirement.entryType },
    { icon: Globe, label: "Passport validity", value: requirement.passportValidity },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <VisaGlassCard className="visa-card-pad relative overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br to-transparent blur-3xl",
            styles.glow,
          )}
          aria-hidden
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-16 w-24 overflow-hidden rounded-2xl border border-foreground/8 shadow-[0_8px_24px_rgba(15,23,42,0.1)] ring-2 ring-white">
              <Image
                src={flagUrl(country.iso2, 80)}
                alt={`${country.name} flag`}
                fill
                className="object-cover"
                sizes="96px"
                unoptimized
              />
            </div>
            <div>
              <p className="visa-section-label">Eligibility Result</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-navy sm:text-3xl">
                {country.name}
              </h2>
            </div>
          </div>

          <span
            className={cn(
              "inline-flex w-fit items-center rounded-2xl border px-5 py-2 text-sm font-semibold",
              styles.badge,
            )}
          >
            {VISA_STATUS_LABELS[status]}
          </span>
        </div>

        <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
              className="rounded-2xl border border-[var(--border)] bg-white/60 p-4"
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("h-4 w-4", styles.accent)} aria-hidden />
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/40">
                  {label}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-navy">{value}</p>
            </motion.div>
          ))}
        </div>
      </VisaGlassCard>
    </motion.article>
  );
}
