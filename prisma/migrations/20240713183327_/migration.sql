/*
  Warnings:

  - You are about to drop the column `calories` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `carbsCal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `carbsGram` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fatCal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fatGram` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `proteinCal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `proteinGram` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "calories",
DROP COLUMN "carbsCal",
DROP COLUMN "carbsGram",
DROP COLUMN "fatCal",
DROP COLUMN "fatGram",
DROP COLUMN "proteinCal",
DROP COLUMN "proteinGram";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "calories" DOUBLE PRECISION,
ADD COLUMN     "carbsCal" DOUBLE PRECISION,
ADD COLUMN     "carbsGram" DOUBLE PRECISION,
ADD COLUMN     "fatCal" DOUBLE PRECISION,
ADD COLUMN     "fatGram" DOUBLE PRECISION,
ADD COLUMN     "proteinCal" DOUBLE PRECISION,
ADD COLUMN     "proteinGram" DOUBLE PRECISION;
