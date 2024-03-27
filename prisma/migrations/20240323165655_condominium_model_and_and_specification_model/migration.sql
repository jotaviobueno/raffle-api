/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - Added the required column `lower_price` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "price",
ADD COLUMN     "condominium_id" TEXT,
ADD COLUMN     "lower_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "max_price" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "condominium" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "condominium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specification" (
    "id" TEXT NOT NULL,
    "building_area" TEXT NOT NULL,
    "total_area" TEXT NOT NULL,
    "is_furnished" BOOLEAN NOT NULL,
    "is_building" BOOLEAN NOT NULL,
    "building_context" TEXT,
    "is_accept_exchange" BOOLEAN NOT NULL,
    "exchange_context" TEXT,
    "attributes" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "locations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "specification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "condominium"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condominium" ADD CONSTRAINT "condominium_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specification" ADD CONSTRAINT "specification_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
