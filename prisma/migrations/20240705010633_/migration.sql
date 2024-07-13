/*
  Warnings:

  - You are about to drop the column `protein` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "protein",
ADD COLUMN     "carbsCal" DOUBLE PRECISION,
ADD COLUMN     "fatCal" DOUBLE PRECISION,
ADD COLUMN     "fatGram" DOUBLE PRECISION,
ADD COLUMN     "proteinCal" DOUBLE PRECISION,
ADD COLUMN     "proteinGram" DOUBLE PRECISION;
