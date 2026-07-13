import { NextResponse } from "next/server";
import { getEntryGuide } from "@/server/services/visa-intelligence.service";

export async function GET() {
  try {
    const guide = await getEntryGuide();
    if (!guide) {
      return NextResponse.json({ error: "Entry guide not found" }, { status: 404 });
    }
    return NextResponse.json({ data: guide });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Entry guide lookup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
