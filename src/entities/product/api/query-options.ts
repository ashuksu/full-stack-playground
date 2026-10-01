import { queryOptions } from '@tanstack/react-query';
import type { Product, ProductFilters } from '../model/types';

async function fetchProducts(filters: ProductFilters): Promise<Product[]> {
  const searchParams = new URLSearchParams();

  if (filters.category) searchParams.set('category', filters.category);
  if (filters.minPrice !== undefined) searchParams.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined) searchParams.set('maxPrice', String(filters.maxPrice));

  const response = await fetch(`/api/products?${searchParams.toString()}`);

  if (!response.ok) throw new Error('Failed to fetch products');

  return response.json();
}

export const productsQueryOptions = (filters: ProductFilters = {}) =>
  queryOptions({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 60 * 1000,
  });
