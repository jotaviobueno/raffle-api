/*
  Warnings:

  - Made the column `digits` on table `raffle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `final` on table `raffle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `initial` on table `raffle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_numbers` on table `raffle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "raffle" ALTER COLUMN "digits" SET NOT NULL,
ALTER COLUMN "final" SET NOT NULL,
ALTER COLUMN "initial" SET NOT NULL,
ALTER COLUMN "total_numbers" SET NOT NULL;
