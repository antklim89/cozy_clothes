import { CartButton } from '@/entities/cart/ui';
import { AuthMenu } from '@/features/auth/ui';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { HeaderSheet } from './header-sheet';
import { Links } from './links';
import { Logo } from './logo';

export async function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container sm:flex hidden items-center">
        <Logo />
        <Links />
        <ThemeToggle />
        <AuthMenu />
        <CartButton />
      </div>
      <div className="container sm:hidden flex items-center">
        <Logo />
        <CartButton />
        <AuthMenu />

        <HeaderSheet>
          <ThemeToggle className="self-end" />
          <Links className="flex-col gap-4" />

          <div className="flex-1" />
        </HeaderSheet>
      </div>
    </header>
  );
}
