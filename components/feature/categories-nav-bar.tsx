import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { ALL_CATEGORIES } from '@/constants';
import { productsLoader } from '@/lib/content-loaders';
import { cn } from '@/lib/utils';


type Props = ComponentProps<'nav'> & {
  selectedCategory?: string;
};

export async function CategoriesNavBar({ className, selectedCategory, ...props }: Props) {
  const products = await productsLoader();
  const categories = products.reduce((acc, i) => acc.add(i.category), new Set<string>()).values();

  return (
    <nav className={cn('container', className)} {...props}>
      <ul className="flex justify-center flex-wrap gap-1 md:gap-4">
        <li>
          <Button asChild className={cn({ 'border-primary': selectedCategory === ALL_CATEGORIES })} variant="outline">
            <Link href={`/products/${ALL_CATEGORIES}/1`}>ALL</Link>
          </Button>
        </li>
        {Array.from(categories, category => (
          <li key={category}>
            <Button asChild className={cn({ 'border-primary': selectedCategory === category })} variant="outline">
              <Link href={`/products/${category}/1`}>{category}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
