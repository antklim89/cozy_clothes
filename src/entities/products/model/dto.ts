import type { Product } from '@/payload-types';
import { ProductSchema } from './schemas';
import type { ProductType } from './types';


export function productDto(data: Product): ProductType {
  return ProductSchema.parse({
    ...data,
    variants: data.variants?.docs ?? [],
  });
}
