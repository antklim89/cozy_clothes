import type { z } from 'zod/v4-mini';

import type { UpdateUserSchema } from './schemas';

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
