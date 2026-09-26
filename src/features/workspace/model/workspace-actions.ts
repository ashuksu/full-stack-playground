import { useWorkspaceStore } from '@/features/workspace/model/workspace-store';

export async function loadWorkspace() {
  // const workspace = await fetch('https://jsonplaceholder.typicode.com/users/1').then((res) => res.json());
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();

  useWorkspaceStore.setState({
    workspaceId: user.name,
  });
}

export function resetWorkspace() {
  useWorkspaceStore.getState().setWorkspaceId('workspace-1');
}

// resetWorkspace();
