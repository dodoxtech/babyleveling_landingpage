---
tags: [task, ui, sections, redesign, layout]
status: todo
priority: high
created: 2026-06-17
assigned: unassigned
depends-on: [TASK-0014, TASK-0015]
blocked-by: [TASK-0015]
---

# TASK-0016 — Section-by-Section Layout Redesign

## Context

With the new design system (TASK-0015) and 3D assets (TASK-0014) in place, this task
redesigns every section on the landing page to match the reference design image.

The current page structure (S1–S11 + footer) is preserved — the same components
exist, but their visual markup, layout grid, and styling are replaced. Content copy
and i18n dictionaries are **not** changed in this task; only visual presentation.

Reference design key characteristics:
- Light background (Cute Mode default) with bright, whimsical art
- Split-column hero with side-by-side Cute/Warrior character panels
- Horizontal level-progression timeline (Lv.1 → Lv.50)
- Dark strip for the features section (inverted for contrast)
- Testimonials carousel with stars and parent quotes
- Simple pill-nav (flat links + Login text + Download App CTA button)

---

## Goal

Every visible section matches the layout, hierarchy, and aesthetic shown in the
reference image. The site must be fully responsive (mobile-first), pass `pnpm lint`,
and produce no console errors in development.

---

## Section Specifications

### S0 — Navigation (`SiteHeader`)

**Current state:** Dark glass header with purple gradient logo.

**Target:**
```
[★ BabyLeveling logo]   Features   How It Works   Screenshots   Pricing   FAQ      Log in   [Download App ▶]
```
- White/translucent background with 1px bottom border (`--border-subtle`).
- Logo: `<img src="/assets/logo/babyleveling-logo.png">` — "Baby" in pink,
  "Leveling" in purple.
- Nav links: `font-sans`, 500 weight, `--text-secondary`, underline on hover.
- "Log in" → text link, `--text-secondary`.
- "Download App" → `.btn-primary` pill button, purple in Cute Mode, electric purple
  in Warrior Mode.
- `<ThemeToggle />` sits between nav links and the Login/CTA group.
- On mobile: hamburger menu collapses nav links; Logo + CTA button always visible.

---

### S1 — Hero (`Hero.tsx`)

**Current state:** Full-screen centred text on WebGL starfield.

**Target:** Two-column split layout.

```
┌──────────────────────────────────────────┐
│  [Cute BG scene]   │   [Warrior BG scene] │
│                    │                      │
│  [Baby girl img]   Turn Your Baby's  [Warrior baby img] │
│                    Growth Into an         │
│                    ✨ Epic Adventure ✨   │
│                    ─────────────────      │
│                    Track milestones, ...  │
│                    ─────────────────      │
│                  [♥ Cute Mode ◈ Warrior Mode]  │
│                    ─────────────────      │
│            [App Store]  [Watch Trailer]   │
└──────────────────────────────────────────┘
```

Layout:
- `min-height: 100dvh`, CSS Grid `grid-cols-[1fr_auto_1fr]` on desktop.
- Left column: `hero-cute-bg.png` as `object-fit: cover` background, `cute-baby-girl-sitting.png`
  centred in foreground.
- Right column: `hero-warrior-bg.png` background, `warrior-baby-standing.png`
  centred in foreground.
- Centre column: text block, mode toggle, CTA buttons. Max-width ~480 px.
- Headline: `.text-display` (Fredoka Bold). "Turn Your Baby's Growth Into an" in
  `--text-primary`; "Epic Adventure" gradient: `--accent-primary` → `--accent-secondary`.
- Tagline: `--text-secondary`, Poppins Regular.
- App Store button: black pill with Apple logo SVG.
- "Watch Trailer" button: `.btn-secondary`.
- The `<ThemeToggle>` component is also embedded here (as a "Choose Your Mode"
  selector), synced to the header toggle via the shared `data-theme` + `localStorage`
  mechanism from TASK-0015.
- Remove: `HeroCanvasMount` (WebGL starfield), `HeroLogoReveal` letter-drop animation.
  These are replaced by the static split-column layout.
- Keep: `HeroXpBar` — move to bottom of the centre column; widen to full column width.

---

### S2 — The Hero Appears (`HeroCharacter.tsx`)

**Current state:** Full-screen section with single sprite + XP bar animation.

**Target:** Merge this section's content into S1 (the hero already has both characters
now) or convert it into a short **"Why Parents Love BabyLeveling"** teaser strip that
bridges S1 to S3.

Recommended conversion (keeps the component, changes its role):

```
Why Parents Love BabyLeveling

[XP Badge]      [Trophy]      [Growth Chart]   [Family]      [Book]
Earn XP         Unlock        Track Growth     Share &       Beautiful
Every milestone Achievements  Log feeding,     Connect       Memories
earns XP.       Celebrate...  sleep...         Invite...     Timeline...
```

- 5-column icon grid (horizontal scroll on mobile).
- Icon images from `public/assets/icons/`.
- Background: `--bg-base`, no dark background.
- Section heading: `.text-h2`, Poppins SemiBold.
- Each icon tile: 64 px icon, label in 600 weight, 1–2 line description in
  `--text-secondary`.
- No Framer Motion in this section — static render is fine.

---

### S3 — The Reveal (`Reveal.tsx`)

**Current state:** "The Reveal" narrative beat with WebGL scene.

**Target:** "Watch Your Baby Grow & Level Up" — horizontal level progression timeline.

```
Watch Your Baby Grow & Level Up

  ●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━━●
[Lv1]   [Lv5]  [Lv10]  [Lv20]  [Lv50]
Newborn Explorer  Little  Adven- Legend
         Star     ture-r
0–1 mo  3–4 mo  6–9 mo  12–18mo  2+ yr
```

Layout:
- Full-width horizontal scroll container on mobile; centred flex row on desktop.
- Each stage: character PNG (from `public/assets/timeline/`), circular level badge
  overlay (`Lv. N` in Fredoka Bold), stage title in Poppins SemiBold, age range in
  `--text-caption`.
- Level badge: filled circle, `--accent-primary` (Cute) or `--accent-tertiary` (gold,
  Warrior), white text.
- Connector: dashed horizontal line (`--border-subtle`) with a gold chevron arrow
  between stages.
- Section background: `--bg-section-alt` (light pink wash in Cute Mode).
- Remove: `RevealScene.client.tsx` WebGL dependency.

---

### S4 — How It Works (`HowItWorks.tsx`)

**Current state:** Step-by-step chip reveal list.

**Target:** 3-step visual flow (kept from reference design).

```
  Simple 3-Step Journey

  [1]  Log an Activity    →  [2]  Earn XP & Level Up  →  [3]  Watch Baby Grow
  Tap to track feeding,       Every logged activity        Unlock achievements,
  sleep, milestones...        earns your baby XP.          view growth charts.
  [icon: bottle+moon]         [icon: xp-badge]             [icon: trophy]
```

- 3 cards in a row (stack on mobile).
- Card: white/`--bg-raised`, `--radius-lg` border-radius, `--shadow-card`.
- Step number: large Fredoka Bold numeral, `--accent-primary` colour.
- Icon: 64 px from `public/assets/icons/`.
- Arrow connector between cards: hidden on mobile.
- Retain the `HowItWorksSteps.client.tsx` client island for scroll-triggered entry
  animation; update its visual markup to the card style above.

---

### S5 — Feature Showcase (`FeatureShowcase.tsx`)

**Current state:** Asymmetric grid on dark background.

**Target:** Dark strip — "Powerful Features for Every Parent" — matching the reference.

```
█████████████████████████████████████████████████
█  Powerful Features for Every Parent            █
█                                                █
█  [Growth     [Daily      [RPG         ...      █
█   Tracking]   Logging]   Progression]          █
█████████████████████████████████████████████████
```

- Section background: `--bg-section-alt` in Warrior Mode tokens (dark navy/purple)
  applied via an inline `style` override on this section so it always appears dark
  regardless of the active mode. Use `background: #1a1040;` fixed, not a theme token.
- Feature cards: `--bg-raised` (dark glass: `rgba(255,255,255,0.06)`, 1px white/10
  border) with `--shadow-colored`.
- Feature icon: 48 px from `public/assets/icons/`.
- Feature name: Poppins SemiBold, white.
- Feature description: Poppins Regular, `rgba(255,255,255,0.65)`.
- Grid: 2 columns on mobile, 3 on tablet, 3 on desktop (no more 1-colspan-2 hero
  card — use equal tiles).
- Section heading + eyebrow: white text on the dark background.
- Retain `FeatureCard.client.tsx` for hover effects; update markup and colours only.

---

### S6 — Parent Mode (`ParentMode.tsx`)

**Current state:** "Parent Mode" feature callout.

**Target:** Testimonials — "Trusted by Parents. Loved by Families."

```
★★★★☆  4.9 / 5 from 10,000+ parents

┌──────────────────────────────────────────────────┐
│ [avatar] "BabyLeveling makes tracking so fun!    │
│           My daughter loves her little character."│
│           — Sarah M., mom of Emma                │
└──────────────────────────────────────────────────┘
  ← prev  [ ○ ● ○ ]  next →
```

- Carousel with 3 testimonials (left/right arrows + dot indicators).
- Each testimonial: parent avatar (placeholder: 48 px circle with initials until real
  photos are provided), quote in Poppins italic, attribution in Poppins Medium
  `--text-secondary`.
- Star rating row: `--accent-tertiary` (gold) filled stars.
- Background: `--bg-base`.
- Use the existing `ScreenshotsCarousel.client.tsx` scroll logic as a basis for the
  carousel, or implement a simple manual-index carousel in a new
  `TestimonialsCarousel.client.tsx`.
- Remove all "parent control panel" feature copy from this section.

---

### S7 — Screenshots (`Screenshots.tsx`)

**Current state:** Screenshot carousel with dark background.

**Target:** Keep the carousel structure. Lighten the section background to `--bg-section-alt`.

Changes only:
- Section background: `--bg-section-alt` in current theme (not forced dark).
- Screenshot frame: rounded phone bezel, `--shadow-card` instead of glowing purple shadow.
- Nav dots and arrow buttons: use `--accent-primary` colour.

No structural changes needed; this is a low-effort visual polish pass.

---

### S8 — Theme Gallery (`ThemeGallery.tsx`)

**Current state:** Side-by-side Cute vs Warrior mode screenshots.

**Target:** Keep and repurpose as a "Choose Your Adventure" showcase.

Layout:
```
Choose Your Mode

[Cute Mode panel]              [Warrior Mode panel]
Adorable & Heartwarming        Brave & Legendary

[sample screen: pink UI]       [sample screen: dark UI]
[♥ Try Cute Mode]              [◈ Try Warrior Mode]
```

- Each panel: full-height card, rounded corners, matching mode colours.
- CTA button in each panel directly triggers the theme toggle (dispatches the
  `"theme-change"` event from TASK-0015).
- Use `hero-cute-bg.png` and `hero-warrior-bg.png` as panel backgrounds (blurred,
  overlaid).

---

### S9 — Family Share (`FamilyShare.tsx`)

**Current state:** Family sharing callout with confetti animation.

**Target:** Minor visual update only.

Changes:
- Background: `--bg-base`.
- Button: `.btn-primary`.
- Heading: `.text-h2`.
- Retain `FamilyShareParty.client.tsx` confetti animation.
- Replace any sprite-based illustration with `public/assets/icons/family.png`.

---

### S10 — FAQ (`Faq.tsx`)

**Current state:** Accordion style on dark background.

**Target:** Side-by-side two-column list (no accordion).

```
Frequently Asked Questions

Is BabyLeveling free?          Can I share with family?
BabyLeveling is free to ...    Yes — invite up to 5 ...

What devices are supported?    Is my data private?
iPhone and Apple Watch...      Your data stays on ...

Does it track health data?     How do I cancel?
...                            ...
```

- 2-column grid on desktop, single column on mobile.
- Each Q&A: question in Poppins SemiBold `--text-primary`, answer in Poppins Regular
  `--text-secondary`.
- No expand/collapse; show all answers inline.
- Section background: `--bg-base`.
- Section heading: `.text-h2`.
- Remove the accordion client component; the section becomes fully server-rendered.

---

### S11 — Waitlist / CTA (`WaitlistSignup.tsx`)

**Current state:** Email waitlist form.

**Target:** "Start Your Baby's Adventure Today!" CTA section.

```
[warrior-baby-shield.png]

Start Your Baby's Adventure Today!
Every moment counts. Let's level up together.

[⬛ Download on the App Store]
```

- Hero character image (warrior baby with shield) positioned behind/beside the copy.
- Heading: `.text-display`, Fredoka Bold.
- Subheading: Poppins Regular, `--text-secondary`.
- Single prominent App Store button (black pill) — the waitlist form is replaced by
  a direct App Store link once the app ships. Until then, keep the email input but
  style it to match: white input with `--accent-primary` border on focus,
  `.btn-primary` submit button.
- Background: radial gradient from `--accent-secondary` (lavender) at centre to
  `--bg-base` at edges.

---

### S12 — Footer (`SiteFooter.tsx`)

**Current state:** Multi-column link grid on dark background.

**Target:** Minimal footer.

```
[★ BabyLeveling]    Features  Pricing  FAQ  Privacy  Terms    © 2026 BabyLeveling
```

- Single-row layout on desktop, stacked on mobile.
- Logo left, nav links centre, copyright right.
- Background: `--bg-raised`; top 1px border `--border-subtle`.
- Remove the 4-column link farm.

---

## Relevant Files

All existing section components under `components/sections/` and `components/ui/`
are targets. Key files:

| File | Change |
|------|--------|
| `components/sections/Hero.tsx` | Full redesign — split-column layout |
| `components/sections/HeroCanvasMount.client.tsx` | Delete — WebGL no longer needed in S1 |
| `components/sections/HeroLogoReveal.client.tsx` | Delete — animation replaced |
| `components/sections/HeroCharacter.tsx` | Convert to "Why Parents Love" icon strip |
| `components/sections/HeroCharacterMount.client.tsx` | Delete |
| `components/sections/HeroCharacterScene.client.tsx` | Delete |
| `components/sections/HeroCharacterXpBar.client.tsx` | Keep, update colours |
| `components/sections/Reveal.tsx` | Convert to level timeline |
| `components/sections/RevealScene.client.tsx` | Delete — replaced by static timeline |
| `components/sections/HowItWorks.tsx` | Redesign to card-based 3-step |
| `components/sections/FeatureShowcase.tsx` | Dark strip, equal-tile grid |
| `components/sections/ParentMode.tsx` | Convert to testimonials |
| `components/sections/Screenshots.tsx` | Light background + style update |
| `components/sections/ThemeGallery.tsx` | "Choose Your Mode" dual panel |
| `components/sections/FamilyShare.tsx` | Minor style update |
| `components/sections/Faq.tsx` | Remove accordion, 2-col static list |
| `components/sections/WaitlistSignup.tsx` | CTA redesign |
| `components/ui/SiteHeader.tsx` | New nav layout |
| `components/ui/SiteFooter.tsx` | Minimal footer |

---

## Acceptance Criteria

- [ ] All 12 sections render without console errors in `pnpm dev`
- [ ] Hero shows split-column Cute/Warrior layout; characters load from new asset paths
- [ ] Level timeline (S3) shows all 5 stages with correct character images and level badges
- [ ] Features strip (S5) has a dark background regardless of active theme
- [ ] Theme toggle in header and hero both switch all sections simultaneously
- [ ] Testimonials carousel (S6) cycles through 3 quotes with arrows and dots
- [ ] FAQ (S10) renders all questions inline, no accordion, 2 columns on desktop
- [ ] Footer is minimal single-row layout
- [ ] No WebGL canvas elements remain on the page (removed with deleted components)
- [ ] Page is responsive: mobile (375 px), tablet (768 px), desktop (1280 px) layouts
      all render without overflow or broken layouts
- [ ] `pnpm build` succeeds with no TypeScript errors
- [ ] `pnpm lint` produces no errors

## Technical Notes

- Delete client islands only after confirming no other files import them; use `grep -r`
  before deleting.
- The Lenis smooth scroll provider (`LenisProvider`) can remain; no changes needed.
- `SoundToggle.client.tsx` and `CustomCursor.client.tsx` can remain unchanged.
- Update `docs/architecture/modules.md` to reflect any deleted components.
- The i18n dictionaries (`locales/en.json`, `locales/ja.json`, `locales/vi.json`)
  are **not** changed in this task. Any new copy keys needed should be added in
  English only and noted in a follow-up task.

## Definition of Done

- [ ] Acceptance criteria all pass
- [ ] Deleted components are removed from `docs/architecture/modules.md`
- [ ] Task file moved from `active/` to `done/`
