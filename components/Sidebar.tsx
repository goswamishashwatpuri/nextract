'use client';
import React, { useState } from 'react'
import { HomeIcon, Layers2Icon, ShieldCheckIcon, CoinsIcon } from 'lucide-react';
import Logo from './logo';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import UserAvailableCreditsBadge from './user-available-credits-badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const routes = [
  {
    href: '',
    label: 'Home',
    icon: HomeIcon,
  },
  {
    href: 'workflows',
    label: 'Workflows',
    icon: Layers2Icon,
  },
  {
    href: 'credentials',
    label: 'Credentials',
    icon: ShieldCheckIcon,
  },
  {
    href: 'billing',
    label: 'Billing',
    icon: CoinsIcon,
  },
];

type DesktopSidebarProps = {}
export function DesktopSidebar({ }: DesktopSidebarProps) {

  const pathname = usePathname();
  const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];


  return (
    <div className="hidden relative md:block md:w-[180px] lg:w-[200px] max-w-[240px] h-screen overflow-hidden w-full dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex-items-center justify-center gap-2 p-4">
        <Logo />
      </div>
      <div className="p-2">
        <UserAvailableCreditsBadge />
      </div>
      <div className="flex flex-col p-2 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={`/${route.href}`}
            className={cn(buttonVariants({
              variant: activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem',
            }),
              activeRoute.href === route.href && 'shadow-md'
            )}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

type MobileSidebarProps = {}
export function MobileSidebar({ }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] space-y-4" side="left">
            <Logo />
            <UserAvailableCreditsBadge />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={`/${route.href}`}
                  className={buttonVariants({
                    variant: activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem',
                  })}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}