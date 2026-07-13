import { v2 as cloudinary } from "cloudinary";

let configured = false;

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  );
}

export function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.");
  }
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }
  return cloudinary;
}

export type CloudinaryUploadResult = {
  public_id: string;
  asset_id?: string;
  secure_url: string;
  url: string;
  format: string;
  resource_type: string;
  width: number;
  height: number;
  bytes: number;
  folder?: string;
};

export async function uploadToCloudinary(
  file: Buffer,
  options: { folder?: string; publicId?: string; tags?: string[] } = {},
): Promise<CloudinaryUploadResult> {
  const cld = getCloudinary();
  return new Promise((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder: options.folder ?? "mft",
        public_id: options.publicId,
        tags: options.tags,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve(result as unknown as CloudinaryUploadResult);
      },
    );
    stream.end(file);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const cld = getCloudinary();
  await cld.uploader.destroy(publicId);
}

/** Build a CDN delivery URL with optional transforms (crop/resize/format). */
export function buildCloudinaryDeliveryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
    gravity?: string;
    angle?: number;
    flip?: "h" | "v";
    format?: "webp" | "avif" | "jpg" | "png" | "auto";
    quality?: "auto" | number;
  } = {},
): string {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) return "";
  const parts: string[] = [];
  if (options.width) parts.push(`w_${options.width}`);
  if (options.height) parts.push(`h_${options.height}`);
  if (options.crop) parts.push(`c_${options.crop}`);
  if (options.gravity) parts.push(`g_${options.gravity}`);
  if (options.angle) parts.push(`a_${options.angle}`);
  if (options.flip === "h") parts.push("a_hflip");
  if (options.flip === "v") parts.push("a_vflip");
  if (options.quality) parts.push(`q_${options.quality}`);
  if (options.format) parts.push(`f_${options.format}`);
  const transform = parts.length ? `${parts.join(",")}/` : "";
  return `https://res.cloudinary.com/${cloud}/image/upload/${transform}${publicId}`;
}

export async function replaceCloudinaryAsset(
  publicId: string,
  file: Buffer,
): Promise<CloudinaryUploadResult> {
  const cld = getCloudinary();
  return new Promise((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary replace failed"));
          return;
        }
        resolve(result as unknown as CloudinaryUploadResult);
      },
    );
    stream.end(file);
  });
}
