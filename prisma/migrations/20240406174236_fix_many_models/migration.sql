/*
  Warnings:

  - You are about to drop the column `image` on the `seller` table. All the data in the column will be lost.
  - Added the required column `seller_id` to the `award` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "award" ADD COLUMN     "seller_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "image",
ALTER COLUMN "favicon" DROP DEFAULT,
ALTER COLUMN "logo" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "award" ADD CONSTRAINT "award_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
