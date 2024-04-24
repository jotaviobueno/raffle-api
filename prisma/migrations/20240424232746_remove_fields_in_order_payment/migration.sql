/*
  Warnings:

  - You are about to drop the column `payment_method_code` on the `order_payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method_name` on the `order_payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_payment" DROP COLUMN "payment_method_code",
DROP COLUMN "payment_method_name";
