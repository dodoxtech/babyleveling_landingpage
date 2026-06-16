import { faqItems } from "@/lib/content/faq";

/**
 * S10 — FAQ / Trust (Act V pre-close). Server Component: a fully native
 * `<details>`/`<summary>` disclosure accordion, so it's keyboard-operable and
 * screen-reader correct with zero JavaScript, and "one or many open" is free
 * (each `<details>` toggles independently — no shared state needed).
 *
 * Reduced motion: the open/close here is the browser's native instant toggle
 * (no height transition is applied), so there is nothing to gate behind
 * `prefers-reduced-motion` — it is already instant for every visitor.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-label="S10 · FAQ"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
            Trust
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-tight text-hi">
            Your baby&apos;s data is yours. iOS 17+ &amp; Apple Watch. Launching
            soon.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details
              key={item.id}
              id={item.id}
              className="group glass rounded-2xl px-5 py-4 open:bg-white/[0.08] [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lo transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-lo">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
