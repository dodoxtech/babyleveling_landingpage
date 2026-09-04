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

/** Per-screen accent color, used for tab pills / level badge / eyebrow text.
 * The screens themselves are real screenshots now  -  see `screenshot.src`. */
interface PreviewData {
  accent: string;
}

const BASE_LEVEL = 12;

/** Smooth 0→1 ramp between two edges (Hermite), used to keep the phone-screen
 * cross-fade tight and gentle instead of a long linear double-exposure. */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

const previewData: Record<string, PreviewData> = {
  dashboard: { accent: "var(--accent-primary)" },
  "quest-log": { accent: "var(--accent-secondary)" },
  "skill-tree": { accent: "var(--accent-tertiary)" },
  "trophy-room": { accent: "var(--accent-pink)" },
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
                    active={index === activeIndex}
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
                  <PhoneScreen screenshot={screenshot} active />
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

        {/* Constant overlays sit above whichever screen is active. No synthetic
            Dynamic Island pill here  -  the real screenshots already have one. */}
        <div className="pointer-events-none absolute inset-x-5 top-0 z-20 h-24 rounded-b-[2rem] bg-white/18 blur-xl" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(120deg,rgba(255,255,255,0.46),transparent_22%,transparent_62%,rgba(255,255,255,0.18))]" />
      </div>
    </div>
  );
}

function PhoneScreen({
  screenshot,
  active,
  tour = false,
  assignRef,
  initialStyle,
}: {
  screenshot: Screenshot;
  active: boolean;
  /** Pinned desktop tour: opacity/transform are driven per-frame by the scroll
   * loop, so no CSS transition (it would lag the continuous crossfade). */
  tour?: boolean;
  assignRef?: (el: HTMLDivElement | null) => void;
  initialStyle?: CSSProperties;
}) {
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
      <Image
        src={screenshot.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 22rem, 17rem"
        aria-hidden="true"
        className="object-cover object-top"
        priority={false}
      />
    </div>
  );
}
