/*
  Warnings:

  - You are about to drop the `Barberhop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BarbershopService" DROP CONSTRAINT "BarbershopService_barbershopId_fkey";

-- DropTable
DROP TABLE "Barberhop";

-- CreateTable
CREATE TABLE "Barbershop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phones" TEXT[],
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barbershop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BarbershopService" ADD CONSTRAINT "BarbershopService_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
