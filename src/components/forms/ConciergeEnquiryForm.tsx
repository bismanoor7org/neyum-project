"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import type { BookingTab, EnquirySource } from "@/lib/enquiry/types";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type ConciergeEnquiryFormProps = {
  source?: EnquirySource;
  bookingTab?: BookingTab | null;
  defaultMessage?: string;
  className?: string;
};

const fieldClass =
  "w-full rounded-xl border border-foreground/10 bg-white px-4 py-3.5 text-sm text-navy shadow-sm transition-all placeholder:text-foreground/40 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/15";

export function ConciergeEnquiryForm({
  source = "contact",
  bookingTab = null,
  defaultMessage = "",
  className,
}: ConciergeEnquiryFormProps) {
  const { locale } = useLocale();
  const t = useT();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const initialMessage = useMemo(() => defaultMessage, [defaultMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          message: formData.get("message"),
          locale,
          source,
          bookingTab: bookingTab ?? undefined,
        }),
      });

      if (!response.ok) throw new Error("Enquiry failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-foreground/8 bg-white p-7 shadow-[var(--shadow-card)] lg:p-8",
        className,
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          placeholder={t.contact.firstName}
          className={fieldClass}
        />
        <input
          name="lastName"
          type="text"
          required
          autoComplete="family-name"
          placeholder={t.contact.lastName}
          className={fieldClass}
        />
      </div>
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={t.contact.emailAddress}
        className={cn(fieldClass, "mt-4")}
      />
      <textarea
        name="message"
        required
        minLength={10}
        rows={5}
        defaultValue={initialMessage}
        placeholder={t.contact.dreamEscape}
        className={cn(fieldClass, "mt-4 resize-none")}
      />
      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className={cn(
          ds.btnBase,
          ds.btnGold,
          "mt-6 w-full gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-70",
        )}
      >
        <Send className="h-4 w-4" />
        {status === "sending" ? t.forms.sending : t.forms.sendEnquiry}
      </button>

      {status === "success" && (
        <p className="mt-4 rounded-xl border border-gold/30 bg-gold/8 px-4 py-3 text-sm text-navy">
          {t.forms.enquirySuccess}
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {t.forms.enquiryError}
        </p>
      )}
    </form>
  );
}
