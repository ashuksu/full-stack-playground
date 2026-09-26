import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import { AppSidebar } from '@/widgets/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Full Stack Playground',
  description: 'Modern frontend and full-stack playground',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans dark:bg-black">
        <SidebarProvider>
          <AppSidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            <header className="flex h-12 items-center border-b px-4">
              <SidebarTrigger />
            </header>

            <main className="flex w-full flex-1 flex-col">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
