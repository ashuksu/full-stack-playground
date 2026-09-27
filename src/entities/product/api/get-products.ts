import 'server-only';
import { prisma } from '@/shared/lib/db';
import type { Product } from '../model/types';

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.products.findMany({ orderBy: { id: 'asc' } });

  return products.map((p) => ({
    ...p,
    name: p.name ?? 'Untitled product',
    price: Number(p.price) ?? '0.00',
  }));
}
