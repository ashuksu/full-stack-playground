import { getProducts } from '@/entities/product/api/get-products';

export async function GET() {
  const products = await getProducts();

  return Response.json(products);
}
