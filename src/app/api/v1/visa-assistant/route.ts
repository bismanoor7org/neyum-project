import { NextResponse } from "next/server";
import { z } from "zod";
import { executeVisaChat } from "@/lib/ai/visa-assistant/engine";
import {
  checkVisaAssistantRateLimit,
  clientIpFromRequest,
} from "@/lib/ai/visa-assistant/rate-limit";
import { buildVisaAssistantAnalysis } from "@/lib/ai/visa-assistant/analyze";

const intakeSchema = z.object({
  nationality: z.object({ iso2: z.string(), name: z.string(), slug: z.string() }),
  departureCountry: z.object({ iso2: z.string(), name: z.string(), slug: z.string() }),
  purpose: z.enum(["tourism", "business", "honeymoon", "family", "medical"]),
  duration: z.enum(["under_7_days", "one_to_two_weeks", "two_to_four_weeks", "one_to_three_months"]),
  travelDates: z.string().max(100).optional(),
  budget: z.enum(["economy", "premium", "luxury"]).optional(),
  travelerName: z.string().max(120).optional(),
});

const bodySchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("analyze"),
    intake: intakeSchema,
    checkedDocuments: z.array(z.string().max(64)).max(20).optional(),
  }),
  z.object({
    action: z.literal("chat"),
    message: z.string().min(1).max(500),
    nationalitySlug: z
      .string()
      .max(80)
      .regex(/^[a-z0-9-]+$/)
      .optional(),
    intake: intakeSchema.partial().optional(),
  }),
]);

export async function POST(request: Request) {
  try {
    const ip = clientIpFromRequest(request);
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const data = parsed.data;

    if (data.action === "chat") {
      const limit = checkVisaAssistantRateLimit(ip);
      if (!limit.allowed) {
        return NextResponse.json(
          {
            error: "Too many requests. Please wait before asking another question.",
            retryAfterSec: limit.retryAfterSec,
          },
          { status: 429, headers: { "Retry-After": String(limit.retryAfterSec ?? 60) } },
        );
      }

      const reply = await executeVisaChat({
        message: data.message,
        nationalitySlug: data.nationalitySlug,
        intake: data.intake,
      });

      return NextResponse.json(reply);
    }

    const limit = checkVisaAssistantRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const analysis = await buildVisaAssistantAnalysis(
      data.intake,
      (data.checkedDocuments ?? []) as import("@/types/visa").VisaDocumentId[],
    );
    if (!analysis) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }
    return NextResponse.json({ analysis });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Assistant unavailable";
    const status = message.includes("DATABASE_URL") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
