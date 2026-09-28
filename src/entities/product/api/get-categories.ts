import 'server-only';

import { cache } from 'react';
import { prisma } from '@/shared/lib/db';

export const getCategories = cache(async (): Promise<string[]> => {
  const categories = await prisma.products.findMany({
    where: {
      category: { not: null },
    },
    select: {
      category: true,
    },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });

  return categories.map((c) => c.category).filter((c): c is string => Boolean(c));
});
