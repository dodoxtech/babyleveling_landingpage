---
tags: [planning, strategy, narrative]
updated: 2026-06-16
---

# Strategy & Narrative

Deliverables 1–3. Owners: `product-strategist`, `story-architect`.

---

## 1. Executive Summary

**BabyLeveling** is a gamified baby-tracking app for iOS + Apple Watch. It does everything a
serious tracker does — feeding, sleep, diapers, growth, health records, family sharing, a
full activity timeline — but it reframes the grind of newborn care as an RPG. Every logged
activity feeds a fantasy hero: **feeding restores energy, sleep recovers HP, healthy habits
earn EXP, milestones unlock achievements, and consistency levels the hero up.** Two modes
coexist: **Parent Mode** (practical, reliable, health-focused logging) and **RPG Adventure
Mode** (a cute fantasy world of hero progression and emotional bonding).

**The site's one job:** capture waitlist emails before launch. It is content-heavy and
mostly static; the only dynamic surface is the waitlist `POST` (see
[[../architecture/data-flow]]).

**The strategic bet (the "delayed reveal"):** the page opens as an *emotional adventure*,
not a baby-app pitch. A visitor first meets a hero and a quest; only as they scroll do they
realize the adventure is powered by the real, unglamorous data of caring for their child.
This reframe is the entire differentiator — so the page is built to *withhold* the product
category for the first two beats and reveal it as a twist, the way a great trailer does.

**Experience target:** Awwwards Site of the Day. Scroll-driven cinematic narrative, dark
luxury aesthetic, large editorial typography, massive whitespace, WebGL depth, motion-first
polish — benchmarked to Igloo Inc, Apple Vision Pro, Linear, Arc, and Stripe Sessions.

**Primary KPI:** waitlist conversion rate (visit → verified email).
**Secondary KPIs:** scroll-depth to the reveal beat, share rate, organic + AI-referral traffic.
**North-star success:** a site that gets *shared because it's beautiful*, converting curiosity
into a launch-day audience.

**Why now:** the app is pre-launch; the waitlist is the audience we convert on day one. The
site must do double duty as a conversion funnel *and* a brand-defining artifact that signals
"this app is made with Apple-level care."

---

## 2. Product Positioning

### 2.1 Positioning statement

> For **exhausted new and expecting parents** who find baby-tracking apps clinical and joyless,
> **BabyLeveling** is a **baby tracker that plays like an RPG** — it turns every feed, nap, and
> milestone into XP for a hero your child is growing into. Unlike spreadsheet-style trackers
> (Huckleberry, Baby Tracker, Glow Baby), BabyLeveling makes the 3 a.m. log feel like *progress
> in a story you're winning together*, without sacrificing the rigor parents and pediatricians
> need.

### 2.2 The one-line pitch
**"You just had a baby. You also just started a new game."**

### 2.3 Unique selling proposition (USP)
**The only baby tracker where caring for your child levels up a hero.** Real care → real
data → a growing adventure. It is simultaneously a *credible health log* and an *emotional
game*, and neither half is a gimmick.

### 2.4 Target audience (ICP)

| Segment | Who | Core tension | What converts them |
|---------|-----|--------------|--------------------|
| **Primary — The First-Timer** | 28–38, first baby, 0–12 mo, iPhone + likely Apple Watch, app-literate, often a gamer | Overwhelmed; tracking feels like a chore that adds guilt | "This makes the hardest months feel like *winning*." |
| **Secondary — The Optimizer Parent** | Data-driven, wants charts + pediatrician-ready records | Existing apps are ugly and joyless | Rigorous data **and** delight in one app |
| **Tertiary — The Gift-Giver** | Grandparents, friends, baby-shower buyers | Wants a meaningful, modern gift | Family sharing + "the app new parents actually enjoy" |
| **Influencer wedge** | Parent-gamers, "geek parents", tech-press | Looking for the novel angle | The RPG reveal is inherently shareable |

**Anti-persona:** clinical-only users who reject any playfulness around their child — we do
not chase them, but Parent Mode reassures them the data is real.

### 2.5 Emotional hooks (in narrative order)
1. **Wonder** — "What is this world?" (pure adventure, no product yet)
2. **Recognition** — "Wait… the hero is *my baby*." (the reveal)
3. **Relief** — "The exhausting parts finally *count* for something."
4. **Pride** — "Look how far we've leveled up."
5. **Belonging** — "Our whole family is on this quest."
6. **Urgency** — "I want in before launch."

### 2.6 Value propositions (messaging hierarchy)
- **Hero (emotional):** Turn newborn chaos into an adventure you're winning together.
- **Pillar 1 — It still does the real job:** Feeding, sleep, diaper, growth, health records,
  family sharing, full timeline. Pediatrician-ready.
- **Pillar 2 — Every log is progress:** XP, levels, daily quests, skill tree, achievements,
  streaks & buffs.
- **Pillar 3 — Made to be loved:** Three art themes (Royal, Warrior, Zen), Apple Watch
  2-tap logging, Apple-level polish.
- **Pillar 4 — A shared quest:** Family sharing turns care into a co-op game.

### 2.7 Differentiation vs. competitors
| | Huckleberry | Baby Tracker | Glow Baby | **BabyLeveling** |
|--|--|--|--|--|
| Core tracking | ✅ | ✅ | ✅ | ✅ |
| Emotional reward loop | ❌ | ❌ | ⚠️ light | ✅ **RPG progression** |
| Distinct art identity | ❌ | ❌ | ⚠️ | ✅ **3 themes** |
| Apple Watch fast-log | ⚠️ | ⚠️ | ❌ | ✅ **≤2 taps** |
| "Want to open it" factor | ❌ | ❌ | ❌ | ✅ |

### 2.8 Conversion model (funnel)
```
AWARENESS   organic search · AI answer engines · social shares · press
   ▼
INTRIGUE    Hero + Adventure beats — withhold the category, build wonder
   ▼
REVEAL      "the hero is your baby" — the emotional turn
   ▼
PROOF       feature grid · screenshots · themes — it's real and rigorous
   ▼
TRUST       FAQ — privacy of baby data, price, platforms, launch date
   ▼
CONVERT     waitlist email (single field) → celebratory success state
   ▼
ADVOCACY    share prompt + referral position ("invite a co-parent")
```
- **One conversion event, repeated:** the waitlist CTA appears at the Hero (sticky/secondary),
  after the Reveal, after Proof, and in a final full-bleed CTA — never competing with a second
  ask.
- **Friction floor:** email only; no name, no password (per [[../features/waitlist-signup]]).

### 2.9 Visitor journey map
| Stage | Visitor thought | Page job | Emotion | Primary metric |
|-------|-----------------|----------|---------|----------------|
| Land | "Whoa, what is this?" | Cinematic hook | Wonder | Bounce < 35% |
| Scroll 1 | "Is this a game?" | Sustain mystery | Curiosity | Scroll to beat 2 |
| Reveal | "It's about *my* baby!" | Land the twist | Surprise + warmth | Scroll to reveal ≥ 60% |
| Explore | "Does it actually work?" | Show real features/screens | Trust building | Feature-section dwell |
| Doubt | "Is my data safe? Price?" | FAQ answers | Reassurance | FAQ open rate |
| Decide | "I want this at launch" | Waitlist CTA | Anticipation | **Email submit** |
| After | "Who else needs this?" | Share / invite co-parent | Pride | Share / referral rate |

---

## 3. Story Framework

The page is a **five-act cinematic arc**. It reads like a trailer for an adventure that
turns out to be about the visitor's own child. The category reveal is deliberately delayed
to Act II.

**Through-line:** *Caring for your baby is the greatest quest you'll ever play.*
**Tonal journey:** mythic & spacious → intimate & warm → confident & proof-driven → urgent.

### Act I — The World (curiosity, no product)
### Act II — The Reveal (the twist)
### Act III — The Proof (it's real)
### Act IV — The Belonging (family + themes)
### Act V — The Call (convert)

Each section below gives: **Purpose · Narrative goal · Emotional goal · Key message ·
Transition.** (Full storyboard + motion + visuals: [[03-storyboard-motion-visual]]. Copy:
[[05-copy-multilingual]].)

### Section S0 — Nav / Brand Frame (persistent)
- **Purpose:** Orient without spoiling; hold a quiet always-available CTA.
- **Narrative goal:** Feel like the HUD of a premium game, not a SaaS navbar.
- **Emotional goal:** Confidence, calm.
- **Key message:** *BabyLeveling* (logo) + "Join the waitlist".
- **Transition:** Dissolves into the hero; shrinks/condenses on scroll.

### Section S1 — Hero: "A new game has begun" (Act I)
- **Purpose:** Stop the scroll; plant the one-line promise; offer the primary CTA.
- **Narrative goal:** Open *in medias res* on a fantasy world — no mention of "baby app".
- **Emotional goal:** Wonder.
- **Key message:** **"You just had a baby. You also just started a new game."** / *Every day
  is a new quest.*
- **Transition:** Camera pushes *into* the world; starfield deepens → we descend toward a hero.

### Section S2 — The Hero Appears (Act I)
- **Purpose:** Introduce a character the visitor roots for — still ambiguous.
- **Narrative goal:** Meet a small hero standing at the start of a long adventure (uses the
  baby sprites as a stylized "hero", not yet labeled as a baby).
- **Emotional goal:** Affection, intrigue.
- **Key message:** *Every hero starts at Level 1.*
- **Transition:** Hero's XP bar lights up — "but where does the XP come from?" — pull back.

### Section S3 — The Reveal (Act II — the twist)
- **Purpose:** Land the emotional turn that recontextualizes everything above.
- **Narrative goal:** Reveal the hero is the visitor's own baby; the "quests" are real care.
- **Emotional goal:** Surprise → warmth → recognition.
- **Key message:** **"The hero is your baby. The XP is real life."**
- **Transition:** The fantasy frame peels back to reveal the app's character-sheet dashboard.

### Section S4 — How It Works: Care → XP (Act III)
- **Purpose:** Make the mechanic legible: real activity maps to game rewards.
- **Narrative goal:** Show the loop — Feeding=Energy, Sleep=HP, Habits=EXP, Milestones=Achievements.
- **Emotional goal:** Delight + "oh, that's clever".
- **Key message:** *Feed. Sleep. Grow. Level up.*
- **Transition:** A single quest card flips into the full feature grid.

### Section S5 — Feature Showcase (Act III)
- **Purpose:** Prove the gameplay depth (the RPG layer is real, not a skin).
- **Narrative goal:** Tour XP & Levels, Daily Quests, Skill Tree, Achievements, Streaks &
  Buffs, Apple Watch. (See [[../features/feature-showcase]].)
- **Emotional goal:** Confidence the product is substantial.
- **Key message:** *A full RPG, built on real baby care.*
- **Transition:** "But it's still a serious tracker" — pivot to Parent Mode.

### Section S6 — Parent Mode: The Real Tracker (Act III)
- **Purpose:** Reassure the skeptic/optimizer that the data is rigorous and exportable.
- **Narrative goal:** Show the same data as clean charts, health records, pediatrician-ready.
- **Emotional goal:** Trust, relief.
- **Key message:** *Two modes. One source of truth.* Practical when you need it, magical when
  you want it.
- **Transition:** Mode toggle morphs the UI — into the screenshots gallery.

### Section S7 — Screenshot Gallery / Proof (Act III)
- **Purpose:** Show the actual app UI in device frames. (See [[../features/screenshot-gallery]].)
- **Narrative goal:** Dashboard "character sheet", quest log "battle log", skill tree, trophy room.
- **Emotional goal:** "It's real and it's gorgeous."
- **Key message:** *This is what your adventure looks like.*
- **Transition:** A theme swatch sweeps color across the screen.

### Section S8 — Theme Gallery (Act IV)
- **Purpose:** Showcase the three per-baby art worlds — a headline differentiator. (See
  [[../features/theme-gallery]].)
- **Narrative goal:** Royal (Soft power.), Warrior (Forged in fire.), Zen (Gentle and
  intentional.) — each a full personality.
- **Emotional goal:** Personal identification ("that one is *us*").
- **Key message:** *Choose the world your hero grows up in.*
- **Transition:** Worlds converge into one shared map — family.

### Section S9 — Family Sharing: A Co-op Quest (Act IV)
- **Purpose:** Position care as multiplayer; widen to partners + grandparents.
- **Narrative goal:** Everyone caring for the baby is a party member on the same quest.
- **Emotional goal:** Belonging, shared load.
- **Key message:** *Raise them together. Level up as a party.*
- **Transition:** The party gathers; lights rise toward the final call.

### Section S10 — FAQ / Trust (Act V pre-close)
- **Purpose:** Clear final objections — baby-data privacy, price, platforms, launch. (See
  [[../features/faq]].)
- **Narrative goal:** Calm, candid answers; no hype.
- **Emotional goal:** Reassurance.
- **Key message:** *Your baby's data is yours. iOS 17+ & Apple Watch. Launching soon.*
- **Transition:** Resolve doubt → swell into the final CTA.

### Section S11 — Final CTA / Waitlist (Act V — the call)
- **Purpose:** Convert. The single, unmissable ask. (See [[../features/waitlist-signup]].)
- **Narrative goal:** "Your adventure begins at launch — claim your spot."
- **Emotional goal:** Anticipation → action → a small reward on submit.
- **Key message:** **"Be there at Level 1."** Join the waitlist.
- **Transition:** Success state = a celebratory "+1 Party Member" reward moment.

### Section S12 — Footer (close)
- **Purpose:** Wayfinding + credibility + legal + locale switch.
- **Narrative goal:** Quiet, premium sign-off; sitemap to the deeper pages.
- **Emotional goal:** Trust, completeness.
- **Key message:** Links, social, language (EN/JA/VI), © .
- **Transition:** End of page.

### CTA placement logic
Primary waitlist ask repeats at **S1 (hero), after S3 (reveal), after S7 (proof), S11
(final)** — escalating from soft ("Join the waitlist") to committed ("Be there at Level 1").
No competing secondary CTA; nav CTA stays quiet until the final beat goes loud.

→ Continue: [[02-architecture]] · [[03-storyboard-motion-visual]] · [[05-copy-multilingual]]
</content>
