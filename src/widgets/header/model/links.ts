import type { Route } from 'next';

interface NavItem<T extends string = string> {
  href: T;
  label: string;
}

export const links = [
  {
    href: '/products',
    label: 'Catalog',
  },
  {
    href: '/about',
    label: 'About',
  },
] as const satisfies NavItem<Route>[];
