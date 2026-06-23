"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { ParentModeLockReveal } from "@/components/sections/ParentModeLockReveal.client";
import type { Locale } from "@/lib/i18n/config";

export interface TrustCard {
  title: string;
  body: string;
  icon: string;
  /** True for the privacy/shield card — uses the lock-settle animation. */
  isPrivacy: boolean;
}

interface ParentModeTrustBentoProps {
  items: TrustCard[];
  locale: Locale;
}

/**
 * Locale-sensitive settle timing for the trust bento.
 * JA gets longer, softer motion to match the more composed tone expected
 * in Japanese UX (less arcade, more deliberate). EN/VI share warmer defaults.
 */
const TIMING: Record<Locale, { duration: number; stagger: number }> = {
  ja: { duration: 0.6, stagger: 0.09 },
  en: { duration: 0.42, stagger: 0.06 },
  vi: { duration: 0.44, stagger: 0.06 },
};

/**
 * Ease that reads as "organized data settling into place":
 * fast initial movement that decelerates smoothly — no overshoot, no spring.
 * Deliberately different from the XP reward ease (--ease-press) used for
 * playful CTA interactions.
 */
const TRUST_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Parent Mode trust bento — three assurance cards that scroll-reveal with
 * a calm stagger. Motion is intentionally slower and more settled than the
 * reward sections to signal "serious data, not a game mechanic."
 *
 * Card 0: featured (full-width, health data) — enters first.
 * Card 1: privacy / local data — enters second with the lock-settle animation.
 * Card 2: family / care record — enters last.
 *
 * Reduced motion: all cards render immediately at full opacity with no offset.
 */
export function ParentModeTrustBento({
  items,
  locale,
}: ParentModeTrustBentoProps) {
  const reduced = useReducedMotion();
  const { duration, stagger } = TIMING[locale];

  return (
    <ul className="divide-y divide-[var(--border-card)] lg:order-first lg:grid lg:grid-cols-2 lg:gap-3 lg:divide-y-0">
      {items.map((item, i) => {
        const featured = i === 0;
        const last = i === items.length - 1;

        return (
          <motion.li
            key={item.title}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration, delay: i * stagger, ease: TRUST_EASE }
            }
            className={[
              "flex items-start gap-4",
              i === 0 ? "pb-4" : last ? "pt-4" : "py-4",
              featured ? "lg:col-span-2" : "lg:col-span-1",
              "lg:flex lg:rounded-[var(--radius-xl)] lg:border lg:border-[var(--border-card)] lg:[box-shadow:var(--shadow-card)]",
              featured
                ? [
                    "lg:items-center lg:gap-6 lg:p-6",
                    "lg:bg-[var(--bg-section-alt)]",
                    "lg:[border-left:3px_solid_var(--accent-primary)]",
                  ].join(" ")
                : [
                    "lg:flex-col lg:gap-3 lg:p-5",
                    "lg:[background:linear-gradient(160deg,rgba(255,255,255,0.92),rgba(255,255,255,0.74))]",
                    "lg:backdrop-blur-[16px]",
                  ].join(" "),
            ].join(" ")}
          >
            {item.isPrivacy ? (
              <ParentModeLockReveal
                src={item.icon}
                size={48}
                className="mt-0.5 h-9 w-9 shrink-0 object-contain lg:mt-0 lg:h-10 lg:w-10"
              />
            ) : (
              <Image
                src={item.icon}
                alt=""
                width={48}
                height={48}
                aria-hidden="true"
                className={[
                  "shrink-0",
                  featured
                    ? "mt-0.5 h-10 w-10 lg:mt-0 lg:h-14 lg:w-14 lg:shrink-0"
                    : "mt-0.5 h-9 w-9 lg:mt-0 lg:h-10 lg:w-10",
                ].join(" ")}
              />
            )}

            <div className="min-w-0">
              <h3
                className={[
                  "font-display font-bold leading-tight",
                  featured
                    ? "text-base lg:text-[1.15rem]"
                    : "text-base lg:text-sm",
                ].join(" ")}
              >
                {item.title}
              </h3>
              <p
                className={[
                  "text-sm leading-6 text-[var(--text-secondary)]",
                  featured
                    ? "mt-1 lg:mt-2 lg:text-[0.9375rem] lg:leading-7"
                    : "mt-1 lg:mt-1.5 lg:text-xs lg:leading-[1.5]",
                ].join(" ")}
              >
                {item.body}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
