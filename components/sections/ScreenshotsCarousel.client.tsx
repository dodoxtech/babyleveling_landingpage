"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Screenshot } from "@/lib/content/screenshots";

interface ScreenshotsCarouselProps {
  screenshots: Screenshot[];
  prevLabel: string;
  nextLabel: string;
}

const previewData = {
  dashboard: {
    title: "Hero sheet",
    image: "/assets/characters/cute-baby-girl-sitting.png",
    action: "Feed logged",
    reward: "+40 XP",
    icon: "/assets/icons/bottle.png",
  },
  "quest-log": {
    title: "Quest log",
    image: "/assets/icons/calendar.png",
    action: "Nap complete",
    reward: "+60 XP",
    icon: "/assets/icons/moon-star.png",
  },
  "skill-tree": {
    title: "Milestones",
    image: "/assets/timeline/lv10-little-star.png",
    action: "First smile",
    reward: "Badge",
    icon: "/assets/icons/achievement.png",
  },
  "trophy-room": {
    title: "Trophy room",
    image: "/assets/icons/trophy.png",
    action: "7 day rhythm",
    reward: "Rare",
    icon: "/assets/icons/xp-badge.png",
  },
} as const;

export function ScreenshotsCarousel({
  screenshots,
  prevLabel,
  nextLabel,
}: ScreenshotsCarouselProps) {
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
        const index = slideRefs.current.findIndex((node) => node === visible.target);
        if (index !== -1) setActiveIndex(index);
      },
      { root: track, threshold: 0.65 },
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
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.id}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="w-[18rem] shrink-0 snap-center sm:w-[21rem]"
          >
            <DevicePreview id={screenshot.id} alt={screenshot.alt} />
            <p className="mt-4 text-center text-sm font-semibold text-[var(--text-secondary)]">
              {screenshot.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
          disabled={activeIndex === 0}
          className="btn-secondary btn-sm disabled:cursor-not-allowed disabled:opacity-45"
        >
          Prev
        </button>
        <div className="flex gap-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              type="button"
              aria-label={`Show ${screenshot.caption ?? "preview"}`}
              aria-current={index === activeIndex}
              onClick={() => scrollToIndex(index)}
              className="h-3 w-3 rounded-full border"
              style={{
                background: index === activeIndex ? "var(--accent-primary)" : "#ffffff",
                borderColor: "var(--border-card)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => scrollToIndex(Math.min(activeIndex + 1, screenshots.length - 1))}
          disabled={activeIndex === screenshots.length - 1}
          className="btn-secondary btn-sm disabled:cursor-not-allowed disabled:opacity-45"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function DevicePreview({ id, alt }: { id: string; alt: string }) {
  const data = previewData[id as keyof typeof previewData] ?? previewData.dashboard;

  return (
    <div className="mx-auto aspect-[9/18.5] rounded-[2.4rem] border-[10px] border-[#17202a] bg-[#17202a] p-2 shadow-[0_18px_0_rgba(23,32,42,0.12)]">
      <div className="relative h-full overflow-hidden rounded-[1.65rem] bg-[var(--bg-base)] p-4">
        <div className="mx-auto mb-4 h-5 w-24 rounded-full bg-[#17202a]" />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-bold">{data.title}</p>
            <p className="text-xs font-semibold text-[var(--text-caption)]">
              Level 12 parent party
            </p>
          </div>
          <Image src={data.icon} alt="" width={42} height={42} aria-hidden="true" />
        </div>

        <div className="mt-5 rounded-[var(--radius-xl)] bg-[var(--bg-section-alt)] p-4 text-center">
          <Image
            src={data.image}
            alt={alt}
            width={150}
            height={150}
            className="mx-auto h-36 w-36 object-contain"
          />
          <div className="mt-3 h-3 rounded-full bg-white">
            <div className="h-full w-[72%] rounded-full bg-grad-xp" />
          </div>
        </div>

        <div className="card-duolingo mt-4 p-4">
          <p className="text-sm font-bold">{data.action}</p>
          <p className="mt-1 font-display text-2xl font-bold text-[var(--accent-primary)]">
            {data.reward}
          </p>
        </div>
      </div>
    </div>
  );
}
