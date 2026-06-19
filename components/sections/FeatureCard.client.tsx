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
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -6, scale: 1.012 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        type: "spring",
        stiffness: 190,
        damping: 22,
        delay: reducedMotion ? 0 : index * 0.05,
      }}
      className={`card-duolingo min-h-[13rem] p-6 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)] ${className ?? ""}`}
      tabIndex={0}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)]"
        style={{
          background: "color-mix(in srgb, var(--accent-primary) 12%, white)",
        }}
      >
        <Image
          src={assetPath(feature.icon)}
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold">{feature.title}</h3>
      <p className="mt-2 max-w-[24rem] text-sm leading-6 text-[var(--text-secondary)]">
        {feature.blurb}
      </p>
    </motion.article>
  );
}
