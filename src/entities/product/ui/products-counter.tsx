import { Badge } from '@/shared/ui/badge';

export function ProductsCounter({ count }: { count: number }) {
  return (
    <Badge variant="secondary" className="h-7 px-3 py-1 text-sm">
      {count} items
    </Badge>
  );
}
