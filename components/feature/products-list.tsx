import type { ComponentProps } from 'react';
import type { ProductType } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';


interface Props extends ComponentProps<'div'> {
  products: ProductType[];
}

export function ProductsList({ products, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'container grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"',
        className,
      )}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
