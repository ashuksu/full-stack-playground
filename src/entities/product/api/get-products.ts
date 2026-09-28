// import 'server-only';
import { cache } from 'react';
import { prisma } from '@/shared/lib/db';
import type { Product, ProductFilters } from '../model/types';

export const getProducts = cache(async (filters: ProductFilters = {}): Promise<Product[]> => {
  const where: Record<string, unknown> = {};

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {
      gte: filters.minPrice,
      lte: filters.maxPrice,
    };
  }

  const products = await prisma.products.findMany({
    where,
    orderBy: { id: 'asc' },
  });

  return products.map((p) => ({
    ...p,
    name: p.name ?? 'Untitled product',
    price: Number(p.price) ?? 0,
  }));
});
