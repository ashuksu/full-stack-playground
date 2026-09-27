import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getProducts } from '@/entities/product/api/get-products';
import { productsQueryOptions } from '@/entities/product';
import { ProductsGrid, ProductsGridSkeleton } from '@/widgets/products-grid';
import { makeQueryClient } from '@/shared/lib/query-client';

export default async function ProductsPage() {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({ ...productsQueryOptions, queryFn: getProducts });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductsGrid />
      </Suspense>
    </HydrationBoundary>
  );
}
