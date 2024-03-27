/*
  Warnings:

  - Added the required column `seller_id` to the `attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attribute" ADD COLUMN     "seller_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "attribute" ADD CONSTRAINT "attribute_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
