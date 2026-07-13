"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { FOOTER_EXPLORE, FOOTER_SUPPORT } from "@/lib/constants";
import { Container } from "@/components/shared/Container";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Messages } from "@/lib/i18n/en";

type NavKey = keyof Messages["nav"];
type FooterKey = keyof Messages["footer"];

const FOOTER_EXPLORE_KEYS: Record<string, NavKey> = {
  "/explore": "exploreWorld",
  "/destinations": "destinations",
  "/tours": "experiences",
  "/places-to-go": "destinations",
  "/things-to-do": "experiences",
  "/places-to-stay": "placesToStay",
  "/guides": "guides",
  "/deals-and-offers": "deals",
  "/about": "about",
};

const FOOTER_SUPPORT_KEYS: Record<string, FooterKey | NavKey> = {
  Login: "login",
  "Contact Us": "contactUs",
  Sitemap: "sitemap",
  "Privacy Statement": "privacy",
  "Travel Advisory": "travelAdvisory",
};

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

function footerSupportLabel(label: string, t: Messages): string {
  const key = FOOTER_SUPPORT_KEYS[label];
  if (!key) return label;
  if (key === "login") return t.nav.login;
  return t.footer[key as FooterKey];
}

const AWARDS = ["award1", "award2", "award3"] as const;

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/fijime", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/fiji/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.youtube.com/user/fijime", label: "YouTube", Icon: YoutubeIcon },
  { href: "https://www.pinterest.com/fijime/", label: "Pinterest", Icon: PinterestIcon },
  { href: "https://www.tiktok.com/@fiji", label: "TikTok", Icon: TikTokIcon },
] as const;

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 15% 90%, rgba(212,175,55,0.1) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 10%, rgba(10,110,110,0.06) 0%, transparent 50%)",
        }}
      />

      <Container className="relative py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-span-5">
            <BrandLogo variant="footer" tone="dark" />
            <p className="mt-8 max-w-md text-base leading-[1.8] text-white/68">
              {t.footer.blurb}
            </p>

            <div className="mt-10">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                {t.footer.awards}
              </p>
              <div className="flex flex-wrap gap-3">
                {AWARDS.map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-sm transition-colors hover:border-gold/25 hover:bg-white/[0.06]"
                  >
                    <Trophy className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                    <span className="text-xs tracking-wide text-white/72">{t.footer[key]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition-all duration-300 hover:border-gold/45 hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                {t.footer.explore}
              </h3>
              <ul className="space-y-4">
                {FOOTER_EXPLORE.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/60 transition-colors duration-300 hover:text-white"
                    >
                      {t.nav[FOOTER_EXPLORE_KEYS[link.href] ?? "destinations"]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                {t.footer.helpSupport}
              </h3>
              <ul className="space-y-4">
                {FOOTER_SUPPORT.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/60 transition-colors duration-300 hover:text-white"
                    >
                      {footerSupportLabel(link.label, t)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/[0.07] pt-10 text-[13px] text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p className="tracking-wide">{t.footer.copyright}</p>
          <p className="leading-relaxed">
            {t.footer.otherSites}{" "}
            <a
              href="https://www.fiji.travel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/65 transition-colors hover:text-gold"
            >
              {t.footer.corporateSite}
            </a>{" "}
            <span className="text-white/25">|</span>{" "}
            <Link href="/contact" className="text-white/65 transition-colors hover:text-gold">
              {t.footer.businessEvents}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
