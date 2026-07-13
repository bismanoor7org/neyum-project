"use client";

import { ToolFaq } from "@/components/tools/world-time-weather/ToolFaq";
import { AI_VISA_ASSISTANT_FAQ } from "@/lib/visa/seo";

export function VisaAssistantFaq() {
  return (
    <div className="visa-hub-faq-wrap">
      <section className="visa-hub-faq" aria-labelledby="visa-assistant-faq-heading">
        <p className="visa-section-label visa-section-label--center">
          Common Questions
        </p>
        <h2
          id="visa-assistant-faq-heading"
          className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl"
        >
          Fiji Visa Assistant FAQ
        </h2>
        <p className="visa-hub-faq__subtitle">
          Quick answers on eligibility, readiness scoring, and how our AI consultant works.
        </p>
        <div className="visa-hub-faq__body">
          <ToolFaq items={[...AI_VISA_ASSISTANT_FAQ]} />
        </div>
      </section>
    </div>
  );
}
