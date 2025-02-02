-- AlterTable
ALTER TABLE "PostureRecord" ALTER COLUMN "startTime" SET DEFAULT now() - interval '1 hour';
