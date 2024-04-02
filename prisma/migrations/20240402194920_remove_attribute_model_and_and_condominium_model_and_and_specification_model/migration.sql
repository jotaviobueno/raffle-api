/*
  Warnings:

  - You are about to drop the column `condominium_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `condominium_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `condominium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specification_attribute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_condominium_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute" DROP CONSTRAINT "attribute_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "condominium" DROP CONSTRAINT "condominium_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_condominium_id_fkey";

-- DropForeignKey
ALTER TABLE "specification" DROP CONSTRAINT "specification_product_id_fkey";

-- DropForeignKey
ALTER TABLE "specification_attribute" DROP CONSTRAINT "specification_attribute_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "specification_attribute" DROP CONSTRAINT "specification_attribute_specification_id_fkey";

-- DropIndex
DROP INDEX "address_condominium_id_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "condominium_id";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "condominium_id";

-- DropTable
DROP TABLE "attribute";

-- DropTable
DROP TABLE "condominium";

-- DropTable
DROP TABLE "specification";

-- DropTable
DROP TABLE "specification_attribute";
