"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "lucide-react";
import { useFijiGlobe } from "@/components/globe/FijiGlobeContext";
import { cn } from "@/lib/utils";

export function FijiGuidanceOverlay() {
  const { cameraState, compact } = useFijiGlobe();
  const showArrow =
    !cameraState.fijiScreenVisible || cameraState.fijiDistanceKm > 2500;
  const showApproaching =
    cameraState.approachingFiji && cameraState.fijiDistanceKm > 600;

  if (compact && cameraState.fijiDistanceKm < 1200) return null;

  return (
    <>
      <AnimatePresence>
        {showApproaching && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2"
          >
            <div className="glass-panel-dark flex items-center gap-3 rounded-full border-gold/30 px-5 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <p className="text-sm font-medium text-white">
                You are approaching Fiji Islands
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showArrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute z-10"
            style={{
              left: `${Math.min(0.88, Math.max(0.12, cameraState.fijiScreenX)) * 100}%`,
              top: `${Math.min(0.82, Math.max(0.18, cameraState.fijiScreenY)) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ rotate: cameraState.fijiBearing }}
                transition={{ type: "spring", stiffness: 80, damping: 14 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/70 shadow-lg backdrop-blur-md"
              >
                <Navigation
                  className="h-5 w-5 text-gold"
                  fill="currentColor"
                  style={{ transform: "rotate(-45deg)" }}
                />
              </motion.div>
              <div className="glass-panel-dark rounded-full px-3 py-1 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gold">
                  Fiji
                </p>
                <p className="text-xs text-white/70">
                  {cameraState.fijiDistanceKm < 1000
                    ? `${Math.round(cameraState.fijiDistanceKm)} km away`
                    : `${(cameraState.fijiDistanceKm / 1000).toFixed(1)}k km`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!compact && cameraState.zoomTier === "world" && (
        <div className="pointer-events-none absolute bottom-32 left-6 z-10 hidden sm:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
            Fiji Islands
          </p>
          <p className="mt-1 max-w-[200px] text-xs text-white/50">
            The South Pacific&apos;s crown jewel — continuously highlighted on the globe
          </p>
        </div>
      )}
    </>
  );
}
