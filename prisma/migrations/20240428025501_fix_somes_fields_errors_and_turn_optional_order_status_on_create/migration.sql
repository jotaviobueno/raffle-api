/*
  Warnings:

  - You are about to drop the column `dueDate` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `order_payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `order_payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `order_payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_order_status_id_fkey";

-- DropForeignKey
ALTER TABLE "order_payment" DROP CONSTRAINT "order_payment_orderId_fkey";

-- DropIndex
DROP INDEX "order_payment_orderId_key";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "dueDate",
ADD COLUMN     "due_date" TIMESTAMP,
ALTER COLUMN "order_status_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_payment" DROP COLUMN "orderId",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_order_id_key" ON "order_payment"("order_id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_order_status_id_fkey" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
