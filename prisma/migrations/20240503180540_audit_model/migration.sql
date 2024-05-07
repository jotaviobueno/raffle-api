-- CreateTable
CREATE TABLE "audit" (
    "id" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resources" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "audit_pkey" PRIMARY KEY ("id")
);
