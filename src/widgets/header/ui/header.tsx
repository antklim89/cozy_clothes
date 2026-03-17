import { CartButton } from '@/entities/cart/ui';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { HeaderLinks } from './header-links';
import { HeaderLogo } from './header-logo';
import { HeaderSheet } from './header-sheet';
import { HeaderUserMenu } from './header-user-menu';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container hidden items-center gap-2 sm:flex">
        <HeaderLogo />
        <HeaderLinks />

        <ThemeToggle />
        <HeaderUserMenu />
        <CartButton />
      </div>
      <div className="container flex items-center gap-2 sm:hidden">
        <HeaderLogo />
        <HeaderUserMenu />
        <CartButton />

        <HeaderSheet />
      </div>
    </header>
  );
}
