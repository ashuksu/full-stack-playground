import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Product } from '../model/types';

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      <div>
        {product.image && (
          <div className="bg-muted relative h-48 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={priority}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 pt-4">
          <CardHeader>
            <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>
          </CardContent>
        </div>
      </div>
      <CardFooter className="flex items-center justify-between p-4">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
      </CardFooter>
    </Card>
  );
}
