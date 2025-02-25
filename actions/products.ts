'use server';
import type { FindArgs, PaginatedDocs } from 'payload';
import { getPayload } from 'payload';
import { z } from 'zod';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import type { ProductType } from '@/lib/types';
import type { Product } from '@/payload-types';
import config from '@/payload.config';


const FetchProductsOptionsSchema = z.object({
  sort: z.string().optional(),
  pagination: z.boolean().optional(),
  limit: z.number().min(1).max(20).optional().catch(PRODUCTS_PER_PAGE),
  where: z.custom<FindArgs['where']>().optional(),
  page: z.number().min(1).optional().catch(1),
});

export async function fetchProducts(options: z.infer<typeof FetchProductsOptionsSchema> = {}): Promise<PaginatedDocs<ProductType>> {
  const validatedOptions = await FetchProductsOptionsSchema.parseAsync(options);

  const payload = await getPayload({ config });
  const result = await payload.find({
    ...validatedOptions,
    collection: 'products',
    depth: 1,
  });

  return result as PaginatedDocs<ProductType>;
}

export async function fetchProduct(id: Product['id']): Promise<ProductType> {
  const payload = await getPayload({ config });
  const result = await payload.findByID({
    collection: 'products',
    id,
    depth: 1,
  });

  return result as ProductType;
}
