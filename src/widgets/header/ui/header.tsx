import { Suspense } from 'react';
import { UserIcon } from 'lucide-react';

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

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container hidden items-center sm:flex">
        <Logo />
        <Links />

        <ThemeToggle />
        {authMenu}
        <CartButton />
      </div>
      <div className="container flex items-center sm:hidden">
        <Logo />
        <CartButton />
        {authMenu}

        <HeaderSheet>
          <Links className="flex-col gap-4" />
          <div className="flex-1" />
          <ThemeToggle />
        </HeaderSheet>
      </div>
    </header>
  );
}
