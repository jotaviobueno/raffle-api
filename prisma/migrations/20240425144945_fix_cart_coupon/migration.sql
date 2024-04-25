/*
  Warnings:

  - A unique constraint covering the columns `[cart_id]` on the table `cart_coupon` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "discount" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "cart_coupon_cart_id_key" ON "cart_coupon"("cart_id");
