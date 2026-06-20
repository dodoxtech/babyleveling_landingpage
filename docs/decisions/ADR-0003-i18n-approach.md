---
title: "ADR-0003 — i18n approach: native Next.js sub-path routing + static JSON dictionaries"
status: accepted
created: 2026-06-17
updated: 2026-06-20
---

# ADR-0003 — i18n: native Next.js sub-path routing + static JSON dictionaries

## Context

TASK-0011 extends BabyLeveling's landing page to Japanese (`/ja`) and Vietnamese
(`/vi`) audiences. The page is statically generated (no user session, no runtime
locale negotiation) and the copy is a known, finite set authored by the product team.

## Decision

Use **native Next.js App Router sub-path routing** (`app/[locale]/`) combined with
**static JSON locale files** and a thin synchronous `getDictionary()` helper. No
third-party i18n library.

### Routing rules (docs/planning/02-architecture.md §4.2)

| Locale | Visible URL | Internal Next.js route |
|--------|-------------|------------------------|
| English (default) | `/`, `/features`, … | rewritten to `/en/…` by middleware |
| Japanese | `/ja`, `/ja/features`, … | direct match on `app/[locale]/` |
| Vietnamese | `/vi`, `/vi/features`, … | direct match on `app/[locale]/` |

`/en/…` permanently redirects (308) to the unprefixed form so there is never a
duplicate, separately-indexable `/en` copy of every page.

### Key files

- `middleware.ts` — sub-path routing + `/en/…` redirect
- `lib/i18n/config.ts` — `locales`, `defaultLocale`, `localeNames`, `isLocale`
- `lib/i18n/dictionary.ts` — `Dictionary` type + synchronous `getDictionary(locale)`
- `lib/i18n/paths.ts` — `localeHref(locale, path)` + `localeAlternates(path)` for `hreflang`
- `locales/en.json`, `locales/ja.json`, `locales/vi.json` — all UI strings
- `components/ui/LocaleSwitcher.tsx` — client component; uses `usePathname()` to switch
  locale while preserving the current page path
- `app/[locale]/layout.tsx` — root layout; sets `<html lang={locale}>`, mounts
  `SiteHeader` with locale
- Content modules (`lib/content/faq.ts`, `loop.ts`, `features.ts`, `modes.ts`) —
  locale-keyed data structures with `getXxx(locale)` accessors; locale-independent
  fields (icons, accents) separated from translated text

### Home sections read all copy from the dictionary

Every `app/[locale]/page.tsx` section (`Hero`, `HeroCharacter`, `HowItWorks`,
`FeatureShowcase`, `ParentMode`, `ThemeGallery`, `FamilyShare`, …) takes `locale`
and pulls its eyebrow/title/body and any card/step/quote arrays from
`getDictionary(locale).home.*`. Locale-independent fields (icons, XP values, theme
swatches/images) stay in the component or `lib/theme/registry.ts` and are zipped to
the translated text by index, or looked up by id (`home.themes.cards[themeId]`).
No section hardcodes display copy — a missed string is a TypeScript error against
the `Dictionary` type, not a silently-English section.

### Per-locale display fonts (Vietnamese coverage)

`Fredoka` and `Poppins` ship no `vietnamese` Google Fonts subset, so tone-marked
glyphs (ữ, ậ, ề…) fell back to a mismatched system font on `/vi`. `app/[locale]/layout.tsx`
loads two Vietnamese-capable substitutes — **Baloo 2** (rounded, like Fredoka) and
**Be Vietnam Pro** (geometric, like Poppins) — bound to the *same* CSS variables
(`--font-fredoka` / `--font-poppins`), and swaps the `<body>` className when
`locale === "vi"`. `globals.css` is unchanged. The Vietnamese pair is `preload: false`
so only `/vi` fetches them; `/en` and `/ja` keep Fredoka/Poppins with no extra download.

### What is NOT translated (brand terms)

BabyLeveling, XP, HP, EXP, Level, Apple Watch, iPhone — kept in Roman script /
untranslated in all locales, per reconciliation-log note on brand term handling.

## Alternatives considered

### next-intl

`next-intl` provides automatic locale detection, `<Trans>` for rich text with embedded
React nodes, and helpful type inference. Rejected because:
- The dictionary is small and static; the library adds ~30 kB to the client bundle.
- Our rich-text use case (closing paragraphs with links) is narrow and handled by
  `RichTextPart[]` arrays rendered inline with a `.map()`.
- A third-party library is another upgrade surface; native routing is stable across
  Next.js minor versions.

### Route Groups / middleware redirect-only

Keeping all copy in `lib/content/` files (no JSON locale files) was considered but
rejected: it couples copy to component files and makes it impossible to hand off a
locale file to a translator without touching code.

## Consequences

- `generateStaticParams` on every page must enumerate `locales`; missing a locale
  is a build error, not a silent runtime 404.
- `dynamicParams = false` on the root layout ensures only `en`, `ja`, `vi` are ever
  served — any other segment is a 404, never an accidental on-demand render.
- The `LocaleSwitcher` is a client component (uses `usePathname()`). This is the only
  client island introduced by i18n; everything else (header, footer, pages) is server.
- Brand terms (XP, HP, etc.) remain Roman across all locales — document in copy review
  notes so translators don't attempt to render them in Hiragana or Katakana.
- New locales require: (1) a new JSON file in `locales/`, (2) adding the locale to
  `lib/i18n/config.ts`, (3) re-running `pnpm build`. No code changes elsewhere.
