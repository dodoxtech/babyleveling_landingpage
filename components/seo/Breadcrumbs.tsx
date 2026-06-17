import Link from "next/link";
import { BreadcrumbJsonLd, type BreadcrumbItem } from "@/components/seo/JsonLd";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Visible breadcrumb nav + its matching `BreadcrumbList` schema for a depth
 * page (TASK-0010). The two stay in sync because they're built from the same
 * `items` array  -  the schema can't drift from what a visitor actually sees.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="px-6 pt-10">
        <ol className="mx-auto flex w-full max-w-5xl items-center gap-2 text-sm text-lo">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-hi">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
