import type { Populated } from '@/lib/types';
import type { Product, ProductVariant } from '@/payload-types';


export type ProductType = Populated<Product, 'images' | 'category' | 'variants'>;
export type ProductVariantType = ProductVariant;
