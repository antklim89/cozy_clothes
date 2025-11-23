import { Suspense } from 'react';
import { SunMoonIcon, UserIcon } from 'lucide-react';

import { CartButton } from '@/entities/cart/ui';
import { AuthMenu } from '@/features/auth/ui';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { HeaderSheet } from './header-sheet';
import { Links } from './links';
import { Logo } from './logo';

export function Header() {
  const authMenu = (
    <Suspense
      fallback={
        <Skeleton>
          <Button disabled variant="ghost">
            <UserIcon className="size-8" />
          </Button>
        </Skeleton>
      }
    >
      <AuthMenu />
    </Suspense>
  );

  const themeToggle = (
    <Suspense
      fallback={
        <Skeleton>
          <Button variant="ghost">
            <SunMoonIcon />
          </Button>
        </Skeleton>
      }
    >
      <ThemeToggle />
    </Suspense>
  );

  const cartButton = <CartButton />;

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container hidden items-center sm:flex">
        <Logo />
        <Links />

        {themeToggle}
        {authMenu}
        {cartButton}
      </div>
      <div className="container flex items-center sm:hidden">
        <Logo />
        {cartButton}
        {authMenu}

        <HeaderSheet>
          {themeToggle}
          <Links className="flex-col gap-4" />

          <div className="flex-1" />
        </HeaderSheet>
      </div>
    </header>
  );
}
