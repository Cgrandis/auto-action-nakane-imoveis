-- CreateTable
CREATE TABLE "Corretor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Corretor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_email_key" ON "Corretor"("email");
