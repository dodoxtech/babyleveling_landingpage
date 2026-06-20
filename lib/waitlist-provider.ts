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
import { sanitizeCellValue } from "@/lib/waitlist-validation";

export type WaitlistSubmitResult =
  | { status: "created" }
  /** Same email seen before — still a success from the caller's point of view. */
  | { status: "duplicate" };

export interface WaitlistProvider {
  submit(entry: WaitlistEntry): Promise<WaitlistSubmitResult>;
}

// Cache the resolved tab name across submits so we don't re-fetch metadata on
// every request (the title only changes if someone renames the tab).
let cachedSheetName: string | undefined;

class GoogleSheetsWaitlistProvider implements WaitlistProvider {
  private getSheets() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        // Vercel stores multi-line secrets as literal \n — restore real newlines.
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n",
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  }

  /**
   * The first tab is named "Sheet1" only for sheets created in English; Google
   * localizes it (e.g. "シート1") and users may rename it. Rather than hardcode
   * it, allow an explicit GOOGLE_SHEETS_TAB_NAME override, else discover the
   * first tab's actual title from the spreadsheet metadata.
   */
  private async getSheetName(
    sheets: ReturnType<typeof this.getSheets>,
    spreadsheetId: string,
  ): Promise<string> {
    if (process.env.GOOGLE_SHEETS_TAB_NAME) {
      return process.env.GOOGLE_SHEETS_TAB_NAME;
    }
    if (cachedSheetName) {
      return cachedSheetName;
    }
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const title = meta.data.sheets?.[0]?.properties?.title;
    if (!title) {
      throw new Error("Waitlist sheet has no tabs");
    }
    cachedSheetName = title;
    return title;
  }

  async submit(entry: WaitlistEntry): Promise<WaitlistSubmitResult> {
    const sheets = this.getSheets();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    const sheetName = await this.getSheetName(sheets, spreadsheetId);

    // Check for existing email to keep the sheet deduplicated.
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
    });

    const rows = existing.data.values ?? [];
    const emailLower = entry.email.toLowerCase();
    const isDuplicate = rows.some(
      (row) =>
        typeof row[0] === "string" && row[0].toLowerCase() === emailLower,
    );

    if (isDuplicate) {
      return { status: "duplicate" };
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:C`,
      valueInputOption: "RAW",
      requestBody: {
        // Guard against spreadsheet formula injection on CSV export  -  see
        // sanitizeCellValue. createdAt is server-generated ISO, but pass it
        // through too so the rule lives in exactly one place.
        values: [
          [
            sanitizeCellValue(entry.email),
            sanitizeCellValue(entry.source ?? ""),
            sanitizeCellValue(entry.createdAt),
          ],
        ],
      },
    });

    return { status: "created" };
  }
}

export function getWaitlistProvider(): WaitlistProvider {
  return new GoogleSheetsWaitlistProvider();
}
