/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itinerary" JSONB NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
