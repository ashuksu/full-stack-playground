import { SidebarTrigger } from '../../../shared/ui/sidebar';
import { Navigation } from './navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-5 flex h-12 items-center justify-between bg-zinc-300 px-4 font-sans dark:bg-zinc-900">
      <SidebarTrigger />

      <Navigation />
    </header>
  );
}
