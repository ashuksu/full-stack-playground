'use client';

import { useState } from 'react';

import { ProjectFilter } from '@/features/projects/ui/project-filter';
import { ProjectList } from '@/features/projects/ui/project-list';
import { WorkspaceSwitcher } from '@/features/workspace/ui/workspace-switcher';
import { ProjectDetails } from '@/features/projects/ui/project-details';
import { WorkspaceInfo } from '@/features/workspace/ui/workspace-info';
import { ThemeInfo } from '@/features/workspace/ui/theme-info';
import { UserInfo } from '@/features/users/ui/user-info';

export default function HomePage() {
  const [value, setValue] = useState('');

  return (
    <section className="container mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">Projects</h1>

      <div className="flex max-w-md flex-col gap-3">
        <ProjectFilter value={value} onChange={setValue} />

        <ProjectList filter={value} />

        <ProjectDetails />

        <WorkspaceInfo />

        <div>
          <ThemeInfo />
        </div>

        <div className="flex items-center gap-3">
          User name: <UserInfo />
        </div>

        <WorkspaceSwitcher />
      </div>
    </section>
  );
}
