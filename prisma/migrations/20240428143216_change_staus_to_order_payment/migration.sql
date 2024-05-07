/*
  Warnings:

  - You are about to drop the column `status` on the `order_credit_card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_credit_card" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "order_payment" ADD COLUMN     "status" TEXT;
