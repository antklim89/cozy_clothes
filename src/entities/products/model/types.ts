import type { z } from 'zod/v4-mini';
import type { ProductFilterSchema, ProductSchema } from './schemas';


export type ProductType = z.infer<typeof ProductSchema>;
export type ProductFilterType = z.infer<typeof ProductFilterSchema>;
