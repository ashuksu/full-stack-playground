'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/stream/test-room', label: 'Stream' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-3">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'hover:text-primary text-sm font-medium transition-colors',
              isActive
                ? 'text-foreground font-semibold underline underline-offset-4'
                : 'text-muted-foreground',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
