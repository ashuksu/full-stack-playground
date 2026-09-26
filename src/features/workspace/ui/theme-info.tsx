'use client';

import { useWorkspaceStore } from '@/features/workspace/model/workspace-store';
import { Button } from '@/shared/ui/button';

export function ThemeInfo() {
  console.log('ThemeInfo rendered');
  const theme = useWorkspaceStore((state) => state.theme);

  return (
    <Button
      onClick={() => useWorkspaceStore.getState().setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Theme: {theme}
    </Button>
  );
}
