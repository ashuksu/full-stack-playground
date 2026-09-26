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

  return (
    <ul className="flex max-w-md flex-col gap-1">
      {filteredProjects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
