import { CartButton } from '@/entities/cart/ui';
import { AuthMenu } from '@/features/auth/ui';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { HeaderSheet } from './header-sheet';
import { Links } from './links';
import { Logo } from './logo';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container hidden items-center sm:flex">
        <Logo />
        <Links />

        <ThemeToggle />
        <AuthMenu />
        <CartButton />
      </div>
      <div className="container flex items-center sm:hidden">
        <Logo />
        <CartButton />
        <AuthMenu />

        <HeaderSheet>
          <Links className="flex-col gap-4" />
          <div className="flex-1" />
          <ThemeToggle className="self-end" />
        </HeaderSheet>
      </div>
    </header>
  );
}
