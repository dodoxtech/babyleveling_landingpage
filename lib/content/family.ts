/** A member of the co-op "party" — parent, partner, grandparent, etc. */
export interface FamilyRole {
  id: string;
  role: string;
  blurb: string;
  sprite: string;
}

/**
 * S9 Family Sharing copy — see docs/planning/05-copy-multilingual.md ("S9 Family
 * Sharing") and the "co-op quest" framing in docs/planning/01-strategy.md §3 (S9). No
 * adult character art exists yet (only `babyBoy`/`babyGirl`/`icon` sprites under
 * `public/sprites/`), so every role uses an existing activity icon as its party-member
 * glyph rather than an invented portrait — swappable for real character art later.
 * English only for now; JA/VI variants land in TASK-0011.
 */
export const familyRoles: FamilyRole[] = [
  {
    id: "parent",
    role: "Parent (You)",
    blurb:
      "The quest-giver and the hero's biggest fan — logging every feed, nap, and milestone.",
    sprite: "icon.family",
  },
  {
    id: "partner",
    role: "Partner",
    blurb:
      "A second player on the same save file — every log syncs instantly, so no one's flying blind.",
    sprite: "icon.reminder",
  },
  {
    id: "grandparent",
    role: "Grandparent",
    blurb:
      "Invited to the party from day one — cheering milestones and pitching in on babysitting quests.",
    sprite: "icon.gift",
  },
  {
    id: "caregiver",
    role: "Caregiver",
    blurb:
      "Nannies and sitters join the same timeline, so care never has a gap between shifts.",
    sprite: "icon.calendar",
  },
];
