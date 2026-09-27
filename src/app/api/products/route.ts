import { prisma } from '@/shared/lib/db';

export async function GET() {
  const products = await prisma.products.findMany({
    orderBy: { id: 'asc' },
  });

  return Response.json(products);
}
