/*
  Warnings:

  - You are about to drop the column `full_name` on the `order_customer` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_customer" DROP COLUMN "full_name",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "full_name",
ADD COLUMN     "name" TEXT;
