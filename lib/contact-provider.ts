/**
 * Contact-form storage provider — server-side only.
 *
 * Stores submissions in a Google Sheet tab, separate from the waitlist tab
 * (same spreadsheet as `lib/waitlist-provider.ts` by default). Each row:
 * [email, subject, message, createdAt].
 *
 * Required env vars (set in Vercel dashboard + .env.local):
 *   GOOGLE_SHEETS_SPREADSHEET_ID  — same spreadsheet ID used by the waitlist
 *   GOOGLE_SHEETS_CLIENT_EMAIL    — service account email from credentials JSON
 *   GOOGLE_SHEETS_PRIVATE_KEY     — service account private key (include \n characters)
 *   GOOGLE_SHEETS_CONTACT_TAB_NAME — tab/sheet name to append rows to
 *                                    (defaults to "Contact"; create this tab
 *                                    in the spreadsheet if it doesn't exist)
 *
 * Setup:
 *   1. In the same Google Sheet used for the waitlist, add a new tab named
 *      "Contact" (or set GOOGLE_SHEETS_CONTACT_TAB_NAME to your tab's name).
 *   2. The existing service account (shared as Editor on the spreadsheet)
 *      already has access — no extra sharing step needed.
 */

import { google } from "googleapis";
import { sanitizeCellValue } from "@/lib/waitlist-validation";

export interface ContactEntry {
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ContactProvider {
  submit(entry: ContactEntry): Promise<void>;
}

const DEFAULT_CONTACT_TAB_NAME = "Contact";

class GoogleSheetsContactProvider implements ContactProvider {
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

  async submit(entry: ContactEntry): Promise<void> {
    const sheets = this.getSheets();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    const sheetName =
      process.env.GOOGLE_SHEETS_CONTACT_TAB_NAME || DEFAULT_CONTACT_TAB_NAME;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:D`,
      valueInputOption: "RAW",
      requestBody: {
        // Guard against spreadsheet formula injection on CSV export — see
        // sanitizeCellValue. createdAt is server-generated ISO, but pass it
        // through too so the rule lives in exactly one place.
        values: [
          [
            sanitizeCellValue(entry.email),
            sanitizeCellValue(entry.subject),
            sanitizeCellValue(entry.message),
            sanitizeCellValue(entry.createdAt),
          ],
        ],
      },
    });
  }
}

export function getContactProvider(): ContactProvider {
  return new GoogleSheetsContactProvider();
}
