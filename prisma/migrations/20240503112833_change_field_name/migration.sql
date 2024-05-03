/*
  Warnings:

  - You are about to drop the column `mobile_number` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "mobile_number",
ADD COLUMN     "mobile_phone" TEXT;
