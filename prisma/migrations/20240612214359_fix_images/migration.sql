/*
  Warnings:

  - You are about to drop the column `raffle_id` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `raffle` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `raffle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_raffle_id_fkey";

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "audit" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "award" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "bank_account" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_item" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_payment" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "cart_total" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "country" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "customer_seller" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "file" DROP COLUMN "raffle_id",
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "finance" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "finance_total" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "gateway" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "gateway_config" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "gateway_event" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "gateway_fee" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

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
ALTER TABLE "order_total" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "payment_method" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "permission" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "plan" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "plan_cycle" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "quotas" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "images",
DROP COLUMN "tax",
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

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
CREATE TABLE "raffle_file" (
    "id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "raffle_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP DEFAULT NULL,

    CONSTRAINT "raffle_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "raffle_file" ADD CONSTRAINT "raffle_file_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raffle_file" ADD CONSTRAINT "raffle_file_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
