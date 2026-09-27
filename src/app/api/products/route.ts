import { getProducts } from '@/features/products/api/get-products';

export async function GET() {
  const products = await getProducts();

  return Response.json(products);
}
