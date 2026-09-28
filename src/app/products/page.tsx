import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ProductsCounter, productsQueryOptions } from '@/entities/product';
import { ProductsGrid, ProductsGridSkeleton } from '@/widgets/products-grid';
import { getProducts } from '@/entities/product/api/get-products';

export default async function ProductsPage() {
  const queryClient = new QueryClient();
  const initialFilters = {};

  await queryClient.prefetchQuery({
    queryKey: productsQueryOptions(initialFilters).queryKey,
    queryFn: () => getProducts(initialFilters),
  });

  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex w-full flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>

        <div className="flex w-full justify-between gap-3">
          <p className="text-muted-foreground mt-1">
            Browse our collection of tech gadgets and accessories.
          </p>

          <Suspense fallback={<span className="text-muted-foreground text-sm">Loading...</span>}>
            <ProductsCounter />
          </Suspense>
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsGrid initialFilters={initialFilters} />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
}
