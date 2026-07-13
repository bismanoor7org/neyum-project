"use client";

import { useEffect, useRef } from "react";
import { useWorldExplorer } from "@/components/map/WorldExplorerContext";
import { getFijiGuideFromView } from "@/lib/world-map-search";

/** Pins the distance badge to the visitor's location on compact/home maps */
export function WorldExplorerUserDistance() {
  const {
    mapActivated,
    fullscreenTravel,
    setUserReferenceLocation,
    getUserReferenceLocation,
    setView,
  } = useWorldExplorer();
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (!mapActivated || fullscreenTravel || attemptedRef.current) return;
    if (getUserReferenceLocation()) return;
    if (!navigator.geolocation) return;

    attemptedRef.current = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserReferenceLocation({ lat, lng });
        const guide = getFijiGuideFromView(lat, lng);
        setView((prev) => ({
          ...prev,
          fijiDistanceKm: guide.distanceKm,
          fijiBearing: guide.bearing,
        }));
      },
      () => {},
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }, [
    mapActivated,
    fullscreenTravel,
    setUserReferenceLocation,
    getUserReferenceLocation,
    setView,
  ]);

  return null;
}
