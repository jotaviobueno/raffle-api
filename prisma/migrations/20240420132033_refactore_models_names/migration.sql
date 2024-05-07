/*
  Warnings:

  - You are about to drop the `credit_card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "credit_card" DROP CONSTRAINT "credit_card_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_address_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "pix" DROP CONSTRAINT "pix_payment_id_fkey";

-- DropTable
DROP TABLE "credit_card";

-- DropTable
DROP TABLE "payment";

-- CreateTable
CREATE TABLE "order_bank_slip" (
    "id" TEXT NOT NULL,
    "order_payment_id" TEXT NOT NULL,
    "our_number" TEXT NOT NULL,
    "identification_field" TEXT NOT NULL,
    "bar_code" TEXT NOT NULL,
    "bank_slip_url" TEXT NOT NULL,
    "expiration_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "order_bank_slip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "order_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_credit_card" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expiration_month" INTEGER NOT NULL,
    "expiration_year" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "order_payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "order_credit_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_bank_slip_order_payment_id_key" ON "order_bank_slip"("order_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_orderId_key" ON "order_payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_address_id_key" ON "order_payment"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_credit_card_order_payment_id_key" ON "order_credit_card"("order_payment_id");

-- AddForeignKey
ALTER TABLE "order_bank_slip" ADD CONSTRAINT "order_bank_slip_order_payment_id_fkey" FOREIGN KEY ("order_payment_id") REFERENCES "order_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_credit_card" ADD CONSTRAINT "order_credit_card_order_payment_id_fkey" FOREIGN KEY ("order_payment_id") REFERENCES "order_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pix" ADD CONSTRAINT "pix_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "order_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
