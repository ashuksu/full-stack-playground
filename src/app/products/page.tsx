import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { ProductsQuery } from '@/features/products/ui/products-query';
import { getProducts } from '@/features/products/model/get-products';

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsQuery />
    </HydrationBoundary>
  );
}
