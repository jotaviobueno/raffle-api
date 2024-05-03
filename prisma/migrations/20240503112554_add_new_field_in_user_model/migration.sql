-- AlterTable
ALTER TABLE "user" ADD COLUMN     "mobile_number" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
