/**
 * Asset path helper. All frontend image keys resolve to `public/assets/`.
 */

export const assets = {
  /* Characters */
  "character.cute-girl-sitting": "/assets/characters/cute-baby-girl-sitting.png",
  "character.cute-girl-waving": "/assets/characters/cute-baby-girl-waving.png",
  "character.warrior-standing": "/assets/characters/warrior-baby-standing.png",
  "character.warrior-shield": "/assets/characters/warrior-baby-shield.png",

  /* Timeline stages */
  "timeline.lv01": "/assets/timeline/lv01-newborn.png",
  "timeline.lv05": "/assets/timeline/lv05-explorer.png",
  "timeline.lv10": "/assets/timeline/lv10-little-star.png",
  "timeline.lv20": "/assets/timeline/lv20-adventurer.png",
  "timeline.lv50": "/assets/timeline/lv50-legend.png",

  /* Scene backgrounds */
  "scene.hero-cute": "/assets/scenes/hero-cute-bg.png",
  "scene.hero-warrior": "/assets/scenes/hero-warrior-bg.png",
  "scene.features": "/assets/scenes/features-bg.png",

  /* Icons */
  "icon.xp-badge": "/assets/icons/xp-badge.png",
  "icon.trophy": "/assets/icons/trophy.png",
  "icon.growth": "/assets/icons/growth-chart.png",
  "icon.family": "/assets/icons/family.png",
  "icon.book": "/assets/icons/book.png",
  "icon.shield": "/assets/icons/shield.png",
  "icon.bottle": "/assets/icons/bottle.png",
  "icon.moon-star": "/assets/icons/moon-star.png",
  "icon.camera": "/assets/icons/camera.png",
  "icon.achievement": "/assets/icons/achievement.png",
  "icon.heart-pulse": "/assets/icons/heart-pulse.png",
  "icon.calendar": "/assets/icons/calendar.png",

  /* Feature card images */
  "feature.xp-levels": "/assets/features/xp-levels.png",
  "feature.daily-quests": "/assets/features/daily-quests.png",
  "feature.skill-tree": "/assets/features/skill-tree.png",
  "feature.achievements": "/assets/features/achievements.png",
  "feature.streaks-buffs": "/assets/features/streaks-buffs.png",
  "feature.apple-watch": "/assets/features/apple-watch.png",

  /* Logo */
  "logo.light": "/assets/logo/babyleveling-logo.png",
  "logo.dark": "/assets/logo/babyleveling-logo-dark.png",
  "logo.favicon": "/assets/logo/favicon-512.png",
} as const;

export type AssetKey = keyof typeof assets;

export function assetPath(key: AssetKey): string {
  return assets[key];
}
