import type { ComponentProps } from 'react';
import type { ProductPreviewType } from '@/src/entities/products/model';
import { ProductsList, ProductsListCard } from '@/src/entities/products/ui';
import { cn } from '@/src/shared/lib/utils';


interface Props extends ComponentProps<'section'> {
  products: ProductPreviewType[];
  title?: string;
}

export function ProductsPromo({
  products,
  title,
  children,
  className,
  ...props
}: Props) {
  return (
    <section
      className={cn('container my-8', className)}
      {...props}
    >
      <h2 className="text-2xl mb-4">{title}</h2>
      <ProductsList>
        {products.map(product => (
          <ProductsListCard key={product.id} product={product} />
        ))}
      </ProductsList>
    </section>
  );
}
