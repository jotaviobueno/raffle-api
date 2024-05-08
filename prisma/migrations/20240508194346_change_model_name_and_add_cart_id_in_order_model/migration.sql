/*
  Warnings:

  - You are about to drop the `CustomerSeller` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `total` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cart_id]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cart_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "total" DROP CONSTRAINT "total_finance_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "cart_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "CustomerSeller";

-- DropTable
DROP TABLE "total";

-- CreateTable
CREATE TABLE "customer_seller" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "customer_seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_total" (
    "id" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount_manual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "finance_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "finance_total_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "finance_total_finance_id_key" ON "finance_total"("finance_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_cart_id_key" ON "order"("cart_id");

-- AddForeignKey
ALTER TABLE "customer_seller" ADD CONSTRAINT "customer_seller_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_seller" ADD CONSTRAINT "customer_seller_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_total" ADD CONSTRAINT "finance_total_finance_id_fkey" FOREIGN KEY ("finance_id") REFERENCES "finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
