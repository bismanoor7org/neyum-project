"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Send } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { VisaRequirement } from "@/types/visa";
import { VISA_STATUS_LABELS } from "@/types/visa";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";

type LeadFormProps = {
  requirement?: VisaRequirement | null;
};

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/95 px-4 py-3.5 text-sm text-navy shadow-sm transition-all placeholder:text-foreground/40 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/15";

export function LeadForm({ requirement }: LeadFormProps) {
  const { locale } = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const whatsapp = String(fd.get("whatsapp") ?? "").trim();

    const [firstName, ...rest] = name.split(/\s+/);
    const lastName = rest.join(" ") || firstName;

    const visaContext = requirement
      ? `Nationality: ${requirement.country.name}. Visa status: ${VISA_STATUS_LABELS[requirement.status]}. Allowed stay: ${requirement.allowedStay}.`
      : "Visa checker — general Fiji trip enquiry.";

    const message = [
      "Custom Fiji travel plan request (Visa Checker).",
      visaContext,
      whatsapp ? `WhatsApp: ${whatsapp}` : null,
      "Please share a bespoke itinerary and resort recommendations.",
    ]
      .filter(Boolean)
      .join(" ");

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
          locale,
          source: "visa-checker",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <VisaGlassCard
      variant="navy"
      className="relative mx-auto w-full max-w-xl overflow-hidden visa-card-pad"
      delay={0.1}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
          Planning a Fiji Trip?
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/72">
          Our luxury travel concierge will craft a bespoke itinerary — resorts, transfers, and
          experiences tailored to your nationality and visa pathway.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="sr-only">Full name</span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email address"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">WhatsApp</span>
            <input
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              placeholder="WhatsApp (optional)"
              className={fieldClass}
            />
          </label>
          <div className="flex justify-center sm:col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-gold px-10 py-3.5 text-sm font-semibold tracking-wide text-navy shadow-[0_6px_28px_rgba(212,175,55,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(212,175,55,0.45)] disabled:opacity-60 sm:w-auto sm:min-w-[300px]"
            >
              <Send className="h-4 w-4" aria-hidden />
              {status === "sending" ? "Sending…" : "Get My Custom Fiji Travel Plan"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
          </div>
          {status === "success" && (
            <p className="text-sm text-emerald-300 sm:col-span-2" role="status">
              Thank you — a Fiji concierge will contact you within one business day.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-300 sm:col-span-2" role="alert">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
        </form>
      </div>
    </VisaGlassCard>
  );
}
