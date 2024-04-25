/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `coupon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coupon_code_key" ON "coupon"("code");
