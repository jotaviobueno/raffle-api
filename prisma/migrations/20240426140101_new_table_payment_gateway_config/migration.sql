-- AlterTable
ALTER TABLE "payment_method" ADD COLUMN     "payment_gateway_config_id" TEXT;

-- CreateTable
CREATE TABLE "payment_gateway_config" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "confg" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "payment_gateway_config_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_method" ADD CONSTRAINT "payment_method_payment_gateway_config_id_fkey" FOREIGN KEY ("payment_gateway_config_id") REFERENCES "payment_gateway_config"("id") ON DELETE SET NULL ON UPDATE CASCADE;
