import { Menu } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartButton } from '@/features/cart';
import logo from '@/public/logo.svg';


const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/search',
    label: 'Search',
  },
] as const;

export async function Header({ categoryMenu }: { categoryMenu?: ReactNode }) {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container flex items-center px-4 sm:px-6">
        <Logo />
        <Links />
        <CartButton className="ml-4" />

        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Navigation Menu">
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <nav>
              <DropdownLinks />
            </nav>
            <DropdownMenuSeparator className="sm:hidden" />
            {categoryMenu}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link className="flex items-center mr-auto" href="/">
      <Image
        alt="logo"
        className="h-12 mr-4 w-full"
        height={48}
        src={logo as StaticImageData}
        width={48}
      />
      <span className="text-nowrap text-2xl sm:block hidden">Cozy Clothes</span>
    </Link>
  );
}

function Links() {
  return (
    <nav className="sm:block hidden">
      <ul className="flex items-center">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Button asChild>
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DropdownLinks() {
  return (
    <ul>
      {links.map(({ href, label }) => (
        <li key={label}>
          <DropdownMenuItem asChild className="flex justify-center cursor-pointer sm:hidden">
            <Link href={href}>{label}</Link>
          </DropdownMenuItem>
        </li>
      ))}
    </ul>
  );
}
