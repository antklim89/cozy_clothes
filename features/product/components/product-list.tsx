import type { ComponentProps } from 'react';
import { ProductCard } from '@/features/product/components/ui/product-card';
import type { ProductType } from '@/features/product/types';
import { cn } from '@/lib/utils';


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
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))]">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}


