/*
  Warnings:

  - You are about to drop the column `cpf` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "cpf",
ADD COLUMN     "document" TEXT;
