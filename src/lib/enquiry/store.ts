import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import type { EnquiryRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.jsonl");

export async function persistEnquiry(record: EnquiryRecord): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(ENQUIRIES_FILE, `${JSON.stringify(record)}\n`, "utf8");
}

export async function listEnquiries(limit = 100): Promise<EnquiryRecord[]> {
  try {
    const raw = await readFile(ENQUIRIES_FILE, "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    const records = lines
      .map((line) => {
        try {
          return JSON.parse(line) as EnquiryRecord;
        } catch {
          return null;
        }
      })
      .filter((record): record is EnquiryRecord => record !== null);

    return records
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, limit);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return [];
    }
    throw error;
  }
}

export async function notifyEnquiryWebhook(
  record: EnquiryRecord,
): Promise<void> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed (${response.status})`);
  }
}
