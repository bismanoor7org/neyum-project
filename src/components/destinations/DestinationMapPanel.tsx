"use client";

import { WorldExplorerMap } from "@/components/map/WorldExplorerMap";
import { cn } from "@/lib/utils";

interface DestinationMapPanelProps {
  activeSlug: string;
  className?: string;
}

export function DestinationMapPanel({ activeSlug, className }: DestinationMapPanelProps) {
  return (
    <div
      id="destination-map"
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-foreground/6 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <WorldExplorerMap
        active={activeSlug}
        onSelect={() => {}}
        compact
        flyToActiveOnMount
        observeSectionId="destination-map"
        className="h-[min(420px,55vh)] min-h-[320px] w-full"
      />
    </div>
  );
}
