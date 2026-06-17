"use client";

import { useId, useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/dictionary";

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  d: Dictionary["contact"];
}

export function ContactForm({ d }: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(d.subjectSupport);
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const errorId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid || message.trim().length === 0) {
      setFieldError(d.invalid);
      setState("error");
      return;
    }

    setFieldError(null);
    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), subject, message: message.trim() }),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
        setFieldError(d.error);
      }
    } catch {
      setState("error");
      setFieldError(d.error);
    }
  };

  if (state === "success") {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="font-display text-xl text-hi">{d.success}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass flex flex-col gap-6 rounded-2xl p-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-hi">
          {d.emailLabel}
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") { setState("idle"); setFieldError(null); }
          }}
          aria-invalid={state === "error"}
          aria-describedby={fieldError ? errorId : undefined}
          disabled={state === "submitting"}
          className="glass rounded-xl px-4 py-3 text-base text-hi placeholder:text-lo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] disabled:opacity-60"
          placeholder="you@email.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="text-sm font-medium text-hi">
          {d.subjectLabel}
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={state === "submitting"}
          className="glass rounded-xl px-4 py-3 text-base text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] disabled:opacity-60"
        >
          <option value={d.subjectSupport}>{d.subjectSupport}</option>
          <option value={d.subjectPress}>{d.subjectPress}</option>
          <option value={d.subjectPartnerships}>{d.subjectPartnerships}</option>
          <option value={d.subjectOther}>{d.subjectOther}</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-hi">
          {d.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (state === "error") { setState("idle"); setFieldError(null); }
          }}
          disabled={state === "submitting"}
          className="glass resize-none rounded-xl px-4 py-3 text-base text-hi placeholder:text-lo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] disabled:opacity-60"
        />
      </div>

      {fieldError && (
        <p id={errorId} role="alert" className="text-sm text-[var(--accent-feed)]">
          {fieldError}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="bg-grad-plasma rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--grad-plasma-from)]/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] motion-safe:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {state === "submitting" ? d.submitting : d.submit}
      </button>
    </form>
  );
}
