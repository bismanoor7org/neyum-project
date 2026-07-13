"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import type { TimelineMilestone } from "@/types/visa-assistant";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";

type VisaTimelineProps = {
  milestones: TimelineMilestone[];
};

export function VisaTimeline({ milestones }: VisaTimelineProps) {
  return (
    <VisaGlassCard className="visa-card-pad h-full">
      <p className="visa-section-label">
        <Calendar className="h-3.5 w-3.5" aria-hidden />
        Smart Timeline
      </p>
      <p className="mt-2 text-sm text-foreground/55">
        AI-generated preparation schedule for stress-free departure.
      </p>

      <ol className="relative mt-7 space-y-6 pl-8">
        <div className="visa-timeline-line" aria-hidden />
        {milestones.map((m, i) => (
          <motion.li
            key={m.daysBefore}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-white shadow-[0_0_0_4px_rgba(212,175,55,0.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-serif text-lg font-semibold text-navy">{m.title}</h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-navy/6 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy/60">
                <Clock className="h-3 w-3" aria-hidden />
                {m.daysBefore} days before
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {m.tasks.map((task) => (
                <li
                  key={task}
                  className="flex gap-2.5 rounded-xl border border-[var(--border)] bg-white/55 px-3.5 py-2.5 text-sm text-foreground/70"
                >
                  <span className="text-gold" aria-hidden>→</span>
                  {task}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </VisaGlassCard>
  );
}
