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
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center px-4 sm:px-6">
        <Link className="mr-auto" href="/">
          <Image src={logo} width={240} height={40} alt="logo" />
        </Link>

        <nav className="md:hidden">
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

        <nav className="md:block hidden">
          <ul className="flex gap-4 items-center">
            {links.map(({ href, label }) => (
              <li key={label} className="py-4">
                <Link className="py-4" href={href}>
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <CartButton />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
