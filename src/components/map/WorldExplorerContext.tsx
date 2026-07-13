"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { TravelIntelligencePlan } from "@/lib/fiji-travel-intelligence";
import { getFijiGuideFromView, isViewNearFiji } from "@/lib/world-map-search";

export interface WorldExplorerViewState {
  centerLat: number;
  centerLng: number;
  zoom: number;
  nearFiji: boolean;
  fijiDistanceKm: number;
  fijiBearing: number;
}

interface MapInteractionHandlers {
  lock: () => void;
  unlock: () => void;
}

interface WorldExplorerContextValue {
  activeFijiSlug: string;
  setActiveFijiSlug: (slug: string) => void;
  view: WorldExplorerViewState;
  setView: Dispatch<SetStateAction<WorldExplorerViewState>>;
  mapActivated: boolean;
  activateMap: () => void;
  lockMap: () => void;
  flyTo: (lat: number, lng: number, zoom: number) => void;
  returnToFiji: () => void;
  resetToDefaultFiji: () => void;
  highlightLocation: (lat: number, lng: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  registerFly: (fn: (lat: number, lng: number, zoom: number) => void) => void;
  registerHighlight: (fn: (lat: number, lng: number) => void) => void;
  registerZoom: (handlers: { zoomIn: () => void; zoomOut: () => void }) => void;
  registerInteraction: (handlers: MapInteractionHandlers) => void;
  registerMapReset: (fn: (slug: string) => void) => void;
  registerSearchReset: (fn: () => void) => void;
  registerTravelRoute: (
    fn: (plan: TravelIntelligencePlan | null) => void,
  ) => void;
  notifyTravelRoute: (plan: TravelIntelligencePlan | null) => void;
  setFocusLocation: (lat: number, lng: number) => void;
  clearFocusLocation: () => void;
  getFocusLocation: () => { lat: number; lng: number } | null;
  setUserReferenceLocation: (point: { lat: number; lng: number } | null) => void;
  getUserReferenceLocation: () => { lat: number; lng: number } | null;
  compact: boolean;
  fullscreenTravel: boolean;
  flyToActiveOnMount: boolean;
}

const defaultView: WorldExplorerViewState = {
  centerLat: -17.85,
  centerLng: 178.05,
  zoom: 6.35,
  nearFiji: true,
  fijiDistanceKm: 0,
  fijiBearing: 0,
};

const WorldExplorerContext = createContext<WorldExplorerContextValue | null>(null);

/** Distance badge origin: pinned user location → search focus → map center */
export function resolveDistanceOrigin(
  userReference: { lat: number; lng: number } | null,
  focusLocation: { lat: number; lng: number } | null,
  mapCenter: { lat: number; lng: number },
) {
  return userReference ?? focusLocation ?? mapCenter;
}

export function WorldExplorerProvider({
  children,
  initialFijiSlug,
  compact = false,
  fullscreenTravel = false,
  flyToActiveOnMount = false,
}: {
  children: ReactNode;
  initialFijiSlug: string;
  compact?: boolean;
  fullscreenTravel?: boolean;
  flyToActiveOnMount?: boolean;
}) {
  const [activeFijiSlug, setActiveFijiSlug] = useState(initialFijiSlug);
  const [view, setView] = useState(defaultView);
  const [mapActivated, setMapActivated] = useState(false);
  const flyRef = useRef<((lat: number, lng: number, zoom: number) => void) | null>(null);
  const highlightRef = useRef<((lat: number, lng: number) => void) | null>(null);
  const zoomRef = useRef<{ zoomIn: () => void; zoomOut: () => void } | null>(null);
  const interactionRef = useRef<MapInteractionHandlers | null>(null);
  const mapResetRef = useRef<((slug: string) => void) | null>(null);
  const searchResetRef = useRef<(() => void) | null>(null);
  const travelRouteRef = useRef<((plan: TravelIntelligencePlan | null) => void) | null>(
    null,
  );
  const lastTravelPlanRef = useRef<TravelIntelligencePlan | null>(null);
  const defaultFijiSlugRef = useRef(initialFijiSlug);
  const focusLocationRef = useRef<{ lat: number; lng: number } | null>(null);
  const userReferenceLocationRef = useRef<{ lat: number; lng: number } | null>(null);

  const activateMap = useCallback(() => {
    setMapActivated(true);
    interactionRef.current?.unlock();
  }, []);

  const lockMap = useCallback(() => {
    setMapActivated(false);
    interactionRef.current?.lock();
  }, []);

  const registerInteraction = useCallback((handlers: MapInteractionHandlers) => {
    interactionRef.current = handlers;
  }, []);

  const registerMapReset = useCallback((fn: (slug: string) => void) => {
    mapResetRef.current = fn;
  }, []);

  const registerSearchReset = useCallback((fn: () => void) => {
    searchResetRef.current = fn;
  }, []);

  const registerTravelRoute = useCallback(
    (fn: (plan: TravelIntelligencePlan | null) => void) => {
      travelRouteRef.current = fn;
      fn(lastTravelPlanRef.current);
    },
    [],
  );

  const notifyTravelRoute = useCallback((plan: TravelIntelligencePlan | null) => {
    lastTravelPlanRef.current = plan;
    travelRouteRef.current?.(plan);
  }, []);

  const registerFly = useCallback((fn: (lat: number, lng: number, zoom: number) => void) => {
    flyRef.current = fn;
  }, []);

  const registerHighlight = useCallback((fn: (lat: number, lng: number) => void) => {
    highlightRef.current = fn;
  }, []);

  const registerZoom = useCallback((handlers: { zoomIn: () => void; zoomOut: () => void }) => {
    zoomRef.current = handlers;
  }, []);

  const setFocusLocation = useCallback((lat: number, lng: number) => {
    focusLocationRef.current = { lat, lng };
  }, []);

  const clearFocusLocation = useCallback(() => {
    focusLocationRef.current = null;
  }, []);

  const getFocusLocation = useCallback(() => focusLocationRef.current, []);

  const setUserReferenceLocation = useCallback(
    (point: { lat: number; lng: number } | null) => {
      userReferenceLocationRef.current = point;
    },
    [],
  );

  const getUserReferenceLocation = useCallback(
    () => userReferenceLocationRef.current,
    [],
  );

  const flyTo = useCallback((lat: number, lng: number, zoom: number) => {
    setMapActivated(true);
    interactionRef.current?.unlock();
    focusLocationRef.current = { lat, lng };
    const origin = resolveDistanceOrigin(
      userReferenceLocationRef.current,
      focusLocationRef.current,
      { lat, lng },
    );
    const guide = getFijiGuideFromView(origin.lat, origin.lng);
    setView((prev) => ({
      ...prev,
      fijiDistanceKm: guide.distanceKm,
      fijiBearing: guide.bearing,
      nearFiji: isViewNearFiji(lat, lng, zoom),
    }));
    flyRef.current?.(lat, lng, zoom);
  }, []);

  const highlightLocation = useCallback((lat: number, lng: number) => {
    highlightRef.current?.(lat, lng);
  }, []);

  const zoomIn = useCallback(() => {
    setMapActivated(true);
    interactionRef.current?.unlock();
    zoomRef.current?.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    setMapActivated(true);
    interactionRef.current?.unlock();
    zoomRef.current?.zoomOut();
  }, []);

  const returnToFiji = useCallback(() => {
    setMapActivated(true);
    interactionRef.current?.unlock();
    focusLocationRef.current = null;
    flyRef.current?.(-17.85, 178.05, compact ? 6.35 : 6.2);
  }, [compact]);

  const resetToDefaultFiji = useCallback(() => {
    const slug = defaultFijiSlugRef.current;
    setMapActivated(false);
    interactionRef.current?.lock();
    focusLocationRef.current = null;
    userReferenceLocationRef.current = null;
    setView(defaultView);
    mapResetRef.current?.(slug);
    searchResetRef.current?.();
    setActiveFijiSlug(slug);
  }, []);

  const value = useMemo(
    () => ({
      activeFijiSlug,
      setActiveFijiSlug,
      view,
      setView,
      mapActivated,
      activateMap,
      lockMap,
      flyTo,
      returnToFiji,
      resetToDefaultFiji,
      highlightLocation,
      zoomIn,
      zoomOut,
      registerFly,
      registerHighlight,
      registerZoom,
      registerInteraction,
      registerMapReset,
      registerSearchReset,
      registerTravelRoute,
      notifyTravelRoute,
      setFocusLocation,
      clearFocusLocation,
      getFocusLocation,
      setUserReferenceLocation,
      getUserReferenceLocation,
      compact,
      fullscreenTravel,
      flyToActiveOnMount,
    }),
    [activeFijiSlug, view, mapActivated, activateMap, lockMap, flyTo, returnToFiji, resetToDefaultFiji, highlightLocation, zoomIn, zoomOut, registerFly, registerHighlight, registerZoom, registerInteraction, registerMapReset, registerSearchReset, registerTravelRoute, notifyTravelRoute, setFocusLocation, clearFocusLocation, getFocusLocation, setUserReferenceLocation, getUserReferenceLocation, compact, fullscreenTravel, flyToActiveOnMount],
  );

  return (
    <WorldExplorerContext.Provider value={value}>{children}</WorldExplorerContext.Provider>
  );
}

export function useWorldExplorer() {
  const ctx = useContext(WorldExplorerContext);
  if (!ctx) throw new Error("useWorldExplorer must be used within WorldExplorerProvider");
  return ctx;
}
