import { Menu } from 'lucide-react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { fetchCategories } from '@/actions/categories';
import { CartButton } from '@/components/feature/cart-button';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ALL_CATEGORIES } from '@/lib/constants';
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

export async function Header() {
  const categories = await fetchCategories();

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container flex items-center px-4 sm:px-6">
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

        <CartButton className="ml-4" />

        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Navigation Menu">
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <nav>
              <ul>
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <DropdownMenuItem asChild className="flex justify-center sm:hidden">
                      <Link href={href}>{label}</Link>
                    </DropdownMenuItem>
                  </li>
                ))}

                <DropdownMenuSeparator className="sm:hidden" />
                <DropdownMenuLabel className="text-center">Categories</DropdownMenuLabel>

                <li>
                  <DropdownMenuItem asChild className="flex justify-center">
                    <Link href={`/products/${ALL_CATEGORIES}/1`}>ALL</Link>
                  </DropdownMenuItem>
                </li>

                {Array.from(categories, category => (
                  <li key={category.id}>
                    <DropdownMenuItem asChild className="flex justify-center">
                      <Link href={`/products/${category.id}/1`}>{category.name}</Link>
                    </DropdownMenuItem>
                  </li>
                ))}
              </ul>
            </nav>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
