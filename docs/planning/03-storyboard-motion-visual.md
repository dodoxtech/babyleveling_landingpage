---
tags: [planning, storyboard, motion, visual]
updated: 2026-06-16
---

# Storyboard · Motion · Visual

Deliverables 6–8. Owners: `creative-director`, `motion-director`.
All motion ships with a `prefers-reduced-motion` fallback and fits the performance budgets in
[[06-execution]] (negotiated in [[reconciliation-log]]).

---

## 8. Visual Design Plan

*(Presented before the per-section storyboard so the system is established first.)*

### 8.1 Art direction north star
Dark luxury, cinematic, editorial. **"A premium game's title sequence meets Apple's product
storytelling."** Near-black canvas, volumetric light, glass surfaces, one heroic gradient,
huge type, and generous void. Cute sprite characters provide warmth against the dark so it
never feels cold or clinical. References: Igloo Inc (depth), Vision Pro (spatial light),
Linear (type discipline), Arc (delight), Stripe Sessions (motion-led editorial).

### 8.2 Design tokens
| Token | Value | Use |
|-------|-------|-----|
| `--bg-void` | `#0A0A14` | Page base (matches app splash, per [[../features/hero-section]]) |
| `--bg-raised` | `#12121F` | Raised panels |
| `--glass` | `rgba(255,255,255,0.06)` + 12px blur + 1px inner border | Glass cards (`CardStyle`) |
| `--text-hi` | `#F4F4FA` | Headlines |
| `--text-lo` | `#9aa` muted | Body |
| `--grad-plasma` | plasma-purple `#7C3AED` → hot-pink `#EC4899` | Primary CTA, logo, XP fills |
| `--accent-feed` | ember orange | Feeding cues |
| `--accent-sleep` | lavender | Sleep cues |
| `--accent-growth` | matcha/teal | Growth cues |
| Theme: Royal | bubblegum pink → champagne gold | S8 |
| Theme: Warrior | ember orange → battle gold | S8 |
| Theme: Zen | soft matcha → misty blue | S8 |

### 8.3 Typography
- **Display:** a high-contrast modern serif *or* a wide grotesque for the mythic headlines
  (candidate pairing for the comp: a serif like *PP Editorial / Canela* feel for Act I–II to
  read "storybook", switching to a precise grotesque — *Inter / Geist* family — for Act III+
  "product" sections). Massive sizes: hero `clamp(3rem, 9vw, 9rem)`.
- **Body:** clean grotesque, 16–18px, generous line-height (1.6), max ~60ch measure.
- **Numerals / HUD:** tabular figures for XP, levels, stats — game-HUD feel.
- Rules: tight leading on display, loose on body; letter-spacing negative on big type.

### 8.4 Layout & grid
- 12-col fluid grid, wide gutters; deliberate asymmetry (editorial, not centered-everything).
- **Massive whitespace** — each story beat owns at least one full viewport; never crowd the
  reveal.
- Glassmorphic cards for features/themes; device frames for screenshots.
- Consistent vertical rhythm; section dividers are *light/atmosphere shifts*, not lines.

### 8.5 Imagery & assets
- **Sprites** (`public/sprites/*`): babyBoy/babyGirl emotions as the "hero"; activity icons
  (bottle, sleep, diaper, milestone, trophy, star, badge…) as quest/loop iconography.
- **WebGL:** starfield + particle field (hero), depth parallax (reveal). Kept to two scenes.
- **Screenshots:** real app UI in iPhone/Apple Watch frames.
- **OG/social:** dark card, logo gradient, tagline — one per locale.

### 8.6 Accessibility (non-negotiable, top of priority order)
- WCAG AA contrast on all text over the dark canvas (verify CTA gradient on glass).
- Full keyboard operability (nav, carousel, accordion, form); visible focus rings.
- Every sprite/screenshot has meaningful `alt`; decorative WebGL is `aria-hidden`.
- `prefers-reduced-motion` honored everywhere (see §7).
- Reduced-transparency / forced-colors fallbacks for glass.

---

## 6. Storyboard For Every Section

Per section: **Frame (what's on screen) · Art direction · Visual metaphor · Mood ·
Lighting · Reference.** (Motion detail is in §7; copy in [[05-copy-multilingual]].)

### S0 — Nav / Brand Frame
- **Frame:** Whisper-thin glass bar; gradient wordmark left; minimal links + quiet CTA right.
- **Art direction:** Disappears into the void; barely-there until scrolled.
- **Metaphor:** A game HUD that fades when you're immersed.
- **Mood:** Calm authority. **Lighting:** none (transparent). **Ref:** Linear, Arc.

### S1 — Hero
- **Frame:** Full-bleed deep-space void; drifting particles; gradient logo; one-line promise;
  glass CTA; a faint XP bar at the base of the viewport.
- **Art direction:** Cinematic cold-open. Type is the hero; everything else is atmosphere.
- **Metaphor:** The title card of an epic — "a new game has begun."
- **Mood:** Awe, mystery. **Lighting:** distant nebula glow, vignette. **Ref:** Igloo Inc, Vision Pro.

### S2 — The Hero Appears
- **Frame:** Camera has descended; a small luminous character (baby sprite, stylized) stands
  on a tiny floating island in the void, XP bar at Level 1.
- **Art direction:** Intimate spotlight in a vast dark — scale contrast (tiny hero, huge world).
- **Metaphor:** Every legend starts small.
- **Mood:** Tender curiosity. **Lighting:** soft key light on the hero, rim glow. **Ref:** Vision Pro depth, Ghibli warmth.

### S3 — The Reveal (the hinge)
- **Frame:** As the XP bar fills, the fantasy "skin" peels/dissolves to expose the real app
  dashboard (the character-sheet) behind it — same character, now clearly a baby in-app.
- **Art direction:** A match-cut between myth and product; the moment the metaphor becomes literal.
- **Metaphor:** Pulling back the curtain — the adventure was real life all along.
- **Mood:** Goosebumps, warmth. **Lighting:** warm light blooms in as cold void recedes. **Ref:** Stripe Sessions reveal, Apple "and one more thing".

### S4 — Care → XP loop
- **Frame:** A clean horizontal flow: real action card (Feeding) → arrow → reward chip
  (+Energy); repeats for Sleep→HP, Habits→EXP, Milestone→Achievement.
- **Art direction:** Diagrammatic but beautiful; activity icons in glass chips.
- **Metaphor:** A crafting recipe — inputs become power.
- **Mood:** Clever delight. **Lighting:** accent glows per activity color. **Ref:** Linear feature explainers.

### S5 — Feature Showcase
- **Frame:** Asymmetric grid of glass cards (XP & Levels, Daily Quests, Skill Tree,
  Achievements, Streaks & Buffs, Apple Watch), each with sprite-icon + benefit line.
- **Art direction:** Feels like the in-app HUD; per-card accent glow.
- **Metaphor:** An inventory / ability screen.
- **Mood:** Confident, rich. **Lighting:** inner-glow on hover. **Ref:** Linear, Stripe.

### S6 — Parent Mode
- **Frame:** A mode toggle (RPG ⟷ Parent) that morphs one panel between a quest card and a
  clean clinical chart / health record.
- **Art direction:** Restraint — proves the "serious" half; lighter, data-clear surface.
- **Metaphor:** Two lenses on one truth.
- **Mood:** Trust, relief. **Lighting:** flatter, honest. **Ref:** Linear dashboards.

### S7 — Screenshot Gallery
- **Frame:** Device-framed real screens in a snap carousel; captions name each screen.
- **Art direction:** Product as hero; frames float with soft shadow over the void.
- **Metaphor:** A window into your adventure.
- **Mood:** Tangible desire. **Lighting:** screen-glow lights the frame edge. **Ref:** Apple product pages.

### S8 — Theme Gallery
- **Frame:** Three worlds; a segmented control recolors a live preview card (Royal/Warrior/Zen).
- **Art direction:** Each theme fully takes over color + background art on select.
- **Metaphor:** Choosing the world your hero grows up in.
- **Mood:** Playful identity. **Lighting:** shifts per theme palette. **Ref:** Arc themes, Stripe color systems.

### S9 — Family Sharing
- **Frame:** A "party" of sprites (parent, partner, grandparent) around a shared map/timeline.
- **Art direction:** Warm, gathered, co-op.
- **Metaphor:** A multiplayer party on one quest.
- **Mood:** Belonging. **Lighting:** warm communal glow. **Ref:** Ghibli ensemble, Arc delight.

### S10 — FAQ
- **Frame:** Quiet accordion over the void; one open at a time; concise answers.
- **Art direction:** Editorial calm; type-forward.
- **Metaphor:** Clearing the path before the final gate.
- **Mood:** Reassurance. **Lighting:** minimal. **Ref:** Linear docs.

### S11 — Final CTA / Waitlist
- **Frame:** Full-bleed; the hero now at a higher level; single email field + plasma CTA;
  success morphs to a "+1 Party Member" reward badge.
- **Art direction:** The loudest moment — gradient at full strength, type at max.
- **Metaphor:** The gate to the adventure / "Be there at Level 1".
- **Mood:** Anticipation → triumph. **Lighting:** full plasma bloom. **Ref:** Stripe finale, Arc reward moments.

### S12 — Footer
- **Frame:** Calm sitemap columns, locale switch, social, ©, tiny logo.
- **Art direction:** Premium sign-off, near-silent. **Mood:** Trust. **Lighting:** dim. **Ref:** Linear footer.

---

## 7. Motion Design Plan

**Engine:** Lenis (smooth scroll) + GSAP ScrollTrigger (scroll choreography, pinning) +
Framer Motion (component micro-interactions / state) + React Three Fiber + Drei (the two
WebGL scenes). **Principle:** motion is *narrative*, never decoration — it advances the
story or gives feedback. **Banned:** generic fade-in, generic slide-up, template stagger as
a default. Every reveal must be motivated by the beat.

### 7.0 Global motion system
- **Smooth scroll:** Lenis with restrained lerp; scroll *is* the timeline (scrubbed, not
  triggered) for S1→S3.
- **Easing language:** custom expo/`power3` for camera/large moves; spring for UI feedback.
- **Depth:** parallax is layered by z-distance (stars far, particles mid, hero near).
- **Continuity:** elements hand off between sections (XP bar in S1 persists → fills in S2 →
  triggers reveal in S3) so the page feels like one continuous shot, not stacked sections.

### 7.1 Per-section motion spec

| Section | Scroll behavior | Camera / 3D | Parallax layers | Particles / FX | Transition out |
|---------|-----------------|-------------|-----------------|----------------|----------------|
| **S1 Hero** | Scrubbed scroll drives a continuous camera dolly *into* the void | R3F: camera pushes forward through starfield; logo letters drop-in with bounce (physics), tagline last | stars (far) · dust (mid) · logo (near) | drifting particle field, GPU points; gentle nebula shimmer | Camera keeps diving → seamless into S2 (no cut) |
| **S2 Hero Appears** | Continued dolly; hero fades up from light on its island as camera settles | R3F scene continues; hero sprite billboard with subtle idle bob | island (mid) · hero (near) · bokeh (fore) | sparkle motes orbit the hero; XP bar ignites at L1 | XP bar begins to fill → cues S3 |
| **S3 Reveal** | **Pinned** section; scroll scrubs the peel/dissolve from fantasy → dashboard | depth match-cut: fantasy layer scales/peels away on a shader/transform reveal exposing UI behind | fantasy skin (front) peels to reveal app UI (back) | warm light bloom wipes cold particles away | Unpin → settle into S4 grid |
| **S4 Care→XP** | Scroll advances each loop step (action→reward) in sequence, scrubbed | none (2D) | icon chips drift on subtle parallax | reward chip "pops" with spring + sprite icon spark | Last reward flips into S5 grid |
| **S5 Features** | Cards arrive on scroll via *staggered scale+blur-in from depth* (not slide-up) | none | per-card slight z-offset | hover: inner-glow + XP-bar fill micro-anim | Pivot wipe to S6 |
| **S6 Parent Mode** | Toggle interaction (not scroll) morphs panel; FLIP layout animation | none | — | chart lines draw-on; numbers count up (tabular) | Toggle settle → S7 |
| **S7 Screenshots** | Horizontal snap-scroll (mobile) / drag carousel; scroll-linked progress | device frame floats with parallax tilt to pointer | frame (near) · glow (back) | screen-glow pulse on active slide | Theme swatch wipe → S8 |
| **S8 Themes** | Segmented control recolors live via CSS-var transition (cheap, no remount) | none | background art cross-fades | palette sweep across section on select | Worlds converge → S9 |
| **S9 Family** | Party sprites gather on scroll (orchestrated arc paths, not stagger-up) | none | sprites at varied depth | warm glow rises; connection lines draw between party | Lights rise → S11/S10 |
| **S10 FAQ** | Accordion height spring on open; scroll-reveal of the block | none | — | chevron rotate; subtle highlight on open | Calm → swell into S11 |
| **S11 Final CTA** | Section scales up into focus; gradient intensifies on approach | optional R3F callback: hero at higher level, brief idle | CTA (near) · hero (back) | submit success → particle burst + "+1 Party Member" badge spring | end |
| **S12 Footer** | Static reveal | none | — | — | — |

### 7.2 Micro-interactions
- **Primary CTA:** scale-on-press (0.97), gradient shift on hover, subtle XP-shimmer sweep.
- **Cursor:** optional custom cursor with magnetic pull on CTAs (desktop only; off on touch).
- **Form:** field focus glow; submit → button morphs to spinner → success reward badge.
- **Sound (optional, opt-in, muted by default):** soft "level-up" chime on waitlist success.

### 7.3 `prefers-reduced-motion` fallbacks (required for every section)
- S1/S2: **static** hero composition — no camera dolly, no particle animation; render one
  beautiful still of the world + hero. (Per [[../features/hero-section]].)
- S3: reveal becomes a **simple cross-fade** between fantasy still and dashboard still (no scrub/peel).
- S4/S5/S9: elements appear **immediately**, no entrance animation.
- S6: instant panel swap; numbers shown final (no count-up).
- S7: auto-advance off; manual nav only (per [[../features/screenshot-gallery]]).
- S8: cross-fade recolor instead of sweep (per [[../features/theme-gallery]]).
- S10: instant expand/collapse (per [[../features/faq]]).
- S11: success shows text + static badge, no burst (per [[../features/waitlist-signup]]).

### 7.4 Motion performance budget (set by `frontend-performance`, see [[06-execution]])
- WebGL limited to **2 scenes** (hero, reveal); both lazy-loaded and **paused off-screen**
  via IntersectionObserver; not rendered at all under reduced motion / low-power.
- Particle counts capped; GPU points, no per-frame allocations; cap DPR (≤2).
- Scroll work runs through GSAP/Lenis rAF only; no layout-thrashing scroll listeners.
- Animate **transform/opacity only** (compositor-friendly); no animating layout properties.
- Target: maintain **60fps** scroll on mid-tier mobile; **INP < 200ms**; **CLS ~0** (reserve
  all media boxes). Hero must not regress **LCP** — the LCP element is text/logo, not the canvas.

→ Budgets, ownership, and the review gate: [[06-execution]] · conflicts: [[reconciliation-log]]
</content>
