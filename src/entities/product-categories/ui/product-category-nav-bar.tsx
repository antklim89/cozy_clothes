import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/src/shared/ui/carousel';
import type { ProductCategoryType } from '../model/types';


export async function ProductCategoryNavBar({ categories }: { categories: ProductCategoryType[] }) {
  return (
    <section className="container my-4">
      <Carousel className="cursor-pointer select-none" opts={{ align: 'start', dragFree: true, loop: true }}>
        <CarouselContent>
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
