/*
  Warnings:

  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `activity` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_belongsToId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activity" TEXT NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "bmr" DOUBLE PRECISION,
ADD COLUMN     "calories" DOUBLE PRECISION,
ADD COLUMN     "carbsCal" DOUBLE PRECISION,
ADD COLUMN     "carbsGram" DOUBLE PRECISION,
ADD COLUMN     "fatCal" DOUBLE PRECISION,
ADD COLUMN     "fatGram" DOUBLE PRECISION,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "proteinCal" DOUBLE PRECISION,
ADD COLUMN     "proteinGram" DOUBLE PRECISION,
ADD COLUMN     "tdee" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "UserProfile";
