import { getPayload } from 'payload';
import type { ProductCategoryType } from '@/features/product-categories/types';
import config from '@/payload.config';


export async function getCategories(): Promise<ProductCategoryType[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'product-categories',
    pagination: false,
  });

  return result.docs;
}
