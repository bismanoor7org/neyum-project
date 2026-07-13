"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ClipboardList } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileCompactAccordion } from "@/components/layout/MobileCompactAccordion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { NAV_LINKS } from "@/lib/constants";
import { NAV_LABEL_KEYS } from "@/lib/i18n/messages";
import { COMPACT_NAV_HREFS, getLocalizedCompactNavConfig } from "@/lib/nav/compact-nav-data";
import { trackVisaCheckerNavClick } from "@/lib/analytics/visa-track";
import { AI_VISA_ASSISTANT_HREF, TOOLS_HREF, TOOLS_NAV_DROPDOWN } from "@/lib/nav/tools-nav";
import { cn } from "@/lib/utils";
import { TRIP_PLANNER_HREF } from "@/lib/nav/trip-planner-nav";
import { ds } from "@/lib/design-system";

type MobileNavProps = {
  variant?: "transparent" | "light" | "navy";
};

export function MobileNav({ variant = "light" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const { t } = useLocale();
  const { theme: colorTheme } = useTheme();
  const isDark = variant === "transparent" || variant === "navy" || colorTheme === "dark";

  const closeMenu = () => {
    setOpen(false);
    setExpandedNav(null);
  };

  const toolsItems = TOOLS_NAV_DROPDOWN.map((item) => ({
    icon: item.icon !== "ai-badge" ? item.icon : ClipboardList,
    label: t.nav[item.labelKey],
    description: t.nav[item.descriptionKey],
    href: item.href,
    iconVariant: item.icon === "ai-badge" ? ("ai" as const) : ("default" as const),
  }));

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="fiji-luxury-nav-mobile-only relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "fiji-nav-icon-btn fiji-nav-menu-btn flex items-center justify-center transition-all",
          isDark ? "text-white hover:text-gold" : "text-navy hover:text-gold",
        )}
        aria-label={open ? t.common.closeMenu : t.common.openMenu}
        aria-expanded={open}
      >
        {open ? <X className="h-4 w-4" strokeWidth={1.75} /> : <Menu className="h-4 w-4" strokeWidth={1.75} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fiji-mobile-nav-backdrop fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm"
              onClick={closeMenu}
              aria-label={t.common.closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fiji-mobile-nav-panel booking-scroll fixed z-50 max-h-[min(78vh,640px)] overflow-y-auto rounded-2xl border",
                "top-[var(--fiji-nav-height,64px)]",
                isDark
                  ? "glass-panel-dark border-white/12"
                  : "glass-panel border-foreground/8 bg-[var(--card-elevated)]/95",
              )}
            >
              <nav className="px-4 py-5">
                <div className="mb-4 flex items-center justify-end gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <ThemeToggle variant={variant} />
                    <LanguageSwitcher variant={variant} />
                  </div>
                </div>
                <ul className="space-y-2">
                  {NAV_LINKS.map((link) => {
                    const label = t.nav[NAV_LABEL_KEYS[link.href]];
                    const hasDropdown =
                      COMPACT_NAV_HREFS.has(link.href) && NAV_LABEL_KEYS[link.href];
                    const config = hasDropdown ? getLocalizedCompactNavConfig(link.href, t) : null;

                    return (
                      <li key={link.href}>
                        {config ? (
                          <MobileCompactAccordion
                            href={link.href}
                            label={label}
                            items={config.items.map((item) => ({
                              icon: item.icon,
                              label: item.label,
                              description: item.description,
                              href: item.href,
                            }))}
                            isDark={isDark}
                            isOpen={expandedNav === link.href}
                            onToggle={() =>
                              setExpandedNav(expandedNav === link.href ? null : link.href)
                            }
                            onNavigate={closeMenu}
                            viewAllLabel={`${t.common.viewAll} →`}
                          />
                        ) : (
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className={cn(
                              "fiji-mobile-nav-link block rounded-xl px-4 py-3 text-[13px] font-medium transition-colors",
                              isDark
                                ? "text-white/90 hover:bg-white/8 hover:text-gold"
                                : "text-foreground hover:bg-cream-muted hover:text-teal",
                            )}
                          >
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                  <li>
                    <MobileCompactAccordion
                      href={TOOLS_HREF}
                      label={t.nav.tools}
                      items={toolsItems}
                      isDark={isDark}
                      isOpen={expandedNav === TOOLS_HREF}
                      onToggle={() =>
                        setExpandedNav(
                          expandedNav === TOOLS_HREF ? null : TOOLS_HREF,
                        )
                      }
                      onNavigate={closeMenu}
                      onItemClick={(href) => trackVisaCheckerNavClick("mobile_nav", href)}
                      viewAllLabel={`${t.common.viewAll} ${t.nav.tools} →`}
                    />
                  </li>
                  <li className="pt-2">
                    <Link
                      href={AI_VISA_ASSISTANT_HREF}
                      onClick={() => {
                        trackVisaCheckerNavClick("nav_cta", AI_VISA_ASSISTANT_HREF);
                        closeMenu();
                      }}
                      className={cn(ds.btnBase, "nav-visa-cta-mobile block w-full py-3.5 text-center")}
                    >
                      {t.nav.checkVisa}
                    </Link>
                  </li>
                  <li className="pt-2">
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className={cn(
                        "fiji-mobile-nav-link block rounded-xl px-4 py-3 text-[13px] font-medium",
                        isDark ? "text-white/75 hover:bg-white/8" : "text-navy hover:bg-cream-muted",
                      )}
                    >
                      {t.nav.contact}
                    </Link>
                  </li>
                  <li className="pt-3">
                    <Link
                      href={TRIP_PLANNER_HREF}
                      onClick={closeMenu}
                      className={cn(ds.btnBase, ds.btnGold, "block w-full py-3.5 text-center")}
                    >
                      {t.journeyPlanner.planCta}
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
