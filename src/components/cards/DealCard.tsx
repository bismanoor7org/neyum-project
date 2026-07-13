"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface DealCardProps {
  image: string;
  title: string;
  description: string;
  location: string;
  price: string;
  badge?: string;
  badgeClass?: string;
  href?: string;
}

export function DealCard({
  image,
  title,
  description,
  location,
  price,
  badge = "Package Deal",
  badgeClass = "bg-gold",
  href = "/contact",
}: DealCardProps) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn("overflow-hidden bg-white", ds.radiusCard, ds.shadowCard)}
    >
      <Link href={href}>
        <div className="relative aspect-[3/2]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white ${badgeClass}`}
          >
            {badge}
          </span>
          <button
            type="button"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95"
            aria-label="Add to favourites"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4 text-navy" strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-5">
          <h3 className="font-serif text-lg leading-snug text-navy">{title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/55">
            {description}
          </p>
          <div className="mt-5 flex items-end justify-between">
            <span className="flex items-center gap-1 text-xs text-foreground/45">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <div className="text-right">
              <span className="text-xs text-foreground/45">From </span>
              <span className="font-serif text-2xl font-bold text-navy">
                {price}
              </span>
              <span className="block text-xs text-foreground/45">/person</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
