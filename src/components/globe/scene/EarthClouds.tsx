"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { FIJI_GLOBE_TEXTURES } from "@/lib/fiji-globe-data";
import { GLOBE_RADIUS } from "@/lib/fiji-globe-math";
import { useFijiGlobe } from "@/components/globe/FijiGlobeContext";

export function EarthClouds() {
  const ref = useRef<THREE.Mesh>(null);
  const clouds = useTexture(FIJI_GLOBE_TEXTURES.clouds);
  const { autoRotate } = useFijiGlobe();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (autoRotate ? 0.018 : 0.006);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[GLOBE_RADIUS * 1.012, 48, 48]} />
      <meshPhongMaterial
        map={clouds}
        transparent
        opacity={0.38}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
