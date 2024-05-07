/*
  Warnings:

  - You are about to drop the column `seller_id` on the `quotas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quotas" DROP CONSTRAINT "quotas_seller_id_fkey";

-- AlterTable
ALTER TABLE "quotas" DROP COLUMN "seller_id";

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "query" JSONB,
    "old_value" JSONB,
    "new_value" JSONB,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);
