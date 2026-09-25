import { ProjectList } from '@/features/projects/components/project-list';

export default function HomePage() {
  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>

        <ProjectList />
      </div>
    </section>
  );
}
