-- AlterTable
ALTER TABLE "order" ADD COLUMN     "order_type_id" TEXT;

-- CreateTable
CREATE TABLE "order_type" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "order_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_order_type_id_fkey" FOREIGN KEY ("order_type_id") REFERENCES "order_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
