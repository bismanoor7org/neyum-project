"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  applyBalancedWorldExplorerStyle,
  applyExplorerGlobePitch,
  bindFijiPinClicks,
  bindWorldPinInteractions,
  FIJI_VECTOR_STYLE_URL,
  removeFijiActivePinPulse,
  updateFijiPins,
} from "@/lib/world-map-style";
import {
  FIJI_DESTINATION_COORDS,
  FIJI_MAP_CENTER,
  FIJI_MAP_FOCUS_ZOOM,
  FIJI_SECTION_ZOOM,
} from "@/lib/fiji-map";
import {
  getFijiGuideFromView,
  isViewNearFiji,
} from "@/lib/world-map-search";
import {
  buildTravelRouteGeoJSON,
  type TravelIntelligencePlan,
} from "@/lib/fiji-travel-intelligence";
import {
  fitTravelRouteBounds,
  hideTravelRoute,
  showTravelRoute,
} from "@/lib/fiji-travel-route-layer";
import { getCountryIndex } from "@/lib/content/world/country-index";
import { showSearchHighlight, hideSearchHighlight } from "@/lib/world-map-search-highlight";
import {
  lockMapInteractions,
  unlockMapInteractions,
} from "@/lib/world-map-interaction";
import { useWorldExplorer, resolveDistanceOrigin } from "@/components/map/WorldExplorerContext";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 14;
const ZOOM_STEP = 0.85;

function smoothZoomBy(map: maplibregl.Map, delta: number) {
  const next = Math.min(
    MAP_MAX_ZOOM,
    Math.max(MAP_MIN_ZOOM, map.getZoom() + delta),
  );
  if (Math.abs(next - map.getZoom()) < 0.01) return;
  map.stop();
  map.easeTo({ zoom: next, duration: 450, essential: true });
}

function flyWhenReady(
  map: maplibregl.Map,
  lng: number,
  lat: number,
  zoom: number,
  pitch?: number,
) {
  const go = () => {
    map.stop();
    map.flyTo({
      center: [lng, lat],
      zoom,
      pitch: pitch ?? (zoom >= 8 ? 20 : zoom >= 5 ? 10 : 0),
      bearing: 0,
      duration: 1600,
      essential: true,
    });
  };
  if (map.isStyleLoaded()) go();
  else map.once("load", go);
}

interface WorldExplorerMapEngineProps {
  className?: string;
}

export function WorldExplorerMapEngine({ className }: WorldExplorerMapEngineProps) {
  const {
    activeFijiSlug,
    setActiveFijiSlug,
    setView,
    registerFly,
    registerHighlight,
    registerZoom,
    registerInteraction,
    registerMapReset,
    registerTravelRoute,
    mapActivated,
    compact,
    flyToActiveOnMount,
    setFocusLocation,
    clearFocusLocation,
    getFocusLocation,
    getUserReferenceLocation,
  } = useWorldExplorer();
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const initializingRef = useRef(false);
  const pinsBoundRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [shouldInit, setShouldInit] = useState(false);
  const skipFijiFlyRef = useRef(!flyToActiveOnMount);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldInit) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldInit(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldInit]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !shouldInit || mapRef.current || initializingRef.current) return;

    initializingRef.current = true;
    let cancelled = false;

    const init = () => {
      if (cancelled || mapRef.current) return;
      if (el.clientHeight < 40 || el.clientWidth < 40) {
        requestAnimationFrame(init);
        return;
      }

      const map = new maplibregl.Map({
        container: el,
        style: FIJI_VECTOR_STYLE_URL,
        center: [FIJI_MAP_CENTER.lng, FIJI_MAP_CENTER.lat],
        zoom: FIJI_SECTION_ZOOM,
        minZoom: 1,
        maxZoom: 14,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
        renderWorldCopies: false,
      });

      lockMapInteractions(map);

      map.on("load", () => {
        applyBalancedWorldExplorerStyle(map, theme);
        applyExplorerGlobePitch(map);
        flyWhenReady(
          map,
          FIJI_MAP_CENTER.lng,
          FIJI_MAP_CENTER.lat,
          FIJI_SECTION_ZOOM,
          0,
        );
        map.resize();
        setReady(true);
        const c = map.getCenter();
        const z = map.getZoom();
        const origin = resolveDistanceOrigin(
          getUserReferenceLocation(),
          getFocusLocation(),
          { lat: c.lat, lng: c.lng },
        );
        const guide = getFijiGuideFromView(origin.lat, origin.lng);
        setView({
          centerLat: c.lat,
          centerLng: c.lng,
          zoom: z,
          nearFiji: true,
          fijiDistanceKm: guide.distanceKm,
          fijiBearing: guide.bearing,
        });
      });

      map.on("movestart", (e) => {
        if (e.originalEvent && !getUserReferenceLocation()) {
          clearFocusLocation();
        }
      });

      map.on("zoomend", () => applyExplorerGlobePitch(map));

      map.on("moveend", () => {
        const c = map.getCenter();
        const z = map.getZoom();
        const origin = resolveDistanceOrigin(
          getUserReferenceLocation(),
          getFocusLocation(),
          { lat: c.lat, lng: c.lng },
        );
        const nearFiji = isViewNearFiji(c.lat, c.lng, z);
        const guide = getFijiGuideFromView(origin.lat, origin.lng);
        setView({
          centerLat: c.lat,
          centerLng: c.lng,
          zoom: z,
          nearFiji,
          fijiDistanceKm: guide.distanceKm,
          fijiBearing: guide.bearing,
        });
      });

      mapRef.current = map;
    };

    init();

    const ro = new ResizeObserver(() => mapRef.current?.resize());
    ro.observe(el);

    return () => {
      cancelled = true;
      initializingRef.current = false;
      ro.disconnect();
      const map = mapRef.current;
      if (map) {
        removeFijiActivePinPulse(map);
        map.stop();
        map.remove();
      }
      mapRef.current = null;
      el.replaceChildren();
      pinsBoundRef.current = false;
      setReady(false);
    };
  }, [compact, setView, shouldInit, getFocusLocation, getUserReferenceLocation, clearFocusLocation]);

  useEffect(() => {
    registerFly((lat, lng, zoom) => {
      const map = mapRef.current;
      if (!map) return;
      flyWhenReady(map, lng, lat, zoom);
    });
    registerHighlight((lat, lng) => {
      const map = mapRef.current;
      if (!map || !ready) return;
      showSearchHighlight(map, lat, lng);
    });
    registerZoom({
      zoomIn: () => {
        const map = mapRef.current;
        if (!map) return;
        smoothZoomBy(map, ZOOM_STEP);
      },
      zoomOut: () => {
        const map = mapRef.current;
        if (!map) return;
        smoothZoomBy(map, -ZOOM_STEP);
      },
    });
    registerInteraction({
      lock: () => {
        const map = mapRef.current;
        if (!map) return;
        lockMapInteractions(map);
      },
      unlock: () => {
        const map = mapRef.current;
        if (!map) return;
        unlockMapInteractions(map);
      },
    });
    registerMapReset((slug) => {
      const map = mapRef.current;
      if (!map || !ready) return;
      skipFijiFlyRef.current = true;
      clearFocusLocation();
      map.stop();
      map.jumpTo({
        center: [FIJI_MAP_CENTER.lng, FIJI_MAP_CENTER.lat],
        zoom: FIJI_SECTION_ZOOM,
        pitch: 0,
        bearing: 0,
      });
      applyExplorerGlobePitch(map);
      hideSearchHighlight(map);
      hideTravelRoute(map);
      updateFijiPins(map, slug);
    });
    registerTravelRoute((plan: TravelIntelligencePlan | null) => {
      const map = mapRef.current;
      if (!map || !ready) return;
      if (!plan) {
        hideTravelRoute(map);
        return;
      }
      const geo = buildTravelRouteGeoJSON(plan);
      showTravelRoute(map, geo);
      fitTravelRouteBounds(map, geo.bounds);
    });
  }, [registerFly, registerHighlight, registerZoom, registerInteraction, registerMapReset, registerTravelRoute, clearFocusLocation, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    if (mapActivated) unlockMapInteractions(map);
    else lockMapInteractions(map);
  }, [mapActivated, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    updateFijiPins(map, activeFijiSlug);
  }, [activeFijiSlug, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || pinsBoundRef.current) return;

    bindFijiPinClicks(map, (slug) => setActiveFijiSlug(slug));
    bindWorldPinInteractions(map, (slug) => {
      const country = getCountryIndex(slug);
      if (!country) return;
      const zoom = slug === "fiji" ? FIJI_SECTION_ZOOM : 5;
      setFocusLocation(country.lat, country.lng);
      const c = map.getCenter();
      const origin = resolveDistanceOrigin(
        getUserReferenceLocation(),
        { lat: country.lat, lng: country.lng },
        { lat: c.lat, lng: c.lng },
      );
      const guide = getFijiGuideFromView(origin.lat, origin.lng);
      setView({
        centerLat: c.lat,
        centerLng: c.lng,
        zoom: map.getZoom(),
        nearFiji: isViewNearFiji(c.lat, c.lng, zoom),
        fijiDistanceKm: guide.distanceKm,
        fijiBearing: guide.bearing,
      });
      flyWhenReady(map, country.lng, country.lat, zoom);
    });
    pinsBoundRef.current = true;
  }, [ready, setActiveFijiSlug, setFocusLocation, setView, getUserReferenceLocation]);

  useEffect(() => {
    if (!ready) return;
    if (skipFijiFlyRef.current) {
      skipFijiFlyRef.current = false;
      return;
    }
    const map = mapRef.current;
    const coords = FIJI_DESTINATION_COORDS[activeFijiSlug];
    if (!map || !coords) return;
    flyWhenReady(
      map,
      coords.lng,
      coords.lat,
      Math.min(FIJI_MAP_FOCUS_ZOOM, 9.5),
      compact ? 0 : 12,
    );
  }, [activeFijiSlug, ready, compact]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    applyBalancedWorldExplorerStyle(map, theme);
  }, [theme, ready]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "world-explorer-map h-full w-full min-h-[inherit] overflow-hidden bg-ocean",
        className,
      )}
      style={{ minHeight: "inherit" }}
      role="application"
      aria-label="Interactive world map — Fiji featured, explore globally"
    />
  );
}
