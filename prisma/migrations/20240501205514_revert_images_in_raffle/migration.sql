/*
  Warnings:

  - You are about to drop the column `image` on the `raffle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
