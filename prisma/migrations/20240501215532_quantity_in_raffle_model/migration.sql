-- AlterTable
ALTER TABLE "raffle" ADD COLUMN     "quantity" INTEGER[] DEFAULT ARRAY[5, 10, 50, 100]::INTEGER[];

-- CreateTable
CREATE TABLE "PageColor" (
    "id" TEXT NOT NULL,

    CONSTRAINT "PageColor_pkey" PRIMARY KEY ("id")
);
