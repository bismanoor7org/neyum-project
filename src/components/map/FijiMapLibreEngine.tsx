"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  applyGlobePitch,
  applyLuxuryGlobeStyle,
  applyLuxurySectionStyle,
  bindFijiPinInteractions,
  FIJI_VECTOR_STYLE_URL,
  removeFijiActivePinPulse,
  updateFijiPins,
} from "@/lib/fiji-map-globe-style";
import {
  FIJI_DESTINATION_COORDS,
  FIJI_MAP_CENTER,
  FIJI_MAP_DEFAULT_ZOOM,
  FIJI_MAP_FOCUS_ZOOM,
  FIJI_SECTION_MAX_BOUNDS,
  FIJI_SECTION_MAX_ZOOM,
  FIJI_SECTION_MIN_ZOOM,
  FIJI_SECTION_ZOOM,
} from "@/lib/fiji-map";
import {
  lockMapInteractions,
  unlockMapInteractions,
} from "@/lib/world-map-interaction";
import { cn } from "@/lib/utils";

export type FijiMapVariant = "section" | "explore";

export interface FijiMapEngineProps {
  active: string;
  onSelect: (slug: string) => void;
  className?: string;
  variant?: FijiMapVariant;
  defaultZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  flyToOnSelect?: boolean;
  showNavigation?: boolean;
  skipInitialFly?: boolean;
  lockInteractionsUntilClick?: boolean;
}

function flyWhenReady(
  map: maplibregl.Map,
  lng: number,
  lat: number,
  zoom: number,
  pitch = 0,
) {
  const go = () => {
    map.flyTo({
      center: [lng, lat],
      zoom,
      pitch,
      bearing: 0,
      duration: 1400,
      essential: true,
    });
  };
  if (map.isStyleLoaded()) go();
  else map.once("load", go);
}

/**
 * Fiji map engine — `section` = flat Fiji-only viewport inside container;
 * `explore` = wider Pacific view, still Fiji-anchored.
 */
export function FijiMapLibreEngine({
  active,
  onSelect,
  className,
  variant = "explore",
  defaultZoom,
  minZoom,
  maxZoom,
  flyToOnSelect = true,
  showNavigation = true,
  skipInitialFly = true,
  lockInteractionsUntilClick = false,
}: FijiMapEngineProps) {
  const isSection = variant === "section";
  const resolvedZoom = defaultZoom ?? (isSection ? FIJI_SECTION_ZOOM : FIJI_MAP_DEFAULT_ZOOM);
  const resolvedMin = minZoom ?? (isSection ? FIJI_SECTION_MIN_ZOOM : 1);
  const resolvedMax = maxZoom ?? (isSection ? FIJI_SECTION_MAX_ZOOM : 14);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const onSelectRef = useRef(onSelect);
  const skipFlyRef = useRef(skipInitialFly);
  const pinsBoundRef = useRef(false);
  const [ready, setReady] = useState(false);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const init = () => {
      if (el.clientHeight < 50 || el.clientWidth < 50) {
        requestAnimationFrame(init);
        return;
      }

      const map = new maplibregl.Map({
        container: el,
        style: FIJI_VECTOR_STYLE_URL,
        center: [FIJI_MAP_CENTER.lng, FIJI_MAP_CENTER.lat],
        zoom: resolvedZoom,
        minZoom: resolvedMin,
        maxZoom: resolvedMax,
        pitch: isSection ? 0 : 0,
        bearing: 0,
        maxBounds: isSection ? FIJI_SECTION_MAX_BOUNDS : undefined,
        attributionControl: false,
        renderWorldCopies: false,
      });

      if (lockInteractionsUntilClick) {
        lockMapInteractions(map);
      }

      map.on("load", () => {
        if (isSection) {
          applyLuxurySectionStyle(map);
          flyWhenReady(
            map,
            FIJI_MAP_CENTER.lng,
            FIJI_MAP_CENTER.lat,
            resolvedZoom,
            0,
          );
        } else {
          applyLuxuryGlobeStyle(map, "fiji");
          applyGlobePitch(map);
        }
        map.resize();
        setReady(true);
      });

      if (!isSection) {
        map.on("zoomend", () => applyGlobePitch(map));
        map.on("moveend", () => {
          if (map.getZoom() < 4 && Math.abs(map.getBearing()) > 1) {
            map.easeTo({ bearing: 0, duration: 400 });
          }
        });
      }

      if (showNavigation && !isSection) {
        map.addControl(
          new maplibregl.NavigationControl({ showCompass: false }),
          "top-right",
        );
      }

      mapRef.current = map;
    };

    init();

    const ro = new ResizeObserver(() => mapRef.current?.resize());
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (mapRef.current) removeFijiActivePinPulse(mapRef.current);
      mapRef.current?.remove();
      mapRef.current = null;
      pinsBoundRef.current = false;
      setReady(false);
    };
  }, [resolvedZoom, resolvedMin, resolvedMax, showNavigation, isSection, lockInteractionsUntilClick]);

  useEffect(() => {
    if (!lockInteractionsUntilClick) return;

    const el = containerRef.current;
    const map = mapRef.current;
    if (!el || !map) return;

    const enableInteractions = () => {
      unlockMapInteractions(map);
    };

    el.addEventListener("pointerdown", enableInteractions, { once: true });

    return () => {
      el.removeEventListener("pointerdown", enableInteractions);
    };
  }, [lockInteractionsUntilClick, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    updateFijiPins(map, active);
  }, [active, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || pinsBoundRef.current) return;
    bindFijiPinInteractions(map, (slug) => onSelectRef.current(slug));
    pinsBoundRef.current = true;
  }, [ready]);

  useEffect(() => {
    if (!flyToOnSelect || !ready) return;

    if (skipFlyRef.current) {
      skipFlyRef.current = false;
      return;
    }

    const map = mapRef.current;
    const coords = FIJI_DESTINATION_COORDS[active];
    if (!map || !coords) return;

    const focusZoom = isSection
      ? Math.min(FIJI_MAP_FOCUS_ZOOM, FIJI_SECTION_MAX_ZOOM)
      : Math.max(map.getZoom(), FIJI_MAP_FOCUS_ZOOM);

    flyWhenReady(map, coords.lng, coords.lat, focusZoom, isSection ? 0 : 16);
  }, [active, flyToOnSelect, ready, isSection]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fiji-map-luxury h-full w-full min-h-[inherit] overflow-hidden bg-[#0a5c5c]",
        isSection && "fiji-section-map-canvas",
        className,
      )}
      style={{ minHeight: "inherit" }}
      role="application"
      aria-label={
        isSection
          ? "Fiji Islands explorer map"
          : "Pacific map — Fiji destinations"
      }
    />
  );
}
