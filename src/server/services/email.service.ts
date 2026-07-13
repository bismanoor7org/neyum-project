function appUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

function emailFrom(): string {
  return process.env.EMAIL_FROM ?? "Fiji Luxury <onboarding@resend.dev>";
}

function buildVerifyEmailHtml(name: string, verifyUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;">
    <tr><td style="background:#0a1628;padding:32px;text-align:center;">
      <p style="margin:0;color:#c9a227;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;">Fiji Luxury Experiences</p>
      <h1 style="margin:12px 0 0;color:#ffffff;font-size:24px;font-weight:normal;">Verify your email</h1>
    </td></tr>
    <tr><td style="padding:32px;color:#1a2744;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hello ${name},</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4a5568;">Please confirm your email address to access your account and start planning your Fiji journey.</p>
      <a href="${verifyUrl}" style="display:inline-block;background:#c9a227;color:#0a1628;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:600;">Verify Email</a>
      <p style="margin:24px 0 0;font-size:12px;color:#718096;line-height:1.5;">This link expires in 24 hours. If you did not create an account, you can safely ignore this email.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildResetPasswordHtml(name: string, resetUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;">
    <tr><td style="background:#0a1628;padding:32px;text-align:center;">
      <p style="margin:0;color:#c9a227;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;">Fiji Luxury Experiences</p>
      <h1 style="margin:12px 0 0;color:#ffffff;font-size:24px;font-weight:normal;">Reset your password</h1>
    </td></tr>
    <tr><td style="padding:32px;color:#1a2744;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hello ${name},</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4a5568;">We received a request to reset your password. Click the button below to choose a new one.</p>
      <a href="${resetUrl}" style="display:inline-block;background:#c9a227;color:#0a1628;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:600;">Reset Password</a>
      <p style="margin:24px 0 0;font-size:12px;color:#718096;line-height:1.5;">This link expires in 1 hour. If you did not request a reset, you can safely ignore this email.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendVerificationEmail(input: {
  to: string;
  name: string;
  token: string;
}): Promise<{ ok: boolean; devLink?: string }> {
  const verifyUrl = `${appUrl()}/verify-email?token=${encodeURIComponent(input.token)}`;

  if (!process.env.RESEND_API_KEY) {
    console.info("[email] RESEND_API_KEY not set — verification link:", verifyUrl);
    return { ok: true, devLink: verifyUrl };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: emailFrom(),
    to: input.to,
    subject: "Verify your Fiji Luxury account",
    html: buildVerifyEmailHtml(input.name, verifyUrl),
  });

  return { ok: true };
}

export async function sendPasswordResetEmail(input: {
  to: string;
  name: string;
  token: string;
}): Promise<{ ok: boolean; devLink?: string }> {
  const resetUrl = `${appUrl()}/reset-password?token=${encodeURIComponent(input.token)}`;

  if (!process.env.RESEND_API_KEY) {
    console.info("[email] RESEND_API_KEY not set — reset link:", resetUrl);
    return { ok: true, devLink: resetUrl };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: emailFrom(),
    to: input.to,
    subject: "Reset your Fiji Luxury password",
    html: buildResetPasswordHtml(input.name, resetUrl),
  });

  return { ok: true };
}
