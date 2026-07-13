import { NextResponse } from "next/server";
import { getFijiLiveStatus } from "@/server/services/world-time-weather.service";

export const revalidate = 900;

export async function GET() {
  try {
    const status = await getFijiLiveStatus();
    return NextResponse.json(status, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to load Fiji weather" }, { status: 503 });
  }
}
