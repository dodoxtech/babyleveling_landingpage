import { getFaqItems } from "@/lib/content/faq";
import { FaqPageJsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { FaqAccordion } from "./FaqAccordion.client";

interface FaqProps {
  locale: Locale;
  limit?: number;
}

export function Faq({ locale, limit = 6 }: FaqProps) {
  const { faq } = getDictionary(locale).home;
  const allItems = getFaqItems(locale);
  const items = limit === 0 ? allItems : allItems.slice(0, limit);

  return (
    <section id="faq" aria-label="FAQ" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <FaqPageJsonLd items={items} />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
        <div>
          <h2 className="text-h2">{faq.title}</h2>
          <p className="mt-3 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            Short answers for parents who are deciding between another tracker
            and a tracker they will keep using.
          </p>
        </div>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
