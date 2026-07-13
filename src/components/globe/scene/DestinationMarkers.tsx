"use client";

import { Html } from "@react-three/drei";
import { GLOBE_RADIUS, latLngToVector3 } from "@/lib/fiji-globe-math";
import { FIJI_GLOBE_DESTINATIONS } from "@/lib/fiji-globe-data";
import { useFijiGlobe } from "@/components/globe/FijiGlobeContext";

export function DestinationMarkers() {
  const {
    activeSlug,
    hoveredSlug,
    setActiveSlug,
    setHoveredSlug,
    cameraState,
    compact,
  } = useFijiGlobe();

  const showLabels =
    cameraState.zoomTier === "fiji" || cameraState.zoomTier === "close";

  return (
    <>
      {FIJI_GLOBE_DESTINATIONS.map((dest) => {
        const pos = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS * 1.004);
        const isActive = activeSlug === dest.slug;
        const isHovered = hoveredSlug === dest.slug;
        const scale = isActive ? 1.35 : isHovered ? 1.15 : 1;

        return (
          <group key={dest.slug} position={pos}>
            <mesh
              scale={scale}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredSlug(dest.slug);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHoveredSlug(null);
                document.body.style.cursor = "";
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlug(dest.slug);
              }}
            >
              <sphereGeometry args={[isActive ? 0.018 : 0.013, 16, 16]} />
              <meshStandardMaterial
                color={isActive || isHovered ? "#c5a44e" : "#ffffff"}
                emissive={isActive ? "#c5a44e" : "#ffffff"}
                emissiveIntensity={isActive ? 0.9 : isHovered ? 0.5 : 0.25}
                metalness={0.6}
                roughness={0.2}
              />
            </mesh>
            {(isActive || (isHovered && showLabels)) && !compact && (
              <Html
                distanceFactor={4.5}
                position={[0, 0.04, 0]}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                <div className="whitespace-nowrap rounded-full border border-gold/40 bg-navy/90 px-2.5 py-1 text-[10px] font-semibold text-gold shadow-lg backdrop-blur-md">
                  {dest.title}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}
