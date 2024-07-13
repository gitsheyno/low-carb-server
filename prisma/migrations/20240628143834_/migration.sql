/*
  Warnings:

  - You are about to drop the column `macrosId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Macronutrient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Macros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Macros" DROP CONSTRAINT "Macros_carbsId_fkey";

-- DropForeignKey
ALTER TABLE "Macros" DROP CONSTRAINT "Macros_fatId_fkey";

-- DropForeignKey
ALTER TABLE "Macros" DROP CONSTRAINT "Macros_proteinId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_macrosId_fkey";

-- DropIndex
DROP INDEX "User_macrosId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "macrosId",
ADD COLUMN     "calories" DOUBLE PRECISION,
ADD COLUMN     "protein" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Macronutrient";

-- DropTable
DROP TABLE "Macros";
