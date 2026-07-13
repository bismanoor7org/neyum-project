"use client";

import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { buildWhatsAppUrl } from "@/lib/brand-contact";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

export function StickyCTA() {
  const t = useT();
  const wa = buildWhatsAppUrl();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/15 bg-navy/96 px-3 py-3 shadow-[0_-8px_32px_rgba(15,61,62,0.25)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            ds.btnBase,
            "flex flex-1 items-center justify-center gap-1.5 border border-white/15 bg-white/5 py-3 text-[11px] font-medium text-white hover:bg-white/10",
          )}
        >
          <MessageCircle className="h-3.5 w-3.5 text-gold" />
          WhatsApp
        </a>
        <Link
          href="/contact"
          className={cn(
            ds.btnBase,
            "flex flex-1 items-center justify-center gap-1.5 border border-white/15 bg-white/5 py-3 text-[11px] font-medium text-white hover:bg-white/10",
          )}
        >
          {t.sticky.concierge}
        </Link>
        <Link
          href="/trip-planner"
          className={cn(
            ds.btnBase,
            ds.btnGold,
            "flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] font-semibold",
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t.sticky.planTrip}
        </Link>
      </div>
    </div>
  );
}
