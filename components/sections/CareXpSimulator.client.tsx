"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

export interface SimTile {
  label: string;
  icon: string;
  xpNum: number;
}

interface CareXpSimulatorProps {
  tiles: SimTile[];
  title: string;
  compact?: boolean;
}

// XP bar starts here so the first few actions feel impactful before level-up
const FILL_START = 0.28;

// Beat timings in ms
const T_XP_BADGE = 340; // XP pop badge appears after tap
const T_FILL = 540; // bar fill starts
const T_GLOW = 600; // bar glow fires
const T_CLEAR = 1240; // XP badge disappears
const T_NEXT = 2400; // next tile cycle

export function CareXpSimulator({
  tiles,
  title,
  compact = false,
}: CareXpSimulatorProps) {
  const reduced = useReducedMotion();

  // Which tile is selected (highlighted)
  const [activeIdx, setActiveIdx] = useState(-1);
  // Key increments remount the tap-animation wrapper → replays CSS keyframe
  const [tapKey, setTapKey] = useState(0);
  // Which tile shows the floating XP badge (-1 = none)
  const [xpBadgeIdx, setXpBadgeIdx] = useState(-1);
  // Key increments remount the XP badge → replays xp-pop keyframe
  const [xpBadgeKey, setXpBadgeKey] = useState(0);
  // Key increments remount the bar glow → replays bar-glow-pulse keyframe
  const [glowKey, setGlowKey] = useState(0);
  // Level-up flash flag
  const [levelUp, setLevelUp] = useState(false);
  // XP bar fill 0.0–1.0 (CSS transition handles the spring feel)
  const [barFill, setBarFill] = useState(FILL_START);

  // Refs so the async loop sees current values without stale closures
  const pausedRef = useRef(false);
  const fillRef = useRef(FILL_START);
  const idxRef = useRef(0);
  const tilesRef = useRef(tiles);
  tilesRef.current = tiles;

  useEffect(() => {
    if (reduced) {
      // Static final state — first tile selected, bar meaningfully filled
      setActiveIdx(0);
      setBarFill(FILL_START + (tiles[0]?.xpNum ?? 40) / 360);
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    const runLoop = async () => {
      await sleep(800); // brief pause before first beat

      while (!cancelled) {
        if (pausedRef.current) {
          await sleep(80);
          continue;
        }

        const idx = idxRef.current % tilesRef.current.length;
        idxRef.current += 1;

        // Beat 1 — tile highlights + tap animation
        setActiveIdx(idx);
        setTapKey((k) => k + 1);

        await sleep(T_XP_BADGE);
        if (cancelled) return;

        // Beat 2 — XP badge pops from tile
        setXpBadgeIdx(idx);
        setXpBadgeKey((k) => k + 1);

        await sleep(T_FILL - T_XP_BADGE);
        if (cancelled) return;

        // Beat 3 — bar fills
        const delta = tilesRef.current[idx]?.xpNum ?? 40;
        const newFill = fillRef.current + delta / 360;

        if (newFill >= 1.0) {
          // Level-up: hit 100%, flash, then restart below 30%
          fillRef.current = 1.0;
          setBarFill(1.0);
          setLevelUp(true);
          // care-levelup is a distinct signal so HeroMascot can show the
          // level-up pose instead of the generic happy reaction.
          document.dispatchEvent(new CustomEvent("care-levelup"));

          await sleep(680);
          if (cancelled) return;

          const restart = newFill - 1.0;
          fillRef.current = restart;
          setBarFill(restart);
          setLevelUp(false);
        } else {
          fillRef.current = newFill;
          setBarFill(newFill);
          document.dispatchEvent(new CustomEvent("care-xp-tick"));
        }

        await sleep(T_GLOW - T_FILL);
        if (cancelled) return;

        // Beat 4 — bar glow pulse
        setGlowKey((k) => k + 1);

        await sleep(T_CLEAR - T_GLOW);
        if (cancelled) return;

        // Beat 5 — clear XP badge
        setXpBadgeIdx(-1);

        await sleep(T_NEXT - T_CLEAR);
        if (cancelled) return;
      }
    };

    runLoop();
    return () => {
      cancelled = true;
    };
  }, [reduced, tiles]);

  return (
    <div
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onTouchStart={() => {
        pausedRef.current = true;
      }}
      onTouchEnd={() => {
        setTimeout(() => {
          pausedRef.current = false;
        }, 2000);
      }}
    >
      <p
        className={`font-display font-bold ${compact ? "text-sm" : "text-base"}`}
      >
        {title}
      </p>

      <div className={`${compact ? "mt-2" : "mt-3"} grid grid-cols-3 gap-2`}>
        {tiles.map((tile, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={tile.label}
              className={`relative rounded-[var(--radius-md)] p-2 text-center transition-colors duration-200 ${
                isActive
                  ? "bg-[color-mix(in_srgb,var(--accent-primary)_10%,var(--bg-section-alt))] ring-2 ring-[color-mix(in_srgb,var(--accent-primary)_30%,transparent)]"
                  : "bg-[var(--bg-section-alt)]"
              }`}
            >
              {/* Tap animation — key remount replays care-tap keyframe */}
              <div
                key={isActive ? `tap-${tapKey}` : "tap-idle"}
                className={
                  isActive && !reduced
                    ? "motion-safe:animate-[care-tap_380ms_var(--ease-press)_both]"
                    : ""
                }
              >
                <Image
                  src={tile.icon}
                  alt=""
                  width={compact ? 26 : 30}
                  height={compact ? 26 : 30}
                  className="mx-auto"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-1 text-[0.7rem] font-bold">{tile.label}</p>
              <p className="text-[0.65rem] text-[var(--accent-primary)]">
                +{tile.xpNum} XP
              </p>

              {/* Floating XP badge — key remount replays xp-pop keyframe */}
              {i === xpBadgeIdx && (
                <span
                  key={`xp-${xpBadgeKey}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--accent-primary)] px-2 py-0.5 font-display text-[0.62rem] font-bold text-white shadow-md motion-safe:animate-[xp-pop_680ms_var(--ease-out-premium)_both]"
                >
                  +{tile.xpNum} XP
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Live XP bar */}
      <div className={`${compact ? "mt-3" : "mt-4"} space-y-1`}>
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.65rem] font-bold text-[var(--text-secondary)]">
            Lv.5
          </span>
          {levelUp && !reduced ? (
            <span
              key={`lvup-${glowKey}`}
              className="font-display text-[0.65rem] font-bold text-[var(--accent-tertiary)] motion-safe:animate-[xp-pop_600ms_var(--ease-press)_both]"
            >
              LEVEL UP!
            </span>
          ) : (
            <span className="font-display text-[0.65rem] font-bold text-[var(--text-caption)]">
              Lv.6
            </span>
          )}
        </div>

        <div className="relative h-2 overflow-hidden rounded-full bg-[#e9e7df]">
          <div
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-grad-xp"
            style={{
              transform: `scaleX(${Math.min(barFill, 1)})`,
              transition: reduced ? "none" : "transform 480ms var(--ease-press)",
            }}
          />
          {/* Bar glow — key remount replays bar-glow-pulse keyframe */}
          {glowKey > 0 && !reduced && (
            <span
              key={`glow-${glowKey}`}
              aria-hidden="true"
              className="absolute inset-0 rounded-full motion-safe:animate-[bar-glow-pulse_600ms_ease-out_both] shadow-[0_0_14px_4px_color-mix(in_srgb,var(--accent-primary)_55%,transparent)]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
