"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildTravelPlan,
  type FijiTravelDestinationSlug,
  type GeoPoint,
  type TravelIntelligencePlan,
} from "@/lib/fiji-travel-intelligence";
import { searchWorldMap, type MapSearchResult } from "@/lib/world-map-search";

type LocationStatus = "idle" | "loading" | "ready" | "error";

interface FijiTravelIntelligenceContextValue {
  userLocation: GeoPoint | null;
  locationStatus: LocationStatus;
  locationError: string | null;
  destinationSlug: FijiTravelDestinationSlug;
  travelPlan: TravelIntelligencePlan | null;
  locationQuery: string;
  setLocationQuery: (q: string) => void;
  locationResults: MapSearchResult[];
  detectUserLocation: () => void;
  selectLocationResult: (result: MapSearchResult) => void;
  selectDestination: (slug: FijiTravelDestinationSlug) => void;
  clearUserLocation: () => void;
}

const FijiTravelIntelligenceContext =
  createContext<FijiTravelIntelligenceContextValue | null>(null);

const DEFAULT_DESTINATION: FijiTravelDestinationSlug = "nadi";

function formatCoordsLabel(lat: number, lng: number) {
  return `Your location (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`;
}

export function FijiTravelIntelligenceProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<GeoPoint | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [destinationSlug, setDestinationSlug] =
    useState<FijiTravelDestinationSlug>(DEFAULT_DESTINATION);
  const [locationQuery, setLocationQuery] = useState("");

  const locationResults = useMemo(
    () => (locationQuery.trim().length >= 2 ? searchWorldMap(locationQuery, 6) : []),
    [locationQuery],
  );

  const travelPlan = useMemo(() => {
    if (!userLocation) return null;
    return buildTravelPlan(userLocation, destinationSlug);
  }, [userLocation, destinationSlug]);

  const detectUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Geolocation is not supported in this browser.");
      return;
    }

    setLocationStatus("loading");
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({
          lat,
          lng,
          label: formatCoordsLabel(lat, lng),
        });
        setLocationStatus("ready");
        setLocationQuery("");
      },
      (err) => {
        setLocationStatus("error");
        setLocationError(
          err.code === 1
            ? "Location permission denied. Search for your city instead."
            : "Unable to detect location. Search for your city instead.",
        );
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 },
    );
  }, []);

  const selectLocationResult = useCallback((result: MapSearchResult) => {
    const label = result.subtitle ? `${result.name}, ${result.subtitle}` : result.name;
    setUserLocation({ lat: result.lat, lng: result.lng, label });
    setLocationStatus("ready");
    setLocationError(null);
    setLocationQuery(label);
  }, []);

  const selectDestination = useCallback((slug: FijiTravelDestinationSlug) => {
    setDestinationSlug(slug);
  }, []);

  const clearUserLocation = useCallback(() => {
    setUserLocation(null);
    setLocationStatus("idle");
    setLocationError(null);
    setLocationQuery("");
  }, []);

  const value = useMemo(
    () => ({
      userLocation,
      locationStatus,
      locationError,
      destinationSlug,
      travelPlan,
      locationQuery,
      setLocationQuery,
      locationResults,
      detectUserLocation,
      selectLocationResult,
      selectDestination,
      clearUserLocation,
    }),
    [
      userLocation,
      locationStatus,
      locationError,
      destinationSlug,
      travelPlan,
      locationQuery,
      locationResults,
      detectUserLocation,
      selectLocationResult,
      selectDestination,
      clearUserLocation,
    ],
  );

  return (
    <FijiTravelIntelligenceContext.Provider value={value}>
      {children}
    </FijiTravelIntelligenceContext.Provider>
  );
}

export function useFijiTravelIntelligence() {
  const ctx = useContext(FijiTravelIntelligenceContext);
  if (!ctx) {
    throw new Error(
      "useFijiTravelIntelligence must be used within FijiTravelIntelligenceProvider",
    );
  }
  return ctx;
}
