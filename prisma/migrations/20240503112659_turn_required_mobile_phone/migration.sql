/*
  Warnings:

  - Made the column `mobile_number` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "mobile_number" SET NOT NULL;
