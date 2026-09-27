import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { ProductsQuery } from '@/features/products/ui/products-query';
import { prisma } from '@/shared/lib/db';

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () =>
      prisma.products.findMany({
        orderBy: { id: 'asc' },
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsQuery />
    </HydrationBoundary>
  );
}
