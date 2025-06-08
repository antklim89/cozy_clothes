import type { Merge } from 'type-fest';
import type { z } from 'zod';
import type { PayloadOptions } from '@/lib/types';
import type {
  Product,
  ProductCategory,
  ProductCountry,
  ProductMedia,
  ProductVariant,
} from '@/payload-types';
import type { FetchProductsInputSchema } from './schemas';


export type ProductType = Merge<Product, {
  images: ProductMedia[];
  category: ProductCategory;
  variants: ProductVariant[];
  country: ProductCountry;
}>;

export type ProductVariantType = ProductVariant;

export type GetManyProductsOptions = PayloadOptions & z.infer<typeof FetchProductsInputSchema>;
