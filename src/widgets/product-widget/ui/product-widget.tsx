import type { ComponentProps } from 'react';
import { AddToCartButton } from '@/src/entities/cart/ui';
import type { ProductType } from '@/src/entities/products/model';
import { Product, ProductImagesCarousel } from '@/src/entities/products/ui';
import { cn } from '@/src/shared/lib/utils';


interface Props extends ComponentProps<'div'> {
  product: ProductType;
}

export async function ProductWidget({
  product,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={cn('container my-4 grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-4', className)}>
      <section>
        <ProductImagesCarousel alt={product.baseTitle} images={product.images} />
      </section>
      <aside className="prose dark:prose-invert px-4 flex flex-col">
        <Product product={product} />
        <AddToCartButton productId={product.id} />
      </aside>
    </div>
  );
}
