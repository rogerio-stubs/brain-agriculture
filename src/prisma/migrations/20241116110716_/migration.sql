-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalAreaInHectares" DOUBLE PRECISION NOT NULL,
    "cultivableAreaInHectares" DOUBLE PRECISION NOT NULL,
    "vegetationAreaInHectares" DOUBLE PRECISION NOT NULL,
    "plantedCrops" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farm_cpfCnpj_key" ON "Farm"("cpfCnpj");
