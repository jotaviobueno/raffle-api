/*
  Warnings:

  - You are about to drop the column `raffle_id` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `raffle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_raffle_id_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_user_id_fkey";

-- AlterTable
ALTER TABLE "file" DROP COLUMN "raffle_id",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "raffle_file" (
    "id" TEXT NOT NULL,
    "raffle_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "raffle_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "raffle_file" ADD CONSTRAINT "raffle_file_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raffle_file" ADD CONSTRAINT "raffle_file_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
