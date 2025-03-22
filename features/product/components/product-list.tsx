import type { ReactNode } from 'react';
import { Grid } from '@/features/product/components/ui/grid';
import { ProductCard } from '@/features/product/components/ui/product-card';
import { ProductSheet } from '@/features/product/components/ui/product-sheet';
import type { ProductType } from '@/features/product/types';


interface Props {
  products: ProductType[];
  pagination?: ReactNode;
  filter?: ReactNode;
  title?: string;
}


export async function ProductList({
  products,
  pagination,
  title,
  filter,
}: Props) {
  return (
    <section className="container my-4 flex gap-4">
      {filter != null && (
        <aside className="flex-[2_1_0%] hidden lg:block">
          {filter}
        </aside>
      )}
      <section className="flex flex-[5_1_0%] flex-col gap-4">
        {pagination}
        {title != null && (
          <h2 className="prose text-center text-2xl mt-4 font-bold">
            {title}
          </h2>
        )}
        {filter != null && (
          <ProductSheet className="self-end lg:hidden">
            {filter}
          </ProductSheet>
        )}
        <Grid>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        {pagination}
      </section>
    </section>
  );
}


