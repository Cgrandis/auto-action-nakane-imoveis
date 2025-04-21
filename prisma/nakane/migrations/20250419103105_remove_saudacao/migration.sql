/*
  Warnings:

  - You are about to drop the `Saudacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Saudacao" DROP CONSTRAINT "Saudacao_customerId_fkey";

-- DropTable
DROP TABLE "Saudacao";
