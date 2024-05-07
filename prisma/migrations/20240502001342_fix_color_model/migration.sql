-- DropForeignKey
ALTER TABLE "color" DROP CONSTRAINT "color_seller_id_fkey";

-- AlterTable
ALTER TABLE "color" ALTER COLUMN "seller_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "color" ADD CONSTRAINT "color_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;
