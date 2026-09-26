import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

type WorkspaceState = {
  workspaceId: string | null;
  theme: Theme;

  setWorkspaceId: (workspaceId: string) => void;
  setTheme: (theme: Theme) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaceId: null,
      theme: 'dark',

      setWorkspaceId: (workspaceId) => set({ workspaceId }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'workspace-store',
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
);
