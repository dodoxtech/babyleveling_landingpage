"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import type { Screenshot } from "@/lib/content/screenshots";

interface ScreenshotsCarouselProps {
  screenshots: Screenshot[];
  prevLabel: string;
  nextLabel: string;
}

interface PreviewData {
  title: string;
  subtitle: string;
  accent: string;
  hero: string;
  icon: string;
}

const previewData: Record<string, PreviewData> = {
  dashboard: {
    title: "Hero Sheet",
    subtitle: "Today feels under control",
    accent: "var(--accent-primary)",
    hero: "/assets/characters/cute-baby-girl-sitting.png",
    icon: "/assets/icons/bottle.png",
  },
  "quest-log": {
    title: "Quest Log",
    subtitle: "Care actions become wins",
    accent: "var(--accent-secondary)",
    hero: "/assets/icons/calendar.png",
    icon: "/assets/icons/moon-star.png",
  },
  "skill-tree": {
    title: "Skill Tree",
    subtitle: "Milestones stay visible",
    accent: "var(--accent-tertiary)",
    hero: "/assets/timeline/lv10-little-star.png",
    icon: "/assets/icons/achievement.png",
  },
  "trophy-room": {
    title: "Trophy Room",
    subtitle: "Tiny victories stack up",
    accent: "var(--accent-pink)",
    hero: "/assets/icons/trophy.png",
    icon: "/assets/icons/xp-badge.png",
  },
};

export function ScreenshotsCarousel({
  screenshots,
  prevLabel,
  nextLabel,
}: ScreenshotsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slideRefs.current.findIndex(
          (node) => node === visible.target,
        );
        if (index !== -1) setActiveIndex(index);
      },
      { root: track, threshold: [0.42, 0.62, 0.82] },
    );

    slideRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [screenshots.length]);

  const scrollToIndex = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), screenshots.length - 1);
    slideRefs.current[nextIndex]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(nextIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="BabyLeveling app screen previews"
        onKeyDown={handleKeyDown}
        className="mx-[calc(50%-50vw)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc((100vw-80rem)/2))] pb-8 pt-2 outline-none [scrollbar-width:none] focus-visible:ring-4 focus-visible:ring-[var(--accent-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-section-alt)] motion-reduce:scroll-auto sm:gap-7 lg:gap-9 [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((screenshot, index) => (
          <figure
            key={screenshot.id}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            aria-current={index === activeIndex}
            className="w-[78vw] max-w-[23rem] shrink-0 snap-center sm:w-[23rem] lg:w-[26rem] lg:max-w-[26rem]"
          >
            <DevicePreview
              screenshot={screenshot}
              active={index === activeIndex}
            />
            <figcaption className="mt-5 text-center">
              <span className="font-display text-xl font-bold text-[var(--text-primary)]">
                {screenshot.caption}
              </span>
              <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">
                {getPreviewData(screenshot.id).subtitle}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 rounded-[var(--radius-xl)] bg-white/70 p-3 shadow-[0_5px_0_rgba(23,32,42,0.08)] sm:flex-row">
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="btn-secondary btn-sm w-full disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45 sm:w-auto"
        >
          Previous
        </button>

        <div className="flex items-center gap-2" aria-label="Preview progress">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              type="button"
              aria-label={`Show ${screenshot.caption ?? "preview"}`}
              aria-current={index === activeIndex}
              onClick={() => scrollToIndex(index)}
              className="h-3 rounded-full border transition-all motion-reduce:transition-none"
              style={{
                width: index === activeIndex ? "2rem" : "0.75rem",
                background:
                  index === activeIndex
                    ? getPreviewData(screenshot.id).accent
                    : "#ffffff",
                borderColor:
                  index === activeIndex
                    ? getPreviewData(screenshot.id).accent
                    : "var(--border-card)",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === screenshots.length - 1}
          className="btn-secondary btn-sm w-full disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45 sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function getPreviewData(id: string): PreviewData {
  return previewData[id] ?? previewData.dashboard;
}

function DevicePreview({
  screenshot,
  active,
}: {
  screenshot: Screenshot;
  active: boolean;
}) {
  const data = getPreviewData(screenshot.id);

  return (
    <div
      role="img"
      aria-label={screenshot.alt}
      className={`relative mx-auto aspect-[9/19.4] rounded-[3rem] bg-[#202832] p-[0.62rem] shadow-[0_2rem_4rem_rgba(23,32,42,0.18),inset_0_0_0_1px_rgba(255,255,255,0.16)] transition duration-500 motion-reduce:transition-none ${
        active
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-4 scale-[0.96] opacity-75"
      }`}
    >
      <span className="absolute -left-1 top-28 h-14 w-1 rounded-l-full bg-[#2c3541]" />
      <span className="absolute -right-1 top-36 h-20 w-1 rounded-r-full bg-[#2c3541]" />
      <span className="absolute left-12 right-12 top-1 h-px bg-white/30" />
      <div className="absolute inset-[0.62rem] rounded-[2.4rem] bg-[#0f1720]" />

      <div className="relative h-full overflow-hidden rounded-[2.15rem] bg-[var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 50% 8%, color-mix(in srgb, ${data.accent} 28%, transparent), transparent 32%), linear-gradient(180deg, #fffdf7, var(--bg-base) 42%, color-mix(in srgb, ${data.accent} 10%, #ffffff))`,
          }}
        />
        <div className="absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-[#111821] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        <div className="absolute inset-x-5 top-0 z-10 h-24 rounded-b-[2rem] bg-white/18 blur-xl" />
        <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.46),transparent_22%,transparent_62%,rgba(255,255,255,0.18))]" />

        <div className="relative z-10 flex h-full flex-col p-5 pt-14">
          <PhoneStatus accent={data.accent} />
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-3xl font-bold leading-none text-[var(--text-primary)]">
                {data.title}
              </p>
              <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">
                {data.subtitle}
              </p>
            </div>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white shadow-[0_4px_0_rgba(23,32,42,0.1)]"
              style={{ border: `2px solid ${data.accent}` }}
            >
              <Image
                src={data.icon}
                alt=""
                width={34}
                height={34}
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
            </div>
          </div>

          <AppScreen id={screenshot.id} data={data} />
        </div>
      </div>
    </div>
  );
}

function PhoneStatus({ accent }: { accent: string }) {
  return (
    <div className="flex items-center justify-between text-[0.68rem] font-bold text-[var(--text-primary)]">
      <span>9:41</span>
      <span
        className="rounded-full px-2 py-1 text-white"
        style={{ background: accent }}
      >
        Level 12
      </span>
    </div>
  );
}

function AppScreen({ id, data }: { id: string; data: PreviewData }) {
  if (id === "quest-log") return <QuestLogScreen data={data} />;
  if (id === "skill-tree") return <SkillTreeScreen data={data} />;
  if (id === "trophy-room") return <TrophyRoomScreen data={data} />;
  return <DashboardScreen data={data} />;
}

function DashboardScreen({ data }: { data: PreviewData }) {
  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col gap-4">
      <div className="rounded-[1.6rem] bg-white/82 p-4 text-center shadow-[0_5px_0_rgba(23,32,42,0.08)]">
        <Image
          src={data.hero}
          alt=""
          width={170}
          height={170}
          aria-hidden="true"
          className="mx-auto h-36 w-36 object-contain"
        />
        <p className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
          1,840 XP
        </p>
        <p className="text-xs font-semibold text-[var(--text-secondary)]">
          Next level after two more care logs
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MetricTile label="Feed" value="+40 XP" tone="var(--accent-pink)" />
        <MetricTile
          label="Sleep"
          value="+60 HP"
          tone="var(--accent-secondary)"
        />
      </div>
      <div className="rounded-[1.25rem] bg-white/78 p-4 shadow-[0_4px_0_rgba(23,32,42,0.07)]">
        <p className="text-xs font-bold text-[var(--text-secondary)]">
          Next reminder
        </p>
        <p className="mt-1 font-display text-xl font-bold">Bottle in 24 min</p>
      </div>
    </div>
  );
}

function QuestLogScreen({ data }: { data: PreviewData }) {
  const quests = [
    ["Bottle", "Logged at 7:20", "+40 XP", "/assets/icons/bottle.png"],
    ["Nap", "Recovered HP", "+60 HP", "/assets/icons/moon-star.png"],
    ["Growth", "Weight note saved", "+25 XP", "/assets/icons/growth-chart.png"],
    ["Photo", "Memory added", "Badge", "/assets/icons/camera.png"],
  ] as const;

  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col gap-3">
      <div
        className="rounded-[1.5rem] p-4 text-white shadow-[0_5px_0_rgba(23,32,42,0.12)]"
        style={{ background: data.accent }}
      >
        <p className="font-display text-2xl font-bold">Daily quests</p>
        <p className="mt-1 text-xs font-semibold opacity-90">
          Four care moments already counted
        </p>
      </div>
      <div className="grid gap-3">
        {quests.map(([title, note, reward, icon]) => (
          <div
            key={title}
            className="grid grid-cols-[2.6rem_1fr_auto] items-center gap-3 rounded-[1.15rem] bg-white/82 p-3 shadow-[0_3px_0_rgba(23,32,42,0.07)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--bg-section-alt)]">
              <Image
                src={icon}
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
              />
            </span>
            <span>
              <span className="block text-sm font-bold">{title}</span>
              <span className="block text-[0.68rem] font-semibold text-[var(--text-secondary)]">
                {note}
              </span>
            </span>
            <span className="font-display text-sm font-bold text-[var(--accent-primary)]">
              {reward}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillTreeScreen({ data }: { data: PreviewData }) {
  const milestones = [
    ["Smile", "/assets/timeline/lv05-explorer.png"],
    ["Roll", "/assets/timeline/lv10-little-star.png"],
    ["Reach", "/assets/timeline/lv20-adventurer.png"],
    ["Legend", "/assets/timeline/lv50-legend.png"],
  ] as const;

  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col">
      <div className="rounded-[1.6rem] bg-white/80 p-4 shadow-[0_5px_0_rgba(23,32,42,0.08)]">
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl font-bold">Milestone path</p>
          <Image
            src={data.icon}
            alt=""
            width={38}
            height={38}
            aria-hidden="true"
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {milestones.map(([label, image], index) => (
            <div
              key={label}
              className={`rounded-[1.2rem] p-3 text-center shadow-[0_3px_0_rgba(23,32,42,0.07)] ${
                index < 2 ? "bg-[var(--bg-playfield)]" : "bg-white/82"
              }`}
            >
              <Image
                src={image}
                alt=""
                width={74}
                height={74}
                aria-hidden="true"
                className="mx-auto h-16 w-16 object-contain"
              />
              <p className="mt-2 text-sm font-bold">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-[1.25rem] bg-white/76 p-4 text-center shadow-[0_4px_0_rgba(23,32,42,0.07)]">
        <p className="font-display text-xl font-bold">First smile unlocked</p>
        <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">
          Saved to the family timeline
        </p>
      </div>
    </div>
  );
}

function TrophyRoomScreen({ data }: { data: PreviewData }) {
  const trophies = [
    ["/assets/icons/trophy.png", "Streak"],
    ["/assets/icons/shield.png", "Guard"],
    ["/assets/icons/book.png", "Story"],
    ["/assets/icons/family.png", "Party"],
    ["/assets/icons/achievement.png", "Firsts"],
    ["/assets/icons/xp-badge.png", "Rare"],
  ] as const;

  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col gap-4">
      <div className="rounded-[1.6rem] bg-white/82 p-4 text-center shadow-[0_5px_0_rgba(23,32,42,0.08)]">
        <Image
          src={data.hero}
          alt=""
          width={118}
          height={118}
          aria-hidden="true"
          className="mx-auto h-24 w-24 object-contain"
        />
        <p className="mt-2 font-display text-2xl font-bold">Trophy room</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {trophies.map(([icon, label]) => (
          <div
            key={label}
            className="rounded-[1rem] bg-white/82 p-3 text-center shadow-[0_3px_0_rgba(23,32,42,0.07)]"
          >
            <Image
              src={icon}
              alt=""
              width={42}
              height={42}
              aria-hidden="true"
              className="mx-auto h-10 w-10 object-contain"
            />
            <p className="mt-2 text-[0.68rem] font-bold">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-[1.15rem] bg-white/80 p-4 shadow-[0_4px_0_rgba(23,32,42,0.07)]">
      <p className="text-xs font-bold text-[var(--text-secondary)]">{label}</p>
      <p
        className="mt-1 font-display text-xl font-bold"
        style={{ color: tone }}
      >
        {value}
      </p>
    </div>
  );
}
