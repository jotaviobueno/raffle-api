/*
  Warnings:

  - You are about to drop the column `meta_description` on the `raffle` table. All the data in the column will be lost.
  - You are about to drop the column `meta_title` on the `raffle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "meta_description",
DROP COLUMN "meta_title";
