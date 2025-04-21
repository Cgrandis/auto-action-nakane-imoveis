-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corretor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Corretor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intencao" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saudacao" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Saudacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_number_key" ON "Contact"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_email_key" ON "Corretor"("email");

-- AddForeignKey
ALTER TABLE "Saudacao" ADD CONSTRAINT "Saudacao_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Contact"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
