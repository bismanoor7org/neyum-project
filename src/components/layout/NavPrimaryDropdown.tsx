"use client";

import {
  NavCompactDropdown,
  NavCompactDropdownPanel,
  type NavDropdownItem,
} from "@/components/layout/NavCompactDropdown";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getLocalizedCompactNavConfig } from "@/lib/nav/compact-nav-data";

type NavPrimaryDropdownProps = {
  href: string;
  label: string;
  isActive: boolean;
  linkColor: string;
  indicatorHref: string | null;
  onNavHover: (href: string) => void;
};

function usePrimaryNavItems(href: string): NavDropdownItem[] | null {
  const { t } = useLocale();
  const config = getLocalizedCompactNavConfig(href, t);
  if (!config) return null;

  return config.items.map((item) => ({
    icon: item.icon,
    label: item.label,
    description: item.description,
    href: item.href,
  }));
}

export function NavPrimaryDropdownPanel({
  href,
  onClose,
}: {
  href: string;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const config = getLocalizedCompactNavConfig(href, t);
  const items = usePrimaryNavItems(href);

  if (!config || !items) return null;

  return (
    <NavCompactDropdownPanel
      href={config.href}
      eyebrow={config.eyebrow}
      items={items}
      menuAriaLabel={config.eyebrow}
      onClose={onClose}
      variant="rich"
      hideEyebrow
    />
  );
}

export function NavPrimaryDropdown({
  href,
  label,
  isActive,
  linkColor,
  indicatorHref,
  onNavHover,
}: NavPrimaryDropdownProps) {
  const { t } = useLocale();
  const config = getLocalizedCompactNavConfig(href, t);
  const items = usePrimaryNavItems(href);

  if (!config || !items) return null;

  return (
    <NavCompactDropdown
      href={config.href}
      label={label}
      isActive={isActive}
      linkColor={linkColor}
      eyebrow={config.eyebrow}
      items={items}
      menuAriaLabel={config.eyebrow}
      indicatorHref={indicatorHref}
      onNavHover={onNavHover}
      variant="rich"
      hideEyebrow
    />
  );
}
