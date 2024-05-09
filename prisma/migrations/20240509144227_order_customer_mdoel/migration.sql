/*
  Warnings:

  - You are about to drop the column `customer_id` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customer_id_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "customer_id";

-- CreateTable
CREATE TABLE "order_customer" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "order_customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_customer_order_id_key" ON "order_customer"("order_id");

-- AddForeignKey
ALTER TABLE "order_customer" ADD CONSTRAINT "order_customer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_customer" ADD CONSTRAINT "order_customer_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
