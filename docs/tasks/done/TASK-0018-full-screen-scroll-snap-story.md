---
tags: [task]
status: done
priority: high
created: 2026-06-18
assigned: unassigned
---

# TASK-0018 - Full Screen Scroll Snap Story

## Context

The landing page currently reads as a traditional long-form marketing page with stacked
sections. The desired direction is a presentation-like product story where each major
section fills the viewport and settles into place as the visitor scrolls.

This style is usually called full-screen scroll snap, one-page snap scroll, or a
full-screen product story. The goal is to feel polished and Apple-like without creating
aggressive scroll-jacking that frustrates mobile users.

Relevant docs:
- [[features/hero-section]]
- [[features/feature-showcase]]
- [[features/screenshot-gallery]]
- [[features/theme-gallery]]
- [[features/family-sharing]]
- [[features/faq]]
- [[features/waitlist-signup]]
- [[architecture/modules]]
- [[architecture/data-flow]]

## Goal

Redesign the landing page so its major sections behave like full-screen story panels with
controlled vertical snap scrolling.

The result should feel like a guided product demo: one focused idea per viewport, clear
visual hierarchy, and smooth movement between sections.

## Scope

**In scope**
- Add a full-screen vertical scroll-snap structure to the main landing page.
- Make each major home section fit comfortably within one viewport on desktop where
  appropriate.
- Preserve mobile usability with a less rigid snap behavior if mandatory snapping feels too
  restrictive.
- Rework section spacing, heights, and internal layouts so content does not overflow or hide
  behind the fixed header.
- Ensure the header, waitlist CTA, footer, and anchor links still work with snap scrolling.
- Keep existing routes and section IDs stable for SEO, anchors, and analytics.
- Add a refined animation layer that supports the scroll-snap story without taking over
  browser scrolling.
- Add reduced-motion and accessibility fallbacks.
- Update relevant docs and bump their `updated:` dates.

**Out of scope**
- Rewriting all copy from scratch.
- Changing route structure or locale behavior.
- Replacing the visual brand system.
- Adding a heavy scroll-jacking library.
- Rebuilding unrelated legal, blog, contact, or depth pages.

## Relevant Files

- `app/[locale]/page.tsx` - landing-page section order and main wrapper.
- `app/globals.css` - likely home for shared scroll-snap utilities or page-level behavior.
- `components/sections/Hero.tsx` - first full-screen story panel.
- `components/sections/HeroCharacter.tsx` - story continuation panel.
- `components/sections/Reveal.tsx` - narrative reveal panel.
- `components/sections/HowItWorks.tsx` - care-to-XP mechanic panel.
- `components/sections/FeatureShowcase.tsx` - feature panel.
- `components/sections/ParentMode.tsx` - mode switch panel.
- `components/sections/Screenshots.tsx` - product-demo panel, likely coordinated with TASK-0017.
- `components/sections/ThemeGallery.tsx` - theme panel.
- `components/sections/FamilyShare.tsx` - family/co-op panel.
- `components/sections/Faq.tsx` - may need compact treatment or opt out of strict snap.
- `components/sections/WaitlistSignup.tsx` - final CTA panel.
- `components/ui/SiteHeader.tsx` and `components/ui/SiteHeaderClient.tsx` - fixed header and
  scroll-aware CTA behavior.
- `lib/motion.ts` - existing motion/reduced-motion helpers.
- `docs/features/*.md` - update affected feature docs.

## Animation Direction

The animation should feel like a polished app product film broken into interactive panels:
quiet, tactile, and purposeful. Motion should make the story easier to understand, not
decorate every element.

**Recommended animation language**
- **Section settle:** when a snap panel becomes active, headline, body, and primary visual
  enter with a short stagger using opacity and `translateY`.
- **Visual continuity:** mascot, phone, or app-preview elements can drift subtly between
  adjacent panels so the page feels like one connected story rather than isolated slides.
- **Phone/demo depth:** phone previews may use small parallax, screen glow, reflection, and
  shadow changes while entering the viewport.
- **Progress feedback:** add a subtle section progress rail, dots, or chapter indicator so
  visitors understand where they are in the story.
- **Header response:** header can gently compress, clarify, or reveal the waitlist CTA based
  on active section, but it must not jump or cover content.
- **Micro-interactions:** buttons, horizontal screenshot controls, theme controls, and mode
  toggles should keep tactile press/hover feedback.

**Section-specific motion ideas**
- **Hero:** soft load-in of logo/CTA/hero character; no aggressive autoplay spectacle.
- **HeroCharacter / Reveal:** character or XP elements can rise into place as the story
  explains that real care becomes progress.
- **HowItWorks:** steps can sequence in when the panel snaps active, showing care action to
  reward mapping.
- **FeatureShowcase:** feature cards can fan or stack subtly, then settle into a readable
  grid.
- **ParentMode:** mode switch can animate between RPG and parent views as a state transition.
- **Screenshots:** coordinate with TASK-0017 so horizontal phone scrolling has depth,
  active-phone emphasis, and smooth snap feedback.
- **ThemeGallery:** theme changes can crossfade or slide, but color shifts must stay calm and
  readable.
- **FamilyShare:** party/family elements can gather into one shared timeline.
- **FAQ:** keep mostly static. FAQ is a trust section, not a motion showcase.
- **Waitlist:** final CTA can use a restrained reward/unlock moment, especially on successful
  signup.

**Motion constraints**
- Animate only `transform`, `opacity`, filter/glow sparingly, and CSS variables where safe.
- Do not animate layout properties such as `top`, `left`, `width`, or `height`.
- Avoid scroll-jacking libraries and wheel event hijacking.
- Prefer native CSS scroll snap, IntersectionObserver, CSS view timelines, or existing
  Motion helpers. Use GSAP only if a section genuinely needs scrubbed/pinned choreography.
- Reduced-motion mode must disable entrance choreography, parallax, autoplay, and scrubbed
  motion while preserving content order and controls.

## Acceptance Criteria

- [x] The landing page uses vertical scroll snapping for major story sections on desktop.
- [x] Each snap section has stable viewport-relative sizing, preferably `min-height: 100dvh`
      adjusted for the fixed header where needed.
- [x] No section content is clipped, hidden behind the header, or inaccessible at common
      desktop heights.
- [x] Mobile behavior remains comfortable: swipe/scroll should not feel trapped or forced.
- [x] Anchor navigation and header CTA still land at sensible positions.
- [x] Browser back/forward and normal wheel/trackpad scrolling remain usable.
- [x] Reduced-motion users get a calmer non-forced experience.
- [x] The footer remains reachable and does not create an awkward partial snap trap.
- [x] Existing analytics section observation still works or is updated deliberately.
- [x] Visual rhythm feels like a product story, not a stack of oversized empty panels.
- [x] Each major section has a purposeful active-state animation or a deliberate static
      treatment.
- [x] Section transitions use transform/opacity-based motion and do not cause layout shift.
- [x] A subtle progress/chapter indicator communicates the user's position in the scroll
      story.
- [x] Screenshot and phone-demo motion is coordinated with TASK-0017 and does not fight the
      horizontal scroll interaction.
- [x] Reduced-motion mode disables parallax, autoplay, and entrance choreography.
- [x] Relevant docs are updated and their `updated:` dates are bumped.
- [x] `pnpm lint` succeeds with no errors.
- [x] `pnpm build` succeeds with no errors.

## Technical Notes

- Prefer native CSS scroll snap:
  - `scroll-snap-type: y mandatory` or `proximity` depending on viewport and device.
  - `scroll-snap-align: start`.
  - `scroll-padding-top` to account for the fixed `4.5rem` header.
- Avoid heavy JavaScript scroll-jacking. If JavaScript is needed, keep it small and focused on
  state/controls, not taking over browser scroll.
- Use `100dvh` rather than `100vh` for mobile viewport stability.
- Consider using `scroll-snap-type: y proximity` or disabling snap below tablet widths if
  mandatory snap hurts mobile reading.
- Sections with naturally long content, such as FAQ, may need internal layout changes or may
  use `scroll-snap-align` without forcing all content into a single screen.
- Coordinate with TASK-0017 so the redesigned Screenshots section works inside the new
  full-screen scroll story.
- Treat animation as a hierarchy tool: if a motion idea does not clarify focus, progression,
  feedback, or state, leave it out.
- Keep one motion system. Do not mix GSAP, Framer Motion, CSS timelines, and raw scroll
  listeners in the same area unless there is a clear reason.
- Test at desktop, short laptop, tablet, and mobile viewport sizes.

## Definition of Done

- [x] Acceptance criteria all pass.
- [x] Affected docs updated and `updated:` dates bumped.
- [x] Landing page manually verified at desktop, tablet, and mobile sizes.
- [x] Task file moved from `active/` to `done/`.
