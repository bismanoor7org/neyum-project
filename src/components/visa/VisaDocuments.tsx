"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { VisaDocumentId } from "@/types/visa";
import { VISA_DOCUMENT_CATALOG } from "@/types/visa";

type VisaDocumentsProps = {
  documents: VisaDocumentId[];
};

export function VisaDocuments({ documents }: VisaDocumentsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45 }}
      className="rounded-3xl border border-foreground/8 bg-white/80 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8"
      aria-labelledby="visa-documents-heading"
    >
      <h3 id="visa-documents-heading" className="font-serif text-xl font-semibold text-navy">
        Required documents
      </h3>
      <p className="mt-2 text-sm text-foreground/60">
        Checklist tailored to your nationality — gather these before you travel.
      </p>

      <ul className="mt-6 space-y-3">
        {documents.map((id, i) => {
          const doc = VISA_DOCUMENT_CATALOG[id];
          return (
            <motion.li
              key={id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex gap-3 rounded-xl border border-foreground/6 bg-cream/50 px-4 py-3.5"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">{doc.label}</p>
                {doc.description && (
                  <p className="mt-0.5 text-xs leading-relaxed text-foreground/55">
                    {doc.description}
                  </p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
