/*
  Warnings:

  - You are about to drop the column `customer_id` on the `quotas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quotas" DROP CONSTRAINT "quotas_customer_id_fkey";

-- AlterTable
ALTER TABLE "quotas" DROP COLUMN "customer_id";
