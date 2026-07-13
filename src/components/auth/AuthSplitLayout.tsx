"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Shield, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

type AuthSplitLayoutProps = {
  children: ReactNode;
  headline: string;
  subtext: string;
  trustItems?: string[];
  imageSrc?: string;
  showAdminPortal?: boolean;
  adminPortalLabel?: string;
  showVisualBrandLabel?: boolean;
  visualTone?: "dark" | "light";
};

export function AuthSplitLayout({
  children,
  headline,
  subtext,
  trustItems = [],
  imageSrc = images.resortLikuliku,
  showAdminPortal = true,
  adminPortalLabel = "Admin Portal",
  showVisualBrandLabel = true,
  visualTone = "dark",
}: AuthSplitLayoutProps) {
  return (
    <div className="auth-experience grid min-h-[100svh] lg:h-[100svh] lg:max-h-[100svh] lg:overflow-hidden lg:grid-cols-2">
      <div
        className={cn(
          "auth-split-visual relative hidden h-full min-h-0 overflow-hidden lg:block",
          visualTone === "light" && "auth-split-visual--light",
        )}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="relative z-[2] flex h-full min-h-0 flex-col justify-between p-7 xl:p-9">
          <BrandLogo variant="auth" tone="dark" className="w-fit shrink-0" priority />

          <div className="max-w-lg shrink">
            {showVisualBrandLabel && (
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                My Fiji Tour
              </p>
            )}
            <h1
              className={cn(
                "font-serif text-3xl leading-[1.08] tracking-tight text-white xl:text-4xl",
                showVisualBrandLabel ? "mt-3" : "mt-0",
              )}
            >
              {headline}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/72 xl:text-[15px]">{subtext}</p>
            {trustItems.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {trustItems.map((item) => (
                  <span key={item} className="auth-trust-pill">
                    <Shield className="h-3 w-3 text-gold" strokeWidth={2} />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="shrink-0 text-xs text-white/40">
            © Fiji Luxury Experiences — Curated island journeys
          </p>
        </div>
      </div>

      <div className="relative flex min-h-[100svh] flex-col bg-navy lg:h-full lg:min-h-0 lg:overflow-hidden">
        <div className="absolute inset-0 lg:hidden">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover opacity-35"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/88 to-navy/95" />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between px-5 py-3 sm:px-8 lg:py-4">
            <BrandLogo variant="compact" tone="dark" className="lg:hidden" />
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle variant="navy" />
              {showAdminPortal && (
                <Link href="/admin/login" className="auth-admin-portal-btn">
                  {adminPortalLabel}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 pb-4 sm:px-8 lg:overflow-hidden lg:px-10 lg:pb-5">
            <div className="auth-form-shell max-w-[440px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthGlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("auth-glass-card rounded-2xl p-5 sm:p-6 lg:p-7", className)}>
      {children}
    </div>
  );
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/12" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-inherit px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
          {label}
        </span>
      </div>
    </div>
  );
}
