import { Counter } from '@/shared/ui/counter';

export default function HomePage() {
  const initialValue = 10;

  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
      <div>
        <h1>Home Page</h1>
        <Counter initialValue={initialValue} />
      </div>
    </section>
  );
}
