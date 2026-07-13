"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  FileText,
  Plane,
  Shield,
  Syringe,
} from "lucide-react";
import type { VisaTravelRequirements } from "@/types/visa";

type VisaTravelRequirementsProps = {
  requirements: VisaTravelRequirements;
};

export function VisaTravelRequirementsPanel({
  requirements,
}: VisaTravelRequirementsProps) {
  const items = [
    {
      icon: FileText,
      title: "Minimum passport validity",
      body: requirements.minPassportValidity,
    },
    requirements.entryRestrictions && {
      icon: Plane,
      title: "Entry restrictions",
      body: requirements.entryRestrictions,
    },
    requirements.vaccination && {
      icon: Syringe,
      title: "Vaccination requirements",
      body: requirements.vaccination,
    },
    requirements.immigrationNotes && {
      icon: AlertCircle,
      title: "Immigration notes",
      body: requirements.immigrationNotes,
    },
    requirements.customs && {
      icon: Shield,
      title: "Customs information",
      body: requirements.customs,
    },
  ].filter(Boolean) as { icon: typeof FileText; title: string; body: string }[];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45 }}
      className="rounded-3xl border border-foreground/8 bg-white/80 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8"
      aria-labelledby="visa-travel-heading"
    >
      <h3 id="visa-travel-heading" className="font-serif text-xl font-semibold text-navy">
        Travel requirements
      </h3>
      <p className="mt-2 text-sm text-foreground/60">
        Essential entry, health and customs guidance for Fiji.
      </p>

      <div className="mt-6 space-y-4">
        {items.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            className="flex gap-4 rounded-2xl border border-foreground/6 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy">{title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-foreground/65">{body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
