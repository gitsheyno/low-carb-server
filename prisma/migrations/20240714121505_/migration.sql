-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "createtAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "belongsToId" TEXT NOT NULL,
    "proteinGram" DOUBLE PRECISION,
    "proteinCal" DOUBLE PRECISION,
    "fatGram" DOUBLE PRECISION,
    "fatCal" DOUBLE PRECISION,
    "carbsGram" DOUBLE PRECISION,
    "carbsCal" DOUBLE PRECISION,
    "calories" DOUBLE PRECISION,
    "gender" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "age" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "bmr" DOUBLE PRECISION,
    "tdee" DOUBLE PRECISION,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_belongsToId_id_key" ON "UserProfile"("belongsToId", "id");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
