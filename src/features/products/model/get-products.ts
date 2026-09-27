import 'server-only';

import { prisma } from '@/shared/lib/db';

export function getProducts() {
  return prisma.products.findMany({
    orderBy: { id: 'asc' },
  });
}
