"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem } from "@/lib/content/faq";
import type { Locale } from "@/lib/i18n/config";

interface FaqAccordionProps {
  items: FaqItem[];
  locale: Locale;
}

/**
 * Locale-sensitive accordion timing.
 * JA gets slower, softer motion — FAQ reads as reference documentation there,
 * not a quick snappy CTA. EN/VI keep their current snappy-but-calm timing.
 */
const TIMING: Record<
  Locale,
  { expand: number; icon: number; ease: [number, number, number, number] }
> = {
  ja: { expand: 0.32, icon: 0.22, ease: [0.25, 0.1, 0.25, 1] },
  en: { expand: 0.24, icon: 0.18, ease: [0.4, 0, 0.2, 1] },
  vi: { expand: 0.26, icon: 0.18, ease: [0.4, 0, 0.2, 1] },
};

export function FaqAccordion({ items, locale }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const t = TIMING[locale];

  return (
    <div className="grid gap-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} id={item.id} className="card-duolingo overflow-hidden">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`answer-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-sm font-bold leading-snug sm:text-base">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: t.icon, ease: t.ease }}
                className="shrink-0 text-xl font-light leading-none text-[var(--accent-primary)]"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`answer-${item.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: t.expand, ease: t.ease }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 pt-0 text-sm leading-6 text-[var(--text-secondary)]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
