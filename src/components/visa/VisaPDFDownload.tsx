"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import type { VisaRequirement } from "@/types/visa";
import { VISA_DOCUMENT_CATALOG, VISA_STATUS_LABELS } from "@/types/visa";

type VisaPDFDownloadProps = {
  requirement: VisaRequirement;
};

export function VisaPDFDownload({ requirement }: VisaPDFDownloadProps) {
  const [loading, setLoading] = useState(false);

  async function download() {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const { country } = requirement;
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
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Fiji Visa Checklist", margin, 16);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Fiji Luxury Experiences — Concierge Travel Planning", margin, 24);

      y = 48;
      doc.setTextColor(15, 23, 42);
      line(`${country.name} Passport Holders`, 16, true);
      line(`Status: ${VISA_STATUS_LABELS[requirement.status]}`, 12, true);
      line(`Allowed stay: ${requirement.allowedStay}`);
      line(`Processing: ${requirement.processingTime}`);
      line(`Entry type: ${requirement.entryType}`);
      line(`Passport validity: ${requirement.passportValidity}`);

      y += 4;
      line("Required documents", 13, true);
      requirement.documents.forEach((id) => {
        const item = VISA_DOCUMENT_CATALOG[id];
        line(`☐ ${item.label}${item.description ? ` — ${item.description}` : ""}`, 10);
      });

      y += 4;
      line("Travel requirements", 13, true);
      const tr = requirement.travelRequirements;
      line(`Passport validity: ${tr.minPassportValidity}`, 10);
      if (tr.entryRestrictions) line(`Entry: ${tr.entryRestrictions}`, 10);
      if (tr.vaccination) line(`Vaccination: ${tr.vaccination}`, 10);
      if (tr.immigrationNotes) line(`Immigration: ${tr.immigrationNotes}`, 10);
      if (tr.customs) line(`Customs: ${tr.customs}`, 10);

      y += 6;
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        "Disclaimer: Information is for guidance only. Verify with Fiji Immigration before travel.",
        margin,
        285,
      );

      doc.save(`fiji-visa-checklist-${country.slug}.pdf`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-gold/20 hover:shadow-md disabled:opacity-60 sm:w-auto"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Download className="h-4 w-4" aria-hidden />
      )}
      {loading ? "Generating PDF…" : "Download Visa Checklist PDF"}
    </button>
  );
}
