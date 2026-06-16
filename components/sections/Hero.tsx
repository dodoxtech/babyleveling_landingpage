import { heroContent } from "@/lib/content/hero";
import { HeroLogoReveal } from "@/components/sections/HeroLogoReveal.client";
import { HeroCanvasMount } from "@/components/sections/HeroCanvasMount.client";
import { SITE_DESCRIPTOR } from "@/lib/seo";

/**
 * S1 — Hero ("A new game has begun"). Server Component: the eyebrow, gradient
 * wordmark, headline, tagline, and CTA are all rendered as static HTML/CSS so
 * the LCP element is this text, never the WebGL canvas (R-2). The starfield
 * is a client island mounted behind the text (`HeroCanvasMount`), lazy and
 * paused off-screen; letter drop-in is a Framer Motion micro-layer
 * (`HeroLogoReveal`) that only animates the already-painted wordmark, so it
 * never delays first paint of the text itself.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-label="S1 · Hero"
      className="relative isolate flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden border-b border-white/5 px-6"
    >
      {/* Decorative WebGL starfield + reduced-motion static fallback. Reserved
          via absolute inset-0 on the section's own box, so it never shifts layout (CLS≈0). */}
      <HeroCanvasMount />

      {/* Vignette over the void, per the storyboard ("distant nebula glow, vignette"). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-void)_75%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
          {heroContent.eyebrow}
        </p>

        <h1 className="font-display text-[clamp(3rem,9vw,9rem)] leading-[1.05] tracking-tight text-hi">
          <HeroLogoReveal text={heroContent.headline} />
          <span className="bg-grad-plasma block bg-clip-text text-transparent">
            {heroContent.headlineEmphasis}
          </span>
        </h1>

        <h2 className="text-lg text-lo sm:text-xl">{heroContent.tagline}</h2>
        {/*
          R-3: a second, `sr-only` h2 names the product category ("gamified
          baby tracker app") within the first crawlable screen, satisfying
          the SEO-bearing-h2 requirement without breaking the visual
          "withhold the reveal" beat — the visible tagline above stays
          poetic; this sibling heading carries the keyword instead.
        */}
        <h2 className="sr-only">{SITE_DESCRIPTOR}</h2>

        <div className="flex flex-col items-center gap-3">
          <a
            href="#waitlist"
            className="bg-grad-plasma rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--grad-plasma-from)]/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] motion-safe:active:scale-[0.97]"
          >
            {heroContent.ctaLabel}
          </a>
          <span className="text-xs text-lo">{heroContent.ctaSubLabel}</span>
        </div>

        <HeroXpBar />
      </div>
    </section>
  );
}

/**
 * The XP-bar accent named in the storyboard ("a faint XP bar at the base of
 * the viewport"). Static at a low fill here — S1 is "Level 1, just begun";
 * the bar visually continues into S3's reveal trigger. Pure CSS, no motion
 * dependency, so it renders identically under reduced motion.
 */
function HeroXpBar() {
  return (
    <div
      className="mt-4 w-full max-w-xs"
      role="img"
      aria-label="Experience bar, level 1, just started"
    >
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="bg-grad-plasma h-full w-[8%] rounded-full" />
      </div>
    </div>
  );
}
