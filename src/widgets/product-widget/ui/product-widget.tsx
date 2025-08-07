import type { ComponentProps } from 'react';
import { AddToCartButton } from '@/src/entities/cart/ui';
import type { ProductType } from '@/src/entities/products/model';
import { Product, ProductImagesCarousel } from '@/src/entities/products/ui';
import { ProductsVariantsSelect } from '@/src/entities/products/ui';
import { cn } from '@/src/shared/lib/utils';
import { Price } from '@/src/shared/ui/price';


interface Props extends ComponentProps<'div'> {
  product: ProductType;
}

export async function ProductWidget({
  product,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={cn('container my-4 grid grid-cols-1 lg:grid-cols-2 gap-4', className)}>
      <section>
        <ProductImagesCarousel alt={product.baseTitle} images={product.images} />
      </section>
      <aside className="px-4 flex flex-col gap-8">
        <Product product={product} />
        <ProductsVariantsSelect selectedVariant={product} variants={product.productVariants} />
        <Price
          className="items-end"
          discount={product.discount}
          price={product.price}
          size="lg"
        />

        <AddToCartButton productId={product.id} />
      </aside>
    </div>
  );
}
