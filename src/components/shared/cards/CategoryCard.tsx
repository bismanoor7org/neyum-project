"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: LucideIcon;
  className?: string;
}

export function CategoryCard({
  title,
  description,
  image,
  href,
  icon: Icon,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "category-card-link group relative block aspect-[3/5] min-h-[280px] overflow-hidden rounded-3xl",
        className,
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        quality={92}
        className="object-cover brightness-[1.02] contrast-[1.04] saturate-[1.06]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />

      <div className="category-card-scrim absolute inset-0" aria-hidden />
      <div
        className="category-card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <div className="category-card-icon absolute left-4 top-4 z-[2] flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-navy-deep/55 backdrop-blur-md transition-all duration-500 group-hover:border-gold/60 group-hover:bg-navy-deep/75">
        <Icon className="h-[18px] w-[18px] text-gold" strokeWidth={1.5} />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
        <h3 className="category-card-title font-serif text-[1.05rem] leading-tight tracking-[-0.02em] text-white sm:text-lg">
          {title}
        </h3>
        <p className="category-card-desc mt-2 text-[11px] font-medium leading-[1.5] text-white/85 sm:text-xs">
          {description}
        </p>

        <span className="category-card-cta mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100 sm:text-[11px]">
          Explore
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}

export function CategoryCardMotion({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
