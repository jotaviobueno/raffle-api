-- AlterTable
ALTER TABLE "seller" ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "favicon_url" DROP NOT NULL;

-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "icon" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "parent_id" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
