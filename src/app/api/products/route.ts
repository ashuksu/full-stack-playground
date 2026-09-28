import { NextRequest } from 'next/server';
import { getProducts } from '@/entities/product/api/get-products';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const category = searchParams.get('category') ?? undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

  const products = await getProducts({ category, minPrice, maxPrice });

  return Response.json(products);
}
