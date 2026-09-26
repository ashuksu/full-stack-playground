'use client';

import { useWorkspaceStore } from '@/features/workspace/model/workspace-store';

export function ThemeInfo() {
  console.log('ThemeInfo rendered');
  const theme = useWorkspaceStore((state) => state.theme);

  return <div>Theme: {theme}</div>;
}
