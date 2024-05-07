/*
  Warnings:

  - You are about to drop the column `quotas_id` on the `order_item` table. All the data in the column will be lost.
  - Added the required column `seller_id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raffle_id` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_quotas_id_fkey";

-- DropIndex
DROP INDEX "order_item_quotas_id_key";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "seller_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "invoice_number" DROP NOT NULL,
ALTER COLUMN "invoice_prefix" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "quotas_id",
ADD COLUMN     "raffle_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
