/*
  Warnings:

  - You are about to drop the column `city_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `neighboord` on the `address` table. All the data in the column will be lost.
  - You are about to drop the `user_address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `neighborhood` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_user_id_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "city_id",
DROP COLUMN "neighboord",
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "seller_id" TEXT,
ADD COLUMN     "user_id" TEXT;

-- DropTable
DROP TABLE "user_address";

-- CreateTable
CREATE TABLE "seller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "favicon_url" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
