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
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.25rem] bg-[var(--bg-playfield)] p-6 shadow-[0_8px_0_rgba(23,32,42,0.12)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-10">
          <div className="relative min-h-[18rem]">
            <Image
              src={state === "success" ? "/assets/icons/trophy.png" : "/assets/characters/warrior-baby-shield.png"}
              alt={state === "success" ? "Reward trophy" : "Warrior baby with shield"}
              width={280}
              height={280}
              className="mx-auto motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]"
            />
          </div>

          <div>
            {state === "success" ? (
              <SuccessMessage reducedMotion={reducedMotion} headline={waitlist.successHeadline} body={waitlist.successBody} />
            ) : (
              <>
                <h2 className="text-h2">{waitlist.headline}</h2>
                <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
                  {waitlist.body}
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-7 max-w-xl">
                  <label htmlFor="waitlist-email" className="mb-2 block text-sm font-bold">
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
                      aria-describedby={fieldError || formError ? errorId : undefined}
                      disabled={state === "submitting"}
                      className="rounded-[var(--radius-lg)] border-2 border-[var(--border-card)] bg-white px-5 py-4 text-base text-[var(--text-primary)] outline-none shadow-[0_4px_0_var(--border-card)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)] disabled:opacity-60"
                    />
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      data-ab-variant={variant}
                      className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {state === "submitting" ? waitlist.ctaSubmitting : ctaLabel}
                    </button>
                  </div>
                  {(fieldError || formError) && (
                    <p id={errorId} role="alert" className="mt-3 text-sm font-semibold text-[#a3133d]">
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
  const content = (
    <div>
      <p className="font-display text-xl font-bold text-[var(--accent-primary)]">
        Reward unlocked
      </p>
      <h2 className="mt-3 text-h2">{headline}</h2>
      <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
        {body}
      </p>
    </div>
  );

  if (reducedMotion) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 16, stiffness: 180 }}
    >
      {content}
    </motion.div>
  );
}
