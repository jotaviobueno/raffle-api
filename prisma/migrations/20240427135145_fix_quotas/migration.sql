/*
  Warnings:

  - You are about to drop the column `is_active` on the `quotas` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `quotas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quotas" DROP COLUMN "is_active",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "quotas" ADD CONSTRAINT "quotas_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
