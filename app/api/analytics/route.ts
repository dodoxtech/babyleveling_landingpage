import { NextRequest, NextResponse } from "next/server";

/**
 * Analytics ingestion endpoint. Accepts structured events from `lib/analytics.ts`.
 * Currently a no-op collector  -  swap the body for a real provider call
 * (Plausible, PostHog, Vercel Analytics SDK, etc.) without touching call-sites.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    // TODO: forward `body` to your analytics provider here.
    void body;
  } catch {
    // Malformed payload  -  still return 204 so the client never retries.
  }
  return new NextResponse(null, { status: 204 });
}
