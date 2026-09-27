import { PrismaClient } from '@prisma/client';
import productsData from './products.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.products.deleteMany();
  await prisma.products.createMany({
    data: productsData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
