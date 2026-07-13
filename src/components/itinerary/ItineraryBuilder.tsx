"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Plus, Sparkles, Trash2 } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/brand-contact";
import {
  createEmptyDay,
  DEFAULT_ITINERARY,
  formatItineraryMessage,
  ITINERARY_STORAGE_KEY,
  type ItineraryDay,
  type ItineraryDraft,
} from "@/lib/itinerary/types";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

function loadDraft(): ItineraryDraft {
  if (typeof window === "undefined") return DEFAULT_ITINERARY;
  try {
    const raw = localStorage.getItem(ITINERARY_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_ITINERARY, days: DEFAULT_ITINERARY.days.map((d, i) => ({ ...d, id: createEmptyDay(i + 1).id })) };
    return { ...DEFAULT_ITINERARY, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ITINERARY;
  }
}

export function ItineraryBuilder({ className }: { className?: string }) {
  const [draft, setDraft] = useState<ItineraryDraft>(DEFAULT_ITINERARY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDraft(loadDraft());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        ITINERARY_STORAGE_KEY,
        JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
  }, [draft, hydrated]);

  const message = useMemo(() => formatItineraryMessage(draft), [draft]);
  const contactHref = `/contact?source=journey&message=${encodeURIComponent(message)}`;
  const waHref = buildWhatsAppUrl(message);

  function updateDay(id: string, patch: Partial<ItineraryDay>) {
    setDraft((d) => ({
      ...d,
      days: d.days.map((day) => (day.id === id ? { ...day, ...patch } : day)),
    }));
  }

  function addDay() {
    setDraft((d) => ({
      ...d,
      days: [...d.days, createEmptyDay(d.days.length + 1)],
    }));
  }

  function removeDay(id: string) {
    setDraft((d) => ({
      ...d,
      days: d.days.length <= 1 ? d.days : d.days.filter((day) => day.id !== id),
    }));
  }

  function downloadTxt() {
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${draft.tripName.replace(/\s+/g, "-").toLowerCase() || "fiji-itinerary"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className={cn("relative overflow-hidden bg-[#f7f3eb]", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,164,78,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
            Itinerary studio
          </p>
          <h1 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
            Build your Fiji days
          </h1>
          <p className="mt-3 text-base text-navy/65">
            Outline each day — islands, experiences, stays — then send it to our concierge for a
            polished luxury proposal. Saved on this device.
          </p>
        </motion.div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-navy/50">Trip name</span>
            <input
              className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm outline-none ring-gold/30 focus:ring-2"
              value={draft.tripName}
              onChange={(e) => setDraft((d) => ({ ...d, tripName: e.target.value }))}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-navy/50">Travelers</span>
            <input
              className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm outline-none ring-gold/30 focus:ring-2"
              value={draft.travellers}
              onChange={(e) => setDraft((d) => ({ ...d, travellers: e.target.value }))}
              placeholder="2 adults"
            />
          </label>
        </div>

        <div className="space-y-4">
          {draft.days.map((day, index) => (
            <motion.article
              key={day.id}
              layout
              className="rounded-2xl border border-navy/8 bg-white/90 p-5 shadow-sm backdrop-blur"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    Day {index + 1}
                  </p>
                  <input
                    className="w-full border-0 bg-transparent font-serif text-2xl text-navy outline-none"
                    value={day.title}
                    onChange={(e) => updateDay(day.id, { title: e.target.value })}
                    placeholder={`Day ${index + 1} title`}
                  />
                </div>
                <button
                  type="button"
                  aria-label="Remove day"
                  onClick={() => removeDay(day.id)}
                  className="rounded-lg p-2 text-navy/35 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="block space-y-1">
                  <span className="text-[11px] font-medium text-navy/45">Island / area</span>
                  <input
                    className="w-full rounded-lg border border-navy/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold/30"
                    value={day.location}
                    onChange={(e) => updateDay(day.id, { location: e.target.value })}
                    placeholder="Yasawa, Mamanuca…"
                  />
                </label>
                <label className="block space-y-1 sm:col-span-2">
                  <span className="text-[11px] font-medium text-navy/45">Stay</span>
                  <input
                    className="w-full rounded-lg border border-navy/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold/30"
                    value={day.stay}
                    onChange={(e) => updateDay(day.id, { stay: e.target.value })}
                    placeholder="Overwater villa, private island…"
                  />
                </label>
                <label className="block space-y-1 sm:col-span-3">
                  <span className="text-[11px] font-medium text-navy/45">Experiences</span>
                  <textarea
                    className="min-h-[4.5rem] w-full rounded-lg border border-navy/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold/30"
                    value={day.activities}
                    onChange={(e) => updateDay(day.id, { activities: e.target.value })}
                    placeholder="Private snorkel, village visit, sunset sail…"
                  />
                </label>
              </div>
            </motion.article>
          ))}
        </div>

        <button
          type="button"
          onClick={addDay}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-navy/20 px-4 py-3 text-sm font-medium text-navy/70 hover:border-gold/40 hover:text-navy"
        >
          <Plus className="h-4 w-4 text-gold" />
          Add another day
        </button>

        <label className="mt-6 block space-y-1.5">
          <span className="text-xs font-medium text-navy/50">Notes for concierge</span>
          <textarea
            className="min-h-24 w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm outline-none ring-gold/30 focus:ring-2"
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
            placeholder="Honeymoon, dietary needs, preferred pace…"
          />
        </label>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={contactHref}
            className={cn(ds.btnBase, ds.btnGold, "inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold")}
          >
            <Sparkles className="h-4 w-4" />
            Send to concierge
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              ds.btnBase,
              "inline-flex items-center gap-2 border border-navy/15 bg-white px-5 py-3 text-sm font-medium text-navy hover:bg-navy/5",
            )}
          >
            WhatsApp outline
          </a>
          <button
            type="button"
            onClick={downloadTxt}
            className={cn(
              ds.btnBase,
              "inline-flex items-center gap-2 border border-navy/15 bg-transparent px-5 py-3 text-sm font-medium text-navy/70 hover:bg-white",
            )}
          >
            <Download className="h-4 w-4" />
            Download outline
          </button>
        </div>
      </div>
    </section>
  );
}
