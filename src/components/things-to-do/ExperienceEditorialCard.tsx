"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { ThingsToDoExperience } from "@/lib/content/things-to-do-categories";
import { cn } from "@/lib/utils";
import { homeEase } from "@/components/home/home-motion";

interface ExperienceEditorialCardProps {
  experience: ThingsToDoExperience;
  cta: string;
  index?: number;
}

export function ExperienceEditorialCard({
  experience,
  cta,
  index = 0,
}: ExperienceEditorialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: homeEase }}
      className="group h-full"
    >
      <Link
        href={experience.href}
        className={cn(
          "experience-editorial-card flex h-full flex-col overflow-hidden rounded-3xl bg-white",
          "shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500",
          "hover:-translate-y-1.5 hover:shadow-[var(--shadow-editorial)]",
        )}
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/[0.08] bg-cream-muted px-3 py-1 text-[11px] font-semibold text-navy">
            <MapPin className="h-3 w-3 text-gold" strokeWidth={1.5} />
            {experience.location}
          </span>
          <h3 className="mt-4 line-clamp-2 min-h-[2.75rem] font-serif text-2xl leading-snug text-navy lg:min-h-[3.25rem] lg:text-[1.75rem]">
            {experience.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {experience.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gold transition-transform duration-300 group-hover:translate-x-1">
            {cta}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
