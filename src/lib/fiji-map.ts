/** Fiji destination coordinates — pins ONLY on these spots */
export const FIJI_MAP_CENTER = { lat: -17.85, lng: 178.05 } as const;

/** Fiji archipelago — homepage section (flat, Fiji-only viewport) */
export const FIJI_SECTION_ZOOM = 6.35;
export const FIJI_SECTION_MIN_ZOOM = 5.6;
export const FIJI_SECTION_MAX_ZOOM = 9.2;

/** Lock pan/zoom to Fiji + surrounding Pacific */
export const FIJI_SECTION_MAX_BOUNDS: [[number, number], [number, number]] = [
  [176.42, -19.4],
  [180.28, -16.02],
];

/** World / globe view (explore-map page — still Fiji-anchored) */
export const FIJI_WORLD_ZOOM = 5.2;
export const FIJI_MAP_DEFAULT_ZOOM = FIJI_SECTION_ZOOM;
export const FIJI_MAP_FOCUS_ZOOM = 8.5;

export const FIJI_MAP_BOUNDS = {
  north: -16.15,
  south: -20.05,
  west: 176.75,
  east: 180.05,
} as const;

export const FIJI_DESTINATION_COORDS: Record<
  string,
  { lat: number; lng: number }
> = {
  mamanuca: { lat: -17.667, lng: 177.083 },
  yasawa: { lat: -16.829, lng: 177.414 },
  nadi: { lat: -17.799, lng: 177.416 },
  denarau: { lat: -17.773, lng: 177.376 },
  "coral-coast": { lat: -18.142, lng: 177.507 },
  "pacific-harbour": { lat: -18.261, lng: 178.066 },
  suva: { lat: -18.141, lng: 178.442 },
  taveuni: { lat: -16.951, lng: 179.869 },
  "vanua-levu": { lat: -16.626, lng: 179.398 },
  kadavu: { lat: -19.058, lng: 178.187 },
  savusavu: { lat: -16.782, lng: 179.33 },
  "beqa-island": { lat: -18.378, lng: 178.133 },
  "mana-island": { lat: -17.673, lng: 177.098 },
  "malolo-island": { lat: -17.761, lng: 177.159 },
  "tokoriki-island": { lat: -17.655, lng: 177.065 },
};

/** Google Maps embed — Fiji archipelago (no API key required) */
export const FIJI_GOOGLE_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2038158!2d177.2!3d-17.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6e2f7f2193810d45%3A0x4f1db8420d044104!2sFiji!5e0!3m2!1sen!2sus!4v1718450000000!5m2!1sen!2sus";

export function coordsToMapPercent(lat: number, lng: number) {
  const { north, south, west, east } = FIJI_MAP_BOUNDS;
  const top = ((north - lat) / (north - south)) * 100;
  const left = ((lng - west) / (east - west)) * 100;
  return {
    top: `${Math.min(88, Math.max(12, top)).toFixed(1)}%`,
    left: `${Math.min(88, Math.max(12, left)).toFixed(1)}%`,
  };
}

/** Focused embed when API key is configured (optional enhancement) */
export function getFijiMapEmbedUrl(activeSlug: string) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const coords = FIJI_DESTINATION_COORDS[activeSlug];
  if (key && coords) {
    return `https://www.google.com/maps/embed/v1/view?key=${encodeURIComponent(key)}&center=${coords.lat},${coords.lng}&zoom=9&maptype=roadmap`;
  }
  return FIJI_GOOGLE_MAP_EMBED;
}

export function getGoogleMapsApiKey() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
}

export function getGoogleMapsMapId() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? "";
}
