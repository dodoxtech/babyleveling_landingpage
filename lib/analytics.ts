"use client";

// ---------------------------------------------------------------------------
// Analytics  -  structured event layer.
//
// Posts to /api/analytics in production; console.log in development.
// No third-party SDK required. Wire to any provider (Plausible, PostHog,
// Vercel Analytics) by updating the API route without touching call-sites.
// ---------------------------------------------------------------------------

export type EventName =
  | "cta_clicked"
  | "waitlist_submit"
  | "waitlist_success"
  | "waitlist_error"
  | "section_viewed"
  | "share"
  | "sound_toggled";

export interface EventProps {
  // CTA events
  location?: "hero" | "header" | "reveal";
  ab_variant?: "a" | "b";
  // Section scroll events
  section?: string;
  // Waitlist events
  status?: "created" | "duplicate" | "error";
  // Sound events
  enabled?: boolean;
}

/** Fire-and-forget structured event. Never throws. */
export function trackEvent(name: EventName, props?: EventProps): void {
  const payload = { event: name, ...props, ts: Date.now() };

  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", payload);
    return;
  }

  // Best-effort POST; ignore failures so analytics never blocks the user.
  try {
    navigator.sendBeacon("/api/analytics", JSON.stringify(payload));
  } catch {
    // sendBeacon unavailable (rare); fall back to fetch
    fetch("/api/analytics", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => undefined);
  }
}

// ---------------------------------------------------------------------------
// A/B harness  -  CTA copy variants.
// Assignment is random on first visit; stored in localStorage so it is stable
// across sessions on the same device. SSR always returns "a" (no localStorage
// access), so the initial render is deterministic and hydration is safe.
// ---------------------------------------------------------------------------

export type CtaVariant = "a" | "b";

const AB_KEY = "bl_cta_variant";

/** Returns the stable CTA variant for this browser session. Safe to call in
 *  client components only  -  returns "a" on the server. */
export function getCtaVariant(): CtaVariant {
  if (typeof window === "undefined") return "a";
  try {
    const stored = localStorage.getItem(AB_KEY);
    if (stored === "a" || stored === "b") return stored;
    const assigned: CtaVariant = Math.random() < 0.5 ? "a" : "b";
    localStorage.setItem(AB_KEY, assigned);
    return assigned;
  } catch {
    return "a";
  }
}

// ---------------------------------------------------------------------------
// Scroll-depth tracking via IntersectionObserver.
// Call once per section element; fires "section_viewed" when ≥40 % of the
// section enters the viewport. Unobserves after the first fire so it only
// tracks the first visit, not every scroll-back.
// ---------------------------------------------------------------------------

export function observeSection(
  el: Element | null,
  sectionId: string,
): () => void {
  if (!el || typeof IntersectionObserver === "undefined") return () => undefined;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          trackEvent("section_viewed", { section: sectionId });
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.4 },
  );

  observer.observe(el);
  return () => observer.disconnect();
}
