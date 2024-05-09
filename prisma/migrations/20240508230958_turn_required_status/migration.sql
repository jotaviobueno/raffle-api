/*
  Warnings:

  - Made the column `status` on table `order_history` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order_history" ALTER COLUMN "status" SET NOT NULL;
