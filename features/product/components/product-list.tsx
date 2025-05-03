import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard } from './ui/product-card';
import { ProductGrid } from './ui/product-grid';
import type { ProductType } from '../types';


interface Props extends ComponentProps<'section'> {
  products: ProductType[];
  title?: string;
}

export async function ProductList({
  products,
  title,
  className,
  ...props
}: Props) {
  return (
    <section className={cn('my-4', className)} {...props}>
      <h2 className="text-xl mb-4">{title}</h2>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </section>
  );
}


