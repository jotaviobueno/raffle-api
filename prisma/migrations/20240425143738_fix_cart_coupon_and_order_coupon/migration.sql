-- AlterTable
ALTER TABLE "cart_coupon" ADD COLUMN     "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "order_coupon" ADD COLUMN     "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0;
