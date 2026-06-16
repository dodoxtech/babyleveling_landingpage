import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WaitlistSignup } from "@/components/sections/WaitlistSignup";
import type { BreadcrumbItem } from "@/components/seo/JsonLd";

interface DepthPageShellProps {
  breadcrumb: BreadcrumbItem[];
  children: React.ReactNode;
}

/**
 * Shared chrome for the five TASK-0010 depth pages (`/features`,
 * `/rpg-system`, `/parents`, `/pricing`, `/faq`): clears the fixed header,
 * renders the breadcrumb, and closes with the same real, working waitlist
 * section every narrative page uses — satisfying "carry a waitlist CTA"
 * with the actual form rather than a link back to home.
 */
export function DepthPageShell({ breadcrumb, children }: DepthPageShellProps) {
  return (
    <main className="min-h-screen pt-[4.5rem]">
      <Breadcrumbs items={breadcrumb} />
      {children}
      <WaitlistSignup />
    </main>
  );
}
