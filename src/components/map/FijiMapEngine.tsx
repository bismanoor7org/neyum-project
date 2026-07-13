"use client";

import {
  FijiMapLibreEngine,
  type FijiMapEngineProps,
} from "@/components/map/FijiMapLibreEngine";

/**
 * Real-world interactive map — OpenStreetMap tiles + lat/lng pins.
 * Pins move with zoom/pan. Globe projection when zoomed out.
 */
export function FijiMapEngine(props: FijiMapEngineProps) {
  return <FijiMapLibreEngine {...props} />;
}
