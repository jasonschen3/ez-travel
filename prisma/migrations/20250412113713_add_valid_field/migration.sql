/*
  Warnings:

  - Made the column `valid` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "valid" SET NOT NULL,
ALTER COLUMN "valid" SET DEFAULT false;
