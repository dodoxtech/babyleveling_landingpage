"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { assetPath } from "@/lib/content/assets";
import type { Feature } from "@/lib/content/features";

interface FeatureCardProps {
  feature: Feature;
  index: number;
  className?: string;
}

export function FeatureCard({ feature, index, className }: FeatureCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -6, scale: 1.012 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 190,
              damping: 22,
              delay: index * 0.05,
            }
      }
      className={`card-duolingo min-h-0 p-4 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)] sm:min-h-[13rem] sm:p-6 ${className ?? ""}`}
      tabIndex={0}
    >
      <div className="flex gap-4 sm:block">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] sm:h-14 sm:w-14"
          style={{
            background: `color-mix(in srgb, ${feature.accent} 14%, white)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.68), 0 8px 18px color-mix(in srgb, ${feature.accent} 16%, transparent)`,
          }}
        >
          <Image
            src={assetPath(feature.icon)}
            alt=""
            width={40}
            height={40}
            className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-bold leading-tight sm:mt-5 sm:text-2xl">
            {feature.title}
          </h3>
          <p className="mt-1.5 max-w-[24rem] text-sm leading-6 text-[var(--text-secondary)] sm:mt-2">
            {feature.blurb}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
