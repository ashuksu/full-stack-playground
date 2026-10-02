import { PrismaClient } from '@prisma/client';
import productsData from './products.json';
import todoData from './todo.json';

const prisma = new PrismaClient();

async function resetSequence(tableName: string) {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('${tableName}', 'id'), COALESCE((SELECT MAX(id) FROM "${tableName}"), 1));`,
  );
}

async function main() {
  await prisma.products.deleteMany();
  await prisma.todo.deleteMany();

  await prisma.products.createMany({ data: productsData });
  await prisma.todo.createMany({ data: todoData });

  await resetSequence('products');
  await resetSequence('todo');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
