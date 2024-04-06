/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seller_id` to the `quotas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `draw_date_at` to the `raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_buy_quotas` to the `raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_buy_quotas` to the `raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_quotas` to the `raffle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_history" ADD COLUMN     "comment" TEXT;

-- AlterTable
ALTER TABLE "quotas" ADD COLUMN     "seller_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "raffle" ADD COLUMN     "draw_date_at" TIMESTAMP NOT NULL,
ADD COLUMN     "free_percentage" DOUBLE PRECISION NOT NULL DEFAULT 100,
ADD COLUMN     "max_buy_quotas" INTEGER NOT NULL,
ADD COLUMN     "min_buy_quotas" INTEGER NOT NULL,
ADD COLUMN     "payeds" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_quotas" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_address_id_key" ON "payment"("address_id");

-- AddForeignKey
ALTER TABLE "quotas" ADD CONSTRAINT "quotas_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
