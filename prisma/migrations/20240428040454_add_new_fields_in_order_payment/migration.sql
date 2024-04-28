/*
  Warnings:

  - Added the required column `invoice_url` to the `order_payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_payment" ADD COLUMN     "invoice_url" TEXT NOT NULL,
ADD COLUMN     "receipt_url" TEXT;
