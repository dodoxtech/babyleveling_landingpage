"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { assetPath } from "@/lib/content/assets";
import type { FamilyRole } from "@/lib/content/family";

interface FamilySharePartyProps {
  roles: FamilyRole[];
}

/**
 * Each party member arrives from a different origin/direction (a true
 * "gather", per the storyboard  -  explicitly not the generic stagger-up
 * pattern banned in §7's motion principles), converging onto one shared
 * timeline. Offsets cycle for any roster length.
 */
const GATHER_OFFSETS = [
  { x: -56, y: -36, rotate: -8 },
  { x: 0, y: -56, rotate: 5 },
  { x: 56, y: -36, rotate: 8 },
  { x: 0, y: 48, rotate: -5 },
];

/**
 * S9  -  the party-gather client island. Reduced motion: every member and the
 * connecting timeline render at their final state immediately (per §7.3  - 
 * "family elements appear immediately").
 */
export function FamilyShareParty({ roles }: FamilySharePartyProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <svg
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        className="absolute top-1/2 left-0 hidden h-px w-full -translate-y-1/2 sm:block"
        aria-hidden="true"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="var(--grad-plasma-to)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reducedMotion ? { pathLength: 1, opacity: 0.4 } : undefined}
          whileInView={
            reducedMotion ? undefined : { pathLength: 1, opacity: 0.4 }
          }
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
        />
      </svg>

      <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
        {roles.map((role, index) => {
          const offset = GATHER_OFFSETS[index % GATHER_OFFSETS.length];
          return (
            <motion.div
              key={role.id}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x: offset.x,
                      y: offset.y,
                      rotate: offset.rotate,
                    }
              }
              animate={
                reducedMotion ? { opacity: 1, x: 0, y: 0, rotate: 0 } : undefined
              }
              whileInView={
                reducedMotion
                  ? undefined
                  : { opacity: 1, x: 0, y: 0, rotate: 0 }
              }
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      damping: 14,
                      stiffness: 140,
                      delay: index * 0.1,
                    }
              }
              className="glass flex flex-col items-center gap-2 rounded-2xl p-5 text-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small decorative party-member icon */}
              <img
                src={assetPath(role.sprite)}
                alt=""
                width={32}
                height={32}
              />
              <p className="text-sm font-semibold text-hi">{role.role}</p>
              <p className="text-xs leading-relaxed text-lo">{role.blurb}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
