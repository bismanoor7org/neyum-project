"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import type { ReadinessCategory } from "@/types/visa-assistant";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import { cn } from "@/lib/utils";

type VisaReadinessScoreProps = {
  score: number;
  categories: ReadinessCategory[];
};

function Ring({ score, size = 132 }: { score: number; size?: number }) {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width={size} height={size} className="visa-confidence-ring -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-foreground/8"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#visa-gold-gradient)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="visa-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gold-light)" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const STATUS_COLORS = {
  excellent: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
  good: "text-teal-800 bg-teal-50 border-teal-200/80",
  attention: "text-amber-800 bg-amber-50 border-amber-200/80",
  critical: "text-rose-800 bg-rose-50 border-rose-200/80",
};

const STATUS_LABELS = {
  excellent: "Excellent",
  good: "Good",
  attention: "Attention",
  critical: "Critical",
};

export function VisaReadinessScore({ score, categories }: VisaReadinessScoreProps) {
  const confidenceLabel =
    score >= 85 ? "High confidence" : score >= 65 ? "Moderate confidence" : "Needs attention";

  return (
    <VisaGlassCard className="visa-card-pad h-full">
      <p className="visa-section-label">
        <Gauge className="h-3.5 w-3.5" aria-hidden />
        AI Confidence Score
      </p>
      <p className="mt-2 text-sm text-foreground/55">
        Real-time travel readiness across documents, eligibility, and risk factors.
      </p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative flex shrink-0 items-center justify-center">
          <Ring score={score} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={score}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-4xl font-semibold text-navy"
            >
              {score}
            </motion.span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/45">
              / 100
            </span>
          </div>
        </div>

        <div className="w-full flex-1 space-y-3">
          <div className="rounded-xl border border-gold/20 bg-gold/6 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              {confidenceLabel}
            </p>
            <p className="mt-1 text-xs text-foreground/55">
              Score updates instantly as you check off documents.
            </p>
          </div>

          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="rounded-xl border border-[var(--border)] bg-white/60 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-navy">{cat.label}</span>
                <span
                  className={cn(
                    "visa-insight-chip border",
                    STATUS_COLORS[cat.status],
                  )}
                >
                  {STATUS_LABELS[cat.status]} · {cat.score}%
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/55">{cat.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </VisaGlassCard>
  );
}
