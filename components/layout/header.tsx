import { CartButton } from '@/components/feature';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import logo from '@/public/logo.svg';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About',
  },
] as const;

function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container flex items-center px-4 sm:px-6">
        <Link className="flex items-center mr-auto" href="/">
          <Image src={logo} className="h-12 mr-4 w-full" width={48} height={48} alt="logo" />
          <span className="text-nowrap text-2xl sm:block hidden">Cozy Clothes</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="sm:hidden">
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <nav>
              <ul>
                {links.map(({ href, label }) => (
                  <DropdownMenuItem asChild key={label} className="flex justify-center">
                    <li>
                      <Link href={href}>{label}</Link>
                    </li>
                  </DropdownMenuItem>
                ))}
              </ul>
            </nav>
          </DropdownMenuContent>
        </DropdownMenu>

        <nav className="sm:block hidden">
          <ul className="flex gap-4 items-center">
            {links.map(({ href, label }) => (
              <li key={label}>
                <Button asChild>
                  <Link href={href}>{label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <CartButton className="ml-4" />
      </div>
    </header>
  );
}

export default Header;
