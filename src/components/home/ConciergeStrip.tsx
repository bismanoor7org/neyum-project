"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

export function ConciergeStrip() {
  const t = useT();

  return (
    <section className="border-t border-gold/15 bg-navy py-6 text-white">
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <MessageCircle className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold">{t.concierge.title}</p>
              <p className="mt-0.5 text-xs text-white/55">{t.concierge.subtitle}</p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <a
              href="tel:+6790000000"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium transition-all hover:border-white/30 hover:bg-white/5"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              {t.concierge.phone}
            </a>
            <Link
              href="/contact"
              className={cn(ds.btnBase, ds.btnGold, "gap-2 px-6 py-2.5 text-xs sm:text-sm")}
            >
              {t.concierge.startPlanning}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
