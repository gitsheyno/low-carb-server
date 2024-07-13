/*
  Warnings:

  - Added the required column `carbs` to the `UserMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `UserMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `UserMeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMeal" ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;
