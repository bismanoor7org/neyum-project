import type { FeatureCollection } from "geojson";
import type { Map as MaplibreMap } from "maplibre-gl";
import {
  applyGlobePitch,
  applyLuxuryGlobeStyle,
  FIJI_VECTOR_STYLE_URL,
} from "@/lib/fiji-map-globe-style";
import { countryIndex } from "@/lib/content/world/country-index";

export { FIJI_VECTOR_STYLE_URL, applyGlobePitch, applyLuxuryGlobeStyle };

export const WORLD_PINS_SOURCE = "world-destination-pins";

export function buildWorldPinsGeoJSON(active: string): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: countryIndex.map((c) => ({
      type: "Feature",
      properties: { slug: c.slug, active: c.slug === active },
      geometry: { type: "Point", coordinates: [c.lng, c.lat] },
    })),
  };
}

export function setupWorldPinLayers(map: MaplibreMap) {
  if (map.getSource(WORLD_PINS_SOURCE)) return;

  map.addSource(WORLD_PINS_SOURCE, {
    type: "geojson",
    data: buildWorldPinsGeoJSON(""),
  });

  const inactiveDotRadius = 4;
  const activeDotRadius = 6.5;
  const shadowRadius = ["case", ["boolean", ["get", "active"], false], 7.5, 4.8];
  const shineRadius = 2.4;

  map.addLayer({
    id: "world-pins-shadow",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    paint: {
      "circle-radius": shadowRadius as maplibregl.ExpressionSpecification,
      "circle-color": "#0c3238",
      "circle-blur": ["case", ["boolean", ["get", "active"], false], 0.85, 0.65],
      "circle-opacity": ["case", ["boolean", ["get", "active"], false], 0.55, 0.32],
      "circle-translate": [
        "case",
        ["boolean", ["get", "active"], false],
        ["literal", [0, 3.5]],
        ["literal", [0, 1.8]],
      ],
      "circle-translate-anchor": "viewport",
    },
  });

  map.addLayer({
    id: "world-pins-pulse",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": 18,
      "circle-color": "#c5a44e",
      "circle-opacity": 0.35,
      "circle-blur": 0.5,
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });

  map.addLayer({
    id: "world-pins-hit",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    paint: {
      "circle-radius": 12,
      "circle-color": "rgba(0,0,0,0)",
    },
  });

  map.addLayer({
    id: "world-pins-dot",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    filter: ["!=", ["get", "active"], true],
    paint: {
      "circle-radius": inactiveDotRadius,
      "circle-color": "#ffffff",
      "circle-stroke-width": 1.5,
      "circle-stroke-color": "#0c3238",
      "circle-opacity": 0.92,
    },
  });

  map.addLayer({
    id: "world-pins-dot-active",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": activeDotRadius,
      "circle-color": "#d4af37",
      "circle-stroke-width": 2.5,
      "circle-stroke-color": "#8a6f2a",
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });

  map.addLayer({
    id: "world-pins-rim",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": activeDotRadius,
      "circle-color": "rgba(0,0,0,0)",
      "circle-stroke-width": 1.5,
      "circle-stroke-color": "rgba(255,255,255,0.42)",
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });

  map.addLayer({
    id: "world-pins-shine",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    filter: ["==", ["get", "active"], true],
    paint: {
      "circle-radius": shineRadius,
      "circle-color": "rgba(255,255,255,0.92)",
      "circle-blur": 0.12,
      "circle-translate": ["literal", [-1.6, -1.6]],
      "circle-translate-anchor": "viewport",
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "viewport",
    },
  });
}

export function updateWorldPins(map: MaplibreMap, active: string) {
  const src = map.getSource(WORLD_PINS_SOURCE) as maplibregl.GeoJSONSource | undefined;
  if (src) src.setData(buildWorldPinsGeoJSON(active));
}

export function applyWorldGlobeStyle(map: MaplibreMap) {
  applyLuxuryGlobeStyle(map, "world");
  setupWorldPinLayers(map);
}

export function bindWorldPinInteractions(
  map: MaplibreMap,
  onSelect: (slug: string) => void,
) {
  const layers = ["world-pins-hit", "world-pins-dot"];
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

export const WORLD_MAP_CENTER = { lng: 20, lat: 20 };
export const WORLD_MAP_DEFAULT_ZOOM = 1.8;
