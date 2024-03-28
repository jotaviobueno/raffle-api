/*
  Warnings:

  - A unique constraint covering the columns `[condominium_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "condominium_id" TEXT,
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "address_condominium_id_key" ON "address"("condominium_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "condominium"("id") ON DELETE SET NULL ON UPDATE CASCADE;
