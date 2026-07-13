"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/brand-contact";
import { cn } from "@/lib/utils";

export function ConciergeFab({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/supplier")) return null;

  const wa = buildWhatsAppUrl();

  return (
    <div
      className={cn(
        "fixed bottom-[5.25rem] right-4 z-[45] flex flex-col items-end gap-2 lg:bottom-6 lg:right-6",
        className,
      )}
    >
      {open && (
        <div className="mb-1 w-64 overflow-hidden rounded-2xl border border-gold/25 bg-navy text-white shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="font-serif text-lg">Concierge</p>
            <p className="text-xs text-white/65">Private planning · reply within hours</p>
          </div>
          <div className="flex flex-col p-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-3 py-2.5 text-sm hover:bg-white/10"
            >
              WhatsApp concierge
            </a>
            <Link
              href="/contact"
              className="rounded-xl px-3 py-2.5 text-sm hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Concierge enquiry form
            </Link>
            <Link
              href="/trip-planner"
              className="rounded-xl px-3 py-2.5 text-sm hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Build an itinerary
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close concierge" : "Open concierge"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition",
          "bg-gold text-navy hover:bg-[#d4b45a]",
          open && "bg-navy text-gold ring-2 ring-gold/40",
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
