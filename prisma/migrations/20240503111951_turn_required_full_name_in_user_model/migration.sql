/*
  Warnings:

  - Made the column `full_name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "full_name" SET NOT NULL;
