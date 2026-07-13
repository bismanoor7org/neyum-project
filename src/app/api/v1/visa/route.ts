import { NextResponse } from "next/server";
import {
  getVisaRequirement as getStaticVisaRequirement,
  searchVisaCountries as searchStaticVisaCountries,
} from "@/data/visaRequirements";
import { visaSearchSchema } from "@/lib/validations/visa-intelligence";
import {
  getVisaRequirement,
  listVisaCountries,
  searchVisaIntelligence,
} from "@/server/services/visa-intelligence.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = visaSearchSchema.safeParse({ q: searchParams.get("q") ?? undefined });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const q = parsed.data.q;

    if (searchParams.get("mode") === "search" && q) {
      try {
        const result = await searchVisaIntelligence(q);
        return NextResponse.json({ data: result });
      } catch {
        const countries = searchStaticVisaCountries(q);
        return NextResponse.json({
          data: {
            countries,
            requirements: countries
              .map((c) => getStaticVisaRequirement(c.slug))
              .filter(Boolean)
              .map((req) => ({
                country: req!.country,
                visaType: req!.status,
                stayDuration: req!.allowedStay,
                processingTime: req!.processingTime,
              })),
          },
        });
      }
    }

    const slug = searchParams.get("slug");
    if (slug) {
      let requirement = null;
      try {
        requirement = await getVisaRequirement(slug);
      } catch {
        requirement = getStaticVisaRequirement(slug);
      }
      if (!requirement) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ data: requirement });
    }

    let countries;
    try {
      countries = await listVisaCountries(q);
    } catch {
      countries = searchStaticVisaCountries(q ?? "");
    }
    if (!countries.length) {
      countries = searchStaticVisaCountries(q ?? "");
    }
    return NextResponse.json({ data: { countries } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Visa lookup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
