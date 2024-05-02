/*
  Warnings:

  - You are about to drop the `PageColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_parent_id_fkey";

-- DropTable
DROP TABLE "PageColor";

-- DropTable
DROP TABLE "menu";

-- CreateTable
CREATE TABLE "color" (
    "id" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "secundary" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "color_seller_id_key" ON "color"("seller_id");

-- CreateIndex
CREATE UNIQUE INDEX "color_parent_id_key" ON "color"("parent_id");

-- AddForeignKey
ALTER TABLE "color" ADD CONSTRAINT "color_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "color" ADD CONSTRAINT "color_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
