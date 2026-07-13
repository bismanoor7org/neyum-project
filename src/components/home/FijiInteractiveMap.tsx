"use client";

import { WorldExplorerMap } from "@/components/map/WorldExplorerMap";
import type { FijiMapEngineProps } from "@/components/map/FijiMapLibreEngine";

/** Homepage map section — global explorer, Fiji-first, fully contained */
export function FijiInteractiveMap(props: FijiMapEngineProps) {
  return <WorldExplorerMap {...props} compact observeSectionId="explore-map" />;
}
