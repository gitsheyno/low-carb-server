/*
  Warnings:

  - A unique constraint covering the columns `[belongsToId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_belongsToId_key" ON "UserProfile"("belongsToId");
