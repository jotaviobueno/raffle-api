/*
  Warnings:

  - You are about to drop the column `invoice_prefix` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "invoice_prefix";
