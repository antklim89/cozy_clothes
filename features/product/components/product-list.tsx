import type { ReactNode } from 'react';
import { Grid } from '@/features/product/components/ui/grid';
import { ProductCard } from '@/features/product/components/ui/product-card';
import type { ProductType } from '@/features/product/types';


export interface Props {
  products: ProductType[];
  pagination?: ReactNode;
  title?: string;
}


export async function ProductList({ products, pagination, title }: Props) {
  return (
    <section className="flex flex-col gap-4 my-4">
      {pagination}
      {title != null
        ? (
            <h2 className="prose text-center text-2xl mt-4 font-bold">
              {title}
            </h2>
          )
        : null}
      <Grid>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      {pagination}
    </section>
  );
}

