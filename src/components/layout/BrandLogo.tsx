"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BRAND_HOME_HREF,
  BRAND_LOGO_FOOTER_IMAGE,
  BRAND_LOGO_IMAGE,
  BRAND_NAME,
  BRAND_WORDMARK,
} from "@/lib/brand";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

export type BrandLogoVariant = "nav" | "footer" | "sidebar" | "auth" | "compact";
export type BrandLogoTone = "light" | "dark" | "adaptive";

type BrandLogoProps = {
  /** Typographic lockup (homepage) or image asset */
  format?: "wordmark" | "image";
  variant?: BrandLogoVariant;
  tone?: BrandLogoTone;
  href?: string | null;
  showTagline?: boolean;
  className?: string;
  priority?: boolean;
};

const WORDMARK_STYLES: Record<
  BrandLogoVariant,
  { wordmark: string; tagline: string; wrapper: string }
> = {
  nav: {
    wrapper: "leading-none",
    wordmark:
      "block font-serif text-[1.2rem] font-bold tracking-[0.02em] transition-colors duration-300 sm:text-[1.28rem] lg:text-[1.32rem] xl:text-[1.38rem]",
    tagline: "mt-0.5 block text-[8px] font-bold uppercase tracking-[0.32em] text-gold",
  },
  compact: {
    wrapper: "leading-none",
    wordmark: "block font-serif text-2xl font-bold tracking-[0.04em]",
    tagline: "mt-0.5 block text-[8px] font-bold uppercase tracking-[0.28em] text-gold",
  },
  sidebar: {
    wrapper: "leading-none",
    wordmark: "block font-serif text-[1.35rem] font-bold tracking-[0.04em] text-white",
    tagline: "mt-1 block text-[8px] font-bold uppercase tracking-[0.28em] text-gold",
  },
  auth: {
    wrapper: "leading-none",
    wordmark:
      "block font-serif text-[1.65rem] font-bold tracking-[0.04em] transition-colors duration-300 sm:text-lg",
    tagline:
      "mt-0.5 block text-[8px] font-bold uppercase tracking-[0.28em] text-gold sm:text-[9px]",
  },
  footer: {
    wrapper: "inline-block leading-none",
    wordmark: "font-serif text-[1.85rem] font-bold tracking-[0.02em] sm:text-3xl",
    tagline: "mt-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-gold",
  },
};

const IMAGE_SIZES: Record<BrandLogoVariant, { width: number; height: number }> = {
  nav: { width: 512, height: 512 },
  compact: { width: 100, height: 36 },
  sidebar: { width: 132, height: 46 },
  auth: { width: 128, height: 44 },
  footer: { width: 220, height: 100 },
};

function toneWordmarkClass(tone: BrandLogoTone): string {
  if (tone === "dark") return "text-white";
  if (tone === "light") return "text-navy";
  return "text-[var(--admin-text)] group-hover:text-gold";
}

export function BrandLogo({
  format = "wordmark",
  variant = "nav",
  tone = "dark",
  href = BRAND_HOME_HREF,
  showTagline = false,
  className,
  priority = false,
}: BrandLogoProps) {
  const { t } = useLocale();
  const styles = WORDMARK_STYLES[variant];

  const content =
    format === "image" ? (
      <Image
        src={variant === "footer" ? BRAND_LOGO_FOOTER_IMAGE : BRAND_LOGO_IMAGE}
        alt={BRAND_NAME}
        width={IMAGE_SIZES[variant].width}
        height={IMAGE_SIZES[variant].height}
        priority={priority}
        className={cn("h-auto w-auto max-w-full object-contain", className)}
      />
    ) : (
      <span className={cn(styles.wrapper, className)}>
        <span
          className={cn(
            styles.wordmark,
            toneWordmarkClass(tone),
            variant === "nav" && "fiji-luxury-nav-logo-wordmark",
          )}
        >
          {BRAND_WORDMARK}
        </span>
        {showTagline && (
          <span
            className={cn(
              styles.tagline,
              variant === "nav" && "fiji-luxury-nav-logo-tagline",
            )}
          >
            {t.brand.luxuryExperiences}
          </span>
        )}
      </span>
    );

  if (href == null) return content;

  return (
    <Link
      href={href}
      className={cn("group shrink-0", format === "image" && "inline-block")}
      aria-label={`${BRAND_NAME} — Home`}
    >
      {content}
    </Link>
  );
}

/** Sidebar / dashboard chrome: logo + optional portal label */
export function DashboardBrandHeader({
  portalLabel,
  collapsed = false,
}: {
  portalLabel: string;
  collapsed?: boolean;
}) {
  return (
    <div className={cn(collapsed && "lg:hidden")}>
      <BrandLogo variant="sidebar" tone="dark" href="/" showTagline={false} />
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/90">
        {portalLabel}
      </p>
    </div>
  );
}
