"use client";

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  sun: Sun,
  cloud: Cloud,
  "cloud-sun": CloudSun,
  "cloud-rain": CloudRain,
  "cloud-drizzle": CloudDrizzle,
  "cloud-snow": CloudSnow,
  "cloud-lightning": CloudLightning,
  "cloud-fog": CloudFog,
};

interface WeatherIconProps {
  icon: string;
  className?: string;
  strokeWidth?: number;
}

export function WeatherIcon({ icon, className, strokeWidth = 1.5 }: WeatherIconProps) {
  const Icon = ICON_MAP[icon] ?? Cloud;
  return (
    <Icon
      className={cn("text-gold", className)}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}
