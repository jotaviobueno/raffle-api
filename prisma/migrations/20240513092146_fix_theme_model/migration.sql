/*
  Warnings:

  - You are about to drop the column `background` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `foreground` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `theme` table. All the data in the column will be lost.
  - Added the required column `quaternary` to the `theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quinary` to the `theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary` to the `theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senary` to the `theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tertiary` to the `theme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "theme" DROP COLUMN "background",
DROP COLUMN "foreground",
DROP COLUMN "text",
ADD COLUMN     "quaternary" TEXT NOT NULL,
ADD COLUMN     "quinary" TEXT NOT NULL,
ADD COLUMN     "secondary" TEXT NOT NULL,
ADD COLUMN     "senary" TEXT NOT NULL,
ADD COLUMN     "tertiary" TEXT NOT NULL;
