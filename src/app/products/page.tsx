import { Suspense } from 'react';
import { getProducts, ProductsCounter } from '@/entities/product';
import { ProductsGrid, ProductsGridSkeleton } from '@/widgets/products-grid';

async function ProductsGridServer() {
  const products = await getProducts();
  return <ProductsGrid products={products} />;
}

export default function ProductsPage() {
  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>

          <p className="text-muted-foreground mt-1">
            Browse our collection of tech gadgets and accessories.
          </p>

          <ProductsCounter />
        </div>

        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsGridServer />
        </Suspense>
      </div>
    </section>
  );
}
