"use client";

import { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { isValidEmail, submitToWaitlist } from "@/lib/waitlist";
import { useReducedMotion } from "@/lib/motion";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { trackEvent, getCtaVariant, type CtaVariant } from "@/lib/analytics";
import { playLevelUp } from "@/lib/sound";
import { SectionObserver } from "@/components/sections/SectionObserver.client";

type FormState = "idle" | "submitting" | "success" | "error";

interface WaitlistSignupProps {
  locale: Locale;
}

/**
 * S11 — Final CTA / Waitlist (Act V, the call). Client Component: the form
 * holds local, ephemeral state only (`idle | submitting | success | error`,
 * per docs/architecture/data-flow.md — no global store). Submission goes
 * through `lib/waitlist.ts` -> `POST /api/waitlist`, which also localizes its
 * own error strings from `locale` — see TASK-0011.
 *
 * TASK-0013 additions:
 * - A/B CTA harness: variant "b" shows `ctaVariantB` label; variant is read
 *   from `lib/analytics` (localStorage-stable, SSR-safe default "a").
 * - Analytics: section_viewed (SectionObserver), cta_clicked (on submit),
 *   waitlist_success / waitlist_error (post-submit).
 * - Sound: `playLevelUp()` fires on success if the user opted in.
 */
export function WaitlistSignup({ locale }: WaitlistSignupProps) {
  const { waitlist } = getDictionary(locale).home;
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [variant, setVariant] = useState<CtaVariant>("a");
  const errorId = useId();
  const reducedMotion = useReducedMotion();

  // Resolve A/B variant client-side so SSR and hydration both start on "a".
  useEffect(() => {
    setVariant(getCtaVariant());
  }, []);

  const ctaLabel = variant === "b" ? waitlist.ctaVariantB : waitlist.cta;

  const handleSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();

    trackEvent("cta_clicked", { location: "hero", ab_variant: variant });

    if (!isValidEmail(email)) {
      setFieldError(waitlist.invalid);
      setState("error");
      return;
    }

    setFieldError(null);
    setFormError(null);
    setState("submitting");

    const result = await submitToWaitlist(email, locale);

    if (!result.ok) {
      setFormError(result.error);
      setState("error");
      trackEvent("waitlist_error");
      return;
    }

    trackEvent("waitlist_success", { status: result.status });
    playLevelUp();
    // Both "created" and "duplicate" render the same success state — a
    // returning visitor resubmitting their email never sees a confusing
    // error (per docs/features/waitlist-signup.md user story).
    setState("success");
  };

  if (state === "success") {
    return (
      <SectionObserver sectionId="waitlist">
        <section
          id="waitlist"
          aria-label="S11 · Final CTA / Waitlist"
          className="border-b border-white/5 px-6 py-24 sm:py-32"
        >
          <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
            <SuccessBadge reducedMotion={reducedMotion} />
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-tight text-hi">
              {waitlist.successHeadline}
            </h2>
            <p className="text-base text-lo">{waitlist.successBody}</p>
          </div>
        </section>
      </SectionObserver>
    );
  }

  return (
    <SectionObserver sectionId="waitlist">
      <section
        id="waitlist"
        aria-label="S11 · Final CTA / Waitlist"
        className="border-b border-white/5 px-6 py-24 sm:py-32"
      >
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-tight text-hi">
            {waitlist.headline}
          </h2>
          <p className="text-base text-lo">{waitlist.body}</p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-start"
          >
            <div className="flex-1 text-left">
              <label htmlFor="waitlist-email" className="sr-only">
                {waitlist.emailLabel}
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={waitlist.placeholder}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state === "error") {
                    setState("idle");
                    setFieldError(null);
                    setFormError(null);
                  }
                }}
                aria-invalid={state === "error"}
                aria-describedby={fieldError || formError ? errorId : undefined}
                disabled={state === "submitting"}
                className="glass w-full rounded-full px-5 py-4 text-base text-hi placeholder:text-lo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] disabled:opacity-60"
              />
              {/* Honeypot: hidden from sighted + screen-reader users, real
                  visitors never fill it. Any bot that fills every field trips
                  the server-side check in app/api/waitlist/route.ts. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />
            </div>

            <button
              type="submit"
              disabled={state === "submitting"}
              data-ab-variant={variant}
              className="bg-grad-plasma shrink-0 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--grad-plasma-from)]/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] motion-safe:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {state === "submitting" ? waitlist.ctaSubmitting : ctaLabel}
            </button>
          </form>

          {(fieldError || formError) && (
            <p
              id={errorId}
              role="alert"
              className="text-sm text-[var(--accent-feed)]"
            >
              {fieldError ?? formError}
            </p>
          )}
        </div>
      </section>
    </SectionObserver>
  );
}

/**
 * Celebratory "+1 Party Member" reward badge. Under reduced motion (or a
 * low-power device, via `useReducedMotion`) this renders as a plain static
 * badge — no scale/opacity entrance, no burst — matching how `HeroLogoReveal`
 * gates its Framer Motion flourish on the same hook.
 */
function SuccessBadge({ reducedMotion }: { reducedMotion: boolean }) {
  const badge = (
    <div
      role="img"
      aria-label="Reward unlocked: plus one party member"
      className="bg-grad-plasma flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-lg shadow-[var(--grad-plasma-from)]/40"
    >
      <span aria-hidden="true">+1</span>
    </div>
  );

  if (reducedMotion) {
    return badge;
  }

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 10, stiffness: 200 }}
    >
      {badge}
    </motion.div>
  );
}
