"use client";

import { WorldExplorerMap } from "@/components/map/WorldExplorerMap";
import type { FijiMapEngineProps } from "@/components/map/FijiMapLibreEngine";
import { cn } from "@/lib/utils";

/** Contained world map for homepage section */
export function FijiSectionMap({
  active,
  onSelect,
  className,
}: FijiMapEngineProps) {
  return (
    <WorldExplorerMap
      active={active}
      onSelect={onSelect}
      className={cn("rounded-[inherit]", className)}
      compact
    />
  );
}
