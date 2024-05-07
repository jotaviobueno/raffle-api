/*
  Warnings:

  - You are about to drop the column `address_id` on the `cart_payment` table. All the data in the column will be lost.
  - You are about to drop the column `secundary` on the `color` table. All the data in the column will be lost.
  - You are about to drop the column `address_id` on the `order_payment` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `state` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `secondary` to the `color` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_country_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_state_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_payment" DROP CONSTRAINT "cart_payment_address_id_fkey";

-- DropForeignKey
ALTER TABLE "order_payment" DROP CONSTRAINT "order_payment_address_id_fkey";

-- DropForeignKey
ALTER TABLE "state" DROP CONSTRAINT "state_country_id_fkey";

-- AlterTable
ALTER TABLE "cart_payment" DROP COLUMN "address_id";

-- AlterTable
ALTER TABLE "color" DROP COLUMN "secundary",
ADD COLUMN     "secondary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_payment" DROP COLUMN "address_id";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "country";

-- DropTable
DROP TABLE "state";

-- CreateTable
CREATE TABLE "CustomerSeller" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "CustomerSeller_pkey" PRIMARY KEY ("id")
);
