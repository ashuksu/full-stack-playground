import { Skeleton } from '@/shared/ui/skeleton';

export function ProductsGridSkeleton() {
  return (
    <div className="container mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-80 w-full rounded-xl" />
      ))}
    </div>
  );
}
