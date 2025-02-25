import { Menu } from 'lucide-react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
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
              <Suspense fallback={<CategoryLinksFallback />}>
                <CategoryLinks />
              </Suspense>
            </nav>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
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

function DropdownLinks() {
  return (
    <ul>
      <li>
        <DropdownMenuItem asChild className="flex justify-center cursor-pointer">
          <Link href="/products">ALL</Link>
        </DropdownMenuItem>
      </li>

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

async function CategoryLinks() {
  const categories = await fetchCategories();

  return (
    <ul>
      <DropdownMenuSeparator className="sm:hidden" />
      <DropdownMenuLabel className="text-center">Categories</DropdownMenuLabel>

      {categories.map(category => (
        <li key={category.id}>
          <DropdownMenuItem asChild className="flex justify-center cursor-pointer">
            <Link href={`/products?category=${category.id}`}>{category.name}</Link>
          </DropdownMenuItem>
        </li>
      ))}
    </ul>
  );
}

function CategoryLinksFallback() {
  return (
    <>
      {
        Array.from({ length: 10 }, (_, i) => (
          <Skeleton className="cursor-pointer h-6 w-full m-auto my-1" key={i} />
        ))
      }
    </>
  );
}
