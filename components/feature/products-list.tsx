import { productsLoader } from '@/lib/contentLoaders';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import ProductCard from './product-card';

interface Props extends ComponentProps<'div'> {
  page?: number;
  category?: string;
  limit?: number;
}

const ALL_CATEGORIES = 'all';

async function ProductsList({ limit = 8, page = 1, category = ALL_CATEGORIES, className, ...props }: Props) {
  let products = await productsLoader();

  if (category !== ALL_CATEGORIES) {
    products = products.filter((i) => i.category === category);
  }

  const start = limit * page - limit;
  const end = start + limit;
  products = products.slice(start, end);

  return (
    <div
      {...props}
      className={cn('container grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"', className)}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
