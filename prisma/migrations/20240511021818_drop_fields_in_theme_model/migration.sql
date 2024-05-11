/*
  Warnings:

  - You are about to drop the column `background` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `card` on the `theme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "theme" DROP COLUMN "background",
DROP COLUMN "card",
ADD COLUMN     "text" TEXT;
