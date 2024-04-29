/*
  Warnings:

  - Made the column `fee` on table `payment_method` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payment_method" ADD COLUMN     "fee_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "fee" SET NOT NULL,
ALTER COLUMN "fee" SET DEFAULT 0;
