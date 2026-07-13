"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { FIJI_GLOBE_TEXTURES } from "@/lib/fiji-globe-data";
import { GLOBE_RADIUS } from "@/lib/fiji-globe-math";

export function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [day, bump, specular, night] = useTexture([
    FIJI_GLOBE_TEXTURES.day,
    FIJI_GLOBE_TEXTURES.bump,
    FIJI_GLOBE_TEXTURES.specular,
    FIJI_GLOBE_TEXTURES.night,
  ]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useRef({
    dayTexture: { value: day },
    nightTexture: { value: night },
    bumpTexture: { value: bump },
    specularTexture: { value: specular },
    sunDirection: { value: new THREE.Vector3(1, 0.3, 0.5).normalize() },
  }).current;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.02;
    uniforms.sunDirection.value.set(Math.cos(t) * 0.8, 0.35, Math.sin(t) * 0.6).normalize();
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D dayTexture;
          uniform sampler2D nightTexture;
          uniform sampler2D bumpTexture;
          uniform sampler2D specularTexture;
          uniform vec3 sunDirection;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vec3 normal = normalize(vNormal);
            float diffuse = max(dot(normal, sunDirection), 0.0);
            vec3 dayColor = texture2D(dayTexture, vUv).rgb;
            vec3 nightColor = texture2D(nightTexture, vUv).rgb * 1.4;
            float blend = smoothstep(-0.08, 0.25, diffuse);
            vec3 color = mix(nightColor, dayColor, blend);
            float spec = texture2D(specularTexture, vUv).r;
            float specularLight = pow(max(dot(reflect(-sunDirection, normal), normalize(-vPosition)), 0.0), 32.0) * spec * 0.6;
            color += vec3(0.04, 0.12, 0.18) * spec * 0.35;
            color += vec3(1.0) * specularLight;
            float ambient = 0.12 + diffuse * 0.88;
            gl_FragColor = vec4(color * ambient, 1.0);
          }
        `}
      />
    </mesh>
  );
}
