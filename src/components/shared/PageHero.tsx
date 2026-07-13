"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

export interface PageHeroBreadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: PageHeroBreadcrumb[];
  children?: React.ReactNode;
  align?: "left" | "center";
  minHeight?: string;
  overlay?: "default" | "strong" | "light";
  /** `plain` — cream background with navy/gold theme typography (no photo) */
  variant?: "image" | "plain";
}

/** Cinematic inner-page hero — reuse on every hub & utility page */
export function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  children,
  align = "left",
  minHeight = "min-h-[52vh] lg:min-h-[58vh]",
  overlay = "default",
  variant = "image",
}: PageHeroProps) {
  const centered = align === "center";
  const plain = variant === "plain";

  const overlayClass =
    overlay === "strong"
      ? "from-navy/95 via-navy/65 to-navy/30"
      : overlay === "light"
        ? "from-navy/70 via-navy/40 to-navy/15"
        : "from-navy/90 via-navy/55 to-navy/20";

  const sectionMinHeight = plain ? undefined : minHeight;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        sectionMinHeight,
        plain && "border-b border-navy/8 bg-cream",
      )}
    >
      {!plain && image && (
        <>
          <Image src={image} alt={imageAlt || title} fill priority className="object-cover" sizes="100vw" />
          <div className={cn("absolute inset-0 bg-gradient-to-r", overlayClass)} />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/15" />
        </>
      )}

      <div
        className={cn(
          "relative mx-auto flex max-w-[84rem] flex-col px-6 lg:px-10",
          plain
            ? "pt-4 pb-8 lg:pt-6 lg:pb-10"
            : cn("justify-end pb-14 pt-32 lg:pb-18 lg:pt-36", minHeight),
          centered && "items-center text-center",
        )}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "mb-6 flex flex-wrap items-center gap-2 text-xs",
              plain ? "text-navy/45" : "text-white/50",
              centered && "justify-center",
            )}
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-2">
                {i > 0 && <span className={plain ? "text-navy/25" : "text-white/25"}>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-gold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={plain ? "text-navy/70" : "text-white/70"}>{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow-gold"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            ds.headingPage,
            eyebrow ? "mt-3 lg:text-[3.25rem]" : "lg:text-[3.25rem]",
            !plain && "text-white",
            centered && "max-w-3xl",
          )}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "mt-5 max-w-xl text-[15px] leading-relaxed",
              plain ? "text-foreground/65" : "text-white/80",
              centered && "mx-auto max-w-2xl",
            )}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn("mt-8", centered && "flex justify-center")}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
