import { CartButton } from '@/components/feature';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
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

        <nav className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ul>
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <DropdownMenuItem>
                      <Link href={href}>{label}</Link>
                    </DropdownMenuItem>
                  </li>
                ))}
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <nav className="sm:block hidden">
          <ul className="flex gap-4 items-center">
            {links.map(({ href, label }) => (
              <li key={label} className="py-4">
                <Link className="py-4" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}

export default Header;
