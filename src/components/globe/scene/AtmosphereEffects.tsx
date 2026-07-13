"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLOBE_RADIUS, latLngToVector3, FIJI_CENTER } from "@/lib/fiji-globe-math";

export function AtmosphereGlow() {
  return (
    <mesh scale={[1.04, 1.04, 1.04]}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial
        color="#4ecdc4"
        transparent
        opacity={0.06}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export function FijiBeacon() {
  const groupRef = useRef<THREE.Group>(null);
  const pulse1 = useRef<THREE.Mesh>(null);
  const pulse2 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const pos = latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, GLOBE_RADIUS);
  const normal = pos.clone().normalize();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pulse1.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.35;
      pulse1.current.scale.setScalar(s);
      (pulse1.current.material as THREE.MeshBasicMaterial).opacity =
        0.35 - Math.sin(t * 2.2) * 0.15;
    }
    if (pulse2.current) {
      const s = 1 + Math.sin(t * 1.6 + 1) * 0.5;
      pulse2.current.scale.setScalar(s);
      (pulse2.current.material as THREE.MeshBasicMaterial).opacity =
        0.2 - Math.sin(t * 1.6 + 1) * 0.08;
    }
    if (core.current) {
      (core.current.material as THREE.MeshBasicMaterial).opacity =
        0.7 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={pos}>
      <group quaternion={new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal,
      )}>
        <mesh ref={pulse1}>
          <ringGeometry args={[0.06, 0.1, 48]} />
          <meshBasicMaterial color="#c5a44e" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={pulse2}>
          <ringGeometry args={[0.1, 0.16, 48]} />
          <meshBasicMaterial color="#c5a44e" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={core}>
          <circleGeometry args={[0.045, 32]} />
          <meshBasicMaterial color="#ffd87a" transparent opacity={0.8} />
        </mesh>
        <pointLight color="#c5a44e" intensity={0.8} distance={0.5} />
      </group>
    </group>
  );
}

export function FijiOceanRings() {
  const rings = [0.08, 0.12, 0.17];
  const pos = latLngToVector3(FIJI_CENTER.lat, FIJI_CENTER.lng, GLOBE_RADIUS * 1.002);
  const normal = pos.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

  return (
    <group position={pos} quaternion={quat}>
      {rings.map((r, i) => (
        <OceanRing key={r} radius={r} delay={i * 0.7} />
      ))}
    </group>
  );
}

function OceanRing({ radius, delay }: { radius: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + delay;
    const wave = Math.sin(t * 1.8) * 0.012;
    ref.current.scale.setScalar(1 + wave);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.22 + Math.sin(t * 2.5) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius * 0.85, radius, 64]} />
      <meshBasicMaterial
        color="#0a8a8a"
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 280;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 2.8 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.006} color="#c5a44e" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}
