"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";
import { spritePath } from "@/lib/content/sprites";

gsap.registerPlugin(ScrollTrigger);

interface RevealSceneProps {
  headline: string;
  body: string;
  ctaLabel: string;
}

/**
 * S3 — The Reveal scene mechanics. Pins the section and scrubs a peel/dissolve
 * from the fantasy "skin" (sprite hero + mythic copy) to the app-dashboard
 * still underneath, with a warm light bloom wiping in as the cold void
 * recedes (per the storyboard).
 *
 * `prefers-reduced-motion` / low-power: no `ScrollTrigger.create`/`pin` at
 * all — the fantasy layer is hidden and the dashboard layer is shown
 * outright (a plain CSS opacity cross-fade, no scrub), so there is no pin
 * and no scroll-trap risk (R-4).
 *
 * Continuity hand-off (§7.0): this section's XP fill (`DashboardStillPlaceholder`)
 * picks up visually where the Hero's XP bar leaves off. TASK-0005 (S2 Hero
 * Appears) sits between the two in the DOM; it's free to add its own
 * ScrollTrigger timeline (or its own XP-bar ignite animation) without
 * touching this component — GSAP timelines are independent per
 * `ScrollTrigger.create` call, so there's no shared-state coupling to undo
 * later.
 */
export function RevealScene({ headline, body, ctaLabel }: RevealSceneProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const fantasyRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const fantasy = fantasyRef.current;
    const dashboard = dashboardRef.current;
    const bloom = bloomRef.current;
    if (!section || !fantasy || !dashboard || !bloom) return;

    // Dashboard starts hidden behind the fantasy skin; bloom starts dark.
    gsap.set(dashboard, { autoAlpha: 0 });
    gsap.set(bloom, { autoAlpha: 0 });

    const tween = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=120%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tween
      .to(bloom, { autoAlpha: 1, duration: 0.4, ease: "power1.in" }, 0)
      .to(
        fantasy,
        {
          autoAlpha: 0,
          scale: 1.08,
          rotateX: -6,
          y: "-4%",
          duration: 0.6,
          ease: "power2.inOut",
        },
        0.1,
      )
      .to(dashboard, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0.35);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={sectionRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Warm light bloom — animated in by GSAP; under reduced motion it stays
          a fixed, subtle backdrop glow rather than animating. */}
      <div
        ref={bloomRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,122,69,0.18)_0%,transparent_65%)] ${
          reducedMotion ? "opacity-60" : ""
        }`}
      />

      <div className="relative mx-auto grid w-full max-w-4xl place-items-center">
        {/* Fantasy layer: the mythic hero skin. Peels/fades away on scrub. */}
        <div
          ref={fantasyRef}
          className={`col-start-1 row-start-1 flex flex-col items-center gap-6 text-center transition-opacity duration-700 motion-reduce:transition-none ${
            reducedMotion ? "opacity-0" : ""
          }`}
          aria-hidden={reducedMotion}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative sprite, not the LCP element, no need for next/image priority handling here */}
          <img
            src={spritePath("babyGirl.excited")}
            alt=""
            width={160}
            height={160}
            className="drop-shadow-[0_0_40px_rgba(124,58,237,0.45)]"
          />
          <p className="font-display text-3xl text-hi sm:text-4xl">
            A small hero, deep in the adventure.
          </p>
        </div>

        {/* Dashboard layer: the real app "character sheet" underneath. Fades
            in on scrub (or is simply the only visible layer under reduced
            motion's cross-fade). Placeholder mock panel — see DASHBOARD_PLACEHOLDER note. */}
        <div
          ref={dashboardRef}
          className={`col-start-1 row-start-1 flex flex-col items-center gap-6 text-center ${
            reducedMotion ? "" : "invisible"
          }`}
        >
          <DashboardStillPlaceholder />
          <h2 className="font-display text-3xl text-hi sm:text-4xl">
            {headline}
          </h2>
          <p className="max-w-xl text-base text-lo sm:text-lg">{body}</p>
          <a
            href="#rpg-system"
            className="text-sm font-medium text-hi underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Placeholder for the real app-dashboard screenshot named in the task brief's
 * Relevant Files. No dashboard screenshot asset exists yet anywhere under
 * `public/` (verified: only `public/sprites/*` exists, no `public/screenshots/`
 * directory). Rather than invent a fake image file, this renders a styled
 * glass "character sheet" mock from existing design tokens + sprite icons —
 * an honest stand-in with a reserved aspect-ratio box (CLS-safe), swappable
 * for the real screenshot in TASK-0007 (Screenshot Gallery) without changing
 * this component's layout.
 */
function DashboardStillPlaceholder() {
  return (
    <div
      className="glass aspect-[4/3] w-full max-w-sm rounded-2xl p-6"
      role="img"
      aria-label="Preview of the BabyLeveling app dashboard, showing the hero's level and stats"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon inside an aria-labelled mock panel */}
          <img
            src={spritePath("babyGirl.happy")}
            alt=""
            width={40}
            height={40}
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-hi">Level 1 Hero</p>
            <p className="text-xs text-lo">Today&apos;s quest log</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded-full bg-white/10">
            <div className="bg-grad-plasma h-full w-1/3 rounded-full" />
          </div>
          <p className="text-left text-xs text-lo">+120 XP today</p>
        </div>
      </div>
    </div>
  );
}
