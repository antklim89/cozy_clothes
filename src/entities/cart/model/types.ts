import type { z } from 'zod/v4-mini';

import type { LocalCartItemSchema } from './schemas';

export interface CartItemType {
  product: {
    id: number;
    baseTitle: string;
    title: string;
    imageUrl: string;
    price: number;
    discount: number;
    size: {
      name: string;
    };
    color: {
      name: string;
      code: string;
    };
  };
  qty: number;
}

export type LocalCartItemType = z.infer<typeof LocalCartItemSchema>;
