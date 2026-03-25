import type { z } from 'zod/v4-mini';

import type { CreateOrderSchema } from './schemas';

export type CreateOrderType = z.infer<typeof CreateOrderSchema>;
