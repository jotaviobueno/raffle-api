/*
  Warnings:

  - You are about to drop the column `status` on the `order_history` table. All the data in the column will be lost.
  - Added the required column `code` to the `order_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `ticket_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `ticket_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_history" DROP COLUMN "status",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ticket_history" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ticket_status" ADD COLUMN     "code" TEXT NOT NULL;
