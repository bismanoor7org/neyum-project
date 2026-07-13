"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { VisaCountry } from "@/types/visa";
import type { TravelDuration, TravelPurpose, VisaAssistantIntake } from "@/types/visa-assistant";
import {
  TRAVEL_DURATION_LABELS,
  TRAVEL_PURPOSE_LABELS,
} from "@/types/visa-assistant";
import { VisaCountrySelect } from "@/components/visa/VisaCountrySelect";
import { cn } from "@/lib/utils";

type VisaAssistantIntakeFormProps = {
  intake: Partial<VisaAssistantIntake>;
  onChange: (patch: Partial<VisaAssistantIntake>) => void;
  onAnalyze: () => void;
  loading?: boolean;
  error?: string | null;
  tone?: "dark" | "light";
  embedded?: boolean;
  centered?: boolean;
};

const PURPOSES: TravelPurpose[] = ["tourism", "business", "honeymoon", "family", "medical"];
const DURATIONS: TravelDuration[] = [
  "under_7_days",
  "one_to_two_weeks",
  "two_to_four_weeks",
  "one_to_three_months",
];

const REQUIRED_FIELDS = [
  { key: "nationality" as const, label: "Nationality" },
  { key: "departureCountry" as const, label: "Departure" },
  { key: "purpose" as const, label: "Purpose" },
  { key: "duration" as const, label: "Duration" },
];

function intakeProgress(intake: Partial<VisaAssistantIntake>) {
  const done = REQUIRED_FIELDS.filter((f) => Boolean(intake[f.key])).length;
  return { done, total: REQUIRED_FIELDS.length, pct: Math.round((done / REQUIRED_FIELDS.length) * 100) };
}

export function VisaAssistantIntakeForm({
  intake,
  onChange,
  onAnalyze,
  loading,
  error,
  tone = "dark",
  embedded = false,
  centered = false,
}: VisaAssistantIntakeFormProps) {
  const canAnalyze = intake.nationality && intake.departureCountry && intake.purpose && intake.duration;
  const isDark = tone === "dark";
  const progress = intakeProgress(intake);

  const fieldClass = isDark
    ? "border-white/18 bg-white/8 text-white placeholder:text-white/42 focus:border-gold/55 focus:ring-gold/20"
    : "border-navy/15 bg-white text-navy placeholder:text-navy/45 focus:border-gold/55 focus:ring-gold/20";

  const labelClass = isDark
    ? "text-white/85"
    : "text-navy/75";

  const panelClass = embedded
    ? ""
    : isDark
      ? "visa-glass-card visa-glass-card--dark visa-card-pad"
      : "visa-glass-card visa-card-pad";

  return (
    <motion.div
      initial={embedded ? undefined : { opacity: 0, y: 12 }}
      animate={embedded ? undefined : { opacity: 1, y: 0 }}
      className={panelClass}
    >
      <div
        className={cn(
          "mb-5 flex flex-wrap gap-3",
          centered ? "flex-col items-center text-center" : "items-end justify-between",
        )}
      >
        <div className={cn("min-w-0", !centered && "flex-1")}>
          <p className={cn("text-xs font-bold uppercase tracking-[0.22em]", isDark ? "text-gold" : "text-gold")}>
            Travel Profile
          </p>
          <p className={cn("mt-1 text-sm", isDark ? "text-white/80" : "text-navy/65")}>
            {canAnalyze
              ? "Profile complete — run analysis to unlock your dashboard."
              : "Start with nationality — we personalise every insight below."}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
            canAnalyze
              ? isDark
                ? "bg-gold/20 text-gold"
                : "bg-gold/15 text-gold"
              : isDark
                ? "bg-white/12 text-white/85"
                : "bg-navy/6 text-navy/70",
          )}
        >
          {progress.done}/{progress.total} required
        </span>
      </div>

      <div className="mb-6">
        <div className="visa-intake-progress" aria-hidden>
          <div className="visa-intake-progress__bar" style={{ width: `${progress.pct}%` }} />
        </div>
        <p className="sr-only">{progress.pct}% of required fields complete</p>
      </div>

      <div
        className={cn(
          "visa-intake-grid grid gap-5",
          embedded ? "visa-intake-grid--embedded" : "sm:grid-cols-2",
          centered && "visa-intake-grid--centered",
        )}
      >
        <div className="visa-intake-field sm:col-span-2">
          <label className={cn("mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]", centered ? "text-center" : "text-left", labelClass)}>
            Nationality <span className="text-gold">*</span>
          </label>
          <VisaCountrySelect
            value={intake.nationality ?? null}
            onChange={(c: VisaCountry) =>
              onChange({
                nationality: c,
                departureCountry: intake.departureCountry ?? c,
              })
            }
            tone={isDark ? "dark" : "light"}
          />
        </div>

        <div className="visa-intake-field">
          <label className={cn("mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]", centered ? "text-center" : "text-left", labelClass)}>
            Departure Country <span className="text-gold">*</span>
          </label>
          <VisaCountrySelect
            value={intake.departureCountry ?? null}
            onChange={(c: VisaCountry) => onChange({ departureCountry: c })}
            tone={isDark ? "dark" : "light"}
          />
        </div>

        <div className="visa-intake-field">
          <label className={cn("mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]", centered ? "text-center" : "text-left", labelClass)}>
            Travel Purpose <span className="text-gold">*</span>
          </label>
          <select
            value={intake.purpose ?? ""}
            onChange={(e) => onChange({ purpose: e.target.value as TravelPurpose })}
            className={cn("w-full rounded-xl border px-4 py-3.5 text-sm backdrop-blur-sm focus:outline-none focus:ring-2", fieldClass)}
          >
            <option value="" className="text-navy">
              Select purpose
            </option>
            {PURPOSES.map((p) => (
              <option key={p} value={p} className="text-navy">
                {TRAVEL_PURPOSE_LABELS[p]}
              </option>
            ))}
          </select>
        </div>

        <div className="visa-intake-field sm:col-span-2">
          <label className={cn("mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]", centered ? "text-center" : "text-left", labelClass)}>
            Travel Duration <span className="text-gold">*</span>
          </label>
          <select
            value={intake.duration ?? ""}
            onChange={(e) => onChange({ duration: e.target.value as TravelDuration })}
            className={cn("w-full rounded-xl border px-4 py-3.5 text-sm backdrop-blur-sm focus:outline-none focus:ring-2", fieldClass)}
          >
            <option value="" className="text-navy">
              Select duration
            </option>
            {DURATIONS.map((d) => (
              <option key={d} value={d} className="text-navy">
                {TRAVEL_DURATION_LABELS[d]}
              </option>
            ))}
          </select>
        </div>

        <details className="visa-intake-field sm:col-span-2 group">
          <summary
            className={cn(
              "cursor-pointer list-none text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
              isDark ? "text-white/55 hover:text-white/80" : "text-foreground/45 hover:text-foreground/65",
              "[&::-webkit-details-marker]:hidden",
              centered && "text-center",
            )}
          >
            <span className={cn("inline-flex items-center gap-2", centered && "justify-center")}>
              Optional details
              <span className="rounded-full bg-gold/12 px-2 py-0.5 text-[9px] tracking-wider text-gold">3 fields</span>
            </span>
          </summary>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={cn("mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]", centered ? "text-center" : "text-left", labelClass)}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Bisma"
                value={intake.travelerName ?? ""}
                onChange={(e) => onChange({ travelerName: e.target.value })}
                className={cn("w-full rounded-xl border px-4 py-3 text-sm backdrop-blur-sm focus:outline-none focus:ring-2", fieldClass)}
              />
            </div>

            <div>
              <label className={cn("mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]", centered ? "text-center" : "text-left", labelClass)}>
                Budget
              </label>
              <select
                value={intake.budget ?? "luxury"}
                onChange={(e) =>
                  onChange({ budget: e.target.value as VisaAssistantIntake["budget"] })
                }
                className={cn("w-full rounded-xl border px-4 py-3 text-sm backdrop-blur-sm focus:outline-none focus:ring-2", fieldClass)}
              >
                <option value="economy" className="text-navy">Economy</option>
                <option value="premium" className="text-navy">Premium</option>
                <option value="luxury" className="text-navy">Luxury</option>
              </select>
            </div>

            <div>
              <label className={cn("mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]", centered ? "text-center" : "text-left", labelClass)}>
                Travel Dates
              </label>
              <input
                type="text"
                placeholder="e.g. July 2026"
                value={intake.travelDates ?? ""}
                onChange={(e) => onChange({ travelDates: e.target.value })}
                className={cn("w-full rounded-xl border px-4 py-3 text-sm backdrop-blur-sm focus:outline-none focus:ring-2", fieldClass)}
              />
            </div>
          </div>
        </details>
      </div>

      <div className={cn("mt-6", centered && "flex justify-center")}>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!canAnalyze || loading}
          className={cn(
            "group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold transition-all sm:w-auto",
            "bg-gold text-navy shadow-[0_12px_40px_rgba(212,175,55,0.35)] hover:brightness-105 hover:shadow-[0_16px_48px_rgba(212,175,55,0.42)]",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
          )}
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          {loading ? "Analysing…" : canAnalyze ? "Run AI Visa Analysis" : "Complete required fields"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>

      {error && (
        <p className={cn("visa-intake-error", centered && "text-center")} role="alert">
          {error}
        </p>
      )}
    </motion.div>
  );
}
