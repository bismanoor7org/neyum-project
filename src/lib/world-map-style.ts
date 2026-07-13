import type { FeatureCollection } from "geojson";
import type { Map as MaplibreMap } from "maplibre-gl";
import { setupSearchHighlightLayers } from "@/lib/world-map-search-highlight";
import { countryIndex } from "@/lib/content/world/country-index";
import {
  buildFijiPinsGeoJSON,
  FIJI_PINS_SOURCE,
  FIJI_REGION_GLOW,
  FIJI_VECTOR_STYLE_URL,
  setupFijiPinLayers,
  updateFijiPins,
  removeFijiActivePinPulse,
} from "@/lib/fiji-map-globe-style";

export { FIJI_VECTOR_STYLE_URL, updateFijiPins, removeFijiActivePinPulse, FIJI_PINS_SOURCE };

export const WORLD_PINS_SOURCE = "world-country-pins";

const HIDE_CLUTTER_RE =
  /poi|housenum|building|road-label|transit|waterway-label|place_hamlet|place_suburb|place_other/i;
const COUNTRY_LABEL_RE = /place_country|place_continent/i;
const CITY_LABEL_RE =
  /place_city|place_town|place_capital|place_state|place_villages|place_suburbs/;
/** Patchy overlays — solid recolor causes block artifacts when zoomed in */
const LAND_OVERLAY_FILL_RE = /^(landcover|park_|landuse)/;

export function buildWorldPinsGeoJSON(): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: countryIndex
      .filter((c) => c.slug !== "fiji")
      .map((c) => ({
        type: "Feature",
        properties: { slug: c.slug, name: c.name },
        geometry: { type: "Point", coordinates: [c.lng, c.lat] },
      })),
  };
}

function setupWorldCountryPins(map: MaplibreMap) {
  if (map.getSource(WORLD_PINS_SOURCE)) return;

  map.addSource(WORLD_PINS_SOURCE, {
    type: "geojson",
    data: buildWorldPinsGeoJSON(),
  });

  map.addLayer({
    id: "world-pins-shadow",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    minzoom: 2,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2,
        4.2,
        5,
        5.2,
        8,
        6.5,
      ],
      "circle-color": "#0c3238",
      "circle-blur": 0.65,
      "circle-opacity": 0.3,
      "circle-translate": ["literal", [0, 1.6]],
      "circle-translate-anchor": "viewport",
    },
  });

  map.addLayer({
    id: "world-pins-dot",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    minzoom: 2,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2,
        3,
        5,
        4,
        8,
        5,
      ],
      "circle-color": "#ffffff",
      "circle-stroke-width": 1.25,
      "circle-stroke-color": "#0c3238",
      "circle-opacity": 0.92,
    },
  });

  map.addLayer({
    id: "world-pins-hit",
    type: "circle",
    source: WORLD_PINS_SOURCE,
    minzoom: 2,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2,
        8,
        5,
        10,
        8,
        12,
      ],
      "circle-color": "rgba(0,0,0,0)",
    },
  });
}

export type WorldExplorerMapTheme = "light" | "dark";

const WORLD_EXPLORER_THEME = {
  light: {
    fog: {
      color: "rgb(200, 225, 240)",
      "high-color": "rgb(120, 175, 195)",
      "horizon-blend": 0.08,
      "space-color": "rgb(230, 240, 248)",
      "star-intensity": 0.15,
    },
    light: {
      anchor: "viewport" as const,
      color: "#ffffff",
      intensity: 0.55,
      position: [1.2, 180, 60] as [number, number, number],
    },
    waterFill: "#6eb5c8",
    waterLine: "#4a9aad",
    landFill: "#f4f0e8",
    countryLabel: "#1a3d3e",
    countryHalo: "rgba(255,255,255,0.95)",
    cityLabel: "#2a4f50",
    cityHalo: "rgba(255,255,255,0.9)",
    pinFill: "#ffffff",
    pinStroke: "#0c3238",
  },
  dark: {
    fog: {
      color: "rgb(8, 27, 34)",
      "high-color": "rgb(22, 56, 71)",
      "horizon-blend": 0.12,
      "space-color": "rgb(8, 27, 34)",
      "star-intensity": 0.55,
    },
    light: {
      anchor: "viewport" as const,
      color: "#8eb4c4",
      intensity: 0.32,
      position: [1.2, 180, 60] as [number, number, number],
    },
    waterFill: "#081b22",
    waterLine: "#163847",
    landFill: "#112b39",
    countryLabel: "#ffffff",
    countryHalo: "rgba(8, 27, 34, 0.92)",
    cityLabel: "#9fb3c8",
    cityHalo: "rgba(8, 27, 34, 0.88)",
    pinFill: "#d4af37",
    pinStroke: "#081b22",
  },
} satisfies Record<
  WorldExplorerMapTheme,
  {
    fog: Record<string, unknown>;
    light: {
      anchor: "viewport";
      color: string;
      intensity: number;
      position: [number, number, number];
    };
    waterFill: string;
    waterLine: string;
    landFill: string;
    countryLabel: string;
    countryHalo: string;
    cityLabel: string;
    cityHalo: string;
    pinFill: string;
    pinStroke: string;
  }
>;

/** Balanced cartography — global explorer, Fiji featured; adapts to site theme */
export function applyBalancedWorldExplorerStyle(
  map: MaplibreMap,
  theme: WorldExplorerMapTheme = "light",
) {
  const preset = WORLD_EXPLORER_THEME[theme];

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
    ext.setFog?.(preset.fog);
    ext.setLight?.(preset.light);
  } catch {
    /* ignore */
  }

  const layers = map.getStyle()?.layers ?? [];

  for (const layer of layers) {
    const { id, type } = layer;

    if (id === "background" && type === "background") {
      try {
        map.setPaintProperty(id, "background-color", preset.landFill);
      } catch {
        /* skip */
      }
    }

    if (LAND_OVERLAY_FILL_RE.test(id) && type === "fill") {
      try {
        map.setLayoutProperty(id, "visibility", "none");
      } catch {
        /* skip */
      }
    }

    if (id.includes("water") && type === "fill") {
      try {
        map.setPaintProperty(id, "fill-color", preset.waterFill);
        map.setPaintProperty(id, "fill-opacity", theme === "dark" ? 0.88 : 0.92);
      } catch {
        /* skip */
      }
    }

    if (id.includes("water") && type === "line") {
      try {
        map.setPaintProperty(id, "line-color", preset.waterLine);
        map.setPaintProperty(id, "line-opacity", theme === "dark" ? 0.42 : 0.35);
      } catch {
        /* skip */
      }
    }

    if (id.includes("boundary_country") && type === "line") {
      try {
        map.setPaintProperty(id, "line-color", "#b8973a");
        map.setPaintProperty(id, "line-width", 0.75);
        map.setPaintProperty(id, "line-opacity", theme === "dark" ? 0.55 : 0.45);
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
          map.setLayoutProperty(id, "text-size", [
            "interpolate",
            ["linear"],
            ["zoom"],
            1,
            9,
            4,
            12,
            7,
            14,
          ]);
          map.setPaintProperty(id, "text-color", preset.countryLabel);
          map.setPaintProperty(id, "text-halo-color", preset.countryHalo);
          map.setPaintProperty(id, "text-halo-width", 1.8);
          map.setPaintProperty(id, "text-opacity", [
            "interpolate",
            ["linear"],
            ["zoom"],
            1,
            0.65,
            3,
            0.85,
            6,
            0.95,
          ]);
        } catch {
          /* skip */
        }
      }

      if (CITY_LABEL_RE.test(id)) {
        try {
          map.setLayoutProperty(id, "text-size", [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0,
            5,
            10,
            10,
            13,
          ]);
          map.setPaintProperty(id, "text-color", preset.cityLabel);
          map.setPaintProperty(id, "text-halo-color", preset.cityHalo);
          map.setPaintProperty(id, "text-halo-width", 1.4);
          map.setPaintProperty(id, "text-opacity", [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0,
            6,
            0.7,
            9,
            0.9,
          ]);
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
      paint: { "fill-color": "#c5a44e", "fill-opacity": 0.1 },
    });
    map.addLayer({
      id: "fiji-glow-border",
      type: "line",
      source: "fiji-glow",
      paint: {
        "line-color": "#c5a44e",
        "line-width": 2,
        "line-opacity": 0.5,
      },
    });
  }

  setupWorldCountryPins(map);
  setupFijiPinLayers(map, "section");
  setupSearchHighlightLayers(map);

  if (map.getLayer("world-pins-dot")) {
    try {
      map.setPaintProperty("world-pins-dot", "circle-color", preset.pinFill);
      map.setPaintProperty("world-pins-dot", "circle-stroke-color", preset.pinStroke);
    } catch {
      /* skip */
    }
  }
}

export function applyExplorerGlobePitch(map: MaplibreMap) {
  const z = map.getZoom();
  const targetPitch = z >= 8 ? 28 : z >= 5 ? 12 : z >= 3 ? 6 : 0;
  if (Math.abs(map.getPitch() - targetPitch) > 2) {
    map.easeTo({ pitch: targetPitch, duration: 600 });
  }
}

export function bindWorldPinInteractions(
  map: MaplibreMap,
  onCountrySelect: (slug: string) => void,
) {
  map.on("click", "world-pins-hit", (e) => {
    const slug = e.features?.[0]?.properties?.slug as string | undefined;
    if (slug) onCountrySelect(slug);
  });
  map.on("mouseenter", "world-pins-hit", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "world-pins-hit", () => {
    map.getCanvas().style.cursor = "";
  });
}

export function bindFijiPinClicks(
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
