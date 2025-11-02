import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel';
import type { ProductCategoryType } from '../model/types';

export function ProductCategoryNavBar({ categories }: { categories: ProductCategoryType[] }) {
  return (
    <section className="container my-4">
      <Carousel
        className="m-auto w-[90vw] cursor-pointer select-none sm:w-full"
        opts={{ align: 'start', dragFree: true, loop: true }}
      >
        <CarouselContent className="">
          <CarouselItem className="basis-auto">
            <Button asChild className="p-8" variant="outline">
              <Link href="/products">ALL</Link>
            </Button>
          </CarouselItem>
          {categories.map(category => (
            <CarouselItem className="basis-auto" key={category.id}>
              <Button asChild className="p-8" variant="outline">
                <Link href={`/products?category=${category.id}`}>{category.name}</Link>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
