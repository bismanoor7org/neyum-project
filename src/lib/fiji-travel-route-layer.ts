import type { Map as MaplibreMap } from "maplibre-gl";
import type { TravelRouteGeoJSON } from "@/lib/fiji-travel-intelligence";

export const TRAVEL_ROUTE_SOURCE = "travel-route-lines";
export const TRAVEL_USER_SOURCE = "travel-route-user";
export const TRAVEL_AIRPORT_SOURCE = "travel-route-airport";
export const TRAVEL_DEST_SOURCE = "travel-route-destination";

let animationFrame: number | null = null;
let animationPhase = 0;

function stopRouteAnimation() {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

function startRouteAnimation(map: MaplibreMap) {
  stopRouteAnimation();
  const tick = () => {
    if (!map.getLayer("travel-route-animated")) {
      stopRouteAnimation();
      return;
    }
    animationPhase += 0.04;
    const opacity = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(animationPhase));
    map.setPaintProperty("travel-route-animated", "line-opacity", opacity);
    animationFrame = requestAnimationFrame(tick);
  };
  animationFrame = requestAnimationFrame(tick);
}

export function setupTravelRouteLayers(map: MaplibreMap) {
  if (!map.getSource(TRAVEL_ROUTE_SOURCE)) {
    map.addSource(TRAVEL_ROUTE_SOURCE, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });

    map.addLayer({
      id: "travel-route-base",
      type: "line",
      source: TRAVEL_ROUTE_SOURCE,
      filter: ["==", ["get", "leg"], "full"],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#0c3238",
        "line-width": ["interpolate", ["linear"], ["zoom"], 2, 2, 6, 4, 10, 6],
        "line-opacity": 0.25,
      },
    });

    map.addLayer({
      id: "travel-route-animated",
      type: "line",
      source: TRAVEL_ROUTE_SOURCE,
      filter: ["==", ["get", "leg"], "full"],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#c5a44e",
        "line-width": ["interpolate", ["linear"], ["zoom"], 2, 2.5, 6, 4.5, 10, 7],
        "line-dasharray": [2, 2],
        "line-opacity": 0.85,
      },
    });

    map.addLayer({
      id: "travel-route-flight",
      type: "line",
      source: TRAVEL_ROUTE_SOURCE,
      filter: ["==", ["get", "leg"], "flight"],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#2ec4c4",
        "line-width": 2,
        "line-opacity": 0.5,
        "line-dasharray": [1.5, 1.5],
      },
    });
  }

  if (!map.getSource(TRAVEL_USER_SOURCE)) {
    map.addSource(TRAVEL_USER_SOURCE, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });
    map.addLayer({
      id: "travel-user-pulse",
      type: "circle",
      source: TRAVEL_USER_SOURCE,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 10, 8, 18],
        "circle-color": "#2ec4c4",
        "circle-opacity": 0.35,
        "circle-blur": 0.5,
      },
    });
    map.addLayer({
      id: "travel-user-dot",
      type: "circle",
      source: TRAVEL_USER_SOURCE,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 5, 8, 8],
        "circle-color": "#2ec4c4",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });
  }

  if (!map.getSource(TRAVEL_AIRPORT_SOURCE)) {
    map.addSource(TRAVEL_AIRPORT_SOURCE, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });
    map.addLayer({
      id: "travel-airport-dot",
      type: "circle",
      source: TRAVEL_AIRPORT_SOURCE,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 5, 8, 7],
        "circle-color": "#ffffff",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#0c3238",
      },
    });
  }

  if (!map.getSource(TRAVEL_DEST_SOURCE)) {
    map.addSource(TRAVEL_DEST_SOURCE, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });
    map.addLayer({
      id: "travel-dest-pulse",
      type: "circle",
      source: TRAVEL_DEST_SOURCE,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 12, 8, 22],
        "circle-color": "#c5a44e",
        "circle-opacity": 0.4,
        "circle-blur": 0.45,
      },
    });
    map.addLayer({
      id: "travel-dest-dot",
      type: "circle",
      source: TRAVEL_DEST_SOURCE,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 6, 8, 9],
        "circle-color": "#c5a44e",
        "circle-stroke-width": 2.5,
        "circle-stroke-color": "#ffffff",
      },
    });
  }
}

export function showTravelRoute(map: MaplibreMap, data: TravelRouteGeoJSON) {
  setupTravelRouteLayers(map);

  (map.getSource(TRAVEL_ROUTE_SOURCE) as import("maplibre-gl").GeoJSONSource)?.setData(data.route);
  (map.getSource(TRAVEL_USER_SOURCE) as import("maplibre-gl").GeoJSONSource)?.setData(data.user);
  (map.getSource(TRAVEL_AIRPORT_SOURCE) as import("maplibre-gl").GeoJSONSource)?.setData(
    data.airport,
  );
  (map.getSource(TRAVEL_DEST_SOURCE) as import("maplibre-gl").GeoJSONSource)?.setData(
    data.destination,
  );

  for (const id of [
    "travel-route-base",
    "travel-route-animated",
    "travel-route-flight",
    "travel-user-pulse",
    "travel-user-dot",
    "travel-airport-dot",
    "travel-dest-pulse",
    "travel-dest-dot",
  ]) {
    if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", "visible");
  }

  startRouteAnimation(map);
}

export function hideTravelRoute(map: MaplibreMap) {
  stopRouteAnimation();
  for (const id of [
    "travel-route-base",
    "travel-route-animated",
    "travel-route-flight",
    "travel-user-pulse",
    "travel-user-dot",
    "travel-airport-dot",
    "travel-dest-pulse",
    "travel-dest-dot",
  ]) {
    if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", "none");
  }
}

export function fitTravelRouteBounds(map: MaplibreMap, bounds: [[number, number], [number, number]]) {
  map.stop();
  map.fitBounds(bounds, { padding: 80, duration: 1400, maxZoom: 5.5 });
}
