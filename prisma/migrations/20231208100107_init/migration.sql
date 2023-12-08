-- CreateTable
CREATE TABLE "PeoplePages" (
    "page_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "names" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeoplePages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "FilmsPages" (
    "page_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilmsPages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Films" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Films_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesPages" (
    "page_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpeciesPages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehiclesPages" (
    "page_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehiclesPages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Vehicles" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StarshipsPages" (
    "page_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StarshipsPages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Starships" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Starships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanetsPages" (
    "page_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanetsPages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Planets" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Planets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PeoplePages_slug_key" ON "PeoplePages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FilmsPages_slug_key" ON "FilmsPages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Films_title_key" ON "Films"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Films_slug_key" ON "Films"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SpeciesPages_slug_key" ON "SpeciesPages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Species_slug_key" ON "Species"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VehiclesPages_slug_key" ON "VehiclesPages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicles_name_key" ON "Vehicles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicles_slug_key" ON "Vehicles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "StarshipsPages_slug_key" ON "StarshipsPages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Starships_name_key" ON "Starships"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Starships_slug_key" ON "Starships"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PlanetsPages_slug_key" ON "PlanetsPages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Planets_name_key" ON "Planets"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Planets_slug_key" ON "Planets"("slug");
