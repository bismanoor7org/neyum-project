import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { mediaBulkSchema, mediaUpdateSchema } from "@/lib/validations/cms";
import {
  listMediaAssets,
  listMediaFolders,
  getMediaStorageStats,
  findMediaUsage,
  createMediaAsset,
  updateMediaAsset,
  deleteMediaAsset,
  bulkMediaAction,
} from "@/server/services/cms-data.service";
import {
  uploadToCloudinary,
  replaceCloudinaryAsset,
  buildCloudinaryDeliveryUrl,
  isCloudinaryConfigured,
  deleteFromCloudinary,
} from "@/server/lib/cloudinary";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const params = parseCmsListParams(url);
  const folder = url.searchParams.get("folder") ?? undefined;
  const favoritesOnly = url.searchParams.get("favorites") === "1";
  const sort = (url.searchParams.get("sort") as "newest" | "oldest" | "name" | "size" | null) ?? "newest";
  const view = url.searchParams.get("view");

  if (view === "folders") {
    return jsonOk({ folders: await listMediaFolders() });
  }
  if (view === "stats") {
    return jsonOk(await getMediaStorageStats());
  }
  if (view === "usage") {
    const id = url.searchParams.get("id");
    if (!id) return Response.json({ ok: false, error: "id required" }, { status: 400 });
    const asset = isDatabaseConfigured()
      ? await prisma.mediaAsset.findUnique({ where: { id } })
      : null;
    if (!asset) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    const usages = await findMediaUsage(asset.secureUrl, asset.publicId);
    return jsonOk({ usages });
  }
  if (view === "transform") {
    const id = url.searchParams.get("id");
    if (!id) return Response.json({ ok: false, error: "id required" }, { status: 400 });
    const asset = isDatabaseConfigured()
      ? await prisma.mediaAsset.findUnique({ where: { id } })
      : null;
    if (!asset) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    const width = Number(url.searchParams.get("w") || 0) || undefined;
    const height = Number(url.searchParams.get("h") || 0) || undefined;
    const crop = (url.searchParams.get("crop") as "fill" | "fit" | "scale" | "thumb" | "limit") || "fill";
    const format = (url.searchParams.get("format") as "webp" | "avif" | "auto") || "auto";
    const angle = Number(url.searchParams.get("angle") || 0) || undefined;
    const flip = (url.searchParams.get("flip") as "h" | "v" | null) || undefined;
    const urlOut = buildCloudinaryDeliveryUrl(asset.publicId, {
      width,
      height,
      crop,
      format,
      angle,
      flip,
      quality: "auto",
    });
    return jsonOk({
      url: urlOut,
      webp: buildCloudinaryDeliveryUrl(asset.publicId, { width, height, crop, format: "webp", quality: "auto" }),
      avif: buildCloudinaryDeliveryUrl(asset.publicId, { width, height, crop, format: "avif", quality: "auto" }),
      thumb: buildCloudinaryDeliveryUrl(asset.publicId, {
        width: 320,
        height: 320,
        crop: "thumb",
        format: "auto",
        quality: "auto",
      }),
    });
  }

  const result = await listMediaAssets({
    ...params,
    folder: folder ?? undefined,
    favoritesOnly,
    sort,
  });
  const [folders, stats] = await Promise.all([listMediaFolders(), getMediaStorageStats()]);
  return jsonOk({
    ...result,
    folders,
    stats,
    cloudinaryConfigured: isCloudinaryConfigured(),
  });
}, "cms:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ ok: false, error: "id required" }, { status: 400 });
  }
  const body = mediaUpdateSchema.parse(await request.json());
  const asset = await updateMediaAsset(id, body);
  await withActivity(auth, "cms.media.updated", "CONTENT", id);
  return jsonOk(asset);
}, "cms:media");

export const DELETE = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ ok: false, error: "id required" }, { status: 400 });
  }
  if (isDatabaseConfigured()) {
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (asset) {
      try {
        await deleteFromCloudinary(asset.publicId);
      } catch {
        // continue deleting DB row even if CDN delete fails
      }
    }
  }
  await deleteMediaAsset(id);
  await withActivity(auth, "cms.media.deleted", "CONTENT", id);
  return jsonOk({ deleted: true });
}, "cms:media");

export const POST = apiHandler(async ({ request, auth }) => {
  const contentType = request.headers.get("content-type") || "";

  // JSON bulk actions
  if (contentType.includes("application/json")) {
    const body = mediaBulkSchema.parse(await request.json());
    const result = await bulkMediaAction(body);
    await withActivity(auth, `cms.media.bulk.${body.action}`, "CONTENT");
    return jsonOk(result);
  }

  if (!isCloudinaryConfigured()) {
    return Response.json(
      { ok: false, error: "Cloudinary not configured", code: "CLOUDINARY_MISSING" },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const replaceId = (form.get("replaceId") as string | null) ?? null;
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ ok: false, error: "file required" }, { status: 400 });
  }

  const folder = (form.get("folder") as string | null) ?? "mft";
  const altText = (form.get("altText") as string | null) ?? null;
  const caption = (form.get("caption") as string | null) ?? null;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (replaceId && isDatabaseConfigured()) {
    const existing = await prisma.mediaAsset.findUnique({ where: { id: replaceId } });
    if (!existing) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    const uploaded = await replaceCloudinaryAsset(existing.publicId, buffer);
    const asset = await updateMediaAsset(replaceId, {
      url: uploaded.url,
      secureUrl: uploaded.secure_url,
      format: uploaded.format,
      width: uploaded.width,
      height: uploaded.height,
      bytes: uploaded.bytes,
      altText: altText ?? existing.altText,
      caption: caption ?? existing.caption,
    });
    await withActivity(auth, "cms.media.replaced", "CONTENT", replaceId);
    return jsonOk(asset);
  }

  const uploaded = await uploadToCloudinary(buffer, { folder });
  const asset = await createMediaAsset({
    cloudinaryId: uploaded.asset_id ?? uploaded.public_id,
    publicId: uploaded.public_id,
    url: uploaded.url,
    secureUrl: uploaded.secure_url,
    format: uploaded.format,
    resourceType: uploaded.resource_type,
    width: uploaded.width,
    height: uploaded.height,
    bytes: uploaded.bytes,
    folder,
    altText,
    caption,
    uploadedById: auth.user.id,
  });

  await withActivity(auth, "cms.media.uploaded", "CONTENT", asset.id);
  return jsonCreated(asset);
}, "cms:media");
