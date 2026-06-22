"use client";

import { motion } from "framer-motion";

const COLORS = [
  "var(--accent-primary)",
  "var(--accent-secondary)",
  "var(--accent-tertiary)",
  "var(--accent-pink)",
];

// Deterministic positions — no Math.random() to avoid SSR/hydration mismatch.
// 12 particles spread evenly by angle; distance and size vary by index pattern.
const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 360;
  const rad = (angle * Math.PI) / 180;
  const distance = 48 + (i % 4) * 14; // 48, 62, 76, 90 px
  const size = 7 + (i % 3) * 2;       // 7, 9, 11 px
  return {
    id: i,
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance - 18, // bias upward
    size,
    color: COLORS[i % COLORS.length],
    delay: (i % 3) * 0.04,
  };
});

/** One-shot confetti burst: 12 particles, compositor-only transform/opacity. */
export function WaitlistConfetti() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}
