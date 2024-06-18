/*
  Warnings:

  - You are about to drop the column `fee` on the `cart_total` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `cart_total` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `finance_total` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `finance_total` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `order_total` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `order_total` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `payment_method` table. All the data in the column will be lost.
  - You are about to drop the column `fee_percentage` on the `payment_method` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "audit" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "award" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_item" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_payment" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_total" DROP COLUMN "fee",
DROP COLUMN "tax",
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "country" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "customer_seller" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "file" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "finance" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "finance_total" DROP COLUMN "fee",
DROP COLUMN "tax",
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "gateway" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "gateway_config" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "gateway_event" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_bank_slip" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_credit_card" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_customer" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_history" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_payment" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_pix" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_status" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_total" DROP COLUMN "fee",
DROP COLUMN "tax",
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "payment_method" DROP COLUMN "fee",
DROP COLUMN "fee_percentage",
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "permission" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "plan" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "plan_cycle" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "quotas" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "raffle" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "raffle_category" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "raffle_coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "role" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "role_permission" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "role_plan" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "seller" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "social_midia" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "state" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "theme" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "ticket" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "ticket_history" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "ticket_status" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "deleted_at" SET DEFAULT NULL,
ALTER COLUMN "expires_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "utm_campaign" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "utm_source" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "winner" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- CreateTable
CREATE TABLE "bank_account" (
    "id" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "accountDigit" TEXT NOT NULL,
    "gatewayId" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP DEFAULT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gateway_fee" (
    "id" UUID NOT NULL,
    "gateway_config_id" TEXT NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "fees" JSONB,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP DEFAULT NULL,

    CONSTRAINT "gateway_fee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gateway_fee_gateway_config_id_key" ON "gateway_fee"("gateway_config_id");

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_gatewayId_fkey" FOREIGN KEY ("gatewayId") REFERENCES "gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway_fee" ADD CONSTRAINT "gateway_fee_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway_fee" ADD CONSTRAINT "gateway_fee_gateway_config_id_fkey" FOREIGN KEY ("gateway_config_id") REFERENCES "gateway_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
