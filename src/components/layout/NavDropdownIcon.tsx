import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_DROPDOWN_ICON_SIZE = 17;
export const NAV_DROPDOWN_ICON_STROKE = 1.75;

type NavDropdownIconProps = {
  icon: LucideIcon;
  className?: string;
};

export function NavDropdownIcon({ icon: Icon, className }: NavDropdownIconProps) {
  return (
    <Icon
      className={cn("nav-compact-dropdown-icon shrink-0", className)}
      size={NAV_DROPDOWN_ICON_SIZE}
      strokeWidth={NAV_DROPDOWN_ICON_STROKE}
      aria-hidden
    />
  );
}
