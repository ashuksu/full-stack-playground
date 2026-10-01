'use client';

import { useWorkspaceStore } from '../model/workspace-store';
import { Button } from '../../../shared/ui/button';
import { MoonStar, Sun } from 'lucide-react';

export function ThemeInfo() {
  console.log('ThemeInfo rendered');
  const theme = useWorkspaceStore((state) => state.theme);

  return (
    <Button
      onClick={() => useWorkspaceStore.getState().setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Theme: {theme} {theme === 'dark' ? <MoonStar /> : <Sun />}
    </Button>
  );
}
