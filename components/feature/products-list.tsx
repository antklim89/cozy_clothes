import { productsLoader } from '@/lib/contentLoaders';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import ProductCard from './product-card';

interface Props extends ComponentProps<'div'> {
  limit?: number;
  skip?: number;
}

async function ProductsList({ skip, limit, ...props }: Props) {
  const products = await productsLoader();

  return (
    <div
      {...props}
      className={cn(
        'container grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"',
        props.className,
      )}
    >
      {products.slice(skip, limit).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
