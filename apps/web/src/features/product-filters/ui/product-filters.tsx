'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Input } from '../../../shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/ui/select';
import { Button } from '../../../shared/ui/button';

type Props = {
  categories: string[];
};

export function ProductFiltersForm({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const category = searchParams.get('category') ?? '';
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <div className="bg-card flex flex-wrap items-center gap-4 rounded-lg border p-2">
      <div className="w-48">
        <Select
          value={category}
          onValueChange={(val: string | null) =>
            updateFilters('category', !val || val === 'all' ? '' : val)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-32">
        <Input
          type="number"
          placeholder="Min $"
          value={minPrice}
          onChange={(e) => updateFilters('minPrice', e.target.value)}
        />
      </div>

      <div className="w-32">
        <Input
          type="number"
          placeholder="Max $"
          value={maxPrice}
          onChange={(e) => updateFilters('maxPrice', e.target.value)}
        />
      </div>

      {(category || minPrice || maxPrice) && (
        <Button variant="ghost" onClick={handleReset} disabled={isPending}>
          Reset
        </Button>
      )}
    </div>
  );
}
