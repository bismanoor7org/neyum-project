"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { NavDropdownItem } from "@/components/layout/NavCompactDropdown";
import { cn } from "@/lib/utils";

type MobileCompactAccordionProps = {
  href: string;
  label: string;
  items: NavDropdownItem[];
  isDark: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  onItemClick?: (itemHref: string) => void;
  viewAllLabel?: string;
};

export function MobileCompactAccordion({
  href,
  label,
  items,
  isDark,
  isOpen,
  onToggle,
  onNavigate,
  onItemClick,
  viewAllLabel = "View all →",
}: MobileCompactAccordionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`mobile-nav-panel-${href.replace(/\//g, "-")}`}
        className={cn(
          "fiji-mobile-nav-accordion-btn flex w-full items-center justify-between px-4 py-3 text-left text-[13px] font-medium transition-colors",
          isDark
            ? "text-white/92 hover:bg-white/6"
            : "text-foreground hover:bg-cream-muted",
          isOpen && (isDark ? "bg-white/6 text-gold" : "bg-cream-muted text-teal"),
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 opacity-70 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`mobile-nav-panel-${href.replace(/\//g, "-")}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-0.5 border-t border-white/10 px-2 py-1.5">
              {items.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      onItemClick?.(item.href);
                      onNavigate();
                    }}
                    className={cn(
                      "nav-compact-mobile-item flex min-h-[44px] items-center rounded-lg px-3 py-2.5 transition-colors",
                      isDark
                        ? "text-white/85 hover:bg-white/8 hover:text-gold"
                        : "text-foreground/85 hover:bg-cream-muted hover:text-teal",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium">{item.label}</span>
                      {item.description && (
                        <span
                          className={cn(
                            "mt-0.5 block text-[11px] leading-relaxed",
                            isDark ? "text-white/50" : "text-foreground/50",
                          )}
                        >
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "nav-compact-mobile-item flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors",
                    isDark
                      ? "text-gold hover:bg-white/8"
                      : "text-teal hover:bg-cream-muted",
                  )}
                >
                  {viewAllLabel}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
