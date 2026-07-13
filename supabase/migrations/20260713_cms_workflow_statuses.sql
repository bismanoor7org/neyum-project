-- Additive workflow statuses for ContentStatus enum (Prisma / Postgres)
DO $$ BEGIN
  ALTER TYPE "ContentStatus" ADD VALUE IF NOT EXISTS 'PENDING_REVIEW';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TYPE "ContentStatus" ADD VALUE IF NOT EXISTS 'NEEDS_CHANGES';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TYPE "ContentStatus" ADD VALUE IF NOT EXISTS 'APPROVED';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
