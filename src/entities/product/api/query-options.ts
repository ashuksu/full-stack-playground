import { queryOptions } from '@tanstack/react-query';
import type { Product } from '../model/types';

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');

  if (!response.ok) throw new Error('Failed to fetch products');

  return response.json();
}

export const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 60 * 1000,
});
