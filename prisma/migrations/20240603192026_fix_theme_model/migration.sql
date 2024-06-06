/*
  Warnings:

  - Made the column `theme_id` on table `seller` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_theme_id_fkey";

-- AlterTable
ALTER TABLE "seller" ALTER COLUMN "theme_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
