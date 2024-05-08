/*
  Warnings:

  - You are about to drop the `finance_total` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "finance_total" DROP CONSTRAINT "finance_total_finance_id_fkey";

-- DropTable
DROP TABLE "finance_total";
