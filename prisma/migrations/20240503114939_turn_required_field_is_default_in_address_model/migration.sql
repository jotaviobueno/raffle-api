/*
  Warnings:

  - Made the column `is_default` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "is_default" SET NOT NULL;
