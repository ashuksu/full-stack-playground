'use client';

import { useEffect } from 'react';
import { useWorkspaceStore } from '../model/workspace-store';

export function ThemeSync() {
  const theme = useWorkspaceStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
}
