"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { countryIndex } from "@/lib/content/world/country-index";
import {
  applyGlobePitch,
  applyWorldGlobeStyle,
  bindWorldPinInteractions,
  FIJI_VECTOR_STYLE_URL,
  updateWorldPins,
  WORLD_MAP_CENTER,
  WORLD_MAP_DEFAULT_ZOOM,
} from "@/lib/world-map-globe-style";
import { cn } from "@/lib/utils";

export interface WorldMapEngineProps {
  active: string;
  onSelect: (slug: string) => void;
  className?: string;
  defaultZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  flyToOnSelect?: boolean;
  showNavigation?: boolean;
}

function flyWhenReady(
  map: maplibregl.Map,
  lng: number,
  lat: number,
  zoom: number,
) {
  const go = () => {
    map.flyTo({
      center: [lng, lat],
      zoom,
      pitch: zoom >= 6 ? 28 : 12,
      bearing: 0,
      duration: 1600,
      essential: true,
    });
  };
  if (map.isStyleLoaded()) go();
  else map.once("load", go);
}

/** 3D luxury globe with world country pins */
export function WorldMapEngine({
  active,
  onSelect,
  className,
  defaultZoom = WORLD_MAP_DEFAULT_ZOOM,
  minZoom = 1,
  maxZoom = 12,
  flyToOnSelect = true,
  showNavigation = true,
}: WorldMapEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const onSelectRef = useRef(onSelect);
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
        center: [WORLD_MAP_CENTER.lng, WORLD_MAP_CENTER.lat],
        zoom: defaultZoom,
        minZoom,
        maxZoom,
        attributionControl: false,
        renderWorldCopies: false,
      });

      map.on("load", () => {
        applyWorldGlobeStyle(map);
        applyGlobePitch(map);
        map.resize();
        setReady(true);
      });

      map.on("zoomend", () => applyGlobePitch(map));

      map.on("moveend", () => {
        if (map.getZoom() < 3 && Math.abs(map.getBearing()) > 1) {
          map.easeTo({ bearing: 0, duration: 400 });
        }
      });

      if (showNavigation) {
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
      mapRef.current?.remove();
      mapRef.current = null;
      pinsBoundRef.current = false;
      setReady(false);
    };
  }, [defaultZoom, minZoom, maxZoom, showNavigation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    updateWorldPins(map, active);
  }, [active, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || pinsBoundRef.current) return;
    bindWorldPinInteractions(map, (slug) => onSelectRef.current(slug));
    pinsBoundRef.current = true;
  }, [ready]);

  useEffect(() => {
    if (!flyToOnSelect || !ready || !active) return;
    const map = mapRef.current;
    const country = countryIndex.find((c) => c.slug === active);
    if (!map || !country) return;
    flyWhenReady(map, country.lng, country.lat, Math.max(map.getZoom(), 4));
  }, [active, flyToOnSelect, ready]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fiji-map-luxury h-full w-full min-h-[inherit] bg-[#030a12]",
        className,
      )}
      style={{ minHeight: "inherit" }}
      role="application"
      aria-label="Interactive 3D world map"
    />
  );
}
