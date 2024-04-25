/*
  Warnings:

  - Added the required column `seller_id` to the `utm_campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "utm_campaign" ADD COLUMN     "seller_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "utm_campaign" ADD CONSTRAINT "utm_campaign_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
