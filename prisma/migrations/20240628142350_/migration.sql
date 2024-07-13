/*
  Warnings:

  - The primary key for the `Macronutrient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Macros` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Macros" DROP CONSTRAINT "Macros_carbsId_fkey";

-- DropForeignKey
ALTER TABLE "Macros" DROP CONSTRAINT "Macros_fatId_fkey";

-- DropForeignKey
ALTER TABLE "Macros" DROP CONSTRAINT "Macros_proteinId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_macrosId_fkey";

-- AlterTable
ALTER TABLE "Macronutrient" DROP CONSTRAINT "Macronutrient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Macronutrient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Macronutrient_id_seq";

-- AlterTable
ALTER TABLE "Macros" DROP CONSTRAINT "Macros_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "proteinId" SET DATA TYPE TEXT,
ALTER COLUMN "fatId" SET DATA TYPE TEXT,
ALTER COLUMN "carbsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Macros_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Macros_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "macrosId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Macros" ADD CONSTRAINT "Macros_proteinId_fkey" FOREIGN KEY ("proteinId") REFERENCES "Macronutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Macros" ADD CONSTRAINT "Macros_fatId_fkey" FOREIGN KEY ("fatId") REFERENCES "Macronutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Macros" ADD CONSTRAINT "Macros_carbsId_fkey" FOREIGN KEY ("carbsId") REFERENCES "Macronutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
