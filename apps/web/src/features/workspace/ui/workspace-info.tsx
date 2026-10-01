'use client';

import { useWorkspaceStore } from '../model/workspace-store';

export function WorkspaceInfo() {
  console.log('WorkspaceInfo rendered');
  const workspaceId = useWorkspaceStore((state) => state.workspaceId);

  return <div>Workspace: {workspaceId ?? 'none'}</div>;
}
