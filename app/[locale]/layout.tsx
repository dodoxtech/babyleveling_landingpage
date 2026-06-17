import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Geist } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { CustomCursor } from "@/components/ui/CustomCursor.client";
import { SoundToggle } from "@/components/ui/SoundToggle.client";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localeAlternates, localeHref } from "@/lib/i18n/paths";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
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
 * Root metadata — see docs/planning/04-seo-aeo.md §9.5 (title/description),
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
      template: `%s — ${SITE_NAME}`,
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

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <SiteJsonLd />
        <CustomCursor />
        <LenisProvider>
          <SiteHeader locale={locale} />
          {children}
        </LenisProvider>
        <SoundToggle />
      </body>
    </html>
  );
}
