/*
  Warnings:

  - Made the column `image` on table `raffle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "raffle" ALTER COLUMN "image" SET NOT NULL;
