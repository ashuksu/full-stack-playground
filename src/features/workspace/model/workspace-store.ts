import { create } from 'zustand';

type WorkspaceState = {
  workspaceId: string | null;
  setWorkspaceId: (workspaceId: string) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaceId: null,

  setWorkspaceId: (workspaceId) => set({ workspaceId }),
}));
