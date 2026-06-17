import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated OG image  -  see docs/planning/04-seo-aeo.md §9.5 ("dark card,
 * gradient logo, tagline"). No designed OG art asset exists pre-launch
 * (same "no invented binary asset" reasoning as the screenshot/theme-art
 * stand-ins elsewhere); this renders the same dark-void + plasma-gradient
 * system from `app/globals.css` as a server-generated image instead, so
 * the card is on-brand without waiting on the design track. Twitter falls
 * back to this same image for its card (no separate `twitter-image`).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A0A14",
        backgroundImage:
          "radial-gradient(ellipse at center, rgba(124,58,237,0.25) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 80,
          fontWeight: 700,
          color: "#EC4899",
          letterSpacing: -2,
        }}
      >
        BabyLeveling
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 38,
          color: "#F4F4FA",
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        You just had a baby. You also just started a new game.
      </div>
    </div>,
    { ...size },
  );
}
