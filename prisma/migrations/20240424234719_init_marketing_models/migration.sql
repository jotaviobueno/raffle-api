/*
  Warnings:

  - You are about to drop the column `utm_campaing` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `utm_source` on the `coupon` table. All the data in the column will be lost.
  - Added the required column `utm_campaign_id` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "order_coupon_coupon_id_key";

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "utm_campaing",
DROP COLUMN "utm_source",
ADD COLUMN     "utm_campaign_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cart_coupon" (
    "id" TEXT NOT NULL,
    "coupon_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "cart_coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utm_campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "from" TIMESTAMP,
    "to" TIMESTAMP,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "utm_campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utm_source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "utm_source_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart_coupon" ADD CONSTRAINT "cart_coupon_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_coupon" ADD CONSTRAINT "cart_coupon_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_utm_campaign_id_fkey" FOREIGN KEY ("utm_campaign_id") REFERENCES "utm_campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
