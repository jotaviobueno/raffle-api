/*
  Warnings:

  - You are about to drop the column `pack_id` on the `quotas` table. All the data in the column will be lost.
  - You are about to drop the `pack` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[quotas_id]` on the table `order_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quotas_id` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `quotas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pack" DROP CONSTRAINT "pack_raffle_id_fkey";

-- DropForeignKey
ALTER TABLE "pack" DROP CONSTRAINT "pack_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "quotas" DROP CONSTRAINT "quotas_pack_id_fkey";

-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "quotas_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "quotas" DROP COLUMN "pack_id",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "pack";

-- CreateIndex
CREATE UNIQUE INDEX "order_item_quotas_id_key" ON "order_item"("quotas_id");

-- AddForeignKey
ALTER TABLE "quotas" ADD CONSTRAINT "quotas_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_quotas_id_fkey" FOREIGN KEY ("quotas_id") REFERENCES "quotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
