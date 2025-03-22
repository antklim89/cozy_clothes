import type { z } from 'zod';
import type { PayloadOptions, Populated } from '@/lib/types';
import type { Product, ProductVariant } from '@/payload-types';
import type { FetchProductsInputSchema } from './schemas';


export type ProductType = Populated<Product, 'images' | 'category' | 'variants'>;
export type ProductVariantType = ProductVariant;

export type GetManyProductsOptions = PayloadOptions & z.infer<typeof FetchProductsInputSchema>;
