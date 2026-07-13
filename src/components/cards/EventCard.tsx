"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  location: string;
  day: string;
  month: string;
  year: string;
  category: string;
  href?: string;
}

export function EventCard({
  image,
  title,
  description,
  location,
  day,
  month,
  year,
  category,
  href = "/contact",
}: EventCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-xl bg-white shadow-sm"
    >
      <Link href={href}>
        <div className="relative aspect-[16/10]">
          <Image src={image} alt={title} fill className="object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs text-navy">
            {category}
          </span>
          <button
            type="button"
            className="absolute right-3 top-3 text-white"
            aria-label="Favourite"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex gap-4 p-5">
          <div className="shrink-0 text-center">
            <p className="font-serif text-2xl text-navy">{day}</p>
            <p className="text-xs font-semibold uppercase text-gold">{month}</p>
            <p className="text-xs text-foreground/50">{year}</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-navy">{title}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-foreground/50">
              <MapPin className="h-3 w-3" />
              {location}
            </p>
            <p className="mt-2 line-clamp-2 text-sm text-foreground/60">
              {description}
            </p>
            <span className="mt-2 inline-block text-sm text-gold">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
