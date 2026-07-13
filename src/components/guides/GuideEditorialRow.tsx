"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

interface GuideEditorialRowProps {
  title: string;
  description: string;
  href: string;
  readMinutes?: number;
  className?: string;
}

/** Text-first guide link — no imagery, editorial hierarchy */
export function GuideEditorialRow({
  title,
  description,
  href,
  readMinutes = 5,
  className,
}: GuideEditorialRowProps) {
  const t = useT();

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-start justify-between gap-6 border-b border-foreground/8 py-7 transition-colors last:border-b-0",
        "hover:border-gold/25",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
          {readMinutes} {t.common.minRead}
        </p>
        <h3 className="mt-2 font-serif text-xl leading-snug tracking-[-0.01em] text-navy transition-colors group-hover:text-gold md:text-[1.35rem]">
          {title}
        </h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-foreground/55">
          {description}
        </p>
      </div>
      <span
        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-navy transition-all group-hover:border-gold/40 group-hover:bg-gold group-hover:text-white"
        aria-hidden
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </Link>
  );
}
