-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_number_key" ON "Contact"("number");
