import * as THREE from "three";

export const GLOBE_RADIUS = 1;
export const FIJI_CENTER = { lat: -17.85, lng: 178.05 } as const;

/** Lat/lng (degrees) → point on sphere surface */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius = GLOBE_RADIUS,
): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Surface normal at lat/lng */
export function latLngToNormal(lat: number, lng: number): THREE.Vector3 {
  return latLngToVector3(lat, lng, 1).normalize();
}

/** Great-circle distance in km */
export function greatCircleDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = THREE.MathUtils.degToRad(lat2 - lat1);
  const dLng = THREE.MathUtils.degToRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(THREE.MathUtils.degToRad(lat1)) *
      Math.cos(THREE.MathUtils.degToRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Bearing from point A to B (degrees, 0 = north) */
export function bearingDegrees(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const φ1 = THREE.MathUtils.degToRad(lat1);
  const φ2 = THREE.MathUtils.degToRad(lat2);
  const Δλ = THREE.MathUtils.degToRad(lng2 - lng1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (THREE.MathUtils.radToDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Approximate lat/lng at camera look-at on globe */
export function vector3ToLatLng(v: THREE.Vector3): { lat: number; lng: number } {
  const n = v.clone().normalize();
  const lat = 90 - THREE.MathUtils.radToDeg(Math.acos(n.y));
  const lng = THREE.MathUtils.radToDeg(Math.atan2(n.z, -n.x)) - 180;
  return { lat, lng: ((lng + 540) % 360) - 180 };
}

/** Camera distance → zoom tier for responsive UI */
export function cameraDistanceToZoomTier(dist: number): "world" | "region" | "fiji" | "close" {
  if (dist > 3.2) return "world";
  if (dist > 2.4) return "region";
  if (dist > 1.85) return "fiji";
  return "close";
}

/** Ideal camera position facing a lat/lng */
export function cameraPositionForLatLng(
  lat: number,
  lng: number,
  distance: number,
): THREE.Vector3 {
  return latLngToVector3(lat, lng, 1).normalize().multiplyScalar(distance);
}
