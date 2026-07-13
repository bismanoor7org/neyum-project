"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { siteStaggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface GuideHubCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  readMinutes?: number;
  className?: string;
}

/** Guide card — 4:4 image, same rhythm as EventModernCard */
export function GuideHubCard({
  title,
  description,
  image,
  href,
  readMinutes = 5,
  className,
}: GuideHubCardProps) {
  const t = useT();
  const imgSrc = image?.trim() ? image : images.guideFirstTrip;

  return (
    <motion.article variants={siteStaggerItem} className={cn("h-full", className)}>
      <Link
        href={href}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-xl bg-white",
          "shadow-[0_1px_12px_rgba(8,43,75,0.05)] ring-1 ring-black/[0.04]",
          "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(8,43,75,0.08)]",
        )}
      >
        <div className="relative aspect-square w-full shrink-0 overflow-hidden">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="flex items-center gap-1.5 text-xs text-foreground/50">
            <Clock className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.5} />
            {readMinutes} {t.common.minRead}
          </p>
          <h3 className="mt-1 font-serif text-[17px] leading-snug text-navy transition-colors group-hover:text-gold">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-foreground/60">
            {description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-foreground/8 pt-3">
            <span className="text-xs font-medium text-navy">{t.common.readGuide}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-navy transition-colors group-hover:bg-gold group-hover:text-white">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
