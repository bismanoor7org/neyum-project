"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FijiGlobeScene } from "./scene/FijiGlobeScene";

function GlobeLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#0e5f63" wireframe />
    </mesh>
  );
}

interface FijiGlobeCanvasProps {
  className?: string;
}

export function FijiGlobeCanvas({ className }: FijiGlobeCanvasProps) {
  return (
    <div className={className} style={{ touchAction: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#030a12"]} />
        <fog attach="fog" args={["#030a12", 4, 12]} />
        <Suspense fallback={<GlobeLoader />}>
          <FijiGlobeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
