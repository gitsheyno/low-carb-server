/*
  Warnings:

  - You are about to drop the column `belongsToId` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `UserMealId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_belongsToId_fkey";

-- DropIndex
DROP INDEX "Meal_id_belongsToId_key";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "belongsToId",
ADD COLUMN     "UserMealId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserMeal" (
    "id" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "belongsToId" TEXT NOT NULL,

    CONSTRAINT "UserMeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMeal_id_belongsToId_key" ON "UserMeal"("id", "belongsToId");

-- AddForeignKey
ALTER TABLE "UserMeal" ADD CONSTRAINT "UserMeal_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_UserMealId_fkey" FOREIGN KEY ("UserMealId") REFERENCES "UserMeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
