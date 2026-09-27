import { Suspense } from 'react';
import { getProducts } from '@/entities/product/api/get-products';
import { ProductsGrid, ProductsGridSkeleton } from '@/widgets/products-grid';

async function ProductsGridServer() {
  const products = await getProducts();
  return <ProductsGrid products={products} />;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsGridSkeleton />}>
      <ProductsGridServer />
    </Suspense>
  );
}
