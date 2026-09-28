'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductCard, ProductFilters, productsQueryOptions } from '@/entities/product';

export function ProductsGrid({ initialFilters = {} }: { initialFilters?: ProductFilters }) {
  const { data: products = [] } = useQuery(productsQueryOptions(initialFilters));

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index === 0} />
      ))}
    </div>
  );
}
