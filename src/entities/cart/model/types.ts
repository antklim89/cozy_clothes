import type { z } from 'zod/v4-mini';
import type { CartItemSchema, LocalCartItemSchema } from './schemas';


export type CartItemType = z.infer<typeof CartItemSchema>;
export type LocalCartItemType = z.infer<typeof LocalCartItemSchema>;
