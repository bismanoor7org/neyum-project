import { NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { prisma } from "@/lib/db/prisma";

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string | null;
    last_name?: string | null;
    image_url?: string | null;
    public_metadata?: { role?: string };
  };
};

export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Clerk webhook not configured" }, { status: 503 });
  }

  const payload = await request.text();
  const webhook = new Webhook(secret);

  let body: ClerkWebhookEvent;
  try {
    body = webhook.verify(payload, {
      "svix-id": request.headers.get("svix-id") ?? "",
      "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
      "svix-signature": request.headers.get("svix-signature") ?? "",
    }) as ClerkWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const { type, data } = body;

  const email = data.email_addresses?.[0]?.email_address;
  if (!email) {
    return NextResponse.json({ error: "No email in payload" }, { status: 400 });
  }

  const roleMeta = data.public_metadata?.role?.toUpperCase();
  const role =
    roleMeta === "ADMIN" || roleMeta === "SUPPLIER" || roleMeta === "TRAVELER"
      ? roleMeta
      : "TRAVELER";

  switch (type) {
    case "user.created":
    case "user.updated":
      await prisma.user.upsert({
        where: { clerkId: data.id },
        create: {
          clerkId: data.id,
          email,
          firstName: data.first_name ?? "Traveler",
          lastName: data.last_name ?? "",
          avatar: data.image_url,
          role: role as "TRAVELER" | "SUPPLIER" | "ADMIN",
        },
        update: {
          email,
          firstName: data.first_name ?? undefined,
          lastName: data.last_name ?? undefined,
          avatar: data.image_url,
          role: role as "TRAVELER" | "SUPPLIER" | "ADMIN",
        },
      });
      break;

    case "user.deleted":
      await prisma.user.updateMany({
        where: { clerkId: data.id },
        data: { status: "INACTIVE" },
      });
      break;
  }

  return NextResponse.json({ received: true });
}
