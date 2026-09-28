import { getProducts } from '@/entities/product/api/get-products';
import { Badge } from '@/shared/ui/badge';

export async function ProductsCounter() {
  const products = await getProducts();

  return (
    <Badge variant="secondary" className="px-3 py-1 text-sm">
      {products.length} items
    </Badge>
  );
}
