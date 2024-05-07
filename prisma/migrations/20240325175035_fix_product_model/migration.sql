/*
  Warnings:

  - You are about to drop the column `lower_price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `max_price` on the `product` table. All the data in the column will be lost.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "lower_price",
DROP COLUMN "max_price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
