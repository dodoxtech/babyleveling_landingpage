"use client";

import { useEffect, useRef, useState } from "react";
import { spritePath, type SpriteKey } from "@/lib/content/sprites";
import type { Screenshot } from "@/lib/content/screenshots";

interface ScreenshotsCarouselProps {
  screenshots: Screenshot[];
}

/**
 * S7 — the device-framed carousel mechanics: native CSS scroll-snap (so mobile
 * swipe-snap needs no JS at all) plus arrow/dot nav that scroll the track
 * programmatically, with the active dot tracked via `IntersectionObserver`
 * per slide.
 *
 * Each slide renders a styled mock "screen" (`ScreenMock`) rather than
 * `next/image` against `screenshot.src` — no real screenshot PNG exists yet
 * (TASK-0007 explicitly puts producing those assets out of scope; see the
 * comment on `lib/content/screenshots.ts`). The carousel mechanics below
 * don't care what's inside a slide, so swapping in real `<Image>` elements
 * later (with native `loading="lazy"`) is a one-line change per slide, not a
 * rewrite of this component.
 *
 * Reduced motion: there's no auto-advance to disable (this carousel was
 * always manual-only, per the UX notes), so reduced motion only drops the
 * `scroll-behavior: smooth` nav buttons would otherwise use — handled by the
 * project-wide reduced-motion CSS rule in `globals.css`, no extra branch
 * needed here.
 */
export function ScreenshotsCarousel({ screenshots }: ScreenshotsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const index = slideRefs.current.findIndex(
          (node) => node === visible.target,
        );
        if (index !== -1) setActiveIndex(index);
      },
      { root: track, threshold: 0.6 },
    );

    slideRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [screenshots.length]);

  const scrollToIndex = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.id}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="flex w-full shrink-0 snap-center flex-col items-center gap-4 sm:w-[22rem]"
          >
            <DeviceFrame>
              <ScreenMock screenshotId={screenshot.id} />
            </DeviceFrame>
            <p
              role="img"
              aria-label={screenshot.alt}
              className="text-sm text-lo"
            >
              {screenshot.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 hidden items-center justify-center gap-4 sm:flex">
        <button
          type="button"
          aria-label="Previous screenshot"
          onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
          disabled={activeIndex === 0}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-hi transition-opacity hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)] disabled:opacity-30"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="flex items-center gap-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              type="button"
              aria-label={`Show ${screenshot.caption ?? `screenshot ${index + 1}`}`}
              aria-current={index === activeIndex}
              onClick={() => scrollToIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)] ${
                index === activeIndex ? "bg-grad-plasma" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next screenshot"
          onClick={() =>
            scrollToIndex(Math.min(activeIndex + 1, screenshots.length - 1))
          }
          disabled={activeIndex === screenshots.length - 1}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-hi transition-opacity hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)] disabled:opacity-30"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

/** A single static CSS device-frame overlay shared by every slide, per the UX notes. */
function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[9/19] w-56 rounded-[2.5rem] border-4 border-white/15 bg-[var(--bg-raised)] p-2 shadow-[0_30px_60px_-20px_rgba(124,58,237,0.35)]">
      <div
        aria-hidden="true"
        className="absolute top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/60"
      />
      <div className="h-full w-full overflow-hidden rounded-[1.75rem] bg-[var(--bg-void)]">
        {children}
      </div>
    </div>
  );
}

/** Per-screen mock content — an honest stand-in until real app screenshots land. */
function ScreenMock({ screenshotId }: { screenshotId: string }) {
  switch (screenshotId) {
    case "dashboard":
      return <DashboardMock />;
    case "quest-log":
      return <QuestLogMock />;
    case "skill-tree":
      return <SkillTreeMock />;
    case "trophy-room":
      return <TrophyRoomMock />;
    default:
      return null;
  }
}

function DashboardMock() {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- mock screen content, not a real screenshot */}
        <img src={spritePath("babyGirl.happy")} alt="" width={36} height={36} />
        <div>
          <p className="text-xs font-semibold text-hi">Level 14 Hero</p>
          <p className="text-[10px] text-lo">Today&apos;s quest log</p>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-white/10">
          <div className="bg-grad-plasma h-full w-2/3 rounded-full" />
        </div>
        <p className="text-[10px] text-lo">1,240 XP total</p>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2">
        {["icon.bottle", "icon.sleep", "icon.diaper"].map((icon) => (
          <div
            key={icon}
            className="glass flex flex-col items-center gap-1 rounded-lg py-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- mock screen content */}
            <img
              src={spritePath(icon as SpriteKey)}
              alt=""
              width={18}
              height={18}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestLogMock() {
  const entries = [
    { icon: "icon.bottle", label: "Fed at 7:02am", reward: "+40 XP" },
    { icon: "icon.sleep", label: "Nap, 1.5h", reward: "+60 HP" },
    { icon: "icon.diaper", label: "Diaper change", reward: "+10 XP" },
    { icon: "icon.milestone", label: "Rolled over!", reward: "Achievement" },
  ];
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <p className="mb-1 text-xs font-semibold text-hi">Battle log</p>
      {entries.map((entry) => (
        <div
          key={entry.label}
          className="glass flex items-center gap-2 rounded-lg px-2 py-1.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- mock screen content */}
          <img
            src={spritePath(entry.icon as SpriteKey)}
            alt=""
            width={16}
            height={16}
          />
          <p className="flex-1 text-[10px] text-lo">{entry.label}</p>
          <p className="text-[10px] font-medium text-hi">{entry.reward}</p>
        </div>
      ))}
    </div>
  );
}

function SkillTreeMock() {
  const nodes = [
    { icon: "icon.skills", unlocked: true },
    { icon: "icon.milestone", unlocked: true },
    { icon: "icon.learning", unlocked: true },
    { icon: "icon.checkup", unlocked: false },
    { icon: "icon.trophy", unlocked: false },
    { icon: "icon.star", unlocked: false },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="text-xs font-semibold text-hi">Skill tree</p>
      <div className="grid grid-cols-3 gap-3">
        {nodes.map((node, index) => (
          <div
            key={index}
            className={`flex h-12 w-12 items-center justify-center rounded-full border ${
              node.unlocked
                ? "border-[var(--grad-plasma-to)] bg-white/10"
                : "border-white/10 bg-white/5 opacity-40"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- mock screen content */}
            <img
              src={spritePath(node.icon as SpriteKey)}
              alt=""
              width={20}
              height={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TrophyRoomMock() {
  const trophies = ["icon.trophy", "icon.badge", "icon.star", "icon.gift"];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="text-xs font-semibold text-hi">Trophy room</p>
      <div className="grid grid-cols-2 gap-3">
        {trophies.map((icon) => (
          <div
            key={icon}
            className="glass flex flex-col items-center gap-1 rounded-lg py-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- mock screen content */}
            <img
              src={spritePath(icon as SpriteKey)}
              alt=""
              width={28}
              height={28}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
