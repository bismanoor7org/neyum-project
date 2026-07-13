"use client";

import { useEffect } from "react";
import { useFijiTravelIntelligence } from "@/components/map/FijiTravelIntelligenceProvider";
import { useWorldExplorer } from "@/components/map/WorldExplorerContext";
import { getFijiGuideFromView } from "@/lib/world-map-search";

/** Syncs travel intelligence state to map route layers — fullscreen map only */
export function FijiFullscreenTravelBridge() {
  const { travelPlan, destinationSlug, userLocation } = useFijiTravelIntelligence();
  const { notifyTravelRoute, setActiveFijiSlug, setUserReferenceLocation, setView } =
    useWorldExplorer();

  useEffect(() => {
    notifyTravelRoute(travelPlan);
  }, [travelPlan, notifyTravelRoute]);

  useEffect(() => {
    setActiveFijiSlug(destinationSlug);
  }, [destinationSlug, setActiveFijiSlug]);

  useEffect(() => {
    if (!userLocation) {
      setUserReferenceLocation(null);
      return;
    }

    setUserReferenceLocation({ lat: userLocation.lat, lng: userLocation.lng });
    const guide = getFijiGuideFromView(userLocation.lat, userLocation.lng);
    setView((prev) => ({
      ...prev,
      fijiDistanceKm: guide.distanceKm,
      fijiBearing: guide.bearing,
    }));
  }, [userLocation, setUserReferenceLocation, setView]);

  return null;
}
