"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Shield, TrendingUp } from "lucide-react";
import type { RiskLevel } from "@/types/visa-assistant";
import { RISK_LEVEL_LABELS } from "@/types/visa-assistant";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import { cn } from "@/lib/utils";

type VisaRiskAnalysisProps = {
  level: RiskLevel;
  reasons: string[];
};

const CONFIG: Record<
  RiskLevel,
  { icon: typeof Shield; className: string; bar: string; chip: string }
> = {
  low: {
    icon: ShieldCheck,
    className: "text-emerald-800 bg-emerald-50 border-emerald-200/80",
    bar: "bg-gradient-to-r from-emerald-400 to-emerald-600",
    chip: "text-emerald-700 bg-emerald-50",
  },
  medium: {
    icon: Shield,
    className: "text-amber-900 bg-amber-50 border-amber-200/80",
    bar: "bg-gradient-to-r from-amber-400 to-amber-600",
    chip: "text-amber-800 bg-amber-50",
  },
  high: {
    icon: ShieldAlert,
    className: "text-rose-900 bg-rose-50 border-rose-200/80",
    bar: "bg-gradient-to-r from-rose-400 to-rose-600",
    chip: "text-rose-800 bg-rose-50",
  },
};

const BAR_WIDTH = { low: 28, medium: 58, high: 92 };

export function VisaRiskAnalysis({ level, reasons }: VisaRiskAnalysisProps) {
  const cfg = CONFIG[level];
  const Icon = cfg.icon;

  return (
    <VisaGlassCard className="visa-card-pad h-full">
      <p className="visa-section-label">
        <TrendingUp className="h-3.5 w-3.5" aria-hidden />
        Eligibility Insights
      </p>
      <p className="mt-2 text-sm text-foreground/55">
        AI risk assessment based on nationality, travel purpose, and document profile.
      </p>

      <div
        className={cn(
          "mt-5 inline-flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-sm font-semibold",
          cfg.className,
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
        {RISK_LEVEL_LABELS[level]} Risk
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
          <span>Risk spectrum</span>
          <span className={cfg.chip + " rounded-full px-2 py-0.5"}>{RISK_LEVEL_LABELS[level]}</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-foreground/8">
          <motion.div
            className={cn("h-full rounded-full", cfg.bar)}
            initial={{ width: 0 }}
            animate={{ width: `${BAR_WIDTH[level]}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {reasons.map((reason, i) => (
          <motion.li
            key={reason}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="flex gap-3 rounded-xl border border-[var(--border)] bg-white/55 px-4 py-3 text-sm leading-relaxed text-foreground/70"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            {reason}
          </motion.li>
        ))}
      </ul>
    </VisaGlassCard>
  );
}
