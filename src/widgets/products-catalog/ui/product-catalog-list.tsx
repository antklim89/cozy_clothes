import type { ProductPreviewType } from '@/entities/products/model';
import { ProductsList, ProductsListCard, ProductsListSort } from '@/entities/products/ui';
import type { PaginatedData } from '@/shared/model/types/types';
import { Pagination } from '@/shared/ui/pagination';

export function ProductCatalogList({ products }: { products: PaginatedData<ProductPreviewType> }) {
  return (
    <>
      <div className="flex flex-col gap-8 sm:flex-row">
        <Pagination page={products.page} totalPages={products.totalPages} />
        <ProductsListSort className="self-end" />
      </div>
      <ProductsList>
        {products.docs.map(product => (
          <ProductsListCard key={product.id} product={product} />
        ))}
      </ProductsList>
      <Pagination page={products.page} totalPages={products.totalPages} />
    </>
  );
}
