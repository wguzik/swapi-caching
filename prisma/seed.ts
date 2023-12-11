import { PrismaClient } from "@prisma/client";
import { seedFilmData } from "./seed-data";
const prisma = new PrismaClient();

async function main() {
  await prisma.films.deleteMany();

  await prisma.films.createMany({
    data: seedFilmData,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
