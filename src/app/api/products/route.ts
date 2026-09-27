import { getProducts } from '@/features/products/model/get-products';

export async function GET() {
  const products = await getProducts();

  return Response.json(products);
}
