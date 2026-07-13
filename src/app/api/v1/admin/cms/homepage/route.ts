import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import {
  homepageSectionSchema,
  bannerSchema,
} from "@/lib/validations/cms";
import {
  listHomepageSections,
  listBanners,
  upsertHomepageSection,
  createBanner,
  updateBanner,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const params = parseCmsListParams(new URL(request.url));
  const type = new URL(request.url).searchParams.get("type") ?? "sections";

  if (type === "banners") {
    const result = await listBanners(params);
    return jsonOk(result);
  }

  const result = await listHomepageSections(params);
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const type = new URL(request.url).searchParams.get("type") ?? "sections";
  const body = await request.json();

  if (type === "banners") {
    const data = bannerSchema.parse(body);
    const banner = await createBanner({
      ...data,
      startsAt: data.startsAt ? new Date(data.startsAt) : null,
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
    });
    await withActivity(auth, "cms.banner.created", "CONTENT", banner.id);
    return jsonCreated(banner);
  }

  const data = homepageSectionSchema.parse(body);
  const section = await upsertHomepageSection(null, data);
  if (!section) {
    return Response.json({ ok: false, error: "Failed to create section" }, { status: 500 });
  }
  await withActivity(auth, "cms.homepage_section.created", "CONTENT", section.id);
  return jsonCreated(section);
}, "cms:write");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const type = url.searchParams.get("type") ?? "sections";
  if (!id) {
    return Response.json({ ok: false, error: "id required" }, { status: 400 });
  }

  const body = await request.json();

  if (type === "banners") {
    const data = bannerSchema.partial().parse(body);
    const banner = await updateBanner(id, {
      ...data,
      startsAt: data.startsAt ? new Date(data.startsAt) : undefined,
      endsAt: data.endsAt ? new Date(data.endsAt) : undefined,
    });
    await withActivity(auth, "cms.banner.updated", "CONTENT", id);
    return jsonOk(banner);
  }

  const data = homepageSectionSchema.partial().parse(body);
  const section = await upsertHomepageSection(id, {
    key: data.key ?? "",
    title: data.title ?? "",
    content: data.content ?? {},
    status: data.status ?? "DRAFT",
    sortOrder: data.sortOrder,
  });
  if (!section) {
    return Response.json({ ok: false, error: "Section not found" }, { status: 404 });
  }
  await withActivity(auth, "cms.homepage_section.updated", "CONTENT", id);
  return jsonOk(section);
}, "cms:write");
