import { getPayload } from 'payload';
import type { PaginatedDocs } from 'payload';
import type { GetManyProductsOptions, ProductType } from '@/features/product/types';
import config from '@/payload.config';
import { PRODUCTS_PER_PAGE } from './constants';


export async function getOneProduct(id: ProductType['id']): Promise<ProductType> {
  const payload = await getPayload({ config });
  const result = await payload.findByID({
    collection: 'products',
    id,
    depth: 1,
  });

  return result as ProductType;
}

export async function getManyProducts({
  limit,
  category,
  minPrice,
  maxPrice,
  search,
  ...options
}: GetManyProductsOptions): Promise<PaginatedDocs<ProductType>> {
  const payload = await getPayload({ config });


  const result = await payload.find({
    limit: limit ?? PRODUCTS_PER_PAGE,
    ...options,
    where: {
      category: category != null ? { equals: category } : {},
      price: (minPrice != null && maxPrice != null)
        ? { greater_than_equal: minPrice, less_than_equal: maxPrice }
        : minPrice != null
          ? { greater_than_equal: minPrice }
          : maxPrice != null
            ? { less_than_equal: maxPrice }
            : {},
      or: [
        search != null ? { title: { contains: search } } : {},
        search != null ? { description: { contains: search } } : {},
      ],
    },
    collection: 'products',
    depth: 1,
  });

  return result as PaginatedDocs<ProductType>;
}

export async function getAllProductIds(): Promise<ProductType['id'][]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'products',
    limit: Number.MAX_SAFE_INTEGER,
    depth: 0,
    select: {
      // @ts-expect-error select only id
      id: true,
    },
  });

  const ids = result.docs.map(i => i.id);

  return ids;
}
