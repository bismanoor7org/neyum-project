"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowCircleButton } from "@/components/shared/ArrowCircleButton";
import { siteEase } from "@/lib/motion";

interface ImageOverlayCardProps {
  image: string;
  title: string;
  description?: string;
  imageAlt?: string;
  href?: string;
  cta?: string;
  icon?: React.ReactNode;
  className?: string;
  tall?: boolean;
  /** Premium pre-footer variant — larger imagery, cinematic overlays */
  luxury?: boolean;
}

export function ImageOverlayCard({
  image,
  title,
  description,
  imageAlt,
  href = "/contact",
  cta = "Explore →",
  icon,
  className,
  tall,
  luxury = false,
}: ImageOverlayCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], luxury ? ["-8%", "8%"] : ["0%", "0%"]);

  const textContent = luxury ? (
    <>
      <div className="mb-4 h-px w-12 bg-gold/60 transition-all duration-500 group-hover:w-20" />
      <h3 className="resource-card-title font-serif text-[1.65rem] leading-tight tracking-[-0.02em] lg:text-[2rem]">
        {title}
      </h3>
      {description && (
        <p className="resource-card-desc mt-3 line-clamp-2 max-w-sm text-[15px] leading-relaxed">
          {description}
        </p>
      )}
      <span className="resource-card-cta mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-400 group-hover:gap-3">
        {cta}
      </span>
    </>
  ) : (
    <>
      <h3 className="resource-card-title font-serif text-2xl leading-tight tracking-[-0.02em] lg:text-[1.65rem]">
        {title}
      </h3>
      {description && (
        <p className="resource-card-desc mt-2 line-clamp-2 text-sm leading-relaxed">
          {description}
        </p>
      )}
      <span className="resource-card-cta mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1">
        {cta}
      </span>
    </>
  );

  if (luxury) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: siteEase }}
        whileHover={{ y: -10 }}
        className={cn(
          "group relative overflow-hidden rounded-[1.75rem]",
          "shadow-[0_8px_40px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.06)]",
          "transition-[box-shadow] duration-700 hover:shadow-[0_28px_72px_rgba(0,0,0,0.42),0_0_0_1px_rgba(212,175,55,0.18)]",
          tall ? "min-h-[480px]" : "min-h-[380px]",
          className,
        )}
      >
        <Link href={href} className="block h-full min-h-[inherit]">
          <div className="relative h-full min-h-[inherit] overflow-hidden">
            <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.12]">
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>

            <div className="resource-card-scrim resource-card-scrim--luxury absolute inset-0" aria-hidden />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.18) 0%, transparent 65%)",
              }}
            />

            {icon && (
              <div className="resource-card-icon absolute left-6 top-6 z-[2] flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-navy-deep/55 text-gold backdrop-blur-xl transition-all duration-500 group-hover:border-gold/55 group-hover:bg-navy-deep/72">
                {icon}
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-[2]">
              <div className="resource-card-text-backdrop absolute inset-0" aria-hidden />
              <div className="relative p-7 lg:p-9">{textContent}</div>
            </div>

            <ArrowCircleButton
              className="absolute bottom-7 right-7 z-[3] lg:bottom-9 lg:right-9"
              visible="hover"
            />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]",
        tall ? "min-h-[420px]" : "min-h-[300px]",
        className,
      )}
    >
      <Link href={href} className="block h-full min-h-[inherit]">
        <div className="relative h-full min-h-[inherit]">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="resource-card-scrim absolute inset-0" aria-hidden />
          {icon && (
            <div className="resource-card-icon absolute left-5 top-5 z-[2] flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-navy-deep/55 text-gold backdrop-blur-md transition-all duration-500 group-hover:border-gold/55 group-hover:bg-navy-deep/72">
              {icon}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 z-[2]">
            <div className="resource-card-text-backdrop absolute inset-0" aria-hidden />
            <div className="relative p-6 lg:p-7">{textContent}</div>
          </div>
          <ArrowCircleButton className="absolute bottom-6 right-6 z-[3]" visible="hover" />
        </div>
      </Link>
    </motion.div>
  );
}
