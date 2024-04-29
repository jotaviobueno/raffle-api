/*
  Warnings:

  - You are about to drop the column `free_percentage` on the `raffle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "free_percentage",
ADD COLUMN     "progress_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0;
