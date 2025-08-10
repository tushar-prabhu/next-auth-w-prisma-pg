'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function Navigation() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isSignInPage = pathname === '/auth/signin';

  if (status === 'loading' || isSignInPage) {
    return null;
  }

  const isActive = (path) => pathname === path;

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  href="/dashboard" 
                  className={navigationMenuTriggerStyle({
                    className: isActive('/dashboard') ? 'bg-accent' : ''
                  })}
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {session?.user?.role === 'ADMIN' && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/admin" 
                    className={navigationMenuTriggerStyle({
                      className: isActive('/admin') ? 'bg-accent' : ''
                    })}
                  >
                    Admin
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm hover:underline"
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}
