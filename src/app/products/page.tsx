import Image from 'next/image';
import { prisma } from '@/shared/lib/db';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

export default async function ProductsPage() {
  const products = await prisma.products.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Browse our collection of tech gadgets and accessories.
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {products.length} items
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between overflow-hidden">
            <div>
              {product.image && (
                <div className="bg-muted relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name ?? 'Product image'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 pt-4">
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {product.description}
                  </p>
                </CardContent>
              </div>
            </div>

            <CardFooter className="flex items-center justify-between p-4">
              <span className="text-xl font-bold">
                ${product.price ? Number(product.price).toFixed(2) : '0.00'}
              </span>
              <Button size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
