'use client';

import { useProjectStore } from '../model/project-store';
import { Button } from '../../../shared/ui/button';

type Project = {
  id: number;
  name: string;
};

type ProjectListProps = {
  filter: string;
};

const projects: Project[] = [
  { id: 1, name: 'Website redesign' },
  { id: 2, name: 'Mobile application' },
  { id: 3, name: 'Internal dashboard' },
];

export function ProjectList({ filter }: ProjectListProps) {
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const setSelectedProjectId = useProjectStore((state) => state.setSelectedProjectId);

  return (
    <ul className="flex max-w-md flex-col gap-1">
      {filteredProjects.map((project) => (
        <li className="flex items-center gap-2" key={project.id}>
          {project.name}
          <Button onClick={() => setSelectedProjectId(project.id.toString())}>Select</Button>
        </li>
      ))}
    </ul>
  );
}
