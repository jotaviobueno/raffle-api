/*
  Warnings:

  - You are about to drop the `raffle_file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "raffle_file" DROP CONSTRAINT "raffle_file_file_id_fkey";

-- DropForeignKey
ALTER TABLE "raffle_file" DROP CONSTRAINT "raffle_file_raffle_id_fkey";

-- AlterTable
ALTER TABLE "raffle" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "raffle_file";
