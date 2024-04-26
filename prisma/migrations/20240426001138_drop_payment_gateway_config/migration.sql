/*
  Warnings:

  - You are about to drop the column `payment_gateway_config_id` on the `payment_method` table. All the data in the column will be lost.
  - You are about to drop the `payment_gateway_config` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment_method" DROP CONSTRAINT "payment_method_payment_gateway_config_id_fkey";

-- AlterTable
ALTER TABLE "payment_method" DROP COLUMN "payment_gateway_config_id";

-- DropTable
DROP TABLE "payment_gateway_config";
