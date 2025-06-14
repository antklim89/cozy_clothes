import { AuthMenu } from '@/src/features/auth/ui';
import { ThemeToggle } from '@/src/shared/ui/theme-toggle';
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
        {/* <CartButton /> */}
      </div>
      <div className="container sm:hidden flex items-center">
        <Logo />
        {/* <CartButton /> */}
        <AuthMenu />

        <HeaderSheet>
          <Links className="flex-col gap-4" />

          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </HeaderSheet>
      </div>
    </header>
  );
}
