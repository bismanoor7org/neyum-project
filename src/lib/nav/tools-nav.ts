import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  Clock,
  CloudSun,
  Coins,
  Globe,
  MapPin,
  Wallet,
} from "lucide-react";
import {
  AI_VISA_ASSISTANT_HREF,
  isVisaCheckerRoute,
  VISA_NAV_DROPDOWN,
  type VisaNavItem,
  type VisaNavItemKey,
} from "@/lib/nav/visa-nav";

/** Tools hub — navbar routes & dropdown items */

export const TOOLS_HREF = "/tools" as const;

export const TOOLS_NAV_ROUTES = [
  TOOLS_HREF,
  "/tools/fiji-time",
  "/tools/fiji-weather",
  "/tools/world-time-weather",
  "/tools/trip-cost-calculator",
  "/tools/currency-converter",
  "/tools/travel-budget-planner",
  "/tools/timezone-finder",
  ...VISA_NAV_DROPDOWN.map((item) => item.href),
] as const;

export type ToolsNavItemKey =
  | VisaNavItemKey
  | "fijiTime"
  | "fijiWeather"
  | "worldTimeWeather"
  | "tripCostCalculator"
  | "currencyConverter"
  | "travelBudgetPlanner"
  | "timezoneFinder";

export type ToolsNavItem = VisaNavItem | {
  labelKey: Exclude<ToolsNavItemKey, VisaNavItemKey>;
  descriptionKey: `${Exclude<ToolsNavItemKey, VisaNavItemKey>}Desc`;
  href: string;
  icon: LucideIcon;
};

export const TOOLS_NAV_DROPDOWN: ToolsNavItem[] = [
  ...VISA_NAV_DROPDOWN,
  {
    labelKey: "fijiTime",
    descriptionKey: "fijiTimeDesc",
    href: "/tools/fiji-time",
    icon: Clock,
  },
  {
    labelKey: "fijiWeather",
    descriptionKey: "fijiWeatherDesc",
    href: "/tools/fiji-weather",
    icon: CloudSun,
  },
  {
    labelKey: "worldTimeWeather",
    descriptionKey: "worldTimeWeatherDesc",
    href: "/tools/world-time-weather",
    icon: Globe,
  },
  {
    labelKey: "tripCostCalculator",
    descriptionKey: "tripCostCalculatorDesc",
    href: "/tools/trip-cost-calculator",
    icon: Calculator,
  },
  {
    labelKey: "currencyConverter",
    descriptionKey: "currencyConverterDesc",
    href: "/tools/currency-converter",
    icon: Coins,
  },
  {
    labelKey: "travelBudgetPlanner",
    descriptionKey: "travelBudgetPlannerDesc",
    href: "/tools/travel-budget-planner",
    icon: Wallet,
  },
  {
    labelKey: "timezoneFinder",
    descriptionKey: "timezoneFinderDesc",
    href: "/tools/timezone-finder",
    icon: MapPin,
  },
];

export function isToolsRoute(path: string): boolean {
  return (
    path === TOOLS_HREF ||
    path.startsWith("/tools/") ||
    isVisaCheckerRoute(path)
  );
}

export { AI_VISA_ASSISTANT_HREF };
