/*
  Warnings:

  - You are about to drop the column `createdAT` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[macrosId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAT",
ADD COLUMN     "bmr" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "macrosId" INTEGER,
ADD COLUMN     "tdee" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Macros" (
    "id" SERIAL NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "proteinId" INTEGER NOT NULL,
    "fatId" INTEGER NOT NULL,
    "carbsId" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Macros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Macronutrient" (
    "id" SERIAL NOT NULL,
    "grams" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Macronutrient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Macros_proteinId_key" ON "Macros"("proteinId");

-- CreateIndex
CREATE UNIQUE INDEX "Macros_fatId_key" ON "Macros"("fatId");

-- CreateIndex
CREATE UNIQUE INDEX "Macros_carbsId_key" ON "Macros"("carbsId");

-- CreateIndex
CREATE UNIQUE INDEX "Macros_userId_key" ON "Macros"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_macrosId_key" ON "User"("macrosId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Macros" ADD CONSTRAINT "Macros_proteinId_fkey" FOREIGN KEY ("proteinId") REFERENCES "Macronutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Macros" ADD CONSTRAINT "Macros_fatId_fkey" FOREIGN KEY ("fatId") REFERENCES "Macronutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Macros" ADD CONSTRAINT "Macros_carbsId_fkey" FOREIGN KEY ("carbsId") REFERENCES "Macronutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
