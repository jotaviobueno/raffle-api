/*
  Warnings:

  - Made the column `mobile_phone` on table `order_customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `order_customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order_customer" ALTER COLUMN "mobile_phone" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
