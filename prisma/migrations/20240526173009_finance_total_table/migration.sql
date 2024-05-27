-- CreateTable
CREATE TABLE "finance_total" (
    "id" TEXT NOT NULL,
    "finance_id" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount_manual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "finance_total_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "finance_total_finance_id_key" ON "finance_total"("finance_id");

-- AddForeignKey
ALTER TABLE "finance_total" ADD CONSTRAINT "finance_total_finance_id_fkey" FOREIGN KEY ("finance_id") REFERENCES "finance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
