"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motion";
import type { Screenshot } from "@/lib/content/screenshots";

interface ScreenshotsCarouselProps {
  screenshots: Screenshot[];
}

interface PreviewData {
  title: string;
  subtitle: string;
  accent: string;
  hero: string;
  icon: string;
}

interface TourCopy {
  eyebrow: string;
  title: string;
  body: string;
}

const BASE_LEVEL = 12;

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

const tourCopy: Record<string, TourCopy> = {
  dashboard: {
    eyebrow: "Your character sheet",
    title: "The whole day at a glance",
    body: "Level, XP, streaks, and the next reminder  -  the home base you open a dozen times a day.",
  },
  "quest-log": {
    eyebrow: "The battle log",
    title: "Every care moment is a quest",
    body: "Feeds, naps, growth, and photos  -  each tap logs the moment and hands back XP.",
  },
  "skill-tree": {
    eyebrow: "Milestones",
    title: "Watch the skill tree branch out",
    body: "First smile, first roll, first steps  -  milestones unlock as nodes you can revisit.",
  },
  "trophy-room": {
    eyebrow: "Achievements",
    title: "Tiny victories you get to keep",
    body: "Streaks and firsts become badges the whole family gets to celebrate.",
  },
};

/**
 * S7 Screenshot Gallery  -  a guided "tour inside one device".
 *
 * On desktop (>=1024px, motion allowed) a single phone stays pinned, centred,
 * and large via `position: sticky`; vertical scroll progress swaps the *screen
 * inside it* between the four app views, one deliberate beat at a time, while
 * the narrative copy, the level counter, and a brand XP bar advance in sync.
 * Pinning is native sticky (no scroll hijack), so it never fights Lenis. The
 * screen swap itself is a spring CSS transition keyed off the active index.
 *
 * On touch / small screens / reduced motion it becomes a vertical
 * feature/phone/feature rhythm: the actual UI stays still and legible, which
 * is the honest ergonomic on a phone.
 */
export function ScreenshotsCarousel({ screenshots }: ScreenshotsCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const xpFillRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<(() => void) | null>(null);

  const lenis = useLenis(() => renderRef.current?.());
  const count = screenshots.length;

  // Native rail is the SSR-safe default; the pinned tour switches on after
  // mount once we know the viewport supports it.
  useEffect(() => {
    if (reducedMotion) {
      setPinned(false);
      return;
    }
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reducedMotion]);

  // --- sticky tour (desktop) ---
  useEffect(() => {
    if (!pinned) return;
    const section = sectionRef.current;
    if (!section || count === 0) return;

    let frame = 0;
    let queued = false;

    const render = () => {
      queued = false;
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        Math.max(total, 1),
      );
      const p = total > 0 ? scrolled / total : 0;

      if (xpFillRef.current) {
        xpFillRef.current.style.transform = `scaleX(${Math.max(p, 0.02)})`;
      }

      const next = Math.min(Math.max(Math.round(p * (count - 1)), 0), count - 1);
      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(render);
    };

    renderRef.current = render;
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", render);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", render);
      cancelAnimationFrame(frame);
      renderRef.current = null;
    };
  }, [pinned, count]);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const total = section.offsetHeight - window.innerHeight;
    const target = count > 1 ? index / (count - 1) : 0;
    const y = sectionTop + target * total;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const activeAccent = getPreviewData(screenshots[activeIndex]?.id).accent;

  // ===== PINNED TOUR (desktop) =====
  if (pinned) {
    const copy = getTourCopy(screenshots[activeIndex]?.id);

    return (
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: `${count * 100}svh` }}
      >
        <div
          ref={pinRef}
          className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[var(--story-header,4.5rem)]"
        >
          <div className="mx-auto grid h-full w-full max-w-[100rem] grid-cols-1 items-center gap-[clamp(2rem,5vw,5rem)] px-6 lg:grid-cols-[1fr_minmax(17rem,22rem)] lg:px-10 2xl:px-16">
            <div className="max-w-xl">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                Inside the app
              </p>
              <h2 className="mt-2 text-h2">Tour the tiny command center.</h2>

              <div
                key={activeIndex}
                className="mt-8 motion-safe:animate-[float-in_0.5s_var(--ease-out-premium)]"
              >
                <p
                  className="font-display text-sm font-bold uppercase tracking-[0.16em]"
                  style={{ color: activeAccent }}
                >
                  {copy.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-[var(--text-primary)]">
                  {copy.title}
                </h3>
                <p className="mt-3 max-w-md text-lg leading-8 text-[var(--text-secondary)]">
                  {copy.body}
                </p>
              </div>

              <div className="mt-9 max-w-sm">
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-display text-lg font-bold tabular-nums"
                    style={{ color: activeAccent }}
                  >
                    Level {BASE_LEVEL + activeIndex}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--text-secondary)]">
                    {activeIndex + 1} / {count}
                  </span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--border-subtle)]">
                  <div
                    ref={xpFillRef}
                    className="h-full w-full origin-left rounded-full bg-grad-xp"
                    style={{ transform: "scaleX(0.02)" }}
                  />
                </div>
              </div>

              <ol className="mt-6 flex flex-wrap gap-2">
                {screenshots.map((screenshot, index) => {
                  const data = getPreviewData(screenshot.id);
                  const isActive = index === activeIndex;
                  return (
                    <li key={screenshot.id}>
                      <button
                        type="button"
                        onClick={() => jumpTo(index)}
                        aria-current={isActive}
                        className={`rounded-full px-3.5 py-1.5 font-display text-xs font-bold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)] ${
                          isActive
                            ? "text-white"
                            : "bg-white/60 text-[var(--text-secondary)] hover:bg-white"
                        }`}
                        style={isActive ? { background: data.accent } : undefined}
                      >
                        {data.title}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-8 hidden items-center gap-2 text-sm font-semibold text-[var(--text-caption)] lg:flex">
                <span aria-hidden="true">↓</span> Scroll to level up the tour
              </p>
            </div>

            <div className="justify-self-center lg:justify-self-end">
              <PhoneFrame sizeClassName="h-[clamp(26rem,68svh,42rem)] aspect-[9/19.4]">
                {screenshots.map((screenshot, index) => (
                  <PhoneScreen
                    key={screenshot.id}
                    screenshot={screenshot}
                    level={BASE_LEVEL + index}
                    active={index === activeIndex}
                  />
                ))}
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== VERTICAL RHYTHM (mobile / reduced motion) =====
  return (
    <div>
      <header className="mb-10 sm:mb-12">
        <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
          Inside the app
        </p>
        <h2 className="mt-2 text-h2">Tour the tiny command center.</h2>
        <p className="mt-3 max-w-[34rem] text-base leading-7 text-[var(--text-secondary)]">
          Big tap targets, playful progress, and parent-ready logs sit inside a
          phone frame large enough to inspect.
        </p>
      </header>

      <div className="grid gap-14 sm:gap-20">
        {screenshots.map((screenshot, index) => {
          const copy = getTourCopy(screenshot.id);
          const accent = getPreviewData(screenshot.id).accent;
          const flip = index % 2 === 1;
          return (
            <article
              key={screenshot.id}
              className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12"
            >
              <figure
                className={`flex justify-center ${flip ? "sm:order-2" : ""}`}
              >
                <PhoneFrame sizeClassName="w-[clamp(13rem,62vw,17rem)] aspect-[9/19.4]">
                  <PhoneScreen
                    screenshot={screenshot}
                    level={BASE_LEVEL + index}
                    active
                  />
                </PhoneFrame>
              </figure>
              <div className={flip ? "sm:order-1" : ""}>
                <p
                  className="font-display text-sm font-bold uppercase tracking-[0.16em]"
                  style={{ color: accent }}
                >
                  {copy.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                  {copy.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                  {copy.body}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-[var(--text-secondary)]">
                  <span
                    className="font-display tabular-nums"
                    style={{ color: accent }}
                  >
                    Level {BASE_LEVEL + index}
                  </span>
                  · {getPreviewData(screenshot.id).title}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function getPreviewData(id: string | undefined): PreviewData {
  return (id && previewData[id]) || previewData.dashboard;
}

function getTourCopy(id: string | undefined): TourCopy {
  return (id && tourCopy[id]) || tourCopy.dashboard;
}

/** Constant CSS-built phone hardware. The screen content swaps inside it. */
function PhoneFrame({
  sizeClassName,
  children,
}: {
  sizeClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative mx-auto rounded-[3rem] bg-[#202832] p-[0.62rem] shadow-[0_2rem_4rem_rgba(23,32,42,0.18),inset_0_0_0_1px_rgba(255,255,255,0.16)] ${sizeClassName}`}
    >
      <span className="absolute -left-1 top-28 h-14 w-1 rounded-l-full bg-[#2c3541]" />
      <span className="absolute -right-1 top-36 h-20 w-1 rounded-r-full bg-[#2c3541]" />
      <span className="absolute left-12 right-12 top-1 h-px bg-white/30" />
      <div className="absolute inset-[0.62rem] rounded-[2.4rem] bg-[#0f1720]" />

      <div className="relative h-full overflow-hidden rounded-[2.15rem] bg-[var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
        {children}

        {/* Constant overlays sit above whichever screen is active. */}
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-[#111821] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        <div className="pointer-events-none absolute inset-x-5 top-0 z-20 h-24 rounded-b-[2rem] bg-white/18 blur-xl" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(120deg,rgba(255,255,255,0.46),transparent_22%,transparent_62%,rgba(255,255,255,0.18))]" />
      </div>
    </div>
  );
}

function PhoneScreen({
  screenshot,
  level,
  active,
}: {
  screenshot: Screenshot;
  level: number;
  active: boolean;
}) {
  const data = getPreviewData(screenshot.id);

  return (
    <div
      role="img"
      aria-label={screenshot.alt}
      aria-hidden={!active}
      className={`absolute inset-0 transition duration-500 [transition-timing-function:var(--ease-press)] motion-reduce:transition-none ${
        active
          ? "z-10 opacity-100 [transform:scale(1)]"
          : "pointer-events-none opacity-0 [transform:scale(0.94)_translateY(14px)]"
      }`}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 50% 8%, color-mix(in srgb, ${data.accent} 28%, transparent), transparent 32%), linear-gradient(180deg, #fffdf7, var(--bg-base) 42%, color-mix(in srgb, ${data.accent} 10%, #ffffff))`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col p-5 pt-14">
        <PhoneStatus accent={data.accent} level={level} />
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
  );
}

function PhoneStatus({ accent, level }: { accent: string; level: number }) {
  return (
    <div className="flex items-center justify-between text-[0.68rem] font-bold text-[var(--text-primary)]">
      <span>9:41</span>
      <span
        className="rounded-full px-2 py-1 text-white"
        style={{ background: accent }}
      >
        Level {level}
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
