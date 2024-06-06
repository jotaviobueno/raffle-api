/*
  Warnings:

  - You are about to drop the column `parent_id` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `primary` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `quaternary` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `quinary` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `secondary` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `senary` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `tertiary` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the `page` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `theme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "page" DROP CONSTRAINT "page_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "page" DROP CONSTRAINT "page_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "theme" DROP CONSTRAINT "theme_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "theme" DROP CONSTRAINT "theme_seller_id_fkey";

-- DropIndex
DROP INDEX "theme_parent_id_key";

-- DropIndex
DROP INDEX "theme_seller_id_key";

-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "theme_id" TEXT;

-- AlterTable
ALTER TABLE "theme" DROP COLUMN "parent_id",
DROP COLUMN "primary",
DROP COLUMN "quaternary",
DROP COLUMN "quinary",
DROP COLUMN "secondary",
DROP COLUMN "seller_id",
DROP COLUMN "senary",
DROP COLUMN "tertiary",
ADD COLUMN     "code" TEXT NOT NULL;

-- DropTable
DROP TABLE "page";

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
