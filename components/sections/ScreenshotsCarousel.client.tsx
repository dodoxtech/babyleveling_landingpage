"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motion";
import type { Screenshot } from "@/lib/content/screenshots";
import type { Dictionary } from "@/lib/i18n/dictionary";

/** Localized copy for the whole tour — see `home.shots` in the dictionary. */
type ShotsCopy = Dictionary["home"]["shots"];

interface ScreenshotsCarouselProps {
  screenshots: Screenshot[];
  copy: ShotsCopy;
}

/** Per-screen visual styling (accent + imagery). Text lives in `copy`. */
interface PreviewData {
  accent: string;
  hero: string;
  icon: string;
}

const BASE_LEVEL = 12;

/** Smooth 0→1 ramp between two edges (Hermite), used to keep the phone-screen
 * cross-fade tight and gentle instead of a long linear double-exposure. */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

const previewData: Record<string, PreviewData> = {
  dashboard: {
    accent: "var(--accent-primary)",
    hero: "/assets/characters/cute-baby-girl-sitting.png",
    icon: "/assets/icons/bottle.png",
  },
  "quest-log": {
    accent: "var(--accent-secondary)",
    hero: "/assets/icons/calendar.png",
    icon: "/assets/icons/moon-star.png",
  },
  "skill-tree": {
    accent: "var(--accent-tertiary)",
    hero: "/assets/timeline/lv10-little-star.png",
    icon: "/assets/icons/achievement.png",
  },
  "trophy-room": {
    accent: "var(--accent-pink)",
    hero: "/assets/icons/trophy.png",
    icon: "/assets/icons/xp-badge.png",
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
export function ScreenshotsCarousel({
  screenshots,
  copy,
}: ScreenshotsCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const xpFillRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<(() => void) | null>(null);
  // Phone-screen layers, kept in scroll order so the render loop can crossfade
  // them continuously instead of snapping one on at each threshold.
  const screenRefs = useRef<Array<HTMLDivElement | null>>([]);

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

      // Continuous position along the tour (0 .. count-1). Each phone screen
      // holds fully opaque across its own segment and only cross-fades inside a
      // narrow band (BAND) on either side of the midpoint between two screens.
      // A plain `1 - distance` ramp kept BOTH neighbouring screens ~50% visible
      // for the whole gap, which read as a ghosted double-exposure; this keeps a
      // single clean screen on-screen except for a short, complementary blend.
      const cont = count > 1 ? p * (count - 1) : 0;
      const BAND = 0.16; // half-width of the cross-fade zone around a midpoint
      const layers = screenRefs.current;
      for (let i = 0; i < layers.length; i++) {
        const el = layers[i];
        if (!el) continue;
        const d = cont - i; // signed distance from this screen
        const ad = Math.abs(d);
        // 1 while this screen owns the view, ramping to 0 only as the 0.5
        // boundary is crossed. smoothstep keeps the blend gentle and, because
        // neighbours are symmetric, their opacities sum to ~1 (no flash/blank).
        const opacity = 1 - smoothstep(0.5 - BAND, 0.5 + BAND, ad);
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translateY(${(-d * 2).toFixed(2)}%) scale(${(1 - Math.min(ad, 1) * 0.04).toFixed(3)})`;
        el.style.zIndex = String(opacity > 0.5 ? 10 : 1);
        el.style.pointerEvents = ad < 0.5 ? "auto" : "none";
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
    const screen = getScreen(copy, screenshots[activeIndex]?.id);

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
                {copy.eyebrow}
              </p>
              <h2 className="mt-2 text-h2">{copy.title}</h2>

              <div
                key={activeIndex}
                className="mt-8 motion-safe:animate-[float-in_0.5s_var(--ease-out-premium)]"
              >
                <p
                  className="font-display text-sm font-bold uppercase tracking-[0.16em]"
                  style={{ color: activeAccent }}
                >
                  {screen.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-[var(--text-primary)]">
                  {screen.heading}
                </h3>
                <p className="mt-3 max-w-md text-lg leading-8 text-[var(--text-secondary)]">
                  {screen.body}
                </p>
              </div>

              <div className="mt-9 max-w-sm">
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-display text-lg font-bold tabular-nums"
                    style={{ color: activeAccent }}
                  >
                    {copy.levelWord} {BASE_LEVEL + activeIndex}
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
                        {getScreen(copy, screenshot.id).tabTitle}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-8 hidden items-center gap-2 text-sm font-semibold text-[var(--text-caption)] lg:flex">
                <span aria-hidden="true">↓</span> {copy.scrollHint}
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
                    copy={copy}
                    tour
                    assignRef={(el) => {
                      screenRefs.current[index] = el;
                    }}
                    initialStyle={{
                      opacity: index === 0 ? 1 : 0,
                      transform:
                        index === 0 ? "none" : "translateY(4%) scale(0.95)",
                      zIndex: index === 0 ? 10 : 0,
                    }}
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
          {copy.eyebrow}
        </p>
        <h2 className="mt-2 text-h2">{copy.title}</h2>
        <p className="mt-3 max-w-[34rem] text-base leading-7 text-[var(--text-secondary)]">
          {copy.body}
        </p>
      </header>

      <div className="grid gap-14 sm:gap-20">
        {screenshots.map((screenshot, index) => {
          const screen = getScreen(copy, screenshot.id);
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
                    copy={copy}
                  />
                </PhoneFrame>
              </figure>
              <div className={flip ? "sm:order-1" : ""}>
                <p
                  className="font-display text-sm font-bold uppercase tracking-[0.16em]"
                  style={{ color: accent }}
                >
                  {screen.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                  {screen.heading}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                  {screen.body}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-[var(--text-secondary)]">
                  <span
                    className="font-display tabular-nums"
                    style={{ color: accent }}
                  >
                    {copy.levelWord} {BASE_LEVEL + index}
                  </span>
                  · {screen.tabTitle}
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

function getScreen(copy: ShotsCopy, id: string | undefined) {
  return (id && copy.screens[id]) || copy.screens.dashboard;
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
  copy,
  tour = false,
  assignRef,
  initialStyle,
}: {
  screenshot: Screenshot;
  level: number;
  active: boolean;
  copy: ShotsCopy;
  /** Pinned desktop tour: opacity/transform are driven per-frame by the scroll
   * loop, so no CSS transition (it would lag the continuous crossfade). */
  tour?: boolean;
  assignRef?: (el: HTMLDivElement | null) => void;
  initialStyle?: CSSProperties;
}) {
  const data = getPreviewData(screenshot.id);
  const screen = getScreen(copy, screenshot.id);

  return (
    <div
      ref={assignRef}
      role="img"
      aria-label={screenshot.alt}
      aria-hidden={!active}
      className={
        tour
          ? "absolute inset-0 will-change-transform motion-reduce:transition-none"
          : `absolute inset-0 transition duration-500 [transition-timing-function:var(--ease-press)] motion-reduce:transition-none ${
              active
                ? "z-10 opacity-100 [transform:scale(1)]"
                : "pointer-events-none opacity-0 [transform:scale(0.94)_translateY(14px)]"
            }`
      }
      style={tour ? initialStyle : undefined}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 50% 8%, color-mix(in srgb, ${data.accent} 28%, transparent), transparent 32%), linear-gradient(180deg, #fffdf7, var(--bg-base) 42%, color-mix(in srgb, ${data.accent} 10%, #ffffff))`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col p-5 pt-14">
        <PhoneStatus accent={data.accent} level={level} levelWord={copy.levelWord} />
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-3xl font-bold leading-none text-[var(--text-primary)]">
              {screen.tabTitle}
            </p>
            <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">
              {screen.subtitle}
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

        <AppScreen id={screenshot.id} data={data} copy={copy} />
      </div>
    </div>
  );
}

function PhoneStatus({
  accent,
  level,
  levelWord,
}: {
  accent: string;
  level: number;
  levelWord: string;
}) {
  return (
    <div className="flex items-center justify-between text-[0.68rem] font-bold text-[var(--text-primary)]">
      <span>9:41</span>
      <span
        className="rounded-full px-2 py-1 text-white"
        style={{ background: accent }}
      >
        {levelWord} {level}
      </span>
    </div>
  );
}

function AppScreen({
  id,
  data,
  copy,
}: {
  id: string;
  data: PreviewData;
  copy: ShotsCopy;
}) {
  if (id === "quest-log")
    return <QuestLogScreen data={data} mock={copy.mock.questLog} />;
  if (id === "skill-tree")
    return <SkillTreeScreen data={data} mock={copy.mock.skillTree} />;
  if (id === "trophy-room")
    return <TrophyRoomScreen data={data} mock={copy.mock.trophyRoom} />;
  return <DashboardScreen data={data} mock={copy.mock.dashboard} />;
}

function DashboardScreen({
  data,
  mock,
}: {
  data: PreviewData;
  mock: ShotsCopy["mock"]["dashboard"];
}) {
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
          {mock.nextLevel}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MetricTile label={mock.feed} value="+8 XP" tone="var(--accent-pink)" />
        <MetricTile
          label={mock.sleep}
          value="+10 XP"
          tone="var(--accent-secondary)"
        />
      </div>
      <div className="rounded-[1.25rem] bg-white/78 p-4 shadow-[0_4px_0_rgba(23,32,42,0.07)]">
        <p className="text-xs font-bold text-[var(--text-secondary)]">
          {mock.lastActivity}
        </p>
        <p className="mt-1 font-display text-xl font-bold">{mock.lastActivityValue}</p>
      </div>
    </div>
  );
}

function QuestLogScreen({
  data,
  mock,
}: {
  data: PreviewData;
  mock: ShotsCopy["mock"]["questLog"];
}) {
  const icons = [
    "/assets/icons/bottle.png",
    "/assets/icons/moon-star.png",
    "/assets/icons/growth-chart.png",
    "/assets/icons/camera.png",
  ];

  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col gap-3">
      <div
        className="rounded-[1.5rem] p-4 text-white shadow-[0_5px_0_rgba(23,32,42,0.12)]"
        style={{ background: data.accent }}
      >
        <p className="font-display text-2xl font-bold">{mock.title}</p>
        <p className="mt-1 text-xs font-semibold opacity-90">{mock.subtitle}</p>
      </div>
      <div className="grid gap-3">
        {mock.quests.map(({ title, note, reward }, index) => (
          <div
            key={title}
            className="grid grid-cols-[2.6rem_1fr_auto] items-center gap-3 rounded-[1.15rem] bg-white/82 p-3 shadow-[0_3px_0_rgba(23,32,42,0.07)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--bg-section-alt)]">
              <Image
                src={icons[index]}
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

function SkillTreeScreen({
  data,
  mock,
}: {
  data: PreviewData;
  mock: ShotsCopy["mock"]["skillTree"];
}) {
  const images = [
    "/assets/timeline/lv05-explorer.png",
    "/assets/timeline/lv10-little-star.png",
    "/assets/timeline/lv20-adventurer.png",
    "/assets/timeline/lv50-legend.png",
  ];

  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col">
      <div className="rounded-[1.6rem] bg-white/80 p-4 shadow-[0_5px_0_rgba(23,32,42,0.08)]">
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl font-bold">{mock.title}</p>
          <Image
            src={data.icon}
            alt=""
            width={38}
            height={38}
            aria-hidden="true"
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {mock.milestones.map((label, index) => (
            <div
              key={label}
              className={`rounded-[1.2rem] p-3 text-center shadow-[0_3px_0_rgba(23,32,42,0.07)] ${
                index < 2 ? "bg-[var(--bg-playfield)]" : "bg-white/82"
              }`}
            >
              <Image
                src={images[index]}
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
        <p className="font-display text-xl font-bold">{mock.unlocked}</p>
        <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">
          {mock.unlockedNote}
        </p>
      </div>
    </div>
  );
}

function TrophyRoomScreen({
  data,
  mock,
}: {
  data: PreviewData;
  mock: ShotsCopy["mock"]["trophyRoom"];
}) {
  const icons = [
    "/assets/icons/trophy.png",
    "/assets/icons/shield.png",
    "/assets/icons/book.png",
    "/assets/icons/family.png",
    "/assets/icons/achievement.png",
    "/assets/icons/xp-badge.png",
  ];

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
        <p className="mt-2 font-display text-2xl font-bold">{mock.title}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {mock.trophies.map((label, index) => (
          <div
            key={label}
            className="rounded-[1rem] bg-white/82 p-3 text-center shadow-[0_3px_0_rgba(23,32,42,0.07)]"
          >
            <Image
              src={icons[index]}
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
