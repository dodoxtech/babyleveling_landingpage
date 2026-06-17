import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WaitlistSignup } from "@/components/sections/WaitlistSignup";
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
 * renders the breadcrumb, and closes with the same real, working waitlist
 * section every narrative page uses  -  satisfying "carry a waitlist CTA"
 * with the actual form rather than a link back to home.
 *
 * As of TASK-0011: accepts `locale` and forwards it to `WaitlistSignup` so
 * the form copy is translated correctly for each sub-path route.
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
      <WaitlistSignup locale={locale} />
    </main>
  );
}
