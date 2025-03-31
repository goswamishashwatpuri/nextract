
import React from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';

import { DesktopSidebar } from '@/components/Sidebar';

import { Separator } from '@/components/ui/separator';
import BreadcrumbHeader from '@/components/breadcrumb-header';
import { ModeToggle } from '@/components/theme-mode-toggle';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between p-4 h-[50px]">
          <BreadcrumbHeader />
          <div className="gap-2 flex items-center">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="self-center flex-1 container p-4 text-accent-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
