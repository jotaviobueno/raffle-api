-- AlterTable
ALTER TABLE "cart_total" ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "discount_manual" SET DEFAULT 0,
ALTER COLUMN "shipping" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "order_total" ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "discount_manual" SET DEFAULT 0,
ALTER COLUMN "shipping" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "payment_method" ADD COLUMN     "fee" DOUBLE PRECISION;