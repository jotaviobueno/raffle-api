/*
  Warnings:

  - You are about to drop the column `seller_id` on the `winner` table. All the data in the column will be lost.
  - Added the required column `number` to the `winner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raffle_id` to the `winner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "winner" DROP CONSTRAINT "winner_seller_id_fkey";

-- AlterTable
ALTER TABLE "winner" DROP COLUMN "seller_id",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "raffle_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "winner" ADD CONSTRAINT "winner_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
