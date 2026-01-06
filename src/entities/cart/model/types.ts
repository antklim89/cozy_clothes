import type { z } from 'zod/v4-mini';

import type { ProductPreviewType } from '@/entities/products/model';
import type { LocalCartItemSchema } from './schemas';

export interface CartItemType {
  id?: number;
  product: ProductPreviewType;
  qty: number;
}

export type LocalCartItemType = z.infer<typeof LocalCartItemSchema>;
