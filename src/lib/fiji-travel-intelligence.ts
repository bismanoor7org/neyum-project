import type { FeatureCollection, LineString, Point } from "geojson";
import { FIJI_DESTINATION_COORDS } from "@/lib/fiji-map";
import { bearingDegrees, greatCircleDistanceKm } from "@/lib/fiji-globe-math";

export const NAN_AIRPORT = {
  name: "Nadi International Airport",
  iata: "NAN",
  lat: -17.7554,
  lng: 177.4434,
} as const;

export const FIJI_TRAVEL_DESTINATION_SLUGS = [
  "nadi",
  "denarau",
  "coral-coast",
  "mamanuca",
  "yasawa",
] as const;

export type FijiTravelDestinationSlug = (typeof FIJI_TRAVEL_DESTINATION_SLUGS)[number];

export const FIJI_TRAVEL_DESTINATION_LABELS: Record<FijiTravelDestinationSlug, string> = {
  nadi: "Nadi",
  denarau: "Denarau",
  "coral-coast": "Coral Coast",
  mamanuca: "Mamanuca Islands",
  yasawa: "Yasawa Islands",
};

export interface GeoPoint {
  lat: number;
  lng: number;
  label: string;
}

export interface TravelIntelligencePlan {
  user: GeoPoint;
  destination: GeoPoint & { slug: FijiTravelDestinationSlug };
  distanceKm: number;
  flightDistanceKm: number;
  transferDistanceKm: number;
  estimatedFlightHours: number;
  estimatedFlightLabel: string;
  estimatedTransferMinutes: number;
  estimatedTransferLabel: string;
  totalTravelLabel: string;
  nearestAirport: typeof NAN_AIRPORT;
  suggestedRoute: string;
  routeSummary: string;
}

const CRUISE_SPEED_KMH = 850;
const GROUND_TIME_HOURS = 0.75;
const TRANSFER_SPEED_KMH = 45;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

/** Great-circle arc as GeoJSON coordinates [lng, lat] */
export function interpolateGreatCircle(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  steps = 48,
): [number, number][] {
  const φ1 = toRad(lat1);
  const λ1 = toRad(lng1);
  const φ2 = toRad(lat2);
  const λ2 = toRad(lng2);

  const sinΔφ = Math.sin((φ2 - φ1) / 2);
  const sinΔλ = Math.sin((λ2 - λ1) / 2);
  const a =
    sinΔφ * sinΔφ + Math.cos(φ1) * Math.cos(φ2) * sinΔλ * sinΔλ;
  const δ = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  if (δ < 1e-6) return [[lng1, lat1], [lng2, lat2]];

  const out: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const A = Math.sin((1 - f) * δ) / Math.sin(δ);
    const B = Math.sin(f * δ) / Math.sin(δ);
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);
    const lat = toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)));
    const lng = toDeg(Math.atan2(y, x));
    out.push([lng, lat]);
  }
  return out;
}

function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 100) return `${Math.round(km)} km`;
  return `${km.toLocaleString(undefined, { maximumFractionDigits: 0 })} km`;
}

export function getDestinationCoords(slug: FijiTravelDestinationSlug) {
  const coords = FIJI_DESTINATION_COORDS[slug];
  if (!coords) return null;
  return {
    slug,
    lat: coords.lat,
    lng: coords.lng,
    label: FIJI_TRAVEL_DESTINATION_LABELS[slug],
  };
}

export function buildTravelPlan(
  user: GeoPoint,
  destinationSlug: FijiTravelDestinationSlug,
): TravelIntelligencePlan | null {
  const dest = getDestinationCoords(destinationSlug);
  if (!dest) return null;

  const flightDistanceKm = greatCircleDistanceKm(
    user.lat,
    user.lng,
    NAN_AIRPORT.lat,
    NAN_AIRPORT.lng,
  );
  const transferDistanceKm = greatCircleDistanceKm(
    NAN_AIRPORT.lat,
    NAN_AIRPORT.lng,
    dest.lat,
    dest.lng,
  );
  const distanceKm = greatCircleDistanceKm(user.lat, user.lng, dest.lat, dest.lng);

  const flightHours = flightDistanceKm / CRUISE_SPEED_KMH + GROUND_TIME_HOURS;
  const transferMinutes = Math.max(15, Math.round((transferDistanceKm / TRANSFER_SPEED_KMH) * 60));
  const totalHours = flightHours + transferMinutes / 60;

  const bearing = Math.round(
    bearingDegrees(user.lat, user.lng, dest.lat, dest.lng),
  );

  return {
    user,
    destination: dest,
    distanceKm,
    flightDistanceKm,
    transferDistanceKm,
    estimatedFlightHours: flightHours,
    estimatedFlightLabel: formatDuration(flightHours),
    estimatedTransferMinutes: transferMinutes,
    estimatedTransferLabel: `${transferMinutes} min`,
    totalTravelLabel: formatDuration(totalHours),
    nearestAirport: NAN_AIRPORT,
    suggestedRoute: `${user.label} → ${NAN_AIRPORT.iata} → ${dest.label}`,
    routeSummary: `${formatDistance(distanceKm)} direct · ~${formatDuration(totalHours)} via ${NAN_AIRPORT.iata} · bearing ${bearing}°`,
  };
}

export interface TravelRouteGeoJSON {
  route: FeatureCollection<LineString>;
  user: FeatureCollection<Point>;
  airport: FeatureCollection<Point>;
  destination: FeatureCollection<Point>;
  bounds: [[number, number], [number, number]];
}

export function buildTravelRouteGeoJSON(plan: TravelIntelligencePlan): TravelRouteGeoJSON {
  const leg1 = interpolateGreatCircle(
    plan.user.lat,
    plan.user.lng,
    NAN_AIRPORT.lat,
    NAN_AIRPORT.lng,
  );
  const leg2 = interpolateGreatCircle(
    NAN_AIRPORT.lat,
    NAN_AIRPORT.lng,
    plan.destination.lat,
    plan.destination.lng,
  );

  const allCoords = [...leg1, ...leg2.slice(1)];
  const lngs = allCoords.map((c) => c[0]);
  const lats = allCoords.map((c) => c[1]);

  return {
    route: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { leg: "full" },
          geometry: { type: "LineString", coordinates: allCoords },
        },
        {
          type: "Feature",
          properties: { leg: "flight" },
          geometry: { type: "LineString", coordinates: leg1 },
        },
        {
          type: "Feature",
          properties: { leg: "transfer" },
          geometry: { type: "LineString", coordinates: leg2 },
        },
      ],
    },
    user: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { role: "user", label: plan.user.label },
          geometry: {
            type: "Point",
            coordinates: [plan.user.lng, plan.user.lat],
          },
        },
      ],
    },
    airport: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { role: "airport", label: NAN_AIRPORT.iata },
          geometry: {
            type: "Point",
            coordinates: [NAN_AIRPORT.lng, NAN_AIRPORT.lat],
          },
        },
      ],
    },
    destination: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { role: "destination", label: plan.destination.label },
          geometry: {
            type: "Point",
            coordinates: [plan.destination.lng, plan.destination.lat],
          },
        },
      ],
    },
    bounds: [
      [Math.min(...lngs) - 2, Math.min(...lats) - 2],
      [Math.max(...lngs) + 2, Math.max(...lats) + 2],
    ],
  };
}
