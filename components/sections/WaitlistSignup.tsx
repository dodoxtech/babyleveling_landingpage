"use client";

import Image from "next/image";
import { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { isValidEmail, submitToWaitlist } from "@/lib/waitlist";
import { useReducedMotion } from "@/lib/motion";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { trackEvent, getCtaVariant, type CtaVariant } from "@/lib/analytics";
import { playLevelUp } from "@/lib/sound";
import { SectionObserver } from "@/components/sections/SectionObserver.client";
import { WaitlistConfetti } from "@/components/sections/WaitlistConfetti.client";
import { ThemedBabyMascot } from "@/components/sections/ThemedBabyMascot.client";

type FormState = "idle" | "submitting" | "success" | "error";

interface WaitlistSignupProps {
  locale: Locale;
}

export function WaitlistSignup({ locale }: WaitlistSignupProps) {
  const { waitlist } = getDictionary(locale).home;
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [variant, setVariant] = useState<CtaVariant>("a");
  const errorId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setVariant(getCtaVariant());
  }, []);

  const ctaLabel = variant === "b" ? waitlist.ctaVariantB : waitlist.cta;

  const handleSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();
    trackEvent("cta_clicked", { location: "reveal", ab_variant: variant });

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
    setState("success");
  };

  return (
    <SectionObserver sectionId="waitlist">
      <section
        id="waitlist"
        aria-label="Waitlist"
        className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[var(--radius-xl)] border border-white/70 bg-[var(--bg-playfield)] p-6 shadow-[var(--shadow-colored)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-10">
          <div className="relative min-h-[18rem]">
            {state === "success" ? (
              <Image
                src="/assets/icons/trophy.png"
                alt="Reward trophy"
                width={280}
                height={280}
                className="mx-auto motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]"
              />
            ) : (
              <ThemedBabyMascot
                pose="waving"
                alt="Waving baby mascot"
                width={280}
                height={280}
                className="mx-auto motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]"
              />
            )}
          </div>

          <div>
            {state === "success" ? (
              <SuccessMessage
                reducedMotion={reducedMotion}
                headline={waitlist.successHeadline}
                body={waitlist.successBody}
              />
            ) : (
              <>
                <h2 className="text-h2">{waitlist.headline}</h2>
                <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
                  {waitlist.body}
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-7 max-w-xl"
                >
                  <label
                    htmlFor="waitlist-email"
                    className="mb-2 block text-sm font-bold"
                  >
                    {waitlist.emailLabel}
                  </label>
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
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
                      aria-describedby={
                        fieldError || formError ? errorId : undefined
                      }
                      disabled={state === "submitting"}
                      className="min-h-[3.35rem] rounded-[var(--radius-lg)] border border-[var(--border-card)] bg-white/82 px-5 py-4 text-base text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_10px_22px_rgba(22,32,47,0.08)] outline-none transition-[border-color,box-shadow,background-color] duration-300 focus-visible:border-[var(--accent-primary)] focus-visible:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)] disabled:opacity-60"
                    />
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="sr-only"
                    />
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      data-ab-variant={variant}
                      className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {state === "submitting"
                        ? waitlist.ctaSubmitting
                        : ctaLabel}
                    </button>
                  </div>
                  {(fieldError || formError) && (
                    <p
                      id={errorId}
                      role="alert"
                      className="mt-3 text-sm font-semibold text-[#a3133d]"
                    >
                      {fieldError ?? formError}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </SectionObserver>
  );
}

function SuccessMessage({
  reducedMotion,
  headline,
  body,
}: {
  reducedMotion: boolean;
  headline: string;
  body: string;
}) {
  const badge = (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-4 py-1.5 text-sm font-bold text-white">
      <Image
        src="/assets/icons/trophy.png"
        alt=""
        width={18}
        height={18}
        aria-hidden="true"
        className="inline-block"
      />
      +1 Party Member
    </span>
  );

  const text = (
    <>
      <p className="font-display text-xl font-bold text-[var(--accent-primary)]">
        Reward unlocked
      </p>
      <h2 className="mt-3 text-h2">{headline}</h2>
      <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
        {body}
      </p>
    </>
  );

  if (reducedMotion) {
    return (
      <div>
        {badge}
        <div className="mt-4">{text}</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Confetti burst fires on mount (success state) */}
      <WaitlistConfetti />

      {/* Badge springs in first */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 220 }}
      >
        {badge}
      </motion.div>

      {/* Copy fades up just after */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 18, stiffness: 180, delay: 0.18 }}
      >
        {text}
      </motion.div>
    </div>
  );
}
