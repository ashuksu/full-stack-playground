'use client';

import { useWorkspaceStore } from '@/features/workspace/model/workspace-store';
import { loadWorkspace } from '@/features/workspace/model/workspace-actions';
import { Button } from '@/shared/ui/button';

export function WorkspaceSwitcher() {
  const setWorkspaceId = useWorkspaceStore((state) => state.setWorkspaceId);

  return (
    <div className="flex items-center gap-3">
      <Button onClick={() => setWorkspaceId('workspace-1')}>Workspace 1</Button>

      <Button onClick={() => setWorkspaceId('workspace-2')}>Workspace 2</Button>

      <Button onClick={loadWorkspace}>Load workspace</Button>
    </div>
  );
}
