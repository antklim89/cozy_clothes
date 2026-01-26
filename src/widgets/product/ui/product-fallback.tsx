import { AddToCartButtonFallback } from '@/features/update-cart/ui';
import { Skeleton } from '@/shared/ui/skeleton';
import { ProductsVariantsSelectFallback } from './products-variants-select-fallback';

export function ProductFallback() {
  return (
    <div className="container my-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <section>
        <Skeleton className="h-160 w-full" />
      </section>
      <aside className="flex w-full flex-col gap-8 px-4">
        <div className="flex justify-end">
          <Skeleton className="h-11 w-11" />
        </div>
        <div className="flex flex-col gap-8">
          <Skeleton className="h-12 w-180" />
          <Skeleton className="h-9 w-120" />
          <Skeleton className="h-6 w-80" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 15 }, (_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: fallback
              <Skeleton key={index} className="h-3 w-full" />
            ))}
          </div>
        </div>
        <ProductsVariantsSelectFallback />
        <div className="flex flex-col items-end gap-8 self-end">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-6 w-50" />
        </div>
        <AddToCartButtonFallback />
      </aside>
    </div>
  );
}
