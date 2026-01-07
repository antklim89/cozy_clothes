import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel';
import type { ProductCategoryType } from '../model/types';

export function ProductCategoriesNavBar({ categories }: { categories: ProductCategoryType[] }) {
  return (
    <section className="container my-4">
      <Carousel
        className="m-auto w-[90vw] cursor-pointer select-none sm:w-full"
        opts={{ align: 'start', dragFree: true, loop: true }}
      >
        <CarouselContent className="">
          <CarouselItem className="basis-auto">
            <Link className={cn(buttonVariants({ variant: 'outline' }), 'p-8')} href="/products">
              ALL
            </Link>
          </CarouselItem>
          {categories.map(category => (
            <CarouselItem className="basis-auto" key={category.id}>
              <Link
                className={cn(buttonVariants({ variant: 'outline' }), 'p-8')}
                href={`/products?category=${category.id}`}
              >
                {category.name}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
