import 'server-only';
import { cache } from 'react';
import { prisma } from '@/shared/lib/db';
import type { Product } from '../model/types';

export const getProducts = cache(async (): Promise<Product[]> => {
  const products = await prisma.products.findMany({ orderBy: { id: 'asc' } });

  return products.map((p) => ({
    ...p,
    name: p.name ?? 'Untitled product',
    price: Number(p.price) ?? 0,
  }));
});
