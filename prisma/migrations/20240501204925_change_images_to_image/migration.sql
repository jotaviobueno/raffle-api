/*
  Warnings:

  - You are about to drop the column `images` on the `raffle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "images",
ADD COLUMN     "image" TEXT;
