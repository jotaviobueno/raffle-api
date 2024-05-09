/*
  Warnings:

  - Made the column `code` on table `order_status` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order_status" ALTER COLUMN "code" SET NOT NULL;
