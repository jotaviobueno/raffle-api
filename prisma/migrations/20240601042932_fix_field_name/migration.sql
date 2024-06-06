/*
  Warnings:

  - You are about to drop the column `quantity` on the `raffle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "quantity",
ADD COLUMN     "packages" TEXT[] DEFAULT ARRAY['5', '10', '50', '100']::TEXT[];
