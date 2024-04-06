/*
  Warnings:

  - Added the required column `seller_id` to the `pack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pack" ADD COLUMN     "seller_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pack" ADD CONSTRAINT "pack_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
