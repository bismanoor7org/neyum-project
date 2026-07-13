"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { FijiGlobeProvider, useFijiGlobe } from "@/components/globe/FijiGlobeContext";
import { FijiGlobeControls } from "@/components/globe/FijiGlobeControls";
import { FijiGuidanceOverlay } from "@/components/globe/FijiGuidanceOverlay";
import { FijiDestinationPopup } from "@/components/globe/FijiDestinationPopup";
import { cn } from "@/lib/utils";

const FijiGlobeCanvas = dynamic(
  () => import("@/components/globe/FijiGlobeCanvas").then((m) => m.FijiGlobeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#030a12]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-gold" />
          <p className="text-xs font-medium tracking-widest text-white/40 uppercase">
            Loading 3D globe…
          </p>
        </div>
      </div>
    ),
  },
);

export interface FijiGlobeExperienceProps {
  initialSlug?: string;
  className?: string;
  compact?: boolean;
  active?: string;
  onSelect?: (slug: string) => void;
}

function SlugSync({
  active,
  onSelect,
}: {
  active?: string;
  onSelect?: (slug: string) => void;
}) {
  const { activeSlug, setActiveSlug } = useFijiGlobe();
  const prevSlug = useRef(activeSlug);

  useEffect(() => {
    if (active && active !== activeSlug) setActiveSlug(active);
  }, [active, activeSlug, setActiveSlug]);

  useEffect(() => {
    if (activeSlug !== prevSlug.current) {
      prevSlug.current = activeSlug;
      onSelect?.(activeSlug);
    }
  }, [activeSlug, onSelect]);

  return null;
}

function FijiGlobeExperienceInner({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#030a12]",
        "fiji-globe-experience",
        className,
      )}
    >
      <div className="absolute inset-0 fiji-globe-parallax">
        <FijiGlobeCanvas className="h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,10,18,0.35)_70%,rgba(3,10,18,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030a12]/80 via-transparent to-[#030a12]/30" />

      <FijiGuidanceOverlay />
      <FijiGlobeControls />
      <FijiDestinationPopup />
    </div>
  );
}

/** Ultra-premium 3D Fiji-focused world globe */
export function FijiGlobeExperience({
  initialSlug = "nadi",
  className,
  compact = false,
  active,
  onSelect,
}: FijiGlobeExperienceProps) {
  const slug = active ?? initialSlug;

  return (
    <FijiGlobeProvider initialSlug={slug} compact={compact}>
      <SlugSync active={active} onSelect={onSelect} />
      <FijiGlobeExperienceInner className={className} compact={compact} />
    </FijiGlobeProvider>
  );
}
