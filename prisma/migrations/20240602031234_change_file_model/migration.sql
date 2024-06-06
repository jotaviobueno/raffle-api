-- AlterTable
ALTER TABLE "file" ADD COLUMN     "destination" TEXT,
ADD COLUMN     "fieldname" TEXT,
ADD COLUMN     "filename" TEXT,
ADD COLUMN     "mimetype" TEXT,
ADD COLUMN     "originalname" TEXT,
ADD COLUMN     "size" DOUBLE PRECISION,
ALTER COLUMN "path" SET NOT NULL,
ALTER COLUMN "path" DROP DEFAULT,
ALTER COLUMN "path" SET DATA TYPE TEXT;
