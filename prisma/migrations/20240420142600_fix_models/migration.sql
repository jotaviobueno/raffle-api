/*
  Warnings:

  - You are about to drop the `pix` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payment_method_id` to the `order_payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pix" DROP CONSTRAINT "pix_payment_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "dueDate" TIMESTAMP;

-- AlterTable
ALTER TABLE "order_payment" ADD COLUMN     "payment_method_code" TEXT,
ADD COLUMN     "payment_method_id" TEXT NOT NULL,
ADD COLUMN     "payment_method_name" TEXT;

-- DropTable
DROP TABLE "pix";

-- CreateTable
CREATE TABLE "payment_method_seller" (
    "id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "payment_method_seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_method" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "payment_gateway_config_id" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_gateway_config" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "payment_gateway_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_pix" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "copy_paste" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "expirat_at" TIMESTAMP NOT NULL,

    CONSTRAINT "order_pix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_pix_payment_id_key" ON "order_pix"("payment_id");

-- AddForeignKey
ALTER TABLE "payment_method_seller" ADD CONSTRAINT "payment_method_seller_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_method_seller" ADD CONSTRAINT "payment_method_seller_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_method" ADD CONSTRAINT "payment_method_payment_gateway_config_id_fkey" FOREIGN KEY ("payment_gateway_config_id") REFERENCES "payment_gateway_config"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_pix" ADD CONSTRAINT "order_pix_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "order_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
