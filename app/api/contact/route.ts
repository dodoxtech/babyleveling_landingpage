import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

interface ContactBody {
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot  -  real visitors never fill this. */
  website?: unknown;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: ContactBody = {};
  try {
    body = await request.json();
  } catch {
    /* fall through */
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !email ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email) ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // In production: forward to email provider (Resend, SendGrid, etc.).
  // Pre-launch: log server-side and return success.
  console.log("[contact]", {
    email,
    subject: typeof body.subject === "string" ? body.subject : "Other",
    messageLength: message.length,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
