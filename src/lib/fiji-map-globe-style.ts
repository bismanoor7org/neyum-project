import type { FeatureCollection } from "geojson";
import maplibregl, { type Map as MaplibreMap } from "maplibre-gl";
import { FIJI_DESTINATION_COORDS } from "@/lib/fiji-map";

/** Carto Voyager vector — countries, cities, borders */
export const FIJI_VECTOR_STYLE_URL =
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

export const FIJI_PINS_SOURCE = "fiji-destination-pins";

const HIDE_CLUTTER_RE =
  /poi|housenum|building|road-label|transit|waterway-label|place_hamlet|place_suburb|place_other/i;

const COUNTRY_LABEL_RE = /place_country|place_continent/i;
const CITY_LABEL_RE = /place_city|place_town|place_capital|place_state/i;

/** Fiji archipelago highlight */
export const FIJI_REGION_GLOW = {
  type: "Feature" as const,
  properties: {},
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [176.85, -16.05],
        [180.15, -16.05],
        [180.15, -20.25],
        [176.85, -20.25],
        [176.85, -16.05],
      ],
    ],
  },
};

export function buildFijiPinsGeoJSON(active: string): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: Object.entries(FIJI_DESTINATION_COORDS).map(([slug, c]) => ({
      type: "Feature",
      properties: { slug, active: slug === active },
      geometry: { type: "Point", coordinates: [c.lng, c.lat] },
    })),
  };
}

const ACTIVE_PIN_GOLD = "#D4AF37";

/** WebGL pin layers — zoom-responsive for section container */
export function setupFijiPinLayers(
  map: MaplibreMap,
  variant: "section" | "globe" = "globe",
) {
  if (map.getSource(FIJI_PINS_SOURCE)) {
    pinLayerVariants.set(map, variant);
    removeLegacyPinEffectLayers(map);
    return;
  }

  map.addSource(FIJI_PINS_SOURCE, {
    type: "geojson",
    data: buildFijiPinsGeoJSON(""),
  });

  const pulseRadius =
    variant === "section"
      ? ["interpolate", ["linear"], ["zoom"], 5.6, 14, 7, 22, 9.2, 28]
      : 20;

  const hitRadius =
    variant === "section"
      ? ["interpolate", ["linear"], ["zoom"], 5.6, 10, 7, 16, 9.2, 20]
      : 14;

  const inactiveDotRadius =
    variant === "section"
      ? ["interpolate", ["linear"], ["zoom"], 5.6, 3.5, 7, 5.5, 9.2, 7.5]
      : 5;

  const activeDotRadius =
    variant === "section"
      ? ["interpolate", ["linear"], ["zoom"], 5.6, 5.5, 7, 8.5, 9.2, 11.5]
      : 7.5;

  const shadowRadius =
    variant === "section"
      ? [
          "interpolate",
          ["linear"],
          ["zoom"],
          5.6,
          ["case", ["boolean", ["get", "active"], false], 6.5, 4],
          7,
          ["case", ["boolean", ["get", "active"], false], 10, 6.2],
          9.2,
          ["case", ["boolean", ["get", "active"], false], 13, 8.5],
        ]
      : ["case", ["boolean", ["get", "active"], false], 8.5, 5.5];

  const shineRadius =
    variant === "section"
      ? ["interpolate", ["linear"], ["zoom"], 5.6, 2.2, 7, 3.2, 9.2, 4.2]
      : 2.8;

  map.addLayer({
    id: "fiji-pins-shadow",
    type: "circle",
    source: FIJI_PINS_SOURCE,
    paint: {
      "circle-radius": shadowRadius as maplibregl.ExpressionSpecification,
      "circle-color": "#0c3238",
      "circle-blur": ["case", ["boolean", ["get", "active"], false], 0.85, 0.65],
      "circle-opacity": ["case", ["boolean", ["get", "active"], false], 0.55, 0.32],
      "circle-translate": [0, 2.5],
      "circle-translate-anchor": "viewport",
    },
  });

  map.addLayer({
    id: "fiji-pins-pulse",
    type: "circle",
    source: FIJI_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": pulseRadius as maplibregl.ExpressionSpecification,
      "circle-color": ACTIVE_PIN_GOLD,
      "circle-opacity": 0,
      "circle-blur": 0.42,
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });

  map.addLayer({
    id: "fiji-pins-hit",
    type: "circle",
    source: FIJI_PINS_SOURCE,
    paint: {
      "circle-radius": hitRadius as maplibregl.ExpressionSpecification,
      "circle-color": "rgba(0,0,0,0)",
    },
  });

  map.addLayer({
    id: "fiji-pins-dot",
    type: "circle",
    source: FIJI_PINS_SOURCE,
    filter: ["!=", ["get", "active"], true],
    paint: {
      "circle-radius": inactiveDotRadius as maplibregl.ExpressionSpecification,
      "circle-color": "#ffffff",
      "circle-stroke-width": variant === "section" ? 1.5 : 2,
      "circle-stroke-color": "#0c3238",
      "circle-opacity": 0.95,
    },
  });

  map.addLayer({
    id: "fiji-pins-dot-active",
    type: "circle",
    source: FIJI_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": activeDotRadius as maplibregl.ExpressionSpecification,
      "circle-color": ACTIVE_PIN_GOLD,
      "circle-opacity": 1,
      "circle-stroke-width": variant === "section" ? 2.5 : 3,
      "circle-stroke-color": "#8a6f2a",
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });

  map.addLayer({
    id: "fiji-pins-rim",
    type: "circle",
    source: FIJI_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": activeDotRadius as maplibregl.ExpressionSpecification,
      "circle-color": "rgba(0,0,0,0)",
      "circle-stroke-width": 1.5,
      "circle-stroke-color": "rgba(255,255,255,0.42)",
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });

  map.addLayer({
    id: "fiji-pins-shine",
    type: "circle",
    source: FIJI_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": shineRadius as maplibregl.ExpressionSpecification,
      "circle-color": "rgba(255,255,255,0.92)",
      "circle-blur": 0.12,
      "circle-translate": ["literal", [-1.6, -1.6]],
      "circle-translate-anchor": "viewport",
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });

  pinLayerVariants.set(map, variant);
}

const pinLayerVariants = new WeakMap<MaplibreMap, "section" | "globe">();
const pulseAnimFrames = new WeakMap<MaplibreMap, number>();

const ACTIVE_PIN_ANIM_MS = 1800;

function sectionPulseRadiusAtZoom(zoom: number): number {
  if (zoom <= 5.6) return 14;
  if (zoom >= 9.2) return 28;
  const t = (zoom - 5.6) / (9.2 - 5.6);
  return 14 + t * 14;
}

function pulseRadiusAtZoom(map: MaplibreMap): number {
  const variant = pinLayerVariants.get(map) ?? "section";
  if (variant === "globe") return 20;
  return sectionPulseRadiusAtZoom(map.getZoom());
}

function pulseRadiusExpr(
  variant: "section" | "globe",
): maplibregl.ExpressionSpecification | number {
  return variant === "section"
    ? ["interpolate", ["linear"], ["zoom"], 5.6, 14, 7, 22, 9.2, 28]
    : 20;
}

function activeDotRadiusExpr(
  variant: "section" | "globe",
): maplibregl.ExpressionSpecification | number {
  return variant === "section"
    ? ["interpolate", ["linear"], ["zoom"], 5.6, 5.5, 7, 8.5, 9.2, 11.5]
    : 7.5;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

/** Selected marker blink — opacity 1 → 0.75 → 1 over 1.8s */
function markerBlinkOpacity(elapsed: number): number {
  const phase = (elapsed % ACTIVE_PIN_ANIM_MS) / ACTIVE_PIN_ANIM_MS;
  if (phase <= 0.5) {
    return 1 - 0.25 * easeInOut(phase * 2);
  }
  return 0.75 + 0.25 * easeInOut((phase - 0.5) * 2);
}

/** Soft pulse ring — scale 1 → 1.4, opacity 0.4 → 0 */
function pulseRingKeyframe(elapsed: number): { opacity: number; scale: number } {
  const phase = (elapsed % ACTIVE_PIN_ANIM_MS) / ACTIVE_PIN_ANIM_MS;
  const eased = easeInOut(phase);
  return {
    opacity: 0.4 * (1 - eased),
    scale: 1 + 0.4 * eased,
  };
}

function removeLegacyPinEffectLayers(map: MaplibreMap) {
  for (const id of ["fiji-pins-ripple", "fiji-pins-glow-ring"]) {
    if (map.getLayer(id)) {
      try {
        map.removeLayer(id);
      } catch {
        /* skip */
      }
    }
  }
}

function resetActivePinEffectPaint(map: MaplibreMap) {
  if (!map.getLayer("fiji-pins-pulse")) return;

  const variant = pinLayerVariants.get(map) ?? "section";
  const pulseRadius = pulseRadiusExpr(variant);
  const activeDotRadius = activeDotRadiusExpr(variant);

  try {
    map.setPaintProperty("fiji-pins-pulse", "circle-radius", pulseRadius);
    map.setPaintProperty("fiji-pins-pulse", "circle-opacity", 0);
    map.setPaintProperty("fiji-pins-dot-active", "circle-radius", activeDotRadius);
    map.setPaintProperty("fiji-pins-dot-active", "circle-opacity", 1);
    map.setPaintProperty("fiji-pins-dot-active", "circle-color", ACTIVE_PIN_GOLD);
  } catch {
    /* skip */
  }
}

function runActivePinAnimation(map: MaplibreMap, startedAt: number) {
  if (!map.getLayer("fiji-pins-pulse")) {
    stopFijiActivePinPulse(map);
    return;
  }

  const elapsed = performance.now() - startedAt;
  const blink = markerBlinkOpacity(elapsed);
  const ring = pulseRingKeyframe(elapsed);
  const basePulse = pulseRadiusAtZoom(map);

  try {
    map.setPaintProperty("fiji-pins-pulse", "circle-opacity", ring.opacity);
    map.setPaintProperty("fiji-pins-pulse", "circle-radius", basePulse * ring.scale);
    map.setPaintProperty("fiji-pins-dot-active", "circle-opacity", blink);
  } catch {
    stopFijiActivePinPulse(map);
    return;
  }

  pulseAnimFrames.set(
    map,
    requestAnimationFrame(() => runActivePinAnimation(map, startedAt)),
  );
}

function startFijiActivePinPulse(map: MaplibreMap) {
  if (pulseAnimFrames.has(map) || !map.getLayer("fiji-pins-pulse")) return;
  removeLegacyPinEffectLayers(map);
  runActivePinAnimation(map, performance.now());
}

function stopFijiActivePinPulse(map: MaplibreMap) {
  const frame = pulseAnimFrames.get(map);
  if (frame) cancelAnimationFrame(frame);
  pulseAnimFrames.delete(map);
  resetActivePinEffectPaint(map);
}

export function updateFijiPins(map: MaplibreMap, active: string) {
  const src = map.getSource(FIJI_PINS_SOURCE) as maplibregl.GeoJSONSource | undefined;
  if (src) src.setData(buildFijiPinsGeoJSON(active));
  syncFijiActivePinPulse(map, active);
}

/** Animated pulse on the selected destination ring only */
export function syncFijiActivePinPulse(map: MaplibreMap, active: string) {
  if (!FIJI_DESTINATION_COORDS[active]) {
    removeFijiActivePinPulse(map);
    return;
  }

  if (!map.getLayer("fiji-pins-pulse")) return;
  startFijiActivePinPulse(map);
}

export function removeFijiActivePinPulse(map: MaplibreMap) {
  stopFijiActivePinPulse(map);
}

export type GlobeStyleMode = "fiji" | "world";

/** Flat Fiji-only section map — mercator, no world view */
export function applyLuxurySectionStyle(map: MaplibreMap) {
  try {
    map.setProjection({ type: "mercator" });
  } catch {
    /* ignore */
  }

  const layers = map.getStyle()?.layers ?? [];

  for (const layer of layers) {
    const { id, type } = layer;

    if (id.includes("water") && type === "fill") {
      try {
        map.setPaintProperty(id, "fill-color", "#0a7a7a");
        map.setPaintProperty(id, "fill-opacity", 0.96);
      } catch {
        /* skip */
      }
    }

    if (id.includes("water") && type === "line") {
      try {
        map.setPaintProperty(id, "line-color", "#085f5f");
        map.setPaintProperty(id, "line-opacity", 0.5);
      } catch {
        /* skip */
      }
    }

    if (
      (id.includes("land") || id.includes("park") || id.includes("landcover")) &&
      type === "fill"
    ) {
      try {
        map.setPaintProperty(id, "fill-color", "#ebe6dc");
      } catch {
        /* skip */
      }
    }

    if (id.includes("boundary_country") && type === "line") {
      try {
        map.setPaintProperty(id, "line-color", "#c5a44e");
        map.setPaintProperty(id, "line-width", 0.7);
        map.setPaintProperty(id, "line-opacity", 0.35);
      } catch {
        /* skip */
      }
    }

    if (type === "symbol") {
      if (HIDE_CLUTTER_RE.test(id) || COUNTRY_LABEL_RE.test(id)) {
        try {
          map.setLayoutProperty(id, "visibility", "none");
        } catch {
          /* skip */
        }
      }

      if (CITY_LABEL_RE.test(id)) {
        try {
          map.setPaintProperty(id, "text-color", "#0c3238");
          map.setPaintProperty(id, "text-halo-color", "rgba(255,255,255,0.9)");
          map.setPaintProperty(id, "text-halo-width", 1.4);
          map.setPaintProperty(id, "text-opacity", 0.85);
        } catch {
          /* skip */
        }
      }
    }
  }

  if (!map.getSource("fiji-glow")) {
    map.addSource("fiji-glow", { type: "geojson", data: FIJI_REGION_GLOW });
    map.addLayer({
      id: "fiji-glow-fill",
      type: "fill",
      source: "fiji-glow",
      paint: { "fill-color": "#c5a44e", "fill-opacity": 0.09 },
    });
    map.addLayer({
      id: "fiji-glow-border",
      type: "line",
      source: "fiji-glow",
      paint: {
        "line-color": "#c5a44e",
        "line-width": 1.6,
        "line-opacity": 0.45,
      },
    });
  }

  setupFijiPinLayers(map, "section");
}

/** Premium 3D globe + country & city labels */
export function applyLuxuryGlobeStyle(map: MaplibreMap, mode: GlobeStyleMode = "fiji") {
  try {
    map.setProjection({ type: "globe" });
  } catch {
    /* ignore */
  }

  try {
    const ext = map as MaplibreMap & {
      setFog?: (o: Record<string, unknown>) => void;
      setLight?: (o: Record<string, unknown>) => void;
    };
    ext.setFog?.({
      color: "rgb(186, 214, 228)",
      "high-color": "rgb(15, 61, 62)",
      "horizon-blend": 0.14,
      "space-color": "rgb(3, 10, 18)",
      "star-intensity": 0.72,
    });
    ext.setLight?.({
      anchor: "viewport",
      color: "#f8f4ec",
      intensity: 0.42,
      position: [1.2, 200, 55],
    });
  } catch {
    /* ignore */
  }

  const layers = map.getStyle()?.layers ?? [];

  for (const layer of layers) {
    const { id, type } = layer;

    if (id.includes("water") && type === "fill") {
      try {
        map.setPaintProperty(id, "fill-color", "#0e5f63");
        map.setPaintProperty(id, "fill-opacity", 0.94);
      } catch {
        /* skip */
      }
    }

    if (id.includes("water") && type === "line") {
      try {
        map.setPaintProperty(id, "line-color", "#074f4f");
        map.setPaintProperty(id, "line-opacity", 0.45);
      } catch {
        /* skip */
      }
    }

    if (
      (id.includes("land") || id.includes("park") || id.includes("landcover")) &&
      type === "fill"
    ) {
      try {
        map.setPaintProperty(id, "fill-color", "#ebe6dc");
      } catch {
        /* skip */
      }
    }

    if (id.includes("boundary_country") && type === "line") {
      try {
        map.setPaintProperty(id, "line-color", "#c5a44e");
        map.setPaintProperty(id, "line-width", 0.85);
        map.setPaintProperty(id, "line-opacity", 0.5);
      } catch {
        /* skip */
      }
    }

    if (type === "symbol") {
      if (HIDE_CLUTTER_RE.test(id)) {
        try {
          map.setLayoutProperty(id, "visibility", "none");
        } catch {
          /* skip */
        }
      }

      if (COUNTRY_LABEL_RE.test(id)) {
        try {
          map.setPaintProperty(id, "text-color", "#0c3238");
          map.setPaintProperty(id, "text-halo-color", "rgba(255,255,255,0.92)");
          map.setPaintProperty(id, "text-halo-width", 1.6);
          map.setPaintProperty(id, "text-opacity", 0.92);
        } catch {
          /* skip */
        }
      }

      if (CITY_LABEL_RE.test(id)) {
        try {
          map.setPaintProperty(id, "text-color", "#1a4a4b");
          map.setPaintProperty(id, "text-halo-color", "rgba(255,255,255,0.85)");
          map.setPaintProperty(id, "text-halo-width", 1.2);
          map.setPaintProperty(id, "text-opacity", 0.78);
        } catch {
          /* skip */
        }
      }
    }
  }

  if (mode === "fiji") {
    if (!map.getSource("fiji-glow")) {
      map.addSource("fiji-glow", { type: "geojson", data: FIJI_REGION_GLOW });
      map.addLayer({
        id: "fiji-glow-fill",
        type: "fill",
        source: "fiji-glow",
        paint: { "fill-color": "#c5a44e", "fill-opacity": 0.07 },
      });
      map.addLayer({
        id: "fiji-glow-border",
        type: "line",
        source: "fiji-glow",
        paint: {
          "line-color": "#c5a44e",
          "line-width": 1.4,
          "line-opacity": 0.4,
        },
      });
    }
    setupFijiPinLayers(map);
  }
}

export function applyGlobePitch(map: MaplibreMap) {
  const z = map.getZoom();
  const targetPitch = z >= 8 ? 32 : z >= 5 ? 18 : 0;
  if (Math.abs(map.getPitch() - targetPitch) > 2) {
    map.easeTo({ pitch: targetPitch, duration: 700 });
  }
}

export function bindFijiPinInteractions(
  map: MaplibreMap,
  onSelect: (slug: string) => void,
) {
  const layers = ["fiji-pins-hit", "fiji-pins-dot"];

  for (const layer of layers) {
    map.on("click", layer, (e) => {
      const slug = e.features?.[0]?.properties?.slug as string | undefined;
      if (slug) onSelect(slug);
    });
    map.on("mouseenter", layer, () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", layer, () => {
      map.getCanvas().style.cursor = "";
    });
  }
}
