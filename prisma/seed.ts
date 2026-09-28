import { PrismaClient } from '@prisma/client';
import productsData from './products.json';
import todoData from './todo.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.products.deleteMany();
  await prisma.todo.deleteMany();

  await prisma.products.createMany({
    data: productsData,
  });

  await prisma.todo.createMany({
    data: todoData,
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
