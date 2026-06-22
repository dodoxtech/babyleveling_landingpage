import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/lib/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const taglines: Record<Locale, string> = {
  en: "You just had a baby. You also just started a new game.",
  ja: "赤ちゃんが生まれた。それは、新しい冒険のはじまり。",
  vi: "Bạn vừa có em bé. Bạn cũng vừa bắt đầu một trò chơi mới.",
};

/**
 * Font file names stored in public/fonts/. Noto Sans JP covers CJK + Latin;
 * Noto Sans covers Latin Extended (Vietnamese diacritics) at a smaller size.
 */
const fontFiles: Record<Locale, string> = {
  en: "NotoSans-Bold.ttf",
  ja: "NotoSansJP-Bold.ttf",
  vi: "NotoSans-Bold.ttf",
};

async function loadFont(locale: Locale): Promise<ArrayBuffer> {
  const filePath = path.join(process.cwd(), "public", "fonts", fontFiles[locale]);
  const buffer = await readFile(filePath);
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

/**
 * Per-locale OG image — see docs/planning/04-seo-aeo.md §9.4 (one designed OG
 * image per locale) and §9.5 (dark card, gradient logo, tagline copy). Tagline
 * strings are taken verbatim from docs/planning/05-copy-multilingual.md S1.
 * CJK glyphs (JA) and Latin Extended (VI diacritics) are covered by local
 * Noto font files in public/fonts/ loaded at build time (SSG).
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const tagline = taglines[locale];
  const fontData = await loadFont(locale);

  return new ImageResponse(
    (
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
            fontFamily: "NotoSans",
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
            fontFamily: "NotoSans",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "NotoSans",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
