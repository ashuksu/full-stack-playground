'use client';

import { useProjectStore } from '../model/project-store';

export function ProjectDetails() {
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);

  return <div>Selected project: {selectedProjectId ?? 'none'}</div>;
}
