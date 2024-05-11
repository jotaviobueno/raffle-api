/*
  Warnings:

  - You are about to drop the column `role_id` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `font` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `theme` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_role_id_fkey";

-- AlterTable
ALTER TABLE "plan" DROP COLUMN "role_id",
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "theme" DROP COLUMN "font",
DROP COLUMN "link",
DROP COLUMN "text",
ADD COLUMN     "background" TEXT,
ADD COLUMN     "card" TEXT,
ADD COLUMN     "destructive" TEXT,
ADD COLUMN     "popover" TEXT;

-- CreateTable
CREATE TABLE "role_plan" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "role_plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "role_plan" ADD CONSTRAINT "role_plan_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_plan" ADD CONSTRAINT "role_plan_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
