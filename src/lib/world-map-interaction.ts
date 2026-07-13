import type { Map as MaplibreMap } from "maplibre-gl";

/** Disable gesture handlers so page scroll is not captured by the map canvas. */
export function lockMapInteractions(map: MaplibreMap) {
  map.scrollZoom.disable();
  map.boxZoom.disable();
  map.dragRotate.disable();
  map.dragPan.disable();
  map.keyboard.disable();
  map.doubleClickZoom.disable();
  map.touchZoomRotate.disable();
}

/** Restore full map pan, zoom, and touch gestures after intentional activation. */
export function unlockMapInteractions(map: MaplibreMap) {
  map.scrollZoom.enable();
  map.boxZoom.enable();
  map.dragRotate.enable();
  map.dragPan.enable();
  map.keyboard.enable();
  map.doubleClickZoom.enable();
  map.touchZoomRotate.enable();
}
