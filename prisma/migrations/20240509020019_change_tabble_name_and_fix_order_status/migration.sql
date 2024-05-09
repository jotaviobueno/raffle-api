/*
  Warnings:

  - You are about to drop the column `ticketStatusId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `color` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ticket_status_id` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "color" DROP CONSTRAINT "color_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "color" DROP CONSTRAINT "color_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_ticketStatusId_fkey";

-- AlterTable
ALTER TABLE "order_status" ADD COLUMN     "code" TEXT;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "ticketStatusId",
ADD COLUMN     "ticket_status_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "color";

-- CreateTable
CREATE TABLE "theme" (
    "id" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "font" TEXT,
    "seller_id" TEXT,
    "parent_id" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "theme_seller_id_key" ON "theme"("seller_id");

-- CreateIndex
CREATE UNIQUE INDEX "theme_parent_id_key" ON "theme"("parent_id");

-- AddForeignKey
ALTER TABLE "theme" ADD CONSTRAINT "theme_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "theme" ADD CONSTRAINT "theme_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_ticket_status_id_fkey" FOREIGN KEY ("ticket_status_id") REFERENCES "ticket_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
