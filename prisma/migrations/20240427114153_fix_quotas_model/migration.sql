/*
  Warnings:

  - You are about to drop the column `rg` on the `user` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `quotas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quotas" ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "rg";

-- AddForeignKey
ALTER TABLE "quotas" ADD CONSTRAINT "quotas_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
