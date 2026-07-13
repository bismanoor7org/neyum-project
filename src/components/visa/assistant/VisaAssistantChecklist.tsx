"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Download, Loader2 } from "lucide-react";
import type { VisaAssistantAnalysis } from "@/types/visa-assistant";
import type { VisaDocumentId } from "@/types/visa";
import { VISA_STATUS_LABELS } from "@/types/visa";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import { cn } from "@/lib/utils";

type VisaAssistantChecklistProps = {
  analysis: VisaAssistantAnalysis;
  checked: VisaDocumentId[];
  onToggle: (id: VisaDocumentId) => void;
};

export function VisaAssistantChecklist({
  analysis,
  checked,
  onToggle,
}: VisaAssistantChecklistProps) {
  const [loading, setLoading] = useState(false);
  const name = analysis.intake.travelerName?.trim() || "Your";
  const checkedSet = new Set(checked);
  const done = analysis.checklistItems.filter((i) => checkedSet.has(i.id)).length;
  const progress = Math.round((done / analysis.checklistItems.length) * 100);

  async function exportPdf() {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const margin = 18;
      let y = margin;

      const line = (text: string, size = 11, bold = false) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(size);
        const lines = doc.splitTextToSize(text, 174);
        doc.text(lines, margin, y);
        y += lines.length * (size * 0.42) + 3;
      };

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 36, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(`${name}'s Fiji Travel Checklist`, margin, 16);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("AI Fiji Visa Assistant — Fiji Luxury Experiences", margin, 24);

      y = 48;
      doc.setTextColor(15, 23, 42);
      line(`${analysis.requirement.country.name} Passport Holders`, 14, true);
      line(`Status: ${VISA_STATUS_LABELS[analysis.requirement.status]}`, 11, true);
      line(`Readiness Score: ${analysis.readinessScore}/100`);
      line(`Risk Level: ${analysis.riskLevel.toUpperCase()}`);

      y += 4;
      line("Personalised Checklist", 12, true);
      analysis.checklistItems.forEach((item) => {
        const mark = checkedSet.has(item.id) ? "[x]" : "[ ]";
        line(`${mark} ${item.label}${item.required ? " (required)" : ""}`, 10);
      });

      doc.save(`fiji-checklist-${analysis.requirement.country.slug}.pdf`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <VisaGlassCard className="visa-card-pad">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="visa-section-label">
            <ClipboardList className="h-3.5 w-3.5" aria-hidden />
            Personalised Checklist
          </p>
          <h3 className="mt-2 font-serif text-xl font-semibold text-navy sm:text-2xl">
            {name}&apos;s Fiji Travel Checklist
          </h3>
          <p className="mt-1.5 text-sm text-foreground/55">
            {done} of {analysis.checklistItems.length} complete · {progress}% progress
          </p>
        </div>
        <button
          type="button"
          onClick={exportPdf}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-gold/18 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Export PDF
        </button>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-foreground/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {analysis.checklistItems.map((item, i) => {
          const isChecked = checkedSet.has(item.id);
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all",
                  isChecked
                    ? "border-gold/35 bg-gold/8 text-navy"
                    : "border-[var(--border)] bg-white/60 hover:border-gold/25",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold",
                    isChecked ? "border-gold bg-gold text-navy" : "border-foreground/20",
                  )}
                >
                  {isChecked ? "✓" : ""}
                </span>
                <span className="font-medium">{item.label}</span>
                {item.required && (
                  <span className="ml-auto text-[10px] uppercase tracking-wide text-foreground/40">
                    Required
                  </span>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </VisaGlassCard>
  );
}
