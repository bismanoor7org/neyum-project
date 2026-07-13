import type { FeatureCollection } from "geojson";
import type { Map as MaplibreMap } from "maplibre-gl";

export const SEARCH_HIGHLIGHT_SOURCE = "search-highlight-pin";

let highlightTimer: ReturnType<typeof setTimeout> | null = null;

function buildHighlightGeoJSON(lng: number, lat: number): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: { type: "Point", coordinates: [lng, lat] },
      },
    ],
  };
}

export function setupSearchHighlightLayers(map: MaplibreMap) {
  if (map.getSource(SEARCH_HIGHLIGHT_SOURCE)) return;

  map.addSource(SEARCH_HIGHLIGHT_SOURCE, {
    type: "geojson",
    data: buildHighlightGeoJSON(0, 0),
  });

  map.addLayer({
    id: "search-highlight-pulse",
    type: "circle",
    source: SEARCH_HIGHLIGHT_SOURCE,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        16,
        8,
        28,
        12,
        36,
      ],
      "circle-color": "#c5a44e",
      "circle-opacity": 0.45,
      "circle-blur": 0.4,
    },
  });

  map.addLayer({
    id: "search-highlight-dot",
    type: "circle",
    source: SEARCH_HIGHLIGHT_SOURCE,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        6,
        8,
        9,
        12,
        12,
      ],
      "circle-color": "#c5a44e",
      "circle-stroke-width": 2.5,
      "circle-stroke-color": "#ffffff",
    },
  });

  map.setLayoutProperty("search-highlight-pulse", "visibility", "none");
  map.setLayoutProperty("search-highlight-dot", "visibility", "none");
}

export function showSearchHighlight(map: MaplibreMap, lat: number, lng: number) {
  setupSearchHighlightLayers(map);

  const src = map.getSource(SEARCH_HIGHLIGHT_SOURCE) as maplibregl.GeoJSONSource;
  if (src) src.setData(buildHighlightGeoJSON(lng, lat));

  map.setLayoutProperty("search-highlight-pulse", "visibility", "visible");
  map.setLayoutProperty("search-highlight-dot", "visibility", "visible");

  if (highlightTimer) clearTimeout(highlightTimer);
  highlightTimer = setTimeout(() => hideSearchHighlight(map), 4500);
}

export function hideSearchHighlight(map: MaplibreMap) {
  if (!map.getLayer("search-highlight-pulse")) return;
  map.setLayoutProperty("search-highlight-pulse", "visibility", "none");
  map.setLayoutProperty("search-highlight-dot", "visibility", "none");
}
