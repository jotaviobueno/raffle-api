-- AlterTable
ALTER TABLE "cart_item" ALTER COLUMN "tax" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "cart_total" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "tax" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "order_total" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "raffle" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "total" (
    "id" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount_manual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "finance_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "total_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "total_finance_id_key" ON "total"("finance_id");

-- AddForeignKey
ALTER TABLE "total" ADD CONSTRAINT "total_finance_id_fkey" FOREIGN KEY ("finance_id") REFERENCES "finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
