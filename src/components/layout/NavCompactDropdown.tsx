"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavAnimatedIndicator } from "@/components/layout/NavAnimatedIndicator";
import { useNavDropdown } from "@/components/layout/NavDropdownContext";
import type { CompactNavItem } from "@/lib/nav/compact-nav-data";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type NavDropdownItem = CompactNavItem & {
  description?: string;
  iconVariant?: "default" | "ai";
};

export function getNavCompactMenuId(href: string) {
  return `nav-compact-menu-${href.replace(/\//g, "-")}`;
}

type NavCompactDropdownPanelProps = {
  href: string;
  eyebrow: string;
  items: NavDropdownItem[];
  menuAriaLabel?: string;
  onItemClick?: (itemHref: string) => void;
  onClose: () => void;
  /** Rich layout: subtitles + chevron (Visa Checker mockup) */
  variant?: "compact" | "rich";
  hideEyebrow?: boolean;
  menuId?: string;
};

export function NavCompactDropdownPanel({
  href,
  eyebrow,
  items,
  menuAriaLabel,
  onItemClick,
  onClose,
  variant = "compact",
  hideEyebrow = false,
  menuId = getNavCompactMenuId(href),
}: NavCompactDropdownPanelProps) {
  const isRich = variant === "rich";

  return (
    <div
      id={menuId}
      className={cn(
        "nav-compact-dropdown-panel rounded-[20px]",
        isRich
          ? "nav-visa-rich-panel w-[min(360px,calc(100vw-1.5rem))] max-w-[380px] min-w-[300px]"
          : "w-[min(320px,calc(100vw-1.5rem))] max-w-[340px] min-w-[280px]",
      )}
      role="menu"
      aria-label={menuAriaLabel ?? eyebrow}
    >
      {!hideEyebrow && !isRich && (
        <p className="nav-compact-dropdown-eyebrow px-3 pb-1 pt-2.5">{eyebrow}</p>
      )}
      <ul className={cn(isRich ? "px-2 py-2" : "px-1 pb-1.5", "nav-compact-dropdown-list")}>
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`} role="none">
            <Link
              href={item.href}
              role="menuitem"
              onClick={() => {
                onItemClick?.(item.href);
                onClose();
              }}
              className={cn(
                "nav-compact-dropdown-item group/item flex items-center rounded-xl transition-[background,transform] duration-200",
                isRich ? "px-3 py-3" : "px-2.5 py-2",
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium leading-snug text-white/92 group-hover/item:text-white">
                  {item.label}
                </span>
                {item.description && (
                  <span className="mt-0.5 block text-[11px] leading-snug text-white/48 group-hover/item:text-white/62">
                    {item.description}
                  </span>
                )}
              </span>
              {isRich && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-white/28 transition-colors group-hover/item:text-gold"
                  strokeWidth={1.75}
                  aria-hidden
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type NavCompactDropdownProps = {
  href: string;
  label: string;
  isActive: boolean;
  linkColor: string;
  eyebrow: string;
  items: NavDropdownItem[];
  triggerClassName?: string;
  menuAriaLabel?: string;
  indicatorHref: string | null;
  onNavHover: (href: string) => void;
  onItemClick?: (itemHref: string) => void;
  onTriggerClick?: (href: string) => void;
  /** Rich layout: subtitles + chevron (Visa Checker mockup) */
  variant?: "compact" | "rich";
  hideEyebrow?: boolean;
};

export function NavCompactDropdown({
  href,
  label,
  isActive,
  linkColor,
  eyebrow,
  items,
  triggerClassName,
  menuAriaLabel,
  indicatorHref,
  onNavHover,
  onItemClick,
  onTriggerClick,
  variant = "compact",
  hideEyebrow = false,
}: NavCompactDropdownProps) {
  const router = useRouter();
  const isRich = variant === "rich";
  const itemRef = useRef<HTMLLIElement>(null);
  const menuId = getNavCompactMenuId(href);
  const {
    isMenuOpen,
    isMenuPinned,
    handleTriggerEnter,
    handleTriggerLeave,
    handleTriggerClick,
    handleTriggerKeyDown,
    handlePanelEnter,
    handlePanelLeave,
    close,
  } = useNavDropdown();
  const open = isMenuOpen(href);

  return (
    <li
      ref={itemRef}
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
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        data-pinned={isMenuPinned(href) || undefined}
        onClick={(event) => {
          onTriggerClick?.(href);
          const shouldNavigate = handleTriggerClick(href);
          if (!shouldNavigate) {
            event.preventDefault();
          }
        }}
        onDoubleClick={(event) => {
          event.preventDefault();
          close();
          router.push(href);
        }}
        onKeyDown={(event) => {
          const shouldNavigate = handleTriggerKeyDown(href, event);
          if (shouldNavigate) {
            router.push(href);
          }
        }}
        className={cn(
          ds.navLink,
          "fiji-luxury-nav-link nav-compact-link group relative inline-flex items-center gap-1 whitespace-nowrap",
          triggerClassName,
          isActive || open ? ds.navLinkActive : linkColor,
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "nav-compact-chevron h-2.5 w-2.5 opacity-50 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
        <NavAnimatedIndicator visible={indicatorHref === href} />
      </Link>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute left-0 top-full z-[70]",
              isRich ? "nav-visa-dropdown pt-3" : "nav-compact-dropdown pt-2",
            )}
            onMouseEnter={handlePanelEnter}
            onMouseLeave={handlePanelLeave}
          >
            <NavCompactDropdownPanel
              href={href}
              eyebrow={eyebrow}
              items={items}
              menuAriaLabel={menuAriaLabel}
              onItemClick={onItemClick}
              onClose={close}
              variant={variant}
              hideEyebrow={hideEyebrow}
              menuId={menuId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
