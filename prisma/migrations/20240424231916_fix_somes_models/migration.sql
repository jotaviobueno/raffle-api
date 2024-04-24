/*
  Warnings:

  - You are about to drop the column `payment_method_code` on the `cart_payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method_name` on the `cart_payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart_payment" DROP COLUMN "payment_method_code",
DROP COLUMN "payment_method_name";
