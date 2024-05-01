/*
  Warnings:

  - Made the column `logo` on table `seller` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "seller" ALTER COLUMN "logo" SET NOT NULL;

-- CreateTable
CREATE TABLE "gateway_event" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "postback" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "gateway_event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gateway_event" ADD CONSTRAINT "gateway_event_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gateway_event" ADD CONSTRAINT "gateway_event_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
