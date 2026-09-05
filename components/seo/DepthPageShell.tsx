import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { DownloadSection } from "@/components/sections/DownloadSection";
import type { BreadcrumbItem } from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n/config";

interface DepthPageShellProps {
  locale: Locale;
  breadcrumb: BreadcrumbItem[];
  children: React.ReactNode;
}

/**
 * Shared chrome for the five TASK-0010 depth pages (`/features`,
 * `/rpg-system`, `/parents`, `/pricing`, `/faq`): clears the fixed header,
 * renders the breadcrumb, and closes with the same App Store download
 * section every narrative page uses, so every route ends with a real CTA
 * rather than a link back to home.
 *
 * `locale` is forwarded to `DownloadSection` so its copy is translated
 * correctly for each sub-path route.
 */
export function DepthPageShell({
  locale,
  breadcrumb,
  children,
}: DepthPageShellProps) {
  return (
    <main className="min-h-screen pt-[4.5rem]">
      <Breadcrumbs items={breadcrumb} />
      {children}
      <DownloadSection locale={locale} />
    </main>
  );
}
