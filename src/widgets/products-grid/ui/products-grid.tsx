'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Badge } from '@/shared/ui/badge';
import { ProductCard, productsQueryOptions } from '@/entities/product';

export function ProductsGrid() {
  const { data } = useSuspenseQuery(productsQueryOptions);

  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>

          <p className="text-muted-foreground mt-1">
            Browse our collection of tech gadgets and accessories.
          </p>
        </div>

        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {data.length} items
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index === 0} />
        ))}
      </div>
    </section>
  );
}
