import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fredoka, Poppins, Baloo_2, Be_Vietnam_Pro } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localeAlternates, localeHref } from "@/lib/i18n/paths";
import "../globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/**
 * Vietnamese-capable substitutes. Fredoka and Poppins ship no `vietnamese`
 * subset, so tone-marked glyphs (ữ, ậ, ề…) fall back to a mismatched system
 * font on the `/vi` route. Baloo 2 (rounded, like Fredoka) and Be Vietnam Pro
 * (geometric, like Poppins) cover Vietnamese and are bound to the same CSS
 * variables, so `globals.css` keeps reading `--font-fredoka` / `--font-poppins`
 * unchanged — only the `<body>` className swaps per locale.
 */
const balooVi = Baloo_2({
  variable: "--font-fredoka",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  // Only the /vi <body> references these vars, so skip the preload <link> that
  // would otherwise force every locale to download the Vietnamese families.
  preload: false,
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-poppins",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Reject any segment outside the three supported locales instead of rendering on-demand. */
export const dynamicParams = false;

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Root metadata  -  see docs/planning/04-seo-aeo.md §9.5 (title/description),
 * §9.4 (canonical + hreflang). As of TASK-0011, `/ja` and `/vi` are real,
 * content-complete routes, so `alternates.languages` points at each
 * locale's real URL via `localeAlternates` instead of the placeholder
 * all-point-at-"/" scaffolding from TASK-0009.
 */
export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: `%s  -  ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: localeHref(locale, "/"),
      languages: localeAlternates("/"),
    },
    openGraph: {
      type: "website",
      url: localeHref(locale, "/"),
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const fontVars =
    locale === "vi"
      ? `${balooVi.variable} ${beVietnam.variable}`
      : `${fredoka.variable} ${poppins.variable}`;

  return (
    <html lang={locale}>
      <body className={`${fontVars} font-sans antialiased`}>
        <SiteJsonLd />
        <LenisProvider>
          <SiteHeader locale={locale} />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
