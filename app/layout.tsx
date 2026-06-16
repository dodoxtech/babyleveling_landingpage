import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import "./globals.css";

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

/**
 * Root metadata — see docs/planning/04-seo-aeo.md §9.5 (title/description),
 * §9.4 (canonical + hreflang). `hreflang` is scaffolding ahead of real
 * locale routes: TASK-0011 adds `/ja` and `/vi`; until then all three
 * `languages` entries point at the same English page rather than 404ing,
 * and get corrected to their own routes when those locales land.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ja: "/",
      vi: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <SiteJsonLd />
        <LenisProvider>
          <SiteHeader />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
