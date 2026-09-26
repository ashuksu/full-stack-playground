import { create } from 'zustand';

export type Theme = 'light' | 'dark';

type WorkspaceState = {
  workspaceId: string | null;
  theme: Theme;

  setWorkspaceId: (workspaceId: string) => void;
  setTheme: (theme: Theme) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaceId: null,
  theme: 'dark',

  setWorkspaceId: (workspaceId) => set({ workspaceId }),
  setTheme: (theme) => set({ theme }),
}));
