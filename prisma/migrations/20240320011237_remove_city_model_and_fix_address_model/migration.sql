/*
  Warnings:

  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_city_id_fkey";

-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_state_id_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "reference" TEXT;

-- DropTable
DROP TABLE "city";
