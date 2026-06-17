"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const MAX_DPR = 2;
const STAR_COUNT = 2400;

/**
 * The S1 starfield: a slow camera dolly through deep space behind the hero
 * text. This is a decorative WebGL layer only  -  the LCP element is the
 * server-rendered text shell in `Hero.tsx`, never this canvas (R-2). It is
 * paused (no rAF, no render) whenever it scrolls off-screen and is never
 * mounted at all under reduced-motion/low-power (`Hero.tsx` guards that).
 */
export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <Canvas
        dpr={[1, MAX_DPR]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <Starfield />
      </Canvas>
    </div>
  );
}

/**
 * Drifting starfield + a slow forward dolly (per the storyboard: "camera
 * pushes forward through starfield"). `useFrame` only mutates pre-allocated
 * objects (the camera's own position scalar, the group rotation)  -  no
 * per-frame allocations, per the perf budget (§7.4).
 */
function Starfield() {
  const groupRef = useRef<THREE.Group>(null);
  const dollyZ = useRef(1);

  // Cap pixel-ratio-driven point counts; keep the star count itself fixed and
  // modest regardless of viewport so the GPU point budget never scales unbounded.
  const radius = useMemo(() => 60, []);

  useFrame((state, delta) => {
    // Slow continuous forward push, looping so the field never "runs out".
    dollyZ.current = (dollyZ.current + delta * 0.6) % 40;
    state.camera.position.z = 1 - dollyZ.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={radius}
        depth={50}
        count={STAR_COUNT}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
}
