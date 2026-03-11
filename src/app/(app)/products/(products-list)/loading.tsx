import { ProductsListFallback } from '@/entities/products/ui';
import { Skeleton } from '@/shared/ui/skeleton';
import { ProductCatalog, ProductCatalogAside } from '@/widgets/products-catalog/ui';

function Loading() {
  return (
    <ProductCatalog
      filter={
        <ProductCatalogAside>
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </ProductCatalogAside>
      }
      products={<ProductsListFallback />}
    />
  );
}

export default Loading;
