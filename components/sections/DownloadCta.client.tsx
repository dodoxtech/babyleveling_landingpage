"use client";

import { APP_STORE_URL } from "@/lib/app-store";
import { trackEvent, type EventProps } from "@/lib/analytics";

interface DownloadCtaProps {
  label: string;
  /** Where on the page this button lives  -  forwarded as `cta_clicked.location`. */
  location: NonNullable<EventProps["location"]>;
  className?: string;
}

/** Apple-mark badge button linking to the real App Store listing, used
 * anywhere the site needs a download push (closing CTA, blog posts, etc). */
export function DownloadCta({ label, location, className }: DownloadCtaProps) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("cta_clicked", { location })}
      className={
        className ?? "btn-primary inline-flex items-center gap-2.5"
      }
    >
      <AppleMark />
      {label}
    </a>
  );
}

function AppleMark() {
  return (
    <svg
      viewBox="0 0 384 512"
      aria-hidden="true"
      className="h-[1.1em] w-[1.1em] shrink-0 fill-current"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 37.5 59 129.3 107.2 127.6 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-84.1 102.6-121.7-65.2-30.7-57.7-90-57.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
