import { cn, productsLoader } from '@/lib';
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
      className={cn('container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2', props.className)}
    >
      {products.slice(skip, limit).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
