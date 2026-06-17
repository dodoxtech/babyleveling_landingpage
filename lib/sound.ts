"use client";

// ---------------------------------------------------------------------------
// Sound — opt-in Web Audio API utilities. No audio-file asset required;
// the level-up chime is synthesized entirely in the browser.
//
// Per reconciliation R-8: sound is muted by default; the user must
// explicitly opt in via SoundToggle. Preference is persisted to localStorage.
// ---------------------------------------------------------------------------

const SOUND_KEY = "bl_sound_enabled";

export function getSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SOUND_KEY) === "true";
  } catch {
    return false;
  }
}

export function setSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, enabled ? "true" : "false");
  } catch {
    // storage unavailable — proceed silently
  }
}

/** Synthesized "level-up" fanfare via Web Audio API.
 *  Three ascending sine tones with exponential decay — totals ~0.6 s,
 *  no audio file required. Silently no-ops if audio is unavailable. */
export function playLevelUp(): void {
  if (typeof window === "undefined") return;
  if (!getSoundEnabled()) return;

  try {
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = freq;

      const start = ctx.currentTime + i * 0.12;
      const end = start + 0.25;

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, end);

      osc.start(start);
      osc.stop(end);
      osc.onended = () => {
        if (i === notes.length - 1) ctx.close();
      };
    });
  } catch {
    // AudioContext unavailable or suspended — fail silently
  }
}
