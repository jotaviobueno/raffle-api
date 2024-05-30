-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('PF', 'PJ', 'E');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "type" "USER_TYPE",
ALTER COLUMN "document" DROP NOT NULL;
