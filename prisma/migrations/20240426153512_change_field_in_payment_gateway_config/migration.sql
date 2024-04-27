/*
  Warnings:

  - You are about to drop the column `confg` on the `payment_gateway_config` table. All the data in the column will be lost.
  - Added the required column `config` to the `payment_gateway_config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_gateway_config" DROP COLUMN "confg",
ADD COLUMN     "config" JSONB NOT NULL;
