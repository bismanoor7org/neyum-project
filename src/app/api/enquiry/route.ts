import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/enquiry/admin-auth";
import {
  listEnquiries,
  notifyEnquiryWebhook,
  persistEnquiry,
} from "@/lib/enquiry/store";
import { computeEnquiryStats } from "@/lib/enquiry/stats";
import type { EnquiryRecord } from "@/lib/enquiry/types";
import { parseEnquiryBody } from "@/lib/enquiry/validate";

export async function GET(request: Request) {
  if (!(await verifyAdminAccess(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await listEnquiries();
  return NextResponse.json({
    enquiries,
    stats: computeEnquiryStats(enquiries),
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseEnquiryBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const record: EnquiryRecord = {
    ...parsed.data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  try {
    await persistEnquiry(record);
    if (process.env.ENQUIRY_WEBHOOK_URL) {
      await notifyEnquiryWebhook(record);
    }
  } catch (error) {
    console.error("[enquiry]", error);
    return NextResponse.json(
      { error: "Unable to save enquiry" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id });
}
