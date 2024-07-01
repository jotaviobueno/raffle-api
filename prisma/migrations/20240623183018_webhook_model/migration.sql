/*
  Warnings:

  - You are about to drop the column `seller_id` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the `bank_account` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `file_id` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bank_account" DROP CONSTRAINT "bank_account_gatewayId_fkey";

-- DropForeignKey
ALTER TABLE "bank_account" DROP CONSTRAINT "bank_account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_seller_id_fkey";

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
ALTER TABLE "file" DROP COLUMN "seller_id",
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
ALTER TABLE "raffle" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "raffle_category" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "raffle_coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "raffle_file" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "role" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "role_permission" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "role_plan" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "logo",
ADD COLUMN     "file_id" TEXT NOT NULL,
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

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

-- DropTable
DROP TABLE "bank_account";

-- CreateTable
CREATE TABLE "webhook" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP DEFAULT NULL,

    CONSTRAINT "webhook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
