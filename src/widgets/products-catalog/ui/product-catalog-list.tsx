import type { ProductPreviewType } from '@/entities/products/model';
import { ProductsList, ProductsListCard } from '@/entities/products/ui';
import type { PaginatedData } from '@/shared/model/types/types';
import { Pagination } from '@/shared/ui/pagination';
import { QuerySort } from '@/shared/ui/query-sort';
import { sortOptions } from '../config/sort-options';

export function ProductCatalogList({ products }: { products: PaginatedData<ProductPreviewType> }) {
  return (
    <>
      <div className="flex flex-col gap-8 sm:flex-row">
        <Pagination page={products.page} totalPages={products.totalPages} />
        <QuerySort options={sortOptions} />
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
