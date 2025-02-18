'use server';
import type { FindArgs, PaginatedDocs } from 'payload';
import { getPayload } from 'payload';
import type { ProductType } from '@/lib/types';
import config from '@/payload.config';


type Options = Pick<FindArgs, 'pagination' | 'limit' | 'sort' | 'where' | 'page'>;

export async function fetchProducts(options: Options = {}): Promise<PaginatedDocs<ProductType>> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    ...options,
  });

  return result as PaginatedDocs<ProductType>;
}

export async function fetchProduct(id: number): Promise<ProductType> {
  const payload = await getPayload({ config });
  const result = await payload.findByID({
    collection: 'products',
    id,
    depth: 1,
  });

  return result as ProductType;
}
