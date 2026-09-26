'use client';

import { useWorkspaceStore } from '@/features/workspace/model/workspace-store';
import { Button } from '@/shared/ui/button';

export function WorkspaceSwitcher() {
  const setWorkspaceId = useWorkspaceStore((state) => state.setWorkspaceId);

  return (
    <div>
      <Button onClick={() => setWorkspaceId('workspace-1')}>Workspace 1</Button>

      <Button onClick={() => setWorkspaceId('workspace-2')}>Workspace 2</Button>
    </div>
  );
}
