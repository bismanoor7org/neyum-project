"use client";

import { ClipboardList } from "lucide-react";
import {
  NavCompactDropdown,
  NavCompactDropdownPanel,
  type NavDropdownItem,
} from "@/components/layout/NavCompactDropdown";
import { useLocale } from "@/components/providers/LocaleProvider";
import { trackVisaCheckerNavClick } from "@/lib/analytics/visa-track";
import { TOOLS_HREF, TOOLS_NAV_DROPDOWN } from "@/lib/nav/tools-nav";

type NavToolsProps = {
  isActive: boolean;
  linkColor: string;
  indicatorHref: string | null;
  onNavHover: (href: string) => void;
};

function useToolsNavItems(): NavDropdownItem[] {
  const { t } = useLocale();

  return TOOLS_NAV_DROPDOWN.map((item) => ({
    icon: item.icon !== "ai-badge" ? item.icon : ClipboardList,
    label: t.nav[item.labelKey],
    description: t.nav[item.descriptionKey],
    href: item.href,
    iconVariant: item.icon === "ai-badge" ? ("ai" as const) : ("default" as const),
  }));
}

export function NavToolsPanel({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const items = useToolsNavItems();

  return (
    <NavCompactDropdownPanel
      href={TOOLS_HREF}
      eyebrow={t.nav.toolsServices}
      items={items}
      menuAriaLabel={t.nav.toolsServices}
      onItemClick={(href) => trackVisaCheckerNavClick("nav_dropdown", href)}
      onClose={onClose}
      variant="rich"
      hideEyebrow
    />
  );
}

export function NavTools({
  isActive,
  linkColor,
  indicatorHref,
  onNavHover,
}: NavToolsProps) {
  const { t } = useLocale();
  const items = useToolsNavItems();

  return (
    <NavCompactDropdown
      href={TOOLS_HREF}
      label={t.nav.tools}
      isActive={isActive}
      linkColor={linkColor}
      eyebrow={t.nav.toolsServices}
      items={items}
      triggerClassName="nav-visa-link"
      menuAriaLabel={t.nav.toolsServices}
      indicatorHref={indicatorHref}
      onNavHover={onNavHover}
      variant="rich"
      hideEyebrow
      onTriggerClick={(href) => trackVisaCheckerNavClick("nav_link", href)}
      onItemClick={(href) => trackVisaCheckerNavClick("nav_dropdown", href)}
    />
  );
}
