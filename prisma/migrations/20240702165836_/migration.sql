/*
  Warnings:

  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `calories` to the `UserMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `UserMeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_UserMealId_fkey";

-- AlterTable
ALTER TABLE "UserMeal" ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Meal";
