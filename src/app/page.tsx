'use client';

import { useState } from 'react';

import { ProjectFilter } from '@/features/projects/components/project-filter';
import { ProjectList } from '@/features/projects/components/project-list';

export default function HomePage() {
  const [value, setValue] = useState('');

  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">Projects</h1>

      <div className="flex max-w-md flex-col gap-3">
        <ProjectFilter value={value} onChange={setValue} />

        <ProjectList filter={value} />
      </div>
    </section>
  );
}
