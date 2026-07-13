"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { AuthNav } from "@/components/auth/AuthNav";
import { useAuth } from "@/components/auth/AuthProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NavPrimaryDropdown } from "@/components/layout/NavPrimaryDropdown";
import { NavTripPlannerCta } from "@/components/layout/NavTripPlannerCta";
import { NavTools } from "@/components/layout/NavTools";
import { NavAnimatedIndicator } from "@/components/layout/NavAnimatedIndicator";
import { NavDropdownProvider } from "@/components/layout/NavDropdownContext";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useNavDropdownState } from "@/lib/nav/use-nav-dropdown-state";
import { NAV_LINKS } from "@/lib/constants";
import { NAV_LABEL_KEYS } from "@/lib/i18n/messages";
import { getActiveNavHref } from "@/lib/nav/active-nav";
import { COMPACT_NAV_HREFS } from "@/lib/nav/compact-nav-data";
import { isToolsRoute } from "@/lib/nav/tools-nav";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

type NavbarVariant = "transparent" | "light" | "navy";

interface NavbarProps {
  variant?: NavbarVariant;
  activeHref?: string;
}

function isLinkActive(href: string, activeHref: string | undefined) {
  if (!activeHref) return false;
  if (href === activeHref) return true;
  if (href === "/guides") {
    return (
      activeHref.startsWith("/guides") ||
      ["/events", "/itineraries", "/things-to-know", "/faq"].includes(
        activeHref,
      )
    );
  }
  if (href === "/events") {
    return activeHref.startsWith("/events");
  }
  return false;
}

/** Hero zone — switch to readable bar once user leaves cinematic section */
function useHeroScroll(active: boolean) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!active) {
      setPastHero(false);
      return;
    }

    const onScroll = () => {
      const threshold = Math.min(window.innerHeight * 0.76, 788);
      setPastHero(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return pastHero;
}

export function Navbar({ variant = "light", activeHref }: NavbarProps) {
  const pathname = usePathname();
  const currentHref = activeHref ?? pathname;
  const { t } = useLocale();
  const { ready } = useAuth();

  const isTransparent = variant === "transparent";
  const pastHero = useHeroScroll(isTransparent);
  const linkColor = ds.navLinkLight;
  const iconColor = "text-navy/88";
  const chromeVariant: NavbarVariant = "light";

  const floating = isTransparent;
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navDropdown = useNavDropdownState();
  const { activeMenu, isPinned, close: closeMegaMenu, handleNavLeave } = navDropdown;
  const activeNavHref = useMemo(() => getActiveNavHref(currentHref), [currentHref]);
  const indicatorHref = hoveredNav ?? activeNavHref;

  useEffect(() => {
    if (!activeMenu || !isPinned) return;
    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      closeMegaMenu();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [activeMenu, isPinned, closeMegaMenu]);

  const navHeight = "52px";

  return (
    <header
      ref={headerRef}
      className={cn(
        "fiji-luxury-nav-shell relative z-50 w-full transition-[background,box-shadow] duration-500",
        "max-lg:overflow-hidden lg:overflow-visible",
        floating
          ? "fiji-luxury-nav-shell--float fixed inset-x-0 top-0"
          : "fiji-luxury-nav-shell--bar relative",
      )}
      style={{ "--fiji-nav-height": navHeight } as React.CSSProperties}
    >
      <NavDropdownProvider value={navDropdown}>
      <nav
        onMouseLeave={handleNavLeave}
        className={cn(
          "fiji-luxury-nav-chrome relative mx-auto w-full items-center transition-all duration-500",
          "max-lg:overflow-hidden lg:overflow-visible",
          floating
            ? cn(
                "max-lg:flex max-lg:min-h-[var(--fiji-nav-height,52px)] max-lg:items-center max-lg:justify-between max-lg:px-4 max-lg:py-0",
                "lg:grid lg:grid-cols-[minmax(10rem,1fr)_auto_minmax(10rem,1fr)] lg:gap-4 lg:px-5 xl:px-6",
                ds.navHeight,
              )
            : cn(
                "grid max-w-none grid-cols-[auto_minmax(0,1fr)_auto] gap-3 px-4 sm:px-5 lg:grid-cols-[minmax(10rem,1fr)_auto_minmax(10rem,1fr)] lg:gap-4 lg:px-8",
                ds.navHeight,
              ),
        )}
      >
        <div className="fiji-luxury-nav-logo-col relative z-20 flex h-full min-w-0 max-lg:min-w-0 max-lg:flex-1 shrink-0 items-center justify-self-start">
          <BrandLogo
            format="image"
            variant="nav"
            tone="light"
            priority
            className="fiji-luxury-nav-logo h-10 w-[7.5rem] object-cover object-center max-lg:h-9 max-lg:w-[6.75rem]"
          />
        </div>

        <div className="fiji-luxury-nav-center absolute inset-y-0 z-10 hidden min-w-0 items-center justify-center overflow-visible lg:flex">
          <LayoutGroup id="navbar-primary">
            <ul
              className="fiji-luxury-nav-primary flex h-full max-w-full items-center gap-x-1 xl:gap-x-3 2xl:gap-x-5"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link.href, currentHref);
                const label = t.nav[NAV_LABEL_KEYS[link.href] ?? "destinations"];
                const hasDropdown =
                  COMPACT_NAV_HREFS.has(link.href) && NAV_LABEL_KEYS[link.href];

                if (hasDropdown) {
                  return (
                    <NavPrimaryDropdown
                      key={link.href}
                      href={link.href}
                      label={label}
                      isActive={isActive}
                      linkColor={linkColor}
                      indicatorHref={indicatorHref}
                      onNavHover={setHoveredNav}
                    />
                  );
                }

                return (
                  <li key={link.href} className="flex shrink-0 items-center">
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredNav(link.href)}
                      className={cn(
                        ds.navLink,
                        "fiji-luxury-nav-link nav-compact-link relative inline-flex items-center whitespace-nowrap",
                        isActive ? ds.navLinkActive : linkColor,
                      )}
                    >
                      {NAV_LABEL_KEYS[link.href] ? t.nav[NAV_LABEL_KEYS[link.href]] : link.label}
                      <NavAnimatedIndicator visible={indicatorHref === link.href} />
                    </Link>
                  </li>
                );
              })}
              <NavTools
                isActive={isToolsRoute(currentHref)}
                linkColor={linkColor}
                indicatorHref={indicatorHref}
                onNavHover={setHoveredNav}
              />
            </ul>
          </LayoutGroup>
        </div>

        <div
          className={cn(
            "fiji-luxury-nav-actions relative z-20 flex h-full min-w-0 shrink-0 flex-nowrap items-center justify-end justify-self-end gap-0 lg:col-start-3",
            iconColor,
          )}
        >
          <div className="fiji-luxury-nav-actions-utilities hidden shrink-0 lg:flex">
            <LanguageSwitcher variant={chromeVariant} />
            <ThemeToggle variant={chromeVariant} />
          </div>

          {ready && (
            <div className="fiji-luxury-nav-actions-auth flex shrink-0">
              <AuthNav className="fiji-luxury-nav-auth flex" />
            </div>
          )}

          <NavTripPlannerCta className="fiji-luxury-nav-actions-primary shrink-0 max-lg:!hidden" />

          <MobileNav variant={chromeVariant} />
        </div>
      </nav>
      </NavDropdownProvider>

      {floating && pastHero && (
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
          aria-hidden
        />
      )}
    </header>
  );
}
