import { getPayload } from 'payload';
import type { PaginatedDocs } from 'payload';
import type { ProductType } from '@/features/product/types';
import type { PayloadOptions } from '@/lib/types';
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

export async function getManyProducts(options: PayloadOptions): Promise<PaginatedDocs<ProductType>> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    limit: PRODUCTS_PER_PAGE,
    ...options,
    collection: 'products',
    depth: 1,
  });

  return result as PaginatedDocs<ProductType>;
}

export async function getAllProductIds(): Promise<ProductType['id'][]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'products',
    depth: 0,
    select: {
      // @ts-expect-error select only id
      id: true,
    },
  });

  const ids = result.docs.map(i => i.id);

  return ids;
}
