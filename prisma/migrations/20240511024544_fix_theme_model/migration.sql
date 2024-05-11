/*
  Warnings:

  - You are about to drop the column `destructive` on the `theme` table. All the data in the column will be lost.
  - Made the column `text` on table `theme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "theme" DROP COLUMN "destructive",
ADD COLUMN     "background" TEXT,
ADD COLUMN     "foreground" TEXT,
ALTER COLUMN "text" SET NOT NULL;
