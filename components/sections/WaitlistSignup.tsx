"use client";

import { useId, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { isValidEmail, submitToWaitlist } from "@/lib/waitlist";
import { useReducedMotion } from "@/lib/motion";

/**
 * S11 copy — see docs/planning/05-copy-multilingual.md ("S11 Final CTA /
 * Waitlist"). Local to this section (not promoted to `lib/content/`) since,
 * like Reveal's copy, no other section currently needs to read it — same
 * reasoning docs/architecture/data-flow.md records for `Reveal.tsx`.
 */
const WAITLIST_HEADLINE = "Be there at Level 1.";
const WAITLIST_BODY =
  "Your adventure begins at launch. Claim your spot on the waitlist.";
const WAITLIST_PLACEHOLDER = "you@email.com";
const WAITLIST_CTA = "Join the waitlist";
const WAITLIST_INVALID = "Please enter a valid email.";
const WAITLIST_SUCCESS_HEADLINE = "You're in. +1 Party Member!";
const WAITLIST_SUCCESS_BODY = "We'll email you the moment the quest begins.";

type FormState = "idle" | "submitting" | "success" | "error";

/**
 * S11 — Final CTA / Waitlist (Act V, the call). Client Component: the form
 * holds local, ephemeral state only (`idle | submitting | success | error`,
 * per docs/architecture/data-flow.md — no global store). Submission goes
 * through `lib/waitlist.ts` -> `POST /api/waitlist`.
 */
export function WaitlistSignup() {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const errorId = useId();
  const reducedMotion = useReducedMotion();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setFieldError(WAITLIST_INVALID);
      setState("error");
      return;
    }

    setFieldError(null);
    setFormError(null);
    setState("submitting");

    const result = await submitToWaitlist(email);

    if (!result.ok) {
      setFormError(result.error);
      setState("error");
      return;
    }

    // Both "created" and "duplicate" render the same success state — a
    // returning visitor resubmitting their email never sees a confusing
    // error (per docs/features/waitlist-signup.md user story).
    setState("success");
  };

  if (state === "success") {
    return (
      <section
        id="waitlist"
        aria-label="S11 · Final CTA / Waitlist"
        className="border-b border-white/5 px-6 py-24 sm:py-32"
      >
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <SuccessBadge reducedMotion={reducedMotion} />
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-tight text-hi">
            {WAITLIST_SUCCESS_HEADLINE}
          </h2>
          <p className="text-base text-lo">{WAITLIST_SUCCESS_BODY}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="waitlist"
      aria-label="S11 · Final CTA / Waitlist"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-tight text-hi">
          {WAITLIST_HEADLINE}
        </h2>
        <p className="text-base text-lo">{WAITLIST_BODY}</p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-start"
        >
          <div className="flex-1 text-left">
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={WAITLIST_PLACEHOLDER}
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
            className="bg-grad-plasma shrink-0 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--grad-plasma-from)]/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] motion-safe:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {state === "submitting" ? "Joining…" : WAITLIST_CTA}
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
