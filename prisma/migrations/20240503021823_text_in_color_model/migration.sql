/*
  Warnings:

  - Added the required column `text` to the `color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "color" ADD COLUMN     "text" TEXT NOT NULL;
