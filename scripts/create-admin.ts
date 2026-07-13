/**
 * Create or reset a database-backed admin account.
 *
 * Usage:
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='StrongPass123!' npm run admin:create
 *
 * Or:
 *   npm run admin:create -- you@example.com 'StrongPass123!'
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? process.argv[2])?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD ?? process.argv[3];

  if (!email || !password) {
    console.error(
      "Usage: ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run admin:create\n" +
        "   or: npm run admin:create -- email@example.com 'YourPassword'",
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      firstName: "Platform",
      lastName: "Admin",
      role: "ADMIN",
      status: "ACTIVE",
      passwordHash,
      twoFactorEnabled: false,
      twoFactorSecret: null,
    },
    update: {
      role: "ADMIN",
      status: "ACTIVE",
      passwordHash,
      twoFactorEnabled: false,
      twoFactorSecret: null,
    },
  });

  await prisma.adminStaffProfile.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      staffRole: "SUPER_ADMIN",
    },
    update: {
      staffRole: "SUPER_ADMIN",
    },
  });

  console.log("\n✓ Admin account ready\n");
  console.log(`  User ID : ${user.id}`);
  console.log(`  Email   : ${email}`);
  console.log("\nAdd to .env.local:");
  console.log(`  ADMIN_SESSION_SECRET="<random-32+-char-string>"`);
  console.log(`  DATABASE_URL="postgresql://..."`);
  console.log("\nSign in at /admin/login with your email and password.\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
