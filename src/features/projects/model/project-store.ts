import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ProjectState = {
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string) => void;
};

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      selectedProjectId: null,

      setSelectedProjectId: (id) => set({ selectedProjectId: id }),
    }),
    {
      name: 'project-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
