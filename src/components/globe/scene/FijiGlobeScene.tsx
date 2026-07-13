"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { EarthGlobe } from "./EarthGlobe";
import { EarthClouds } from "./EarthClouds";
import {
  AtmosphereGlow,
  FijiBeacon,
  FijiOceanRings,
  FloatingParticles,
} from "./AtmosphereEffects";
import { DestinationMarkers } from "./DestinationMarkers";
import { useFijiGlobe } from "@/components/globe/FijiGlobeContext";
import {
  cameraDistanceToZoomTier,
  cameraPositionForLatLng,
  FIJI_CENTER,
  greatCircleDistanceKm,
  bearingDegrees,
  vector3ToLatLng,
  latLngToVector3,
  GLOBE_RADIUS,
} from "@/lib/fiji-globe-math";
import { FIJI_GLOBE_DESTINATIONS } from "@/lib/fiji-globe-data";

function EarthGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { autoRotate } = useFijiGlobe();

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function GlobeCameraController({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const {
    autoRotate,
    setCameraState,
    registerFlyHandler,
    activeSlug,
    compact,
  } = useFijiGlobe();
  const flyTarget = useRef<{ lat: number; lng: number; dist: number } | null>(null);
  const flyProgress = useRef(1);
  const initialized = useRef(false);
  const skipDestFly = useRef(true);
  const fijiScreen = useRef(new THREE.Vector3());
  const prevView = useRef({ lat: 0, lng: 0 });

  useEffect(() => {
    registerFlyHandler((lat, lng, dist) => {
      flyTarget.current = { lat, lng, dist };
      flyProgress.current = 0;
    });
  }, [registerFlyHandler]);

  useEffect(() => {
    if (!initialized.current) {
      flyTarget.current = {
        lat: FIJI_CENTER.lat,
        lng: FIJI_CENTER.lng,
        dist: compact ? 2.1 : 1.85,
      };
      flyProgress.current = 0;
      initialized.current = true;
    }
  }, [compact]);

  useEffect(() => {
    const dest = FIJI_GLOBE_DESTINATIONS.find((d) => d.slug === activeSlug);
    if (!dest || !initialized.current || skipDestFly.current) {
      skipDestFly.current = false;
      return;
    }
    flyTarget.current = {
      lat: dest.lat,
      lng: dest.lng,
      dist: compact ? 1.95 : 1.65,
    };
    flyProgress.current = 0;
  }, [activeSlug, compact]);

  useFrame((_, delta) => {
    if (flyTarget.current && flyProgress.current < 1) {
      flyProgress.current = Math.min(1, flyProgress.current + delta * 1.4);
      const ease = 1 - Math.pow(1 - flyProgress.current, 3);
      const target = flyTarget.current;
      const desired = cameraPositionForLatLng(target.lat, target.lng, target.dist);
      camera.position.lerp(desired, ease * 0.1 + 0.03);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
      if (flyProgress.current >= 1) flyTarget.current = null;
    }

    const dist = camera.position.length();
    const view = vector3ToLatLng(camera.position.clone().negate());
    const fijiDist = greatCircleDistanceKm(
      view.lat,
      view.lng,
      FIJI_CENTER.lat,
      FIJI_CENTER.lng,
    );

    fijiScreen.current.copy(
      latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, GLOBE_RADIUS),
    );
    fijiScreen.current.project(camera);
    const sx = (fijiScreen.current.x + 1) / 2;
    const sy = (-fijiScreen.current.y + 1) / 2;
    const onScreen =
      fijiScreen.current.z < 1 &&
      sx >= 0.04 &&
      sx <= 0.96 &&
      sy >= 0.04 &&
      sy <= 0.96;

    const approaching =
      fijiDist <
      greatCircleDistanceKm(
        prevView.current.lat,
        prevView.current.lng,
        FIJI_CENTER.lat,
        FIJI_CENTER.lng,
      ) -
        20;
    prevView.current = view;

    setCameraState({
      distance: dist,
      viewLat: view.lat,
      viewLng: view.lng,
      fijiDistanceKm: fijiDist,
      fijiBearing: bearingDegrees(
        view.lat,
        view.lng,
        FIJI_CENTER.lat,
        FIJI_CENTER.lng,
      ),
      fijiScreenVisible: onScreen,
      fijiScreenX: sx,
      fijiScreenY: sy,
      approachingFiji: approaching && fijiDist > 800,
      zoomTier: cameraDistanceToZoomTier(dist),
    });
  });

  return null;
}

export function FijiGlobeScene() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { registerControls, compact } = useFijiGlobe();

  useEffect(() => {
    registerControls(controlsRef.current);
  }, [registerControls]);

  return (
    <>
      <ambientLight intensity={0.35} color="#b8d4e8" />
      <directionalLight position={[5, 2, 3]} intensity={1.4} color="#fff8ec" />
      <directionalLight position={[-4, -1, -2]} intensity={0.25} color="#1a3a4a" />

      <Stars radius={80} depth={40} count={compact ? 1200 : 2400} factor={3} fade speed={0.4} />
      <FloatingParticles />

      <EarthGroup>
        <EarthGlobe />
        <EarthClouds />
        <AtmosphereGlow />
        <FijiBeacon />
        <FijiOceanRings />
        <DestinationMarkers />
      </EarthGroup>

      <GlobeCameraController controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={1.45}
        maxDistance={4.2}
        rotateSpeed={0.45}
        zoomSpeed={0.7}
        dampingFactor={0.06}
        enableDamping
      />
    </>
  );
}
