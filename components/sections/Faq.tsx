import { getFaqItems } from "@/lib/content/faq";
import { FaqPageJsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface FaqProps {
  locale: Locale;
}

export function Faq({ locale }: FaqProps) {
  const { faq } = getDictionary(locale).home;
  const items = getFaqItems(locale).slice(0, 6);

  return (
    <section id="faq" aria-label="FAQ" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FaqPageJsonLd items={items} />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h2 className="text-h2">{faq.title}</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            Short answers for parents who are deciding between another tracker
            and a tracker they will keep using.
          </p>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <article key={item.id} id={item.id} className="card-duolingo p-5">
              <h3 className="font-display text-xl font-bold">{item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
