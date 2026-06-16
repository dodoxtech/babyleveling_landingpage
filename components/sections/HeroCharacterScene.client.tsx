"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Billboard, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { spritePath } from "@/lib/content/sprites";

const MAX_DPR = 2;
const STAR_COUNT = 1400;

/**
 * S2 — The Hero Appears, continuing the S1 starfield scene (R3F consumer #2 of
 * the two allowed under R-1; see docs/architecture/modules.md). A second
 * `<Canvas>` rather than one shared canvas spanning both sections — the two
 * sections are independent DOM boxes (S1 keeps its own canvas pinned to its
 * own bounds, same as TASK-0003 built it), so true single-canvas continuity
 * would mean substantially restructuring the already-shipped Hero. Instead
 * this canvas reuses the exact same starfield treatment (same `Stars` recipe,
 * same slow forward dolly direction) so the cut from S1's canvas to this one
 * reads as "the camera kept moving", not a scene change — the camera then
 * settles on a small floating island holding the hero sprite.
 *
 * Paused (no rAF) whenever it scrolls off-screen, same IntersectionObserver
 * contract `HeroCanvas.client.tsx` uses (§7.4 perf budget).
 */
export default function HeroCharacterScene() {
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
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={[1, MAX_DPR]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 4], fov: 60 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <Stars
          radius={50}
          depth={40}
          count={STAR_COUNT}
          factor={3}
          saturation={0}
          fade
          speed={0.4}
        />
        <ambientLight intensity={0.6} />
        <Island />
        <Hero />
        <Sparkles
          count={24}
          scale={3}
          size={2.5}
          speed={0.3}
          color="#EC4899"
          position={[0, 0.4, 0]}
        />
      </Canvas>
    </div>
  );
}

/** A small glowing disc standing in for the "tiny floating island" (no 3D island asset exists — an honest abstract stand-in, swappable later). */
function Island() {
  return (
    <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2.4, 0, 0]}>
      <circleGeometry args={[1.4, 48]} />
      <meshBasicMaterial color="#1c1430" transparent opacity={0.85} />
    </mesh>
  );
}

/** The hero sprite billboard: always faces the camera, idle-bobs per the storyboard ("hero sprite billboard with subtle idle bob"). */
function Hero() {
  const texture = useLoader(THREE.TextureLoader, spritePath("babyGirl.waving"));
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Billboard>
        <mesh>
          <planeGeometry args={[1.6, 1.6]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      </Billboard>
    </group>
  );
}
