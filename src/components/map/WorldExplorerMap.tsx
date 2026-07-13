"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { WorldExplorerProvider, useWorldExplorer } from "@/components/map/WorldExplorerContext";
import { WorldExplorerMapUI } from "@/components/map/WorldExplorerMapUI";
import { FijiTravelIntelligenceProvider } from "@/components/map/FijiTravelIntelligenceProvider";
import { FijiFullscreenTravelPanel } from "@/components/map/FijiFullscreenTravelPanel";
import { FijiFullscreenTravelBridge } from "@/components/map/FijiFullscreenTravelBridge";
import { WorldExplorerUserDistance } from "@/components/map/WorldExplorerUserDistance";
import { cn } from "@/lib/utils";

const WorldExplorerMapEngine = dynamic(
  () =>
    import("@/components/map/WorldExplorerMapEngine").then(
      (m) => m.WorldExplorerMapEngine,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-ocean">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy/15 border-t-gold" />
      </div>
    ),
  },
);

export interface WorldExplorerMapProps {
  active: string;
  onSelect: (slug: string) => void;
  className?: string;
  compact?: boolean;
  /** When set, resets map to default Fiji after user scrolls away from this section */
  observeSectionId?: string;
  /** Fullscreen /explore-map travel intelligence overlay */
  fullscreenTravel?: boolean;
  /** Fly to the active Fiji destination when the map first loads */
  flyToActiveOnMount?: boolean;
}

function ActiveSlugSync({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (slug: string) => void;
}) {
  const { activeFijiSlug, setActiveFijiSlug, activateMap } = useWorldExplorer();
  const prevParentActive = useRef(active);
  const prevContextSlug = useRef(activeFijiSlug);

  useEffect(() => {
    if (active === prevParentActive.current) return;
    prevParentActive.current = active;
    setActiveFijiSlug(active);
    activateMap();
  }, [active, setActiveFijiSlug, activateMap]);

  useEffect(() => {
    if (activeFijiSlug === prevContextSlug.current) return;
    prevContextSlug.current = activeFijiSlug;
    onSelect(activeFijiSlug);
  }, [activeFijiSlug, onSelect]);

  return null;
}

function MapSectionVisibilityReset({ sectionId }: { sectionId: string }) {
  const { resetToDefaultFiji } = useWorldExplorer();
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (wasVisibleRef.current && !visible) {
          resetToDefaultFiji();
        }
        wasVisibleRef.current = visible;
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, resetToDefaultFiji]);

  return null;
}

/** Premium global explorer — Fiji default, explore anywhere, contained layout */
export function WorldExplorerMap({
  active,
  onSelect,
  className,
  compact = false,
  observeSectionId,
  fullscreenTravel = false,
  flyToActiveOnMount = false,
}: WorldExplorerMapProps) {
  const mapShell = (
    <>
      <ActiveSlugSync active={active} onSelect={onSelect} />
      <WorldExplorerUserDistance />
      {observeSectionId ? (
        <MapSectionVisibilityReset sectionId={observeSectionId} />
      ) : null}
      <div
        className={cn(
          "world-explorer-container group relative h-full w-full overflow-hidden",
          className,
        )}
      >
        <WorldExplorerMapEngine className="absolute inset-0 h-full w-full" />
        <div className="fiji-ocean-shimmer pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(15,61,62,0.08)]" />
        <WorldExplorerMapUI />
        {fullscreenTravel ? (
          <>
            <FijiFullscreenTravelBridge />
            <FijiFullscreenTravelPanel />
          </>
        ) : null}
      </div>
    </>
  );

  return (
    <WorldExplorerProvider
      initialFijiSlug={active}
      compact={compact}
      fullscreenTravel={fullscreenTravel}
      flyToActiveOnMount={flyToActiveOnMount}
    >
      {fullscreenTravel ? (
        <FijiTravelIntelligenceProvider>{mapShell}</FijiTravelIntelligenceProvider>
      ) : (
        mapShell
      )}
    </WorldExplorerProvider>
  );
}
