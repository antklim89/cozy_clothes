import type { ReactNode } from 'react';
import { ProductSheet } from '@/features/product/components/ui/product-sheet';


export default function Layout({
  filter,
  categories,
  children,
}: {
  filter: ReactNode;
  categories: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <section>
        {categories}
      </section>

      <section className="container my-4 grid lg:grid-cols-[2fr_5fr] gap-4">
        {filter != null && (
          <aside className="hidden lg:block">
            {filter}
          </aside>
        )}
        <div className="flex flex-col gap-4">
          {filter != null && (
            <ProductSheet className="self-end lg:hidden">
              {filter}
            </ProductSheet>
          )}

          {children}
        </div>
      </section>
    </section>
  );
}
