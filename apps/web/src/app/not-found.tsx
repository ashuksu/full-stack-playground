import Link from 'next/link';

import { buttonVariants } from '../shared/ui/button';

export default function NotFound() {
  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-10">
      <p className="text-muted-foreground text-xl font-bold">404</p>

      <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>

      <p className="text-muted-foreground mt-3 max-w-md">
        The page you are looking for does not exist.
      </p>

      <Link href="/" className={buttonVariants({ className: 'mt-6' })}>
        Back to Home
      </Link>
    </section>
  );
}
