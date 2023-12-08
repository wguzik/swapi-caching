/*
  Warnings:

  - You are about to drop the `PeoplePages` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Statistic" AS ENUM ('opening_crawls', 'people');

-- DropTable
DROP TABLE "PeoplePages";

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "type" "Statistic" NOT NULL,
    "content" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_type_key" ON "Stats"("type");
