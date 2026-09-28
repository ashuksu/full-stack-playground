import { getProducts } from '@/entities/product';

export async function GET() {
  const products = await getProducts();

  return Response.json(products);
}
