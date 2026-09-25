type Project = {
  id: number;
  name: string;
};

const projects: Project[] = [
  { id: 1, name: 'Website redesign' },
  { id: 2, name: 'Mobile application' },
  { id: 3, name: 'Internal dashboard' },
];

export function ProjectList() {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
