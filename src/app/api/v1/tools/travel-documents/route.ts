import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import {
  getTravelDocumentRequirementBySlug,
  listTravelDocumentRequirements,
} from "@/server/services/visa-intelligence.service";

const slugSchema = z.object({
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
});

const searchSchema = z.object({
  q: z.string().min(1).max(120).optional(),
});

const CACHE_SECONDS = 300;

const cachedBySlug = unstable_cache(
  async (slug: string) => getTravelDocumentRequirementBySlug(slug),
  ["travel-documents-by-slug"],
  { revalidate: CACHE_SECONDS },
);

const cachedList = unstable_cache(
  async (q?: string) => listTravelDocumentRequirements(q),
  ["travel-documents-list"],
  { revalidate: CACHE_SECONDS },
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const parsed = slugSchema.safeParse({ slug });
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid country slug" }, { status: 400 });
      }

      const data = await cachedBySlug(parsed.data.slug);
      if (!data) {
        return NextResponse.json({ error: "Travel documents not found" }, { status: 404 });
      }
      return NextResponse.json({ data });
    }

    const parsedSearch = searchSchema.safeParse({ q: searchParams.get("q") ?? undefined });
    if (!parsedSearch.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const rows = await cachedList(parsedSearch.data.q);
    const data = rows.map((row) => ({
      country: countryToPublic(row.nationality),
      passportValidity: row.passportValidity,
      returnTicketRequired: row.returnTicketRequired,
      hotelBookingRequired: row.hotelBookingRequired,
      proofOfFundsRequired: row.proofOfFundsRequired,
      insuranceRequired: row.insuranceRequired,
      passportPhotosRequired: row.passportPhotosRequired,
      bankStatementRequired: row.bankStatementRequired,
      additionalDocuments: Array.isArray(row.additionalDocuments)
        ? (row.additionalDocuments as string[])
        : [],
    }));

    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Travel document lookup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function countryToPublic(country: { name: string; code: string; slug: string }) {
  return { name: country.name, iso2: country.code, slug: country.slug };
}
