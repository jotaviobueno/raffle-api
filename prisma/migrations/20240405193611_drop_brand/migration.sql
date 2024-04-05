/*
  Warnings:

  - You are about to drop the column `favicon_url` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `logo_url` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "brand" DROP CONSTRAINT "brand_seller_id_fkey";

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "favicon_url",
DROP COLUMN "image_url",
DROP COLUMN "logo_url",
ADD COLUMN     "favicon" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "logo" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "brand";
