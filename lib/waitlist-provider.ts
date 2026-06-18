/**
 * Waitlist storage provider — server-side only.
 *
 * Stores signups in a Google Sheet. Each row: [email, source, createdAt].
 *
 * Required env vars (set in Vercel dashboard + .env.local):
 *   GOOGLE_SHEETS_SPREADSHEET_ID  — the ID from your sheet URL
 *   GOOGLE_SHEETS_CLIENT_EMAIL    — service account email from credentials JSON
 *   GOOGLE_SHEETS_PRIVATE_KEY     — service account private key (include \n characters)
 *
 * Setup:
 *   1. Create a Google Sheet and note its ID (the long string in the URL).
 *   2. In Google Cloud Console, enable the Sheets API and create a service account.
 *   3. Download the JSON key, copy client_email and private_key into env vars.
 *   4. Share the sheet with the service account email (Editor role).
 */

import { google } from "googleapis";
import type { WaitlistEntry } from "@/lib/waitlist";

export type WaitlistSubmitResult =
  | { status: "created" }
  /** Same email seen before — still a success from the caller's point of view. */
  | { status: "duplicate" };

export interface WaitlistProvider {
  submit(entry: WaitlistEntry): Promise<WaitlistSubmitResult>;
}

const SHEET_NAME = "Sheet1";
const SHEET_RANGE_READ = `${SHEET_NAME}!A:A`;
const SHEET_RANGE_APPEND = `${SHEET_NAME}!A:C`;

class GoogleSheetsWaitlistProvider implements WaitlistProvider {
  private getSheets() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        // Vercel stores multi-line secrets as literal \n — restore real newlines.
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  }

  async submit(entry: WaitlistEntry): Promise<WaitlistSubmitResult> {
    const sheets = this.getSheets();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    // Check for existing email to keep the sheet deduplicated.
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: SHEET_RANGE_READ,
    });

    const rows = existing.data.values ?? [];
    const emailLower = entry.email.toLowerCase();
    const isDuplicate = rows.some(
      (row) => typeof row[0] === "string" && row[0].toLowerCase() === emailLower,
    );

    if (isDuplicate) {
      return { status: "duplicate" };
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: SHEET_RANGE_APPEND,
      valueInputOption: "RAW",
      requestBody: {
        values: [[entry.email, entry.source ?? "", entry.createdAt]],
      },
    });

    return { status: "created" };
  }
}

export function getWaitlistProvider(): WaitlistProvider {
  return new GoogleSheetsWaitlistProvider();
}
