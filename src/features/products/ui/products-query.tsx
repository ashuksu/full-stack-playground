'use client';

import { useQuery } from '@tanstack/react-query';

export type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  image?: string;
};

export function ProductsQuery() {
  const { data, isPending, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {data.map((product: Product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}