import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { ProductCategoryType } from '../types';


export async function CategoryNavBar({ categories }: { categories: ProductCategoryType[] }) {
  return (
    <section className="container w-[90vw] h-20 my-4">
      <ScrollArea>
        <nav className="mb-4">
          <ul className="flex gap-2">
            <li>
              <Button asChild className="p-8" variant="outline">
                <Link href="/products">ALL</Link>
              </Button>
            </li>

            {categories.map(category => (
              <li key={category.id}>
                <Button asChild className="p-8" variant="outline">
                  <Link href={`/products?category=${category.id}`}>{category.name}</Link>
                </Button>
              </li>
            ))}
            {categories.map(category => (
              <li key={category.id}>
                <Button asChild className="p-8" variant="outline">
                  <Link href={`/products?category=${category.id}`}>{category.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <ScrollBar className="h-4" orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
