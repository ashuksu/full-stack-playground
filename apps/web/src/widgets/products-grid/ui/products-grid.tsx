'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductCard, ProductFilters, productsQueryOptions } from '../../../entities/product';

export function ProductsGrid() {
  const searchParams = useSearchParams();

  const filters: ProductFilters = {
    category: searchParams.get('category') ?? undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
  };

  const { data: products = [], isLoading } = useQuery(productsQueryOptions(filters));

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-muted-foreground py-10 text-center">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index === 0} />
      ))}
    </div>
  );
}
