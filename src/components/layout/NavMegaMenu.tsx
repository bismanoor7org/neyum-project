"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  BedDouble,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Compass,
  Map,
  Palmtree,
  Shirt,
  Sparkles,
  Tag,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { NavAnimatedIndicator } from "@/components/layout/NavAnimatedIndicator";
import { useNavDropdown } from "@/components/layout/NavDropdownContext";
import { useLocale } from "@/components/providers/LocaleProvider";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import type { Messages } from "@/lib/i18n/en";
import {
  getMegaMenuConfig,
  type MegaMenuCategory,
  type MegaMenuFeatured,
  type MegaMenuHero,
  type MegaMenuSpotlight,
} from "@/lib/nav/mega-menu-data";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

type NavMegaMenuProps = {
  href: string;
  label: string;
  isActive: boolean;
  linkColor: string;
  indicatorHref: string | null;
  onNavHover: (href: string) => void;
};

type NavMegaMenuPanelProps = {
  href: string;
  onClose: () => void;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  menuId?: string;
};

function categoryLabel(category: MegaMenuCategory, t: Messages): string {
  if (category.id.startsWith("filter")) {
    const key = category.id as keyof Messages["experiences"];
    if (key in t.experiences && typeof t.experiences[key] === "string") {
      return t.experiences[key] as string;
    }
  }
  return category.label;
}

function resolveCategoryIcon(cat: MegaMenuCategory, menuHref: string): LucideIcon {
  if (cat.id === "tabs") return BookOpen;
  if (cat.id === "mainland") return Map;
  if (cat.id === "islands") return Waves;
  if (cat.id === "collections") return BedDouble;
  if (cat.id === "resorts") return Sparkles;
  const label = cat.label.toLowerCase();
  if (label === "planning") return Calendar;
  if (label === "style") return Shirt;
  if (label === "activities") return Palmtree;
  if (menuHref === "/deals-and-offers") return Tag;
  if (menuHref === CMS_ROUTES.tours.index) return Compass;
  return Compass;
}

function viewAllLabel(href: string, t: Messages): string {
  switch (href) {
    case CMS_ROUTES.guides.index:
      return `${t.common.viewAll} ${t.nav.guides} →`;
    case CMS_ROUTES.destinations.index:
      return `${t.common.allDestinations} →`;
    case CMS_ROUTES.tours.index:
      return `${t.common.viewAllExperiences} →`;
    case "/places-to-stay":
      return `${t.common.viewAllStays} →`;
    case "/deals-and-offers":
      return `${t.common.allDeals} →`;
    default:
      return `${t.common.viewAll} →`;
  }
}

function spotlightLabel(card: MegaMenuSpotlight, t: Messages): string {
  const map: Record<string, string> = {
    "Top Experiences": t.navMega.shared.topExperiences,
    "Best Deals": t.navMega.shared.bestDeals,
    "New Destinations": t.navMega.shared.newDestinations,
  };
  return map[card.label] ?? card.label;
}

type MegaMenuPanelContentProps = {
  href: string;
  hero: MegaMenuHero;
  categories: MegaMenuCategory[];
  spotlights: MegaMenuSpotlight[];
  featured: MegaMenuFeatured[];
  onClose: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
  t: Messages;
  layout?: "desktop" | "mobile";
  menuId?: string;
};

function MegaMenuHeroCard({
  hero,
  onClose,
  t,
}: {
  hero: MegaMenuHero;
  onClose: () => void;
  t: Messages;
}) {
  return (
    <Link
      href={hero.href}
      onClick={onClose}
      className="nav-mega-premium-hero-card group"
    >
      <div className="nav-mega-premium-hero-image">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          sizes="(min-width: 1024px) 340px, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="nav-mega-premium-hero-content">
        <h3 className="nav-mega-premium-hero-title">{hero.title}</h3>
        <p className="nav-mega-premium-hero-desc">{hero.description}</p>
        <span className="nav-mega-premium-hero-cta">
          {hero.ctaLabel ?? t.common.explore}
          <ChevronRight className="nav-mega-premium-hero-cta-icon" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function MegaMenuSpotlightCards({
  spotlights,
  onClose,
  t,
}: {
  spotlights: MegaMenuSpotlight[];
  onClose: () => void;
  t: Messages;
}) {
  return (
    <div className="nav-mega-premium-spotlights">
      {spotlights.map((card) => (
        <Link
          key={card.href + card.label}
          href={card.href}
          onClick={onClose}
          className="nav-mega-premium-spotlight group"
        >
          {card.image && (
            <div className="nav-mega-premium-spotlight-image">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="200px"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </div>
          )}
          <div className="nav-mega-premium-spotlight-body">
            <span className="nav-mega-premium-spotlight-label">
              {spotlightLabel(card, t)}
            </span>
            <span className="nav-mega-premium-spotlight-title">{card.title}</span>
          </div>
          <ChevronRight
            className="nav-mega-premium-spotlight-arrow"
            strokeWidth={1.75}
            aria-hidden
          />
        </Link>
      ))}
    </div>
  );
}

export function MegaMenuPanelContent({
  href,
  hero,
  categories,
  spotlights,
  featured,
  onClose,
  panelRef,
  t,
  layout = "desktop",
  menuId,
}: MegaMenuPanelContentProps) {
  const isMobile = layout === "mobile";

  if (isMobile) {
    const current = categories[0];
    return (
      <div
        ref={panelRef}
        className="nav-mega-panel-inner nav-mega-panel-inner--legacy overflow-hidden rounded-xl"
      >
        <div className="nav-mega-grid grid grid-cols-1">
          <div className="nav-mega-col nav-mega-sidebar border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
            <p className="nav-mega-eyebrow nav-mega-eyebrow--column">Categories</p>
            <ul className="nav-mega-cat-list space-y-1.5">
              {categories.map((cat, i) => {
                const Icon = resolveCategoryIcon(cat, href);
                const isCatActive = i === 0;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={cn(
                        "nav-mega-cat-btn flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] font-medium transition-colors",
                        isCatActive
                          ? "nav-mega-cat-btn--active"
                          : "text-white/72 hover:bg-white/[0.06] hover:text-white",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-gold/85" strokeWidth={1.5} />
                      <span className="min-w-0 flex-1">{categoryLabel(cat, t)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <Link
              href={href}
              onClick={onClose}
              className="nav-mega-footer-link mt-6 block px-3.5 text-xs font-semibold text-gold"
            >
              {viewAllLabel(href, t)}
            </Link>
          </div>

          <div className="nav-mega-col nav-mega-links border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
            <p className="nav-mega-eyebrow nav-mega-eyebrow--column">
              {current ? categoryLabel(current, t) : "Explore"}
            </p>
            <ul className="nav-mega-link-grid grid grid-cols-1 gap-1.5">
              {current?.items.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="nav-mega-nav-link group flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 transition-colors"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="nav-mega-nav-link-title block text-[13px] font-medium text-white group-hover:text-gold">
                        {item.label}
                      </span>
                    </span>
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-white/28 transition-colors group-hover:text-gold"
                      strokeWidth={1.75}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-mega-col nav-mega-featured">
            <div className="nav-mega-featured-inner h-full rounded-xl border border-gold/20 p-4">
              <p className="nav-mega-eyebrow nav-mega-eyebrow--column">Featured</p>
              <div className="nav-mega-featured-list space-y-3">
                {featured.map((item) => (
                  <Link
                    key={`${item.href}-${item.title}`}
                    href={item.href}
                    onClick={onClose}
                    className="nav-mega-featured-card group block overflow-hidden rounded-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="272px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="nav-mega-featured-overlay absolute inset-0" aria-hidden />
                      <div className="absolute inset-x-0 bottom-0 z-[1] p-3.5">
                        <p className="nav-mega-featured-title text-xs font-semibold leading-snug text-white">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      id={menuId}
      role="menu"
      aria-label={viewAllLabel(href, t)}
      className="nav-mega-panel-inner nav-mega-panel-inner--premium"
    >
      <div className="nav-mega-premium-body">
        <aside className="nav-mega-premium-hero">
          <MegaMenuHeroCard hero={hero} onClose={onClose} t={t} />
        </aside>

        <div className="nav-mega-premium-columns">
          {categories.map((cat) => (
            <div key={cat.id} className="nav-mega-premium-column">
              <h4 className="nav-mega-premium-col-title">{categoryLabel(cat, t)}</h4>
              <ul className="nav-mega-premium-link-list">
                {cat.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="nav-mega-premium-link group"
                      role="menuitem"
                    >
                      <span className="nav-mega-premium-link-text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <footer className="nav-mega-premium-footer">
        <p className="nav-mega-premium-footer-label">{t.navMega.shared.popularRightNow}</p>
        <MegaMenuSpotlightCards spotlights={spotlights} onClose={onClose} t={t} />
      </footer>

      <div className="nav-mega-premium-viewall">
        <Link href={href} onClick={onClose} className="nav-mega-premium-viewall-link">
          {viewAllLabel(href, t)}
        </Link>
      </div>
    </div>
  );
}

/** Desktop mega menu panel — centered floating premium card */
export function NavMegaMenuPanel({
  href,
  onClose,
  panelRef,
  menuId = "nav-mega-menu-panel",
}: NavMegaMenuPanelProps) {
  const { t } = useLocale();
  const config = getMegaMenuConfig(href);
  const internalRef = useRef<HTMLDivElement>(null);
  const resolvedRef = panelRef ?? internalRef;

  if (!config) return null;

  return (
    <MegaMenuPanelContent
      href={href}
      hero={config.hero}
      categories={config.categories}
      spotlights={config.spotlights}
      featured={config.featured}
      onClose={onClose}
      panelRef={resolvedRef}
      t={t}
      menuId={menuId}
    />
  );
}

export function NavMegaMenu({
  href,
  label,
  isActive,
  linkColor,
  indicatorHref,
  onNavHover,
}: NavMegaMenuProps) {
  const config = getMegaMenuConfig(href);
  const {
    isMenuOpen,
    isMenuPinned,
    handleTriggerEnter,
    handleTriggerLeave,
    handleTriggerClick,
    handleTriggerKeyDown,
  } = useNavDropdown();
  const isOpen = isMenuOpen(href);
  const menuId = "nav-mega-menu-panel";

  if (!config) return null;

  return (
    <li
      className="relative flex shrink-0 items-center"
      onMouseEnter={() => {
        handleTriggerEnter(href);
        onNavHover(href);
      }}
      onMouseLeave={handleTriggerLeave}
    >
      <Link
        href={href}
        data-nav-mega-trigger
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? menuId : undefined}
        data-pinned={isMenuPinned(href) || undefined}
        onClick={(event) => {
          event.preventDefault();
          handleTriggerClick(href);
        }}
        onKeyDown={(event) => handleTriggerKeyDown(href, event)}
        className={cn(
          ds.navLink,
          "fiji-luxury-nav-link nav-compact-link group relative inline-flex items-center gap-1 whitespace-nowrap",
          isActive || isOpen ? ds.navLinkActive : linkColor,
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "nav-compact-chevron h-2.5 w-2.5 opacity-50 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
        <NavAnimatedIndicator visible={indicatorHref === href} />
      </Link>
    </li>
  );
}
