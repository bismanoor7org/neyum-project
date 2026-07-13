import { generateSecret, generateSync, generateURI, verifySync } from "otplib";

const EPOCH_TOLERANCE = 1;

export function createTotpSecret(): string {
  return generateSecret();
}

export function currentTotpCode(secret: string): string {
  return generateSync({ secret });
}

export function verifyTotpCode(token: string, secret: string): boolean {
  return verifySync({ token, secret, epochTolerance: EPOCH_TOLERANCE }).valid;
}

export function totpProvisioningUri(email: string, secret: string): string {
  return generateURI({
    issuer: "My Fiji Tour Admin",
    label: email,
    secret,
  });
}
