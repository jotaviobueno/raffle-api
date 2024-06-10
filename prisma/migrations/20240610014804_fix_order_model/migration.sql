/*
  Warnings:

  - The values [PJ,E] on the enum `USER_TYPE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `due_date` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_number` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `bank_slip_url` on the `order_bank_slip` table. All the data in the column will be lost.
  - You are about to drop the column `expiration_at` on the `order_bank_slip` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_url` on the `order_payment` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "USER_TYPE_new" AS ENUM ('PF', 'MEI', 'LIMITED', 'INDIVIDUAL', 'ASSOCIATION');
ALTER TABLE "user" ALTER COLUMN "type" TYPE "USER_TYPE_new" USING ("type"::text::"USER_TYPE_new");
ALTER TYPE "USER_TYPE" RENAME TO "USER_TYPE_old";
ALTER TYPE "USER_TYPE_new" RENAME TO "USER_TYPE";
DROP TYPE "USER_TYPE_old";
COMMIT;

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
ALTER TABLE "file" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

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
ALTER TABLE "order" DROP COLUMN "due_date",
DROP COLUMN "invoice_number",
ADD COLUMN     "external_reference" TEXT,
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_bank_slip" DROP COLUMN "bank_slip_url",
DROP COLUMN "expiration_at",
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_coupon" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_credit_card" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_customer" ADD COLUMN     "income_value" TEXT,
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_history" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "order_payment" DROP COLUMN "invoice_url",
ADD COLUMN     "payment_link" TEXT,
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

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
ALTER TABLE "user" ADD COLUMN     "income_value" TEXT,
ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "deleted_at" SET DEFAULT NULL,
ALTER COLUMN "expires_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "utm_campaign" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "utm_source" ALTER COLUMN "deleted_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "winner" ALTER COLUMN "deleted_at" SET DEFAULT NULL;
