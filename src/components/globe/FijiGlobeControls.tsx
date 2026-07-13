"use client";

import {
  Compass,
  Minus,
  Plus,
  RotateCcw,
  Navigation,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useFijiGlobe } from "@/components/globe/FijiGlobeContext";
import { cn } from "@/lib/utils";

interface FijiGlobeControlsProps {
  className?: string;
}

export function FijiGlobeControls({ className }: FijiGlobeControlsProps) {
  const {
    autoRotate,
    setAutoRotate,
    flyToFiji,
    cameraState,
    compact,
    zoomIn,
    zoomOut,
  } = useFijiGlobe();

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)}>
      {/* Mini compass */}
      <div
        className={cn(
          "pointer-events-auto absolute flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-navy/60 p-3 backdrop-blur-xl",
          compact ? "left-3 top-3" : "left-5 top-5",
        )}
      >
        <Compass className="h-5 w-5 text-gold" strokeWidth={1.5} />
        <MiniCompass bearing={cameraState.fijiBearing} />
        <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">
          N
        </span>
      </div>

      {/* Zoom + globe controls */}
      <div
        className={cn(
          "pointer-events-auto absolute flex flex-col gap-1.5 rounded-2xl border border-white/15 bg-navy/60 p-2 backdrop-blur-xl",
          compact ? "right-3 top-3" : "right-5 top-5",
        )}
      >
        <GlobeControlButton
          label="Zoom in"
          onClick={zoomIn}
          icon={<Plus className="h-4 w-4" />}
        />
        <GlobeControlButton
          label="Zoom out"
          onClick={zoomOut}
          icon={<Minus className="h-4 w-4" />}
        />
        <div className="my-0.5 h-px bg-white/10" />
        <GlobeControlButton
          label={autoRotate ? "Stop rotation" : "Auto-rotate"}
          onClick={() => setAutoRotate(!autoRotate)}
          icon={<RotateCcw className={cn("h-4 w-4", autoRotate && "animate-spin")} />}
          active={autoRotate}
        />
      </div>

      {/* Bottom CTAs */}
      <div
        className={cn(
          "pointer-events-auto absolute left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3",
          compact ? "bottom-3 px-3" : "bottom-6",
        )}
      >
        <button
          type="button"
          onClick={flyToFiji}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-2.5 text-sm font-semibold text-gold backdrop-blur-md transition-all hover:bg-gold/25 hover:shadow-[0_8px_32px_rgba(212,175,55,0.25)]"
        >
          <Navigation className="h-4 w-4" fill="currentColor" />
          Take Me To Fiji
        </button>
        {!compact && (
          <Link
            href="/places-to-go"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy/70 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-gold/30 hover:text-gold"
          >
            <MapPin className="h-4 w-4" />
            Explore Fiji
          </Link>
        )}
      </div>

      {/* Zoom tier indicator */}
      {!compact && (
        <div className="pointer-events-none absolute right-5 bottom-24 rounded-full border border-white/10 bg-navy/50 px-3 py-1 text-[10px] font-medium capitalize text-white/50 backdrop-blur-sm">
          {cameraState.zoomTier} view
        </div>
      )}
    </div>
  );
}

function GlobeControlButton({
  label,
  onClick,
  icon,
  active,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition-colors",
        active ? "bg-gold/20 text-gold" : "hover:bg-white/10 hover:text-white",
        disabled && "cursor-default opacity-40",
      )}
    >
      {icon}
    </button>
  );
}

function MiniCompass({ bearing }: { bearing: number }) {
  return (
    <div
      className="relative h-8 w-8 rounded-full border border-white/20"
      style={{ transform: `rotate(${bearing}deg)` }}
    >
      <div className="absolute left-1/2 top-0.5 h-2 w-0.5 -translate-x-1/2 rounded-full bg-gold" />
    </div>
  );
}
