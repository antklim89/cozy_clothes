import type { z } from 'zod/v4-mini';

import type { SeoSchema } from './schemas';

export type SeoType = z.infer<typeof SeoSchema>;
