"use client";

import { useCallback, useState } from "react";
import { WorldExplorerMap } from "@/components/map/WorldExplorerMap";
import { FIJI_GLOBE_DESTINATIONS } from "@/lib/fiji-globe-data";

/** Full-page global explorer — Fiji default, free world navigation */
export function FijiExploreMapClient() {
  const [active, setActive] = useState(FIJI_GLOBE_DESTINATIONS[0].slug);
  const handleSelect = useCallback((slug: string) => setActive(slug), []);

  return (
    <div className="relative h-[calc(100svh-76px)] min-h-[480px] w-full overflow-hidden">
      <WorldExplorerMap
        active={active}
        onSelect={handleSelect}
        className="h-full w-full"
        fullscreenTravel
      />
    </div>
  );
}
