/*
  Warnings:

  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seller_customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seller_supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_customer" DROP CONSTRAINT "seller_customer_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_customer" DROP CONSTRAINT "seller_customer_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_supplier" DROP CONSTRAINT "seller_supplier_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "seller_supplier" DROP CONSTRAINT "seller_supplier_supplier_id_fkey";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "seller_customer";

-- DropTable
DROP TABLE "seller_supplier";

-- CreateTable
CREATE TABLE "brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "seller_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "brand" ADD CONSTRAINT "brand_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
