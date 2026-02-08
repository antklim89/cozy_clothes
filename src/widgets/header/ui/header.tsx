import { CartButton } from '@/entities/cart/ui';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { HeaderSheet } from './header-sheet';
import { HeaderUserMenu } from './header-user-menu';
import { Links } from './links';
import { Logo } from './logo';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container hidden items-center sm:flex">
        <Logo />
        <Links />

        <ThemeToggle />
        <HeaderUserMenu />
        <CartButton />
      </div>
      <div className="container flex items-center sm:hidden">
        <Logo />
        <CartButton />
        <HeaderUserMenu />

        <HeaderSheet>
          <Links className="flex-col gap-4" />
          <div className="flex-1" />
          <ThemeToggle className="self-end" />
        </HeaderSheet>
      </div>
    </header>
  );
}
