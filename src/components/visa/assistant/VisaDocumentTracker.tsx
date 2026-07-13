"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check, FileStack } from "lucide-react";
import type { VisaDocumentId } from "@/types/visa";
import { VISA_DOCUMENT_CATALOG } from "@/types/visa";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import { cn } from "@/lib/utils";

type VisaDocumentTrackerProps = {
  required: VisaDocumentId[];
  recommended: VisaDocumentId[];
  checked: VisaDocumentId[];
  onToggle: (id: VisaDocumentId) => void;
};

export function VisaDocumentTracker({
  required,
  recommended,
  checked,
  onToggle,
}: VisaDocumentTrackerProps) {
  const checkedSet = new Set(checked);
  const allIds = [...new Set([...required, ...recommended])];
  const missing = allIds.filter((id) => !checkedSet.has(id));
  const done = allIds.length - missing.length;
  const progress = allIds.length ? Math.round((done / allIds.length) * 100) : 0;

  return (
    <VisaGlassCard className="visa-card-pad h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="visa-section-label">
            <FileStack className="h-3.5 w-3.5" aria-hidden />
            Document Checklist
          </p>
          <p className="mt-2 text-sm text-foreground/55">
            Check off documents you have ready — AI updates your confidence score instantly.
          </p>
        </div>
        <span className="rounded-full bg-gold/12 px-3 py-1 text-xs font-semibold text-gold">
          {done}/{allIds.length}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-foreground/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-1">
        {allIds.map((id, i) => {
          const isChecked = checkedSet.has(id);
          const isRequired = required.includes(id);
          const item = VISA_DOCUMENT_CATALOG[id];
          return (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                type="button"
                onClick={() => onToggle(id)}
                className={cn("visa-doc-card", isChecked && "visa-doc-card--checked")}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors",
                    isChecked ? "border-gold bg-gold text-navy" : "border-foreground/18 bg-white",
                  )}
                >
                  {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-navy">{item.label}</span>
                  <span className="text-[11px] text-foreground/45">
                    {isRequired ? "Required" : "Recommended"}
                  </span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {missing.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50 to-amber-50/50 px-4 py-3.5"
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-900">
            <AlertCircle className="h-4 w-4" aria-hidden />
            {missing.length} document{missing.length > 1 ? "s" : ""} still needed
          </p>
          <ul className="mt-2 space-y-1">
            {missing.map((id) => (
              <li key={id} className="text-sm text-amber-900/85">
                · {VISA_DOCUMENT_CATALOG[id].label}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </VisaGlassCard>
  );
}
