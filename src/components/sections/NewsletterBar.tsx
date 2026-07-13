"use client";

import { Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { EmailField } from "@/components/shared/EmailField";
import { useLocale } from "@/components/providers/LocaleProvider";

/** Home newsletter — luxury concierge signup */
export function NewsletterBar() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-navy-deep">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,175,55,0.1) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <Container className="relative py-16 lg:py-20">
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:text-left">
          <div className="max-w-xl text-white">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              Exclusive access
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.02em] md:text-4xl">
              Luxury Fiji, delivered to your inbox
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/68">
              Resort offers, insider guides and seasonal deals — curated by our
              concierge team, never spam.
            </p>
          </div>
          <div className="w-full max-w-md lg:shrink-0">
            <EmailField
              variant="newsletter"
              className="border-white/20 bg-white/8 p-1.5 backdrop-blur-xl"
            />
            <p className="mt-3 text-xs text-white/40">{t.footer.newsletterFinePrint}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
