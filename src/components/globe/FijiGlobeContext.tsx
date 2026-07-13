"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export interface FijiGlobeCameraState {
  distance: number;
  viewLat: number;
  viewLng: number;
  fijiDistanceKm: number;
  fijiBearing: number;
  fijiScreenVisible: boolean;
  fijiScreenX: number;
  fijiScreenY: number;
  approachingFiji: boolean;
  zoomTier: "world" | "region" | "fiji" | "close";
}

interface FijiGlobeContextValue {
  activeSlug: string;
  hoveredSlug: string | null;
  setActiveSlug: (slug: string) => void;
  setHoveredSlug: (slug: string | null) => void;
  autoRotate: boolean;
  setAutoRotate: (v: boolean) => void;
  cameraState: FijiGlobeCameraState;
  setCameraState: (s: FijiGlobeCameraState) => void;
  flyToFiji: () => void;
  flyToDestination: (slug: string) => void;
  registerFlyHandler: (fn: (lat: number, lng: number, dist: number) => void) => void;
  registerControls: (controls: OrbitControlsImpl | null) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  compact: boolean;
}

const defaultCamera: FijiGlobeCameraState = {
  distance: 2.6,
  viewLat: 0,
  viewLng: 0,
  fijiDistanceKm: 0,
  fijiBearing: 0,
  fijiScreenVisible: true,
  fijiScreenX: 0.5,
  fijiScreenY: 0.5,
  approachingFiji: false,
  zoomTier: "fiji",
};

const FijiGlobeContext = createContext<FijiGlobeContextValue | null>(null);

export function FijiGlobeProvider({
  children,
  initialSlug,
  compact = false,
}: {
  children: ReactNode;
  initialSlug: string;
  compact?: boolean;
}) {
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(!compact);
  const [cameraState, setCameraState] = useState(defaultCamera);
  const flyHandlerRef = useRef<((lat: number, lng: number, dist: number) => void) | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const prevFijiDistRef = useRef(12000);

  const registerFlyHandler = useCallback(
    (fn: (lat: number, lng: number, dist: number) => void) => {
      flyHandlerRef.current = fn;
    },
    [],
  );

  const registerControls = useCallback((controls: OrbitControlsImpl | null) => {
    controlsRef.current = controls;
  }, []);

  const zoomIn = useCallback(() => {
    controlsRef.current?.dollyIn(1.25);
    controlsRef.current?.update();
  }, []);

  const zoomOut = useCallback(() => {
    controlsRef.current?.dollyOut(1.25);
    controlsRef.current?.update();
  }, []);

  const flyToFiji = useCallback(() => {
    flyHandlerRef.current?.(-17.85, 178.05, compact ? 2.0 : 1.75);
    setAutoRotate(false);
  }, [compact]);

  const flyToDestination = useCallback(
    (slug: string) => {
      setActiveSlug(slug);
      setAutoRotate(false);
    },
    [],
  );

  const setCameraStateWrapped = useCallback((s: FijiGlobeCameraState) => {
    const approaching =
      s.fijiDistanceKm < prevFijiDistRef.current - 80 && s.fijiDistanceKm < 6000;
    prevFijiDistRef.current = s.fijiDistanceKm;
    setCameraState({ ...s, approachingFiji: approaching });
  }, []);

  const value = useMemo(
    () => ({
      activeSlug,
      hoveredSlug,
      setActiveSlug,
      setHoveredSlug,
      autoRotate,
      setAutoRotate,
      cameraState,
      setCameraState: setCameraStateWrapped,
      flyToFiji,
      flyToDestination,
      registerFlyHandler,
      registerControls,
      zoomIn,
      zoomOut,
      compact,
    }),
    [
      activeSlug,
      hoveredSlug,
      autoRotate,
      cameraState,
      setCameraStateWrapped,
      flyToFiji,
      flyToDestination,
      registerFlyHandler,
      registerControls,
      zoomIn,
      zoomOut,
      compact,
    ],
  );

  return (
    <FijiGlobeContext.Provider value={value}>{children}</FijiGlobeContext.Provider>
  );
}

export function useFijiGlobe() {
  const ctx = useContext(FijiGlobeContext);
  if (!ctx) throw new Error("useFijiGlobe must be used within FijiGlobeProvider");
  return ctx;
}
